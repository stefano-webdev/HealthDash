import "./RevenueReport.css";
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
    name: string;
    revenue: number;
};

const WardRevenue: RevenueData[] = [
    { name: "Cardiologia", revenue: 1852347 },
    { name: "Ortopedia", revenue: 1164875 },
    { name: "Pediatria", revenue: 981324 },
    { name: "Oncologia", revenue: 2101245 },
    { name: "Neurologia", revenue: 1248756 },
    { name: "Pronto S.", revenue: 2347654 },
    { name: "Chirurgia", revenue: 1753421 },
];

function RevenueReport() {
    const [visibleChart, setVisibleChart] = useState(false);
    const chartRef = useRef<HTMLDivElement>(null);

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
                        margin={{ top: 10, right: 15, bottom: 40, left: -3 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            className="XYAxis"
                            dataKey="name"
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
                                const { name, revenue } = payload[0].payload;
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
                                        <div style={{ color: "var(--mainRed)" }}>
                                            € {revenue.toLocaleString("it-IT")}
                                        </div>
                                    </div>
                                );
                            }}
                        />
                        <Area
                            type="monotone"
                            dataKey="revenue"
                            stroke={visibleChart ? "var(--mainRed)" : "transparent"}
                            fill={visibleChart ? "var(--mainRed)" : "transparent"}
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
        </div>
    );
}

export default RevenueReport;
