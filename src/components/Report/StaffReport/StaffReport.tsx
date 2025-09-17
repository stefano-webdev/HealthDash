import "./StaffReport.css";
import { useState, useEffect, useRef } from "react";
import {
    BarChart,
    Bar,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
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
    const [fontSizeXYTooltip, setFontSizeXYTooltip] = useState(13);
    const [fontSizeLegend, setFontSizeLegend] = useState(17);
    const [chartHeight, setChartHeight] = useState(310);
    const [minHeight, setMinHeight] = useState(window.innerWidth <= 549 ? 300 : 350);
    const [barSize, setBarSize] = useState(53);
    const [offsetYAxis, setOffsetYAxis] = useState(12);

    function handleResize() {
        if (window.innerWidth <= 370) {
            setBarSize(40);
            setFontSizeLegend(16);
        } else if (window.innerWidth <= 649) {
            setBarSize(53);
            setFontSizeXYTooltip(13);
            setFontSizeLegend(17);
            setChartHeight(310);
            setMinHeight(300);
            setOffsetYAxis(12);
        } else {
            setBarSize(65);
            setFontSizeXYTooltip(15);
            setFontSizeLegend(20);
            setChartHeight(350);
            setMinHeight(350);
            setOffsetYAxis(0);
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
            <div
                id="staffReportCont"
                ref={chartRef}
                style={{ width: "100%", maxWidth: "500px", margin: "0 auto", height: chartHeight, minHeight: minHeight }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={staffPerShift}
                        margin={{ top: 20, right: 25, bottom: 20, left: window.innerWidth > 649 ? 20 : 0 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="shift"
                            tick={{ fontSize: fontSizeXYTooltip, fill: "black" }}
                            padding={{ left: 2, right: 2 }} />
                        <YAxis
                            domain={[100, 550]}
                            padding={{ bottom: 0.5 }}
                            ticks={[150, 250, 350, 450, 550]}
                            tick={{ fontSize: fontSizeXYTooltip, fill: "black" }}
                            allowDecimals={false}
                            label={{
                                value: "Persone", angle: -90, position: "insideLeft",
                                offset: offsetYAxis, fontSize: fontSizeXYTooltip + 1, style: { fill: "var(--mainRed)" }
                            }} />
                        <Tooltip
                            content={({ payload, label }) => {
                                if (!payload || payload.length === 0) return null;
                                const staff = payload[0].value;
                                return (
                                    <div
                                        style={{
                                            border: "2px solid black",
                                            borderRadius: "8px",
                                            backgroundColor: "white",
                                            boxShadow: "0px 0px 10px 1px #0000009f",
                                            fontSize: fontSizeXYTooltip + 2,
                                            padding: "6px 10px",
                                        }}>
                                        <div>{label}</div>
                                        <div style={{ color: "var(--mainRed)" }}>{`${staff} persone`}</div>
                                    </div>
                                );
                            }}
                        />
                        <Legend
                            verticalAlign="bottom"
                            align="center"
                            wrapperStyle={{
                                display: "flex",
                                justifyContent: "center",
                                width: "100%",
                                bottom: 15,
                                padding: 0,
                                margin: 0
                            }}
                            content={({ payload }) => {
                                if (!payload || payload.length === 0) return null;
                                return (
                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <div
                                            style={{
                                                width: window.innerWidth > 649 ? 17 : 14,
                                                height: window.innerWidth > 649 ? 17 : 14,
                                                backgroundColor: "#FF8C42",
                                                borderRadius: "4px 4px 0 0",
                                                marginRight: 6,
                                            }}
                                        />
                                        <span style={{ fontSize: fontSizeLegend, textAlign: "center", color: "#AE3626" }}>
                                            Personale per turno
                                        </span>
                                    </div>
                                );
                            }}
                        />
                        <Bar
                            dataKey="staff"
                            radius={[8, 8, 0, 0]}
                            isAnimationActive={visibleChart}
                            animationDuration={2100}
                            barSize={barSize}>
                            {staffPerShift.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={visibleChart ? entry.color : "transparent"} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default StaffReport;
