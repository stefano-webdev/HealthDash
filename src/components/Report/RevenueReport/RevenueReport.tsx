import "./RevenueReport.css";
import * as htmlToImage from 'html-to-image';
import { useState, useEffect, useRef } from "react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

type RevenueData = {
    fullName: string;
    shortName: string;
    revenue: number;
};

const WardRevenue: RevenueData[] = [
    { fullName: "Cardiologia", shortName: "Card.", revenue: 1852347 },
    { fullName: "Ortopedia", shortName: "Ortop.", revenue: 1164875 },
    { fullName: "Pediatria", shortName: "Ped.", revenue: 981324 },
    { fullName: "Oncologia", shortName: "Onc.", revenue: 2101245 },
    { fullName: "Neurologia", shortName: "Neur.", revenue: 1248756 },
    { fullName: "Pronto Soccorso", shortName: "P.S.", revenue: 2347654 },
    { fullName: "Chirurgia", shortName: "Chir.", revenue: 1753421 },
];

function RevenueReport() {
    const [visibleChart, setVisibleChart] = useState(false);
    const chartRef = useRef<HTMLDivElement>(null);

    async function downloadChart() {
        if (chartRef.current) {
            try {
                const dataUrl: string = await htmlToImage.toPng(chartRef.current);
                const link: HTMLAnchorElement = document.createElement('a');
                link.href = dataUrl;
                link.download = 'revenue-report-chart.png';
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

    useEffect(() => {
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
        };
    }, []);

    return (
        <div id="revenueReportMainCont" className="resize">
            <div id="revenueReportCont" ref={chartRef} style={{ width: "100%", maxWidth: "500px", margin: "0 auto", height: 380 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={WardRevenue}
                        margin={{ top: 10, right: 17, bottom: 25, left: 12 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            className="XYAxis"
                            dataKey="shortName"
                            interval={0}
                            angle={-45}
                            textAnchor="end"
                        />
                        <YAxis
                            className="XYAxis"
                            tickFormatter={(value) =>
                                value === 0 ? "0 Mil." : `${(value / 1000000).toFixed(1).replace(".", ",")} Mil.`}
                        />
                        <Tooltip
                            content={({ payload }) => {
                                if (!payload || payload.length === 0) return null;
                                const { fullName, revenue } = payload[0].payload;
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
                                        <div>{fullName}</div>
                                        <div style={{ color: "var(--secondaryRed)" }}>
                                            € {revenue.toLocaleString("it-IT")}
                                        </div>
                                    </div>
                                );
                            }}
                        />
                        <Area
                            type="monotone"
                            dataKey="revenue"
                            stroke={visibleChart ? "var(--secondaryRed)" : "transparent"}
                            fill={visibleChart ? "var(--secondaryRed)" : "transparent"}
                            isAnimationActive={visibleChart}
                            animationDuration={2100}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
            <div className="legendCont">
                <div className="legendSymbolPill"></div>
                <span className="legendText">Incassi per reparto</span>
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

export default RevenueReport;
