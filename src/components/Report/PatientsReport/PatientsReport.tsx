import "./PatientsReport.css";
import { useState, useEffect, useRef } from "react";
import {
    ComposedChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from "recharts";

type DepartmentData = {
    name: string;
    patients: number;
    color: string;
};

const patientsPerDepartment: DepartmentData[] = [
    { name: "Cardiologia", patients: 412, color: "#008080" },
    { name: "Ortopedia", patients: 327, color: "#98750bff" },
    { name: "Pediatria", patients: 289, color: "#1E3A8A" },
    { name: "Oncologia", patients: 374, color: "#8B0000" },
    { name: "Neurologia", patients: 241, color: "#259725ff" },
    { name: "Pronto Soccorso", patients: 538, color: "#FF4500" },
    { name: "Chirurgia", patients: 365, color: "#6A5ACD" },
];

function PatientsReport() {
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
        <div id="patientsReportMainCont" className="resize">
            <div id="patientsReportCont" ref={chartRef} style={{ width: "100%", maxWidth: "500px", margin: "0 auto", height: 380 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart
                        layout="vertical"
                        data={patientsPerDepartment}
                        margin={{ top: 20, right: 25, bottom: -2, left: 22 }}
                    >
                        <CartesianGrid stroke="#f5f5f5" />
                        <XAxis type="number" padding={{ left: 0.5 }} className="XYAxis" />
                        <YAxis dataKey="name" type="category" scale="band" className="XYAxis" tick={{ dy: 20 }} />
                        <Tooltip
                            content={({ payload }) => {
                                if (!payload || payload.length === 0) return null;
                                const { name, patients } = payload[0].payload;
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
                                        <div style={{ color: "var(--mainRed)" }}>{`${patients} pazienti`}</div>
                                    </div>
                                );
                            }}
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
            <div className="legendCont">
                <div id="legendSymbolPatients"></div>
                <span className="legendText">Numero pazienti per reparto</span>
            </div>
        </div>
    );
}

export default PatientsReport;
