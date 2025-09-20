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

    function handleResize() {
        if (window.matchMedia("(max-width: 370px)").matches) {
            setBarSize(35);
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
                        <XAxis dataKey="shift" className="XYAxis" padding={{ left: 2, right: 2 }} />
                        <YAxis
                            domain={[100, 550]}
                            padding={{ bottom: 0.5 }}
                            ticks={[150, 250, 350, 450, 550]}
                            className="XYAxis YStaff"
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
        </div>
    );
}

export default StaffReport;
