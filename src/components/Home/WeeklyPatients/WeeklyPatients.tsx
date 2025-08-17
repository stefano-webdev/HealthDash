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
  Legend,
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
      <div id="recoveryMainCont">
        <div id="recoveryCont" ref={chartRef} style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 20, right: 23, bottom: 20, left: -11 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" tick={{ fontSize: 13, fill: "black" }} padding={{ left: 20 }} />
              <YAxis
                domain={[0, 100]}
                tick={{ fontSize: 13, fill: "black" }}
                tickFormatter={(v: number) => `${v}%`}
                padding={{ bottom: 20 }} />
              <Tooltip
                contentStyle={{
                  border: '2px solid black', borderRadius: '8px',
                  backgroundColor: 'white',
                  boxShadow: "0px 0px 10px 1px #0000009f"
                }}
                formatter={(value: number) => [`Pazienti guariti: ${value}%`]}
                labelFormatter={(label: string) => {
                  const daysFull: Record<string, string> = {
                    Lun: "Lunedì",
                    Mar: "Martedì",
                    Mer: "Mercoledì",
                    Gio: "Giovedì",
                    Ven: "Venerdì",
                    Sab: "Sabato",
                    Dom: "Domenica",
                  };
                  return daysFull[label] || label;
                }} />
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
                }} />
              <Line
                type="monotone"
                dataKey="recoveryRate"
                name="Tasso di guarigione pazienti"
                stroke={visibleChart ? "#AE3626" : "transparent"}
                strokeWidth={3}
                dot={visibleChart ? { r: 5 } : false}
                activeDot={visibleChart ? { r: 8 } : false}
                isAnimationActive={visibleChart}
                animationDuration={2100}
              />

            </LineChart>
          </ResponsiveContainer>
        </div>
        <InfoChartButton />
      </div>
    </>
  );
}

export default RecoveryChart;
