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
  const [fontSizeXYTooltip, setFontSizeXYTooltip] = useState(13);
  const [fontSizeLegend, setFontSizeLegend] = useState(17);
  const [chartHeight, setChartHeight] = useState(300);
  const [minHeight, setMinHeight] = useState(window.innerWidth <= 549 ? 300 : 350);

  function handleResize() {
    if (window.innerWidth <= 649) {
      setFontSizeXYTooltip(13);
      setFontSizeLegend(17);
      setChartHeight(310);
      setMinHeight(300);
    } else {
      setFontSizeXYTooltip(17);
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
    <>
      <div id="recoveryMainCont" className="resize">
        <div id="recoveryCont" ref={chartRef} style={{ width: "100%", maxWidth: "500px", margin: "0 auto", height: chartHeight, minHeight: minHeight }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 20, right: 23, bottom: 20, left: -6 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" tick={{ fontSize: fontSizeXYTooltip, fill: "black" }} padding={{ left: 15 }} />
              <YAxis
                domain={[0, 100]}
                tick={{ fontSize: fontSizeXYTooltip, fill: "black" }}
                tickFormatter={(v: number) => `${v}%`}
                padding={{ bottom: 20 }} />
              <Tooltip
                contentStyle={{
                  border: '2px solid black',
                  borderRadius: '8px',
                  backgroundColor: 'white',
                  boxShadow: "0px 0px 10px 1px #0000009f",
                  fontSize: fontSizeXYTooltip + 1
                }}
                labelStyle={{ fontSize: fontSizeXYTooltip }}
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
                  left: 5,
                  bottom: 15,
                  padding: 0,
                  margin: 0,
                  fontSize: fontSizeLegend
                }} />
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
        <InfoChartButton />
      </div>
    </>
  );
}

export default RecoveryChart;
