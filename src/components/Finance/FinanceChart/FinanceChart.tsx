import "./FinanceChart.css";
import { useState, useEffect, useRef } from "react";
import { fullData } from "../../Home/MonthlyRevenue//MonthlyRevenue.tsx";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const monthsOrder = [
    "gen", "feb", "mar", "apr", "mag", "giu", "lug", "ago", "set", "ott", "nov", "dic"
];

// Calculate cumulative monthly balance
function monthlyData() {
    let cumulative = 0;
    const allData = monthsOrder.map((m) => {
        const balance = fullData[m].revenue - fullData[m].expenses;
        cumulative += balance;
        return {
            month: m.charAt(0).toUpperCase() + m.slice(1),
            balance: parseFloat(cumulative.toFixed(2)),
        };
    });

    // current month (0 = January)
    const currentMonthIndex = new Date().getMonth();

    // get data until the previous month
    const untilLastMonth = allData.slice(0, currentMonthIndex);

    // return only the last 6 available months, excluding the current month
    return untilLastMonth.slice(-6);
}


function FinanceBalanceChart() {
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
            { threshold: 0.8 }
        );

        if (chartRef.current) observer.observe(chartRef.current);

        return () => {
            if (chartRef.current) observer.unobserve(chartRef.current);
        };
    }, []);

    return (
        <div id="financeChartMainCont" className="resize">
            <div id="financeChartCont" ref={chartRef} style={{ width: "100%", maxWidth: "500px", margin: "0 auto", height: '380px' }} >
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={monthlyData()}
                        margin={{ top: 20, right: 23, bottom: -5, left: -20 }} >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" className="XYAxis" padding={{ left: 15 }} />
                        <YAxis
                            className="XYAxis"
                            tickFormatter={(v: number) => {
                                const valueInM = v / 1_000_000;
                                return `€ ${Number.isInteger(valueInM) ? valueInM : valueInM.toFixed(1)}M`;
                            }}
                            width={70}
                            padding={{ bottom: 20 }}
                        />
                        <Tooltip
                            content={({ payload, label }) => {
                                if (!payload || payload.length === 0) return null;
                                const value = payload[0].value;
                                const monthsFull: Record<string, string> = {
                                    Gen: "Gennaio",
                                    Feb: "Febbraio",
                                    Mar: "Marzo",
                                    Apr: "Aprile",
                                    Mag: "Maggio",
                                    Giu: "Giugno",
                                    Lug: "Luglio",
                                    Ago: "Agosto",
                                    Set: "Settembre",
                                    Ott: "Ottobre",
                                    Nov: "Novembre",
                                    Dic: "Dicembre",
                                };
                                const monthLabel = monthsFull[String(label)] || label;
                                return (
                                    <div
                                        className="tooltipChart"
                                        style={{
                                            border: "2px solid black",
                                            borderRadius: "8px",
                                            backgroundColor: "white",
                                            boxShadow: "0px 0px 10px 1px #0000009f",
                                            padding: "6px 10px",
                                        }}
                                    >
                                        <div>{monthLabel}</div>
                                        <div style={{ color: "var(--mainRed)" }}>
                                            {`Saldo cumulativo: ${value.toLocaleString("it-IT")}€`}
                                        </div>
                                    </div>
                                );
                            }}
                        />
                        <Line
                            type="monotone"
                            dataKey="balance"
                            name="Saldo cumulativo"
                            stroke={visibleChart ? "#AE3626" : "transparent"}
                            strokeWidth={3}
                            dot={{ r: 5 }}
                            activeDot={{ r: 8 }}
                            isAnimationActive={visibleChart}
                            animationDuration={2100}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            <div className="legendCont">
                <svg className="legendSymbolLine" viewBox="45 10 110 20">
                    <line x1="45" y1="20" x2="85" y2="20" stroke="#a52a2a" strokeWidth="10" />
                    <line x1="115" y1="20" x2="155" y2="20" stroke="#a52a2a" strokeWidth="10" />
                    <circle cx="100" cy="20" r="21" fill="#a52a2a" />
                    <circle cx="100" cy="20" r="10" fill="white" />
                </svg>
                <span className="legendText">Saldo cumulativo</span>
            </div>
            <small id="lastMonthsFinance">(Ultimi 6 mesi)</small>
        </div>
    );
}

export default FinanceBalanceChart;
