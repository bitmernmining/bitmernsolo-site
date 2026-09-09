import React from "react";
import Image from "next/image";
import { COINS, COIN_DATA, type Coin } from "./preview-data";
import { MiniStatCard, StatusDot, PillBadge, SectionCard, ActivityIcon, HardDriveIcon, WalletIcon, PickaxeIcon, DollarIcon, CoinsIcon } from "./preview-nav";

export function DashboardView({ coin, onCoinChange }: { coin: Coin; onCoinChange: (c: Coin) => void }) {
  const d = COIN_DATA[coin];
  return (
    <div className="space-y-4">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold tracking-tight">Dashboard</h2>
          <p className="text-[11px] text-muted-foreground">Overview of your mining operations</p>
        </div>
      </div>

      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="inline-flex items-center gap-0.5 overflow-x-auto">
          {COINS.map((c) => (
            <button
              key={c.symbol}
              onClick={() => onCoinChange(c.symbol)}
              className={`flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-medium transition-colors ${
                coin === c.symbol
                  ? "bg-background shadow-sm border border-border/40"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {coin === c.symbol && (
                <Image src={`/coins/${c.symbol.toLowerCase()}.svg`} alt={c.symbol} width={12} height={12} className="rounded-full" />
              )}
              {c.symbol}
            </button>
          ))}
        </div>
        <div className="h-3 w-px bg-border hidden sm:block" />
        <div className="inline-flex items-center rounded-md border border-border/40 bg-secondary/30 p-0.5">
          {["1H", "6H", "24H", "7D"].map((r) => (
            <span key={r} className={`rounded-md px-1.5 py-0.5 text-[10px] font-medium ${r === "24H" ? "bg-primary/15 text-primary shadow-sm" : "text-muted-foreground"}`}>{r}</span>
          ))}
        </div>
      </div>

      {/* 5 stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
        <MiniStatCard title="Your Hashrate" value={`${d.hashrate} ${d.hashUnit}`} subtitle="Updated 5s ago" trend={d.trend} icon={ActivityIcon} iconBg="bg-primary/10" live />
        <MiniStatCard title="Your Workers" value={String(d.workers.length)} icon={HardDriveIcon} iconBg="bg-primary/10" />
        <MiniStatCard title="Pending Balance" value={`${d.pending} ${coin}`} subtitle={`&asymp; ${d.pendingUsd}`} icon={WalletIcon} iconBg="bg-muted/60" />
        <div className="hidden sm:block">
          <MiniStatCard title="Current Effort" value={`${d.effort}%`} subtitle="Mining" icon={PickaxeIcon} iconBg="bg-muted/60" />
        </div>
        <div className="hidden lg:block">
          <MiniStatCard title="Earned Today" value={`${d.earnedToday} ${coin}`} subtitle={`&asymp; ${d.earnedTodayUsd}`} icon={DollarIcon} iconBg="bg-muted/60" />
        </div>
      </div>

      {/* Hashrate chart card */}
      <div className="rounded-lg border border-border/40 bg-card">
        <div className="flex items-center justify-between border-b border-border/30 px-3 py-2">
          <p className="text-xs font-semibold">Hashrate</p>
          <div className="inline-flex items-center rounded-md bg-muted/50 p-0.5">
            {["1H", "6H", "24H", "7D", "30D"].map((r) => (
              <span key={r} className={`rounded px-1.5 py-0.5 text-[9px] font-medium ${r === "24H" ? "bg-primary/15 text-primary" : "text-muted-foreground"}`}>{r}</span>
            ))}
          </div>
        </div>
        <div className="p-3">
          <svg viewBox="0 0 500 90" className="w-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="dChartG" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.795 0.153 78)" stopOpacity="0.25" />
                <stop offset="100%" stopColor="oklch(0.795 0.153 78)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0,55 C15,52 30,50 50,48 C70,46 90,52 110,50 C130,48 150,42 170,38 C190,34 210,36 230,32 C250,28 270,30 290,26 C310,22 330,24 350,20 C370,16 390,18 410,14 C430,10 450,12 470,10 C485,8 495,6 500,5 L500,90 L0,90 Z" fill="url(#dChartG)" />
            <path d="M0,55 C15,52 30,50 50,48 C70,46 90,52 110,50 C130,48 150,42 170,38 C190,34 210,36 230,32 C250,28 270,30 290,26 C310,22 330,24 350,20 C370,16 390,18 410,14 C430,10 450,12 470,10 C485,8 495,6 500,5" fill="none" stroke="oklch(0.795 0.153 78)" strokeWidth="1.5" />
            <text x="4" y="10" className="text-[8px]" fill="oklch(0.556 0 0)">160 TH/s</text>
            <text x="4" y="46" className="text-[8px]" fill="oklch(0.556 0 0)">140 TH/s</text>
            <text x="4" y="82" className="text-[8px]" fill="oklch(0.556 0 0)">120 TH/s</text>
            {/* X-axis time labels */}
            <text x="60" y="88" className="text-[7px]" fill="oklch(0.556 0 0)">12:00</text>
            <text x="180" y="88" className="text-[7px]" fill="oklch(0.556 0 0)">18:00</text>
            <text x="300" y="88" className="text-[7px]" fill="oklch(0.556 0 0)">00:00</text>
            <text x="420" y="88" className="text-[7px]" fill="oklch(0.556 0 0)">06:00</text>
          </svg>
        </div>
      </div>

      {/* Quick actions */}
      <div className="flex flex-wrap gap-1.5">
        {[
          { label: "View Workers", icon: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" },
          { label: "Payouts", icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" },
          { label: "Alerts", icon: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" },
          { label: "Setup Guide", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },
        ].map((btn) => (
          <span key={btn.label} className="inline-flex items-center gap-1 rounded-md border border-border/40 px-2 py-1 text-[10px] font-medium text-muted-foreground">
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d={btn.icon} /></svg>
            {btn.label}
          </span>
        ))}
      </div>

      {/* Workers + Recent Earnings side by side */}
      <div className="grid gap-3 lg:grid-cols-2">
        <SectionCard title="Workers" icon={<svg className="h-3 w-3 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}>
          <table className="w-full text-[11px]">
            <thead>
              <tr className="border-b border-border/30 text-[10px] text-muted-foreground">
                <th className="pb-1.5 text-left font-medium">Worker</th>
                <th className="pb-1.5 text-right font-medium">Hashrate</th>
                <th className="pb-1.5 text-right font-medium">Shares/s</th>
              </tr>
            </thead>
            <tbody>
              {d.workers.map((w) => (
                <tr key={w.name} className="border-b border-border/20 last:border-0">
                  <td className="py-1.5 font-mono">
                    <span className="flex items-center gap-1">
                      <StatusDot color="bg-emerald-500" />
                      <span className="text-primary">{w.name}</span>
                    </span>
                  </td>
                  <td className="py-1.5 text-right font-mono">{w.hash}</td>
                  <td className="py-1.5 text-right font-mono">{w.shares}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-2 text-center text-[10px] text-muted-foreground">View all {d.workers.length} workers &rsaquo;</p>
        </SectionCard>

        <SectionCard title="Recent Earnings" icon={CoinsIcon}>
          <table className="w-full text-[11px]">
            <thead>
              <tr className="border-b border-border/30 text-[10px] text-muted-foreground">
                <th className="pb-1.5 text-left font-medium">Time</th>
                <th className="pb-1.5 text-right font-medium">Amount</th>
                <th className="pb-1.5 text-right font-medium">USD</th>
              </tr>
            </thead>
            <tbody>
              {[
                { time: "2 hours ago", amount: "0.00018000", usd: "$18.47" },
                { time: "5 hours ago", amount: "0.00022000", usd: "$22.58" },
                { time: "8 hours ago", amount: "0.00019000", usd: "$19.50" },
                { time: "12 hours ago", amount: "0.00024000", usd: "$24.64" },
              ].map((e, i) => (
                <tr key={i} className="border-b border-border/20 last:border-0">
                  <td className="py-1.5 text-muted-foreground">{e.time}</td>
                  <td className="py-1.5 text-right font-mono text-primary">{e.amount}</td>
                  <td className="py-1.5 text-right font-mono text-muted-foreground">{e.usd}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-2 text-center text-[10px] text-muted-foreground">View all earnings &rsaquo;</p>
        </SectionCard>
      </div>
    </div>
  );
}
