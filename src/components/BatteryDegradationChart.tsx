import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";

const data = [
  { cycle: 800, health: 81.0 },
  { cycle: 805, health: 80.92 },
  { cycle: 810, health: 80.85 },
  { cycle: 815, health: 80.76 },
  { cycle: 820, health: 80.68 },
  { cycle: 825, health: 80.55 },
  { cycle: 830, health: 80.47 },
  { cycle: 835, health: 80.34 },
  { cycle: 840, health: 80.21 },
  { cycle: 845, health: 80.10 },
  { cycle: 850, health: 79.95 },
  { cycle: 855, health: 79.82 },
  { cycle: 860, health: 79.68 },
  { cycle: 865, health: 79.53 },
  { cycle: 870, health: 79.40 },
  { cycle: 875, health: 79.25 },
  { cycle: 880, health: 79.10 },
  { cycle: 885, health: 78.93 },
];

const accent = "#2218d6";

export default function BatteryDegradationChart() {
  return (
    <div style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: "12px" }}>
      <ResponsiveContainer width="100%" height={350}>
        <AreaChart data={data} margin={{ top: 10, right: 80, left: 20, bottom: 25 }}>
          <defs>
            <linearGradient id="healthGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={accent} stopOpacity={0.2} />
              <stop offset="95%" stopColor={accent} stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#d1cfc6" />
          <XAxis
            dataKey="cycle"
            stroke="#6b7280"
            tick={{ fontSize: 11 }}
            label={{ value: "Cycle count", position: "insideBottom", offset: -15, fontSize: 12, fill: "#6b7280" }}
          />
          <YAxis
            domain={[78.5, 81.5]}
            stroke="#6b7280"
            tick={{ fontSize: 11 }}
            tickFormatter={(v: number) => `${v}%`}
            label={{ value: "Battery health", angle: -90, position: "insideLeft", offset: -5, fontSize: 12, fill: "#6b7280" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgb(238, 230, 210)",
              border: `1px solid ${accent}`,
              borderRadius: "4px",
              fontSize: "12px",
            }}
            formatter={(value: number) => [`${value.toFixed(2)}%`, "Health"]}
            labelFormatter={(label: number) => `Cycle ${label}`}
          />
          <ReferenceLine
            y={79}
            stroke="#dc2626"
            strokeDasharray="6 3"
            label={{ value: "79% threshold", position: "right", fontSize: 11, fill: "#dc2626" }}
          />
          <Area
            type="monotone"
            dataKey="health"
            stroke={accent}
            strokeWidth={2}
            fill="url(#healthGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
