"use client";

import dynamic from "next/dynamic";

const PoolStatsChartInner = dynamic(
  () =>
    import("./pool-stats-chart-inner").then((m) => m.PoolStatsChartInner),
  { ssr: false, loading: () => <div className="h-[300px] animate-pulse rounded-lg bg-secondary/30" /> }
);

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

export function PoolStatsChart({ data }: Props) {
  return <PoolStatsChartInner data={data} />;
}
