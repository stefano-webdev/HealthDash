import "./PatientsReport.css";
import { useState, useEffect, useRef } from "react";
import {
    ComposedChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Cell,
} from "recharts";

type DepartmentData = {
    name: string;
    patients: number;
    color: string;
};

const patientsPerDepartment: DepartmentData[] = [
    { name: "Cardiologia", patients: 412, color: "#FF8C42" },
    { name: "Ortopedia", patients: 327, color: "#ce9f10ff" },
    { name: "Pediatria", patients: 289, color: "#1E3A8A" },
    { name: "Oncologia", patients: 374, color: "#8B0000" },
    { name: "Neurologia", patients: 241, color: "#32CD32" },
    { name: "Pronto Soccorso", patients: 538, color: "#FF4500" },
    { name: "Chirurgia", patients: 365, color: "#6A5ACD" },
];

function PatientsReport() {
    const [visibleChart, setVisibleChart] = useState(false);
    const chartRef = useRef<HTMLDivElement>(null);
    const [fontSizeTooltip, setFontSizeTooltip] = useState(12);
    const [fontSizeLegend, setFontSizeLegend] = useState(window.innerWidth <= 370 ? 16 : 17);

    function handleResize() {
        if (window.innerWidth <= 370) {
            setFontSizeTooltip(12);
            setFontSizeLegend(16);
        } else if (window.innerWidth <= 649) {
            setFontSizeTooltip(12);
            setFontSizeLegend(17);
        } else {
            setFontSizeTooltip(15);
            setFontSizeLegend(20);
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
            window.removeEventListener("resize", handleResize);
            if (chartRef.current) observer.unobserve(chartRef.current);
        };
    }, []);

    return (
        <div id="patientsReportMainCont" className="resize">
            <div id="patientsReportCont" ref={chartRef} style={{ width: "100%", maxWidth: "500px", margin: "0 auto", height: 400 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart
                        layout="vertical"
                        data={patientsPerDepartment}
                        margin={{ top: 20, right: 25, bottom: 20, left: 26 }}
                    >
                        <CartesianGrid stroke="#f5f5f5" />
                        <XAxis type="number" padding={{ left: 0.5 }} tick={{ fontSize: fontSizeTooltip + 1, fill: "black" }} />
                        <YAxis dataKey="name" type="category" scale="band" tick={{ fontSize: fontSizeTooltip + 1, fill: "black", dy: 17.5 }} />
                        <Tooltip
                            content={({ payload }) => {
                                if (!payload || payload.length === 0) return null;
                                const { name, patients } = payload[0].payload;
                                return (
                                    <div
                                        style={{
                                            border: "2px solid black",
                                            borderRadius: "8px",
                                            backgroundColor: "white",
                                            boxShadow: "0px 0px 10px 1px #0000009f",
                                            fontSize: fontSizeTooltip + 2,
                                            padding: "6px 10px",
                                        }}
                                    >
                                        <div>{name}</div>
                                        <div style={{ color: "var(--mainRed)" }}>{`${patients} pazienti`}</div>
                                    </div>
                                );
                            }}
                        />
                        <Legend
                            content={() => (
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "10px" }}>
                                    <div id="legendPatientsReport"
                                        style={{
                                            width: window.innerWidth <= 649 ? 20 : 23,
                                            height: window.innerWidth <= 649 ? 12 : 15,
                                            backgroundColor: "var(--mainRed)",
                                            marginRight: 8,
                                        }}
                                    />
                                    <span style={{ fontSize: fontSizeLegend, color: "var(--mainRed)" }}>
                                        Numero pazienti per reparto
                                    </span>
                                </div>
                            )}
                        />
                        <Bar
                            dataKey="patients"
                            barSize={20}
                            fill="var(--mainRed)"
                            isAnimationActive={visibleChart}
                            animationDuration={2100}
                        >
                            {patientsPerDepartment.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={visibleChart ? entry.color : "transparent"} />
                            ))}
                        </Bar>
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default PatientsReport;
