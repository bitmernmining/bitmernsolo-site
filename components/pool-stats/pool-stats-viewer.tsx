"use client";

import { useState } from "react";
import Image from "next/image";
import { PoolStatsChart } from "./pool-stats-chart";

const HASH_UNITS = ["H/s", "KH/s", "MH/s", "GH/s", "TH/s", "PH/s", "EH/s", "ZH/s"];

function formatHashrate(h: number): string {
  if (h === 0) return "0 H/s";
  let i = 0;
  let v = h;
  while (v >= 1000 && i < HASH_UNITS.length - 1) {
    v /= 1000;
    i++;
  }
  return `${v.toFixed(2)} ${HASH_UNITS[i]}`;
}

function formatDifficulty(d: number): string {
  if (d === 0) return "0";
  const units = ["", "K", "M", "G", "T", "P", "E", "Z"];
  let i = 0;
  let v = d;
  while (v >= 1000 && i < units.length - 1) {
    v /= 1000;
    i++;
  }
  return `${v.toFixed(2)}${units[i]}`;
}

interface PerformanceSample {
  created: string;
  poolHashrate: number;
  connectedMiners: number;
  networkHashrate: number;
  networkDifficulty: number;
}

export interface PoolInfo {
  id: string;
  symbol: string;
  name: string;
  icon: string;
  algo: string;
  poolHashrate: number;
  connectedMiners: number;
  workerCount: number;
  networkHashrate: number;
  networkDifficulty: number;
  blockHeight: number;
  performance: PerformanceSample[];
}

interface Props {
  pools: PoolInfo[];
}

export function PoolStatsViewer({ pools }: Props) {
  const [selected, setSelected] = useState(0);

  if (pools.length === 0) {
    return (
      <div className="rounded-xl border border-border/40 bg-card p-12 text-center text-muted-foreground">
        Unable to load pool data. Try again later.
      </div>
    );
  }

  const pool = pools[selected];
  const isActive = pool.poolHashrate > 0;

  return (
    <div className="space-y-6">
      {/* Coin switcher */}
      <div className="flex items-center gap-1.5 rounded-lg border border-border/40 bg-card p-1.5">
        {pools.map((p, i) => (
          <button
            key={p.id}
            onClick={() => setSelected(i)}
            className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors flex-1 justify-center ${
              i === selected
                ? "bg-primary/10 border border-primary/20 text-foreground font-medium"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
            }`}
          >
            <Image src={p.icon} alt={p.name} width={18} height={18} className="h-4.5 w-4.5" />
            <span className="hidden sm:inline">{p.name}</span>
            <span className="sm:hidden">{p.symbol}</span>
          </button>
        ))}
      </div>

      {/* Chart + stats */}
      <div className="rounded-xl border border-border/40 bg-card overflow-hidden">
        {/* Chart header */}
        <div className="flex items-center justify-between border-b border-border/40 px-5 py-4">
          <div className="flex items-center gap-3">
            <Image src={pool.icon} alt={pool.name} width={28} height={28} className="h-7 w-7" />
            <div>
              <h2 className="text-sm font-semibold">{pool.name} Pool Hashrate</h2>
              <p className="text-xs text-muted-foreground font-mono">{pool.algo}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`h-2 w-2 rounded-full ${isActive ? "bg-green-500" : "bg-muted-foreground/30"}`} />
            <span className="text-xs text-muted-foreground">{isActive ? "Active" : "Idle"}</span>
          </div>
        </div>

        {/* Chart */}
        <div className="px-4 py-4">
          <PoolStatsChart data={pool.performance} />
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-5 border-t border-border/40">
          <div className="px-5 py-4 border-b sm:border-b-0 sm:border-r border-border/40">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Pool Hashrate</p>
            <p className="font-mono text-sm font-semibold">
              {isActive ? formatHashrate(pool.poolHashrate) : "—"}
            </p>
          </div>
          <div className="px-5 py-4 border-b sm:border-b-0 sm:border-r border-border/40">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Workers</p>
            <p className="font-mono text-sm font-semibold">{pool.workerCount}</p>
          </div>
          <div className="px-5 py-4 border-b sm:border-b-0 sm:border-r border-border/40">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Network Hashrate</p>
            <p className="font-mono text-sm text-muted-foreground">{formatHashrate(pool.networkHashrate)}</p>
          </div>
          <div className="px-5 py-4 sm:border-r border-border/40">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Difficulty</p>
            <p className="font-mono text-sm text-muted-foreground">{formatDifficulty(pool.networkDifficulty)}</p>
          </div>
          <div className="px-5 py-4">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Block Height</p>
            <p className="font-mono text-sm text-muted-foreground">#{pool.blockHeight.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
