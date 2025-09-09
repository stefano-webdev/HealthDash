import "./MonthlyRevenue.css";
import type { hospitalShape } from "../PatientsToday.tsx";
import { useState, useEffect, useRef } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type RevenueData = {
  month: string;
  revenue: number;
};

const allMonths: { short: string; full: string }[] = [
  { short: "gen", full: "Gennaio" },
  { short: "feb", full: "Febbraio" },
  { short: "mar", full: "Marzo" },
  { short: "apr", full: "Aprile" },
  { short: "mag", full: "Maggio" },
  { short: "giu", full: "Giugno" },
  { short: "lug", full: "Luglio" },
  { short: "ago", full: "Agosto" },
  { short: "set", full: "Settembre" },
  { short: "ott", full: "Ottobre" },
  { short: "nov", full: "Novembre" },
  { short: "dic", full: "Dicembre" },
];

const fullData: Record<string, { revenue: number, expenses: number }> = {
  gen: { revenue: 5425866.58, expenses: 4137492.34 },
  feb: { revenue: 7183452.12, expenses: 7298641.77 },
  mar: { revenue: 8247389.45, expenses: 6584731.22 },
  apr: { revenue: 12637814.90, expenses: 10238472.66 },
  mag: { revenue: 6482117.33, expenses: 6073598.89 },
  giu: { revenue: 9874225.78, expenses: 9561837.41 },
  lug: { revenue: 14932487.55, expenses: 13087643.88 },
  ago: { revenue: 4283519.66, expenses: 4527184.20 },
  set: { revenue: 8046732.44, expenses: 7498211.95 },
  ott: { revenue: 11083951.27, expenses: 10574839.55 },
  nov: { revenue: 9573812.98, expenses: 9047366.11 },
  dic: { revenue: 12358491.62, expenses: 12517943.77 },
};

// Get the last 6 months dinamically
const today = new Date();
const currentMonthIndex = today.getMonth();
const last6Months: RevenueData[] = [];
for (let i = 5; i >= 0; i--) {
  const idx = (currentMonthIndex - i + 12) % 12;
  const month = allMonths[idx].short;
  last6Months.push({
    month,
    revenue: fullData[month].revenue || 0,
  });
}

function MonthlyRevenueChart() {
  const [visibleChart, setVisibleChart] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);
  const [fontSizeXYTooltip, setFontSizeXYTooltip] = useState(14);
  const [fontSizeLegend, setFontSizeLegend] = useState(17);
  const [chartHeight, setChartHeight] = useState(300);
  const [minHeight, setMinHeight] = useState(window.innerWidth <= 549 ? 300 : 350);

  function handleResize() {
    // Smartphones
    if (window.innerWidth <= 649) {
      setFontSizeXYTooltip(14);
      setFontSizeLegend(17);
      setChartHeight(300);
      setMinHeight(300);
    } else { // Tablet and desktop
      setFontSizeXYTooltip(17);
      setFontSizeLegend(20);
      setChartHeight(350);
      setMinHeight(350);
    }
  }

  useEffect(() => {
    const unknownData: string | null = localStorage.getItem("hospitalData");
    const savedData: hospitalShape = unknownData ? JSON.parse(unknownData) : {};

    localStorage.setItem("hospitalData", JSON.stringify({
      ...savedData,
      finance: {
        monthlyCashFlow: fullData
      }
    }));

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
    <div id="revenueMainCont">
      <div id="revenueCont" ref={chartRef} style={{ width: "100%", maxWidth: "500px", margin: "0 auto", height: chartHeight, minHeight: minHeight }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={last6Months}
            margin={{ top: 20, right: 25, bottom: 20, left: 12 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" tick={{ fontSize: fontSizeXYTooltip, fill: "black" }} padding={{ left: 20, right: 15 }} />
            <YAxis
              domain={[0, 20000000]}
              tick={{ fontSize: fontSizeXYTooltip, fill: "black" }}
              tickFormatter={(v) => {
                const milioni = v / 1000000;
                return `€${milioni}\u00A0Mil.`;
              }}
              padding={{ bottom: 0 }}
            />
            <Tooltip
              contentStyle={{
                border: "2px solid black",
                borderRadius: "8px",
                backgroundColor: "white",
                boxShadow: "0px 0px 10px 1px #0000009f",
                fontSize: fontSizeXYTooltip
              }}
              labelStyle={{ fontSize: fontSizeXYTooltip }}
              formatter={(value: number) => [`€${value.toLocaleString()}`]}
              labelFormatter={(label: string) => {
                const monthObj = allMonths.find((m) => m.short === label);
                return `Mese: ${monthObj?.full || label}`;
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
                        width: 14,
                        height: 14,
                        backgroundColor: "#AE3626",
                        borderRadius: "4px 4px 0 0",
                        marginRight: 6,
                      }}
                    />
                    <span style={{ fontSize: fontSizeLegend, fontWeight: 500, textAlign: "center", color: "#AE3626" }}>
                      Entrate mensili
                    </span>
                  </div>
                );
              }}
            />
            <Bar
              dataKey="revenue"
              fill={visibleChart ? "#AE3626" : "transparent"}
              radius={[8, 8, 0, 0]}
              isAnimationActive={visibleChart}
              animationDuration={2100}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <small id="lastMonths">(Ultimi 6 mesi)</small>
    </div>
  );
}

export default MonthlyRevenueChart;
