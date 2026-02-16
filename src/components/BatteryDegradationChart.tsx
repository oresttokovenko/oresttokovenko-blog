import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

const data = [
  { cycle: 700, health: 81.8 },
  { cycle: 705, health: 81.7 },
  { cycle: 710, health: 81.6 },
  { cycle: 715, health: 81.49 },
  { cycle: 720, health: 81.38 },
  { cycle: 725, health: 81.26 },
  { cycle: 730, health: 81.14 },
  { cycle: 735, health: 81.01 },
  { cycle: 740, health: 80.88 },
  { cycle: 745, health: 80.74 },
  { cycle: 750, health: 80.59 },
  { cycle: 755, health: 80.44 },
  { cycle: 760, health: 80.28 },
  { cycle: 765, health: 80.11 },
  { cycle: 770, health: 79.93 },
  { cycle: 775, health: 79.74 },
  { cycle: 780, health: 79.54 },
  { cycle: 785, health: 79.33 },
  { cycle: 790, health: 79.11 },
  { cycle: 795, health: 78.88 },
];

const accent = "#2218d6";

export default function BatteryDegradationChart() {
  return (
    <div style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: "12px" }}>
      <ResponsiveContainer width="100%" height={350}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 80, left: 20, bottom: 25 }}
        >
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
            label={{
              value: "Cycle count",
              position: "insideBottom",
              offset: -15,
              fontSize: 12,
              fill: "#6b7280",
            }}
          />
          <YAxis
            domain={[78.5, 82.5]}
            stroke="#6b7280"
            tick={{ fontSize: 11 }}
            tickFormatter={(v: number) => `${v}%`}
            label={{
              value: "Battery health",
              angle: -90,
              position: "insideLeft",
              offset: -5,
              fontSize: 12,
              fill: "#6b7280",
            }}
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
            label={{
              value: "79% threshold",
              position: "right",
              fontSize: 11,
              fill: "#dc2626",
            }}
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
