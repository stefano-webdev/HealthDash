import "./MonthlyRevenue.css";
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
  { short: "Gen", full: "Gennaio" },
  { short: "Feb", full: "Febbraio" },
  { short: "Mar", full: "Marzo" },
  { short: "Apr", full: "Aprile" },
  { short: "Mag", full: "Maggio" },
  { short: "Giu", full: "Giugno" },
  { short: "Lug", full: "Luglio" },
  { short: "Ago", full: "Agosto" },
  { short: "Set", full: "Settembre" },
  { short: "Ott", full: "Ottobre" },
  { short: "Nov", full: "Novembre" },
  { short: "Dic", full: "Dicembre" },
];

const fullData: Record<string, number> = {
  Gen: 5000000,
  Feb: 7000000,
  Mar: 8200000,
  Apr: 12600000,
  Mag: 6400000,
  Giu: 9800000,
  Lug: 14900000,
  Ago: 4200000,
  Set: 8000000,
  Ott: 11000000,
  Nov: 9500000,
  Dic: 12300000,
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
    revenue: fullData[month] || 0,
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
    if (window.innerWidth <= 549) {
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
