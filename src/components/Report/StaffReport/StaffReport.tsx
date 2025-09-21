import "./StaffReport.css";
import * as htmlToImage from 'html-to-image';
import { useState, useEffect, useRef } from "react";
import {
    BarChart,
    Bar,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

type ShiftData = {
    shift: string;
    staff: number;
    color: string;
};

const staffPerShift: ShiftData[] = [
    { shift: "Mattina", staff: 477, color: "#FFD966" },
    { shift: "Pomeriggio", staff: 385, color: "#FF8C42" },
    { shift: "Notte", staff: 307, color: "#1E3A8A" },
];

function StaffReport() {
    const [visibleChart, setVisibleChart] = useState(false);
    const chartRef = useRef<HTMLDivElement>(null);
    const [barSize, setBarSize] = useState(53);

    function downloadChart() {
        if (chartRef.current) {
            htmlToImage.toPng(chartRef.current)
                .then((dataUrl: string) => {
                    const link: HTMLAnchorElement = document.createElement('a');
                    link.href = dataUrl;
                    link.download = 'staff-report-chart.png';
                    link.click();
                })
                .catch(err => window.alert(`Errore nel download del grafico: ${err.message}`));
        }
    }

    function handleResize() {
        if (window.matchMedia("(max-width: 350px)").matches) {
            setBarSize(40);
        } else if (window.matchMedia("(max-width: 600px)").matches) {
            setBarSize(50);
        } else {
            setBarSize(65);
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
            { threshold: 0.8 }
        );

        if (chartRef.current) observer.observe(chartRef.current);

        return () => {
            if (chartRef.current) observer.unobserve(chartRef.current);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div id="staffReportMainCont" className="resize">
            <div id="staffReportCont" ref={chartRef} style={{ width: "100%", maxWidth: "500px", margin: "0 auto", height: 380 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={staffPerShift}
                        margin={{ top: 20, right: 25, bottom: 0, left: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="shift" className="XYAxisSmall" padding={{ left: 2, right: 2 }} />
                        <YAxis
                            domain={[100, 550]}
                            padding={{ bottom: 0.5 }}
                            ticks={[150, 250, 350, 450, 550]}
                            className="XYAxisSmall YStaff"
                            allowDecimals={false}
                            label={{
                                value: "Persone", angle: -90, dx: window.innerWidth >= 600 ? -8 : 0, position: "insideLeft", style: { fill: "var(--mainRed)" }
                            }} />
                        <Tooltip
                            content={({ payload, label }) => {
                                if (!payload || payload.length === 0) return null;
                                const staff = payload[0].value;
                                return (
                                    <div className="tooltipChart"
                                        style={{
                                            border: "2px solid black",
                                            borderRadius: "8px",
                                            backgroundColor: "white",
                                            boxShadow: "0px 0px 10px 1px #0000009f",
                                            padding: "6px 10px",
                                        }}>
                                        <div>{label}</div>
                                        <div style={{ color: "var(--mainRed)" }}>{`${staff} persone`}</div>
                                    </div>
                                );
                            }}
                        />
                        <Bar
                            dataKey="staff"
                            radius={[8, 8, 0, 0]}
                            isAnimationActive={visibleChart}
                            animationDuration={2100}
                            barSize={barSize}
                        >
                            {staffPerShift.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={visibleChart ? entry.color : "transparent"} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div className="legendCont">
                <div className="legendSymbolBar"></div>
                <span className="legendText">Personale per turno</span>
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

export default StaffReport;
