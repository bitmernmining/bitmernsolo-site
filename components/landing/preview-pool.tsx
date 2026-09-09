import React from "react";
import { COINS, COIN_DATA, type Coin } from "./preview-data";
import { MiniStatCard, StatusDot, PillBadge, SectionCard, ActivityIcon, HardDriveIcon, WalletIcon, PickaxeIcon, DollarIcon, CoinsIcon } from "./preview-nav";

export function PoolStatsView({ coin }: { coin: Coin }) {
  const d = COIN_DATA[coin];
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-sm font-semibold tracking-tight">Pool Stats</h2>
        <p className="text-[11px] text-muted-foreground">Bitmern Pool performance and statistics</p>
      </div>

      {/* 5 stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
        <MiniStatCard title="Pool Hashrate" value={d.poolHash} icon={ActivityIcon} iconBg="bg-primary/10" />
        <MiniStatCard title="Miners" value="2" icon={<svg className="h-3 w-3 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>} iconBg="bg-muted/60" />
        <MiniStatCard title="Blocks Found" value="0" icon={<svg className="h-3 w-3 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>} iconBg="bg-muted/60" />
        <div className="hidden sm:block">
          <MiniStatCard title="Pool Fee" value="1.0%" icon={<svg className="h-3 w-3 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 18L5 21m0 0L2 18m3 3V3m13 18l3-3m0 0l-3-3m3 3H9" /></svg>} iconBg="bg-muted/60" />
        </div>
        <div className="hidden lg:block">
          <MiniStatCard title="Pool Luck" value="&mdash;" />
        </div>
      </div>

      {/* Pool hashrate chart */}
      <div className="rounded-lg border border-border/40 bg-card">
        <div className="flex items-center justify-between border-b border-border/30 px-3 py-2">
          <p className="text-xs font-semibold">Pool Hashrate</p>
          <div className="inline-flex items-center rounded-md bg-muted/50 p-0.5">
            {["1H", "6H", "24H", "7D", "30D"].map((r) => (
              <span key={r} className={`rounded px-1.5 py-0.5 text-[9px] font-medium ${r === "24H" ? "bg-primary/15 text-primary" : "text-muted-foreground"}`}>{r}</span>
            ))}
          </div>
        </div>
        <div className="p-3">
          <svg viewBox="0 0 500 80" className="w-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="pChartG" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.795 0.153 78)" stopOpacity="0.2" />
                <stop offset="100%" stopColor="oklch(0.795 0.153 78)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0,40 C25,38 50,42 75,36 C100,30 125,34 150,28 C175,24 200,28 225,22 C250,18 275,22 300,18 C325,14 350,18 375,12 C400,8 425,14 450,10 C475,6 490,8 500,6 L500,80 L0,80 Z" fill="url(#pChartG)" />
            <path d="M0,40 C25,38 50,42 75,36 C100,30 125,34 150,28 C175,24 200,28 225,22 C250,18 275,22 300,18 C325,14 350,18 375,12 C400,8 425,14 450,10 C475,6 490,8 500,6" fill="none" stroke="oklch(0.795 0.153 78)" strokeWidth="1.5" />
          </svg>
        </div>
      </div>

      {/* Blocks + Network Stats */}
      <div className="grid gap-3 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h3 className="mb-2 text-xs font-semibold">Recent Blocks</h3>
          <div className="flex items-center justify-center h-16 rounded-md border border-border/40 bg-card text-[11px] text-muted-foreground">
            No blocks found yet
          </div>
        </div>
        <div className="rounded-lg border border-border/40 bg-card">
          <div className="border-b border-border/30 px-3 py-2">
            <p className="text-xs font-semibold">Network Stats</p>
          </div>
          <div className="p-3 space-y-1.5 text-[11px]">
            {[
              { label: `${coin} Price`, value: d.price },
              { label: "Block Height", value: "883,241" },
              { label: "Difficulty", value: d.difficulty },
              { label: "Network Hashrate", value: d.networkHash },
              { label: "Block Reward", value: d.blockReward },
              { label: "Block Time", value: d.blockTime },
            ].map((s) => (
              <div key={s.label} className="flex justify-between">
                <span className="text-muted-foreground">{s.label}</span>
                <span className="font-mono font-medium">{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
