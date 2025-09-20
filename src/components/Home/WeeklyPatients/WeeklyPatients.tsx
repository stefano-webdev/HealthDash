import "./WeeklyPatients.css";
import InfoChartButton from "./InfoChartButton.tsx";
import { useState, useEffect, useRef } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type DataPoint = {
  day: string;
  recoveryRate: number;
};

const data: DataPoint[] = [
  { day: "Lun", recoveryRate: 40 },
  { day: "Mar", recoveryRate: 78 },
  { day: "Mer", recoveryRate: 55 },
  { day: "Gio", recoveryRate: 70 },
  { day: "Ven", recoveryRate: 50 },
  { day: "Sab", recoveryRate: 90 },
  { day: "Dom", recoveryRate: 75 },
];

function RecoveryChart() {
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
    <>
      <div id="recoveryMainCont" className="resize">
        <div id="recoveryCont" ref={chartRef} style={{ width: "100%", maxWidth: "500px", margin: "0 auto", height: '380px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 20, right: 23, bottom: 0, left: -13 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" className="XYAxis" padding={{ left: 15 }} />
              <YAxis
                domain={[0, 100]}
                className="XYAxis"
                tickFormatter={(v: number) => `${v}%`}
                padding={{ bottom: 20 }} />
              <Tooltip
                content={({ payload, label }) => {
                  if (!payload || payload.length === 0) return null;
                  const value = payload[0].value;
                  const daysFull: Record<string, string> = {
                    Lun: "Lunedì",
                    Mar: "Martedì",
                    Mer: "Mercoledì",
                    Gio: "Giovedì",
                    Ven: "Venerdì",
                    Sab: "Sabato",
                    Dom: "Domenica",
                  };
                  const dayLabel = daysFull[String(label)] || label;
                  return (
                    <div
                      className="tooltipChart"
                      style={{
                        border: "2px solid black",
                        borderRadius: "8px",
                        backgroundColor: "white",
                        boxShadow: "0px 0px 10px 1px #0000009f",
                        padding: "6px 10px"
                      }}
                    >
                      <div>{dayLabel}</div>
                      <div style={{ color: "var(--mainRed)" }}>
                        {`Pazienti guariti: ${value}%`}
                      </div>
                    </div>
                  );
                }}
              />
              <Line
                type="monotone"
                dataKey="recoveryRate"
                name="Tasso di guarigione pazienti"
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
          <span className="legendText">Tasso di guarigione pazienti</span>
        </div>
        <InfoChartButton />
      </div>
    </>
  );
}

export default RecoveryChart;
