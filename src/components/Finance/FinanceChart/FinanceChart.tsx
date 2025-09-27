import "./FinanceChart.css";
import * as htmlToImage from 'html-to-image';
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

function FinanceBalanceChart() {
    const [visibleChart, setVisibleChart] = useState(false);
    const chartRef = useRef<HTMLDivElement>(null);

    async function downloadChart() {
        if (chartRef.current) {
            try {
                const dataUrl: string = await htmlToImage.toPng(chartRef.current);
                const link: HTMLAnchorElement = document.createElement('a');
                link.href = dataUrl;
                link.download = 'finance-chart.png';
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
                                            borderRadius: "var(--borderRadius)",
                                            backgroundColor: "white",
                                            boxShadow: "0px 0px 10px 1px #0000009f",
                                            padding: "6px 10px",
                                        }}
                                    >
                                        <div>{monthLabel}</div>
                                        <div style={{ color: "var(--secondaryRed)" }}>
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
                            stroke={visibleChart ? "var(--secondaryRed)" : "transparent"}
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
                    <line x1="45" y1="20" x2="85" y2="20" stroke="var(--secondaryRed)" strokeWidth="10" />
                    <line x1="115" y1="20" x2="155" y2="20" stroke="var(--secondaryRed)" strokeWidth="10" />
                    <circle cx="100" cy="20" r="21" fill="var(--secondaryRed)" />
                    <circle cx="100" cy="20" r="10" fill="white" />
                </svg>
                <span className="legendText">Saldo cumulativo</span>
            </div>
            <small id="lastMonthsFinance">(Ultimi 6 mesi)</small>
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

export default FinanceBalanceChart;
