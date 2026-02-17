"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const HASH_UNITS = ["H/s", "KH/s", "MH/s", "GH/s", "TH/s", "PH/s", "EH/s", "ZH/s"];

function autoUnit(values: number[]): { divisor: number; unit: string } {
  const max = Math.max(...values, 0);
  if (max === 0) return { divisor: 1, unit: "H/s" };
  let i = 0;
  let v = max;
  while (v >= 1000 && i < HASH_UNITS.length - 1) {
    v /= 1000;
    i++;
  }
  return { divisor: Math.pow(1000, i), unit: HASH_UNITS[i] };
}

interface DataPoint {
  created: string;
  poolHashrate: number;
  connectedMiners: number;
  networkHashrate: number;
  networkDifficulty: number;
}

interface Props {
  data: DataPoint[];
}

export function PoolStatsChartInner({ data }: Props) {
  if (data.length === 0) {
    return (
      <div className="flex h-[300px] items-center justify-center text-sm text-muted-foreground">
        No performance data available for this pool
      </div>
    );
  }

  const { divisor, unit } = autoUnit(data.map((d) => d.poolHashrate));

  const chartData = data.map((d) => ({
    time: new Date(d.created).getTime(),
    hashrate: d.poolHashrate / divisor,
    miners: d.connectedMiners,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={chartData} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
        <defs>
          <linearGradient id="poolGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.795 0.153 78)" stopOpacity={0.3} />
            <stop offset="100%" stopColor="oklch(0.795 0.153 78)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="oklch(0.3 0 0)"
          vertical={false}
        />
        <XAxis
          dataKey="time"
          type="number"
          domain={["dataMin", "dataMax"]}
          tickFormatter={(t: number) => {
            const d = new Date(t);
            return `${d.getHours().toString().padStart(2, "0")}:00`;
          }}
          tick={{ fontSize: 11, fill: "oklch(0.556 0 0)" }}
          stroke="oklch(0.3 0 0)"
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          tickFormatter={(v: number) => v.toFixed(1)}
          tick={{ fontSize: 11, fill: "oklch(0.556 0 0)" }}
          stroke="oklch(0.3 0 0)"
          tickLine={false}
          axisLine={false}
          width={50}
          label={{
            value: unit,
            position: "insideTopLeft",
            offset: -5,
            style: { fontSize: 10, fill: "oklch(0.556 0 0)" },
          }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "oklch(0.175 0 0)",
            border: "1px solid oklch(0.3 0 0)",
            borderRadius: 8,
            fontSize: 12,
          }}
          labelFormatter={(label) => {
            const d = new Date(Number(label));
            return d.toLocaleString(undefined, {
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            });
          }}
          formatter={(value) => [`${Number(value).toFixed(2)} ${unit}`, "Pool Hashrate"]}
        />
        <Area
          type="monotone"
          dataKey="hashrate"
          stroke="oklch(0.795 0.153 78)"
          strokeWidth={2}
          fill="url(#poolGrad)"
          dot={false}
          activeDot={{ r: 3, strokeWidth: 0, fill: "oklch(0.795 0.153 78)" }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
