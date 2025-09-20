import "./BedOccupancy.css";
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
    { name: "Cardiologia", occupancy: 88, color: "#008080" },
    { name: "Ortopedia", occupancy: 75, color: "#98750bff" },
    { name: "Pediatria", occupancy: 63, color: "#1E3A8A" },
    { name: "Oncologia", occupancy: 73, color: "#8B0000" },
    { name: "Neurologia", occupancy: 69, color: "#259725ff" },
    { name: "Pronto Soccorso", occupancy: 79, color: "#FF4500" },
    { name: "Chirurgia", occupancy: 77, color: "#6A5ACD" },
];

function BedOccupancy() {
    const [visibleChart, setVisibleChart] = useState(false);
    const chartRef = useRef<HTMLDivElement>(null);
    const [chartConfig, setChartConfig] = useState({ barSize: 13, height: 380 });

    function handleResize() {
        if (window.matchMedia("(max-width: 370px)").matches) {
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
                                            borderRadius: "8px",
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
        </div>
    );
}

export default BedOccupancy;
