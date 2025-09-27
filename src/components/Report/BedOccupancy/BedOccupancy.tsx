import "./BedOccupancy.css";
import * as htmlToImage from 'html-to-image';
import { useState, useEffect, useRef } from "react";
import {
    RadialBarChart,
    RadialBar,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from "recharts";

type OccupancyData = {
    name: string;
    occupancy: number;
    color: string;
};

const bedOccupancyData: OccupancyData[] = [
    { name: "Cardiologia", occupancy: 88, color: "#00ababff" },
    { name: "Ortopedia", occupancy: 75, color: "#98750bff" },
    { name: "Pediatria", occupancy: 63, color: "#3369ffff" },
    { name: "Oncologia", occupancy: 73, color: "#00af66ff" },
    { name: "Neurologia", occupancy: 69, color: "#259725ff" },
    { name: "Pronto Soccorso", occupancy: 79, color: "#FF4500" },
    { name: "Chirurgia", occupancy: 77, color: "#7665e1ff" },
];

function BedOccupancy() {
    const [visibleChart, setVisibleChart] = useState(false);
    const chartRef = useRef<HTMLDivElement>(null);
    const [chartConfig, setChartConfig] = useState({ barSize: 13, height: 380 });

    async function downloadChart() {
        if (chartRef.current) {
            try {
                const dataUrl: string = await htmlToImage.toPng(chartRef.current);
                const link: HTMLAnchorElement = document.createElement('a');
                link.href = dataUrl;
                link.download = 'bed-occupancy-chart.png';
                link.click();
            } catch (err: unknown) {
                if (err instanceof Error) {
                    window.alert(`Errore nel download del grafico: ${err.message}`);
                } else {
                    window.alert(`Errore nel download del grafico: ${String(err)}`);
                }
            }
        }
    }

    function handleResize() {
        if (window.matchMedia("(max-width: 350px)").matches) {
            setChartConfig({ barSize: 11, height: 280 });
        } else if (window.matchMedia("(max-width: 600px)").matches) {
            setChartConfig({ barSize: 13, height: 380 });
        } else {
            setChartConfig({ barSize: 14, height: 380 });
        }
    }

    useEffect(() => {
        handleResize();
        window.addEventListener("resize", handleResize);

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisibleChart(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.7 }
        );

        if (chartRef.current) observer.observe(chartRef.current);

        return () => {
            if (chartRef.current) observer.unobserve(chartRef.current);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div id="bedOccupancyMainCont" className="resize">
            <div id="bedOccupancyCont" ref={chartRef} style={{ width: "100%", maxWidth: "500px", margin: "0 auto", height: chartConfig.height }}>
                <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart
                        cx="50%"
                        cy="50%"
                        innerRadius="13%"
                        outerRadius="100%"
                        endAngle={360}
                        data={bedOccupancyData}
                    >
                        <Tooltip
                            content={({ payload }) => {
                                if (!payload || payload.length === 0) return null;
                                const { name, occupancy } = payload[0].payload;
                                return (
                                    <div className="tooltipChart"
                                        style={{
                                            border: "2px solid black",
                                            borderRadius: "var(--borderRadius)",
                                            backgroundColor: "white",
                                            boxShadow: "0px 0px 10px 1px #0000009f",
                                            padding: "6px 10px",
                                        }}
                                    >
                                        <div>{name}</div>
                                        <div style={{ color: "var(--mainRed)" }}>{`${occupancy}% occupazione`}</div>
                                    </div>
                                );
                            }}
                        />
                        <RadialBar
                            dataKey="occupancy"
                            barSize={chartConfig.barSize}
                            cornerRadius={10}
                            isAnimationActive={visibleChart}
                            animationDuration={2100}
                        >
                            {bedOccupancyData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={visibleChart ? entry.color : "transparent"}
                                />
                            ))}
                        </RadialBar>
                    </RadialBarChart>
                </ResponsiveContainer>
            </div>
            <div id="legendRadialBars">
                {[...bedOccupancyData].reverse().map((entry, index) => (
                    <div key={index}>
                        <div
                            style={{ backgroundColor: entry.color }}
                            className="radialBarsSymbol"
                        ></div>
                        <span
                            style={{ color: entry.color }}
                            className="radialBarsSpan"
                        >
                            {entry.name}
                        </span>
                    </div>
                ))}
            </div>
            <div className="legendCont">
                <div className="legendSymbolPill"></div>
                <span className="legendText">Tasso occupazione posti letto</span>
            </div>
            <button className="downloadChartBtn buttonRed" onClick={downloadChart}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                    <path d="M352 96C352 78.3 337.7 64 320 64C302.3 64 288 78.3 288 
                        96L288 306.7L246.6 265.3C234.1 252.8 213.8 252.8 201.3 265.3C188.8 
                        277.8 188.8 298.1 201.3 310.6L297.3 406.6C309.8 419.1 330.1 419.1 342.6 
                        406.6L438.6 310.6C451.1 298.1 451.1 277.8 438.6 265.3C426.1 252.8 
                        405.8 252.8 393.3 265.3L352 306.7L352 96zM160 384C124.7 384 96 412.7 
                        96 448L96 480C96 515.3 124.7 544 160 544L480 544C515.3 544 544 515.3 
                        544 480L544 448C544 412.7 515.3 384 480 384L433.1 384L376.5 440.6C345.3 
                        471.8 294.6 471.8 263.4 440.6L206.9 384L160 384zM464 440C477.3 440 488 
                        450.7 488 464C488 477.3 477.3 488 464 488C450.7 488 440 477.3 440 464C440 
                        450.7 450.7 440 464 440z" />
                </svg>
                Download
            </button>
        </div>
    );
}

export default BedOccupancy;
