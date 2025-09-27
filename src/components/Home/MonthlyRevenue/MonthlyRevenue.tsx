import "./MonthlyRevenue.css";
import * as htmlToImage from 'html-to-image';
import { useState, useEffect, useRef } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
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
for (let i = 6; i >= 1; i--) {
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

  async function downloadChart() {
    if (chartRef.current) {
      try {
        const dataUrl: string = await htmlToImage.toPng(chartRef.current);
        const link: HTMLAnchorElement = document.createElement('a');
        link.href = dataUrl;
        link.download = 'monthly-revenue-chart.png';
        link.click();
      } catch (err: unknown) {
        if (err instanceof Error) {
          window.alert(`Errore nel download del grafico: ${err.message}`);
        } else {
          window.alert(`Errore nel download del grafico: ${String(err)}`);
        }
      }
    }
  }

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
    <div id="revenueMainCont" className="resize">
      <div id="revenueCont" ref={chartRef} style={{ width: "100%", maxWidth: "500px", margin: "0 auto", height: '380px' }} >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={last6Months}
            margin={{ top: 20, right: 25, bottom: 0, left: 15 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" className="XYAxis" padding={{ left: 20, right: 15 }} />
            <YAxis
              domain={[0, 20000000]}
              className="XYAxis"
              tickFormatter={(v) => {
                const milioni = v / 1000000;
                return `€${milioni}\u00A0Mil.`;
              }}
              padding={{ bottom: 0.5 }}
            />
            <Tooltip
              content={({ payload, label }) => {
                if (!payload || payload.length === 0) return null;

                const { revenue } = payload[0].payload;
                const monthObj = allMonths.find((m) => m.short === label);
                const formattedLabel = `Mese: ${monthObj?.full || label}`;

                return (
                  <div
                    className="tooltipChart"
                    style={{
                      border: "2px solid black",
                      borderRadius: "var(--borderRadius)",
                      backgroundColor: "white",
                      boxShadow: "0px 0px 10px 1px #0000009f",
                      padding: "6px 10px",
                    }}>
                    <div>{formattedLabel}</div>
                    <div style={{ color: "var(--secondaryRed)" }}>
                      €{revenue.toLocaleString()}
                    </div>
                  </div>
                );
              }}
            />
            <Bar
              dataKey="revenue"
              fill={visibleChart ? "var(--secondaryRed)" : "transparent"}
              radius={[8, 8, 0, 0]}
              isAnimationActive={visibleChart}
              animationDuration={2100}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="legendCont">
        <div className="legendSymbolBar"></div>
        <span className="legendText">Entrate mensili</span>
      </div>
      <small className="smallBlack" id="lastMonthsHome">(Ultimi 6 mesi)</small>
      <button className="downloadChartBtn buttonRed" onClick={downloadChart}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
          <path d="M352 96C352 78.3 337.7 64 320 64C302.3 64 288 78.3 288 
              96L288 306.7L246.6 265.3C234.1 252.8 213.8 252.8 201.3 265.3C188.8 
              277.8 188.8 298.1 201.3 310.6L297.3 406.6C309.8 419.1 330.1 419.1 342.6 
              406.6L438.6 310.6C451.1 298.1 451.1 277.8 438.6 265.3C426.1 252.8 
              405.8 252.8 393.3 265.3L352 306.7L352 96zM160 384C124.7 384 96 412.7 
              96 448L96 480C96 515.3 124.7 544 160 544L480 544C515.3 544 544 515.3 
              544 480L544 448C544 412.7 515.3 384 480 384L433.1 384L376.5 440.6C345.3 
              471.8 294.6 471.8 263.4 440.6L206.9 384L160 384zM464 440C477.3 440 488 
              450.7 488 464C488 477.3 477.3 488 464 488C450.7 488 440 477.3 440 464C440 
              450.7 450.7 440 464 440z" />
        </svg>
        Download
      </button>
    </div>
  );
}

export default MonthlyRevenueChart;
export { fullData, allMonths };
