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
    Legend,
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
    const [fontSizeXYTooltip, setFontSizeXYTooltip] = useState(14);
    const [fontSizeLegend, setFontSizeLegend] = useState(17);
    const [chartHeight, setChartHeight] = useState(300);
    const [minHeight, setMinHeight] = useState(window.innerWidth <= 549 ? 300 : 350);

    function handleResize() {
        if (window.innerWidth <= 649) {
            setFontSizeXYTooltip(14);
            setFontSizeLegend(17);
            setChartHeight(300);
            setMinHeight(300);
        } else {
            setFontSizeXYTooltip(16);
            setFontSizeLegend(20);
            setChartHeight(350);
            setMinHeight(350);
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
        <div id="financeChartMainCont" className="resize">
            <div id="financeChartCont" ref={chartRef} style={{ width: "100%", maxWidth: "500px", margin: "0 auto", height: chartHeight, minHeight: minHeight }} >
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={monthlyData()}
                        margin={{ top: 20, right: 23, bottom: 20, left: -20 }} >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" tick={{ fontSize: fontSizeXYTooltip, fill: "black" }} padding={{ left: 15 }} />
                        <YAxis
                            tick={{ fontSize: fontSizeXYTooltip, fill: "black" }}
                            tickFormatter={(v: number) => {
                                const valueInM = v / 1_000_000;
                                return `€ ${Number.isInteger(valueInM) ? valueInM : valueInM.toFixed(1)}M`;
                            }}
                            width={70}
                            padding={{ bottom: 20 }}
                        />
                        <Tooltip
                            contentStyle={{
                                border: '2px solid black',
                                borderRadius: '8px',
                                backgroundColor: 'white',
                                boxShadow: "0px 0px 10px 1px #0000009f",
                                fontSize: fontSizeXYTooltip
                            }}
                            labelStyle={{ fontSize: fontSizeXYTooltip }}
                            formatter={(value: number) => [`Saldo cumulativo: ${value.toLocaleString()}€`]}
                            labelFormatter={(label: string) => {
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
                                return monthsFull[label] || label;
                            }}
                        />
                        <Legend
                            verticalAlign="bottom"
                            align="center"
                            wrapperStyle={{
                                display: "flex",
                                justifyContent: "center",
                                width: "100%",
                                left: 0,
                                bottom: 15,
                                padding: 0,
                                margin: 0,
                                fontSize: fontSizeLegend
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
            <small id="lastMonthsFinance">(Ultimi 6 mesi)</small>
        </div>
    );
}

export default FinanceBalanceChart;
