"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

type Page = "dashboard" | "miners" | "earnings" | "payouts" | "pool" | "alerts";
type Coin = "BTC" | "BCH" | "LTC" | "DOGE" | "DGB";

const COINS: { symbol: Coin; name: string; algo: string }[] = [
  { symbol: "BTC", name: "Bitcoin", algo: "SHA-256" },
  { symbol: "BCH", name: "Bitcoin Cash", algo: "SHA-256" },
  { symbol: "LTC", name: "Litecoin", algo: "Scrypt" },
  { symbol: "DOGE", name: "Dogecoin", algo: "Scrypt" },
  { symbol: "DGB", name: "DigiByte", algo: "SHA-256" },
];

const COIN_DATA: Record<Coin, {
  hashrate: string; hashUnit: string; trend: number;
  workers: { name: string; hash: string; shares: string }[];
  pending: string; pendingUsd: string;
  effort: string; earnedToday: string; earnedTodayUsd: string;
  poolHash: string; price: string; difficulty: string; networkHash: string;
  blockReward: string; blockTime: string;
}> = {
  BTC: {
    hashrate: "142.8", hashUnit: "TH/s", trend: 2.1,
    workers: [
      { name: "antminer-s21-01", hash: "52.4 TH/s", shares: "1.82" },
      { name: "antminer-s21-02", hash: "51.8 TH/s", shares: "1.79" },
      { name: "antminer-s19-03", hash: "38.6 TH/s", shares: "1.34" },
    ],
    pending: "0.0041", pendingUsd: "$421.12",
    effort: "67.3", earnedToday: "0.00018", earnedTodayUsd: "$18.47",
    poolHash: "213.9 TH/s", price: "$102,614", difficulty: "110.45 T",
    networkHash: "789.2 EH/s", blockReward: "3.125 BTC", blockTime: "10m 0s",
  },
  BCH: {
    hashrate: "48.2", hashUnit: "TH/s", trend: 1.8,
    workers: [
      { name: "antminer-s19-01", hash: "24.6 TH/s", shares: "2.14" },
      { name: "antminer-s19-02", hash: "23.6 TH/s", shares: "2.01" },
    ],
    pending: "0.0830", pendingUsd: "$38.94",
    effort: "42.1", earnedToday: "0.00410", earnedTodayUsd: "$1.92",
    poolHash: "71.4 TH/s", price: "$469", difficulty: "1.02 T",
    networkHash: "6.8 EH/s", blockReward: "6.25 BCH", blockTime: "10m 0s",
  },
  LTC: {
    hashrate: "9.8", hashUnit: "GH/s", trend: -0.4,
    workers: [
      { name: "antminer-l9-01", hash: "5.2 GH/s", shares: "3.41" },
      { name: "antminer-l9-02", hash: "4.6 GH/s", shares: "3.12" },
    ],
    pending: "0.2140", pendingUsd: "$24.61",
    effort: "83.7", earnedToday: "0.01200", earnedTodayUsd: "$1.38",
    poolHash: "14.2 GH/s", price: "$115", difficulty: "42.89 M",
    networkHash: "2.1 PH/s", blockReward: "6.25 LTC", blockTime: "2m 30s",
  },
  DOGE: {
    hashrate: "9.8", hashUnit: "GH/s", trend: 3.2,
    workers: [
      { name: "antminer-l9-01", hash: "5.2 GH/s", shares: "3.41" },
      { name: "antminer-l9-02", hash: "4.6 GH/s", shares: "3.12" },
    ],
    pending: "142.50", pendingUsd: "$35.63",
    effort: "51.2", earnedToday: "12.400", earnedTodayUsd: "$3.10",
    poolHash: "14.2 GH/s", price: "$0.25", difficulty: "24.16 M",
    networkHash: "1.8 PH/s", blockReward: "10000 DOGE", blockTime: "1m 0s",
  },
  DGB: {
    hashrate: "312.4", hashUnit: "GH/s", trend: 0.9,
    workers: [
      { name: "antminer-s19-01", hash: "162.1 GH/s", shares: "4.82" },
      { name: "antminer-s19-02", hash: "150.3 GH/s", shares: "4.51" },
    ],
    pending: "824.10", pendingUsd: "$8.24",
    effort: "29.4", earnedToday: "48.200", earnedTodayUsd: "$0.48",
    poolHash: "486.1 GH/s", price: "$0.01", difficulty: "2.41 M",
    networkHash: "182.4 TH/s", blockReward: "665 DGB", blockTime: "15s",
  },
};

const NAV_GROUPS = [
  {
    label: "Mining",
    items: [
      { id: "dashboard" as Page, label: "Dashboard", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
      { id: "miners" as Page, label: "Miners", icon: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" },
      { id: "earnings" as Page, label: "Earnings", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
      { id: "payouts" as Page, label: "Payouts", icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" },
    ],
  },
  {
    label: "Pool",
    items: [
      { id: "pool" as Page, label: "Pool Stats", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
    ],
  },
  {
    label: "Account",
    items: [
      { id: "alerts" as Page, label: "Alerts", icon: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" },
    ],
  },
];

const URL_MAP: Record<Page, string> = {
  dashboard: "app.bitmernsolo.com/dashboard",
  miners: "app.bitmernsolo.com/miners",
  earnings: "app.bitmernsolo.com/earnings",
  payouts: "app.bitmernsolo.com/payouts",
  pool: "app.bitmernsolo.com/pool",
  alerts: "app.bitmernsolo.com/alerts",
};

/* ─── Shared tiny components ─── */

function NavIcon({ d }: { d: string }) {
  return (
    <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d={d} />
    </svg>
  );
}

function MiniStatCard({
  title,
  value,
  subtitle,
  trend,
  icon,
  iconBg,
  live,
}: {
  title: string;
  value: string;
  subtitle?: string;
  trend?: number;
  icon?: React.ReactNode;
  iconBg?: string;
  live?: boolean;
}) {
  return (
    <div className="rounded-lg border border-border/40 bg-card p-3">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-1">
          <p className="text-[11px] font-medium text-muted-foreground">{title}</p>
          {live && (
            <span className="flex items-center gap-0.5">
              <span className="relative flex h-1 w-1">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-1 w-1 rounded-full bg-primary" />
              </span>
              <span className="text-[9px] font-semibold uppercase tracking-wider text-primary">live</span>
            </span>
          )}
        </div>
        {icon && (
          <div className={`rounded-md p-1 ${iconBg ?? "bg-muted/60"}`}>
            {icon}
          </div>
        )}
      </div>
      <p className="mt-1 font-mono text-lg font-bold tabular-nums tracking-tight">{value}</p>
      <div className="mt-0.5 flex items-center gap-1">
        {trend !== undefined && (
          <span className={`flex items-center gap-0.5 text-[10px] font-medium ${trend >= 0 ? "text-primary" : "text-red-500"}`}>
            <svg className="h-2 w-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d={trend >= 0 ? "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" : "M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"} />
            </svg>
            {Math.abs(trend).toFixed(1)}%
          </span>
        )}
        {subtitle && <span className="text-[10px] text-muted-foreground">{subtitle}</span>}
      </div>
    </div>
  );
}

function StatusDot({ color }: { color: string }) {
  return <span className={`inline-block h-1.5 w-1.5 rounded-full ${color}`} />;
}

function PillBadge({ children, className }: { children: React.ReactNode; className: string }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[10px] font-medium ${className}`}>
      {children}
    </span>
  );
}

function SectionCard({ title, icon, children }: { title: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-border/40 bg-card">
      <div className="flex items-center justify-between border-b border-border/30 px-3 py-2">
        <p className="text-xs font-semibold">{title}</p>
        {icon}
      </div>
      <div className="p-3">{children}</div>
    </div>
  );
}

/* Mini icons for stat cards */
const ActivityIcon = <svg className="h-3 w-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>;
const HardDriveIcon = <svg className="h-3 w-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M22 12H2M22 12a10 10 0 01-10 10M22 12a10 10 0 00-10-10M2 12a10 10 0 0010 10M2 12A10 10 0 0112 2m0 0v20" /></svg>;
const WalletIcon = <svg className="h-3 w-3 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>;
const PickaxeIcon = <svg className="h-3 w-3 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" /></svg>;
const DollarIcon = <svg className="h-3 w-3 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const CoinsIcon = <svg className="h-3.5 w-3.5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><circle cx="8" cy="8" r="6" /><path d="M18.09 10.37A6 6 0 1110.34 18" /><path d="M7 6h1v4" /><circle cx="16" cy="16" r="6" /></svg>;

/* ─── Page: Dashboard ─── */

function DashboardView({ coin, onCoinChange }: { coin: Coin; onCoinChange: (c: Coin) => void }) {
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
        <div className="inline-flex items-center gap-0.5">
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

/* ─── Page: Miners ─── */

function MinersView({ coin }: { coin: Coin }) {
  const d = COIN_DATA[coin];
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold tracking-tight">Miners</h2>
          <p className="text-[11px] text-muted-foreground">Manage your workers and mining hardware</p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-md bg-primary px-2 py-1 text-[10px] font-medium text-primary-foreground">
          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
          Add Miner
        </span>
      </div>

      {/* Workers stats bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {[
          { label: "Total Workers", value: String(d.workers.length), iconBg: "bg-muted/60", color: "" },
          { label: "Online", value: String(d.workers.length), iconBg: "bg-primary/10", color: "text-primary" },
          { label: "Offline", value: "0", iconBg: "bg-red-500/10", color: "text-red-500" },
        ].map((s) => (
          <div key={s.label} className="flex items-center gap-2 rounded-lg border border-border/40 bg-card p-2.5">
            <div className={`rounded-md p-1.5 ${s.iconBg}`}>
              <svg className={`h-3.5 w-3.5 ${s.color || "text-foreground"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            </div>
            <div>
              <p className={`font-mono text-lg font-bold ${s.color}`}>{s.value}</p>
              <p className="text-[10px] text-muted-foreground">{s.label}</p>
            </div>
          </div>
        ))}
        <div className="col-span-2 sm:col-span-1 flex items-center gap-2 rounded-lg border border-border/40 bg-card p-2.5">
          <div className="rounded-md p-1.5 bg-primary/10">
            <svg className="h-3.5 w-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <p className="font-mono text-lg font-bold">{d.hashrate} {d.hashUnit}</p>
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
              </span>
            </div>
            <p className="text-[10px] text-muted-foreground">Total Hashrate</p>
          </div>
        </div>
      </div>

      {/* Filter bar */}
      <div className="flex items-center gap-2">
        <div className="flex-1 sm:max-w-[140px] relative">
          <svg className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <div className="w-full rounded-md border border-border/40 bg-card py-1 pl-7 pr-2 text-[10px] text-muted-foreground">Search workers...</div>
        </div>
        <div className="rounded-md border border-border/40 bg-card px-2 py-1 text-[10px] text-muted-foreground flex items-center gap-1">
          All
          <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
        </div>
      </div>

      {/* Workers table */}
      <div className="rounded-md border border-border/40">
        <table className="w-full text-[11px]">
          <thead>
            <tr className="border-b border-border/30 text-[10px] text-muted-foreground bg-card">
              <th className="px-3 py-2 text-left font-medium">Worker</th>
              <th className="px-3 py-2 text-left font-medium">Status</th>
              <th className="px-3 py-2 text-right font-medium">Hashrate</th>
              <th className="px-3 py-2 text-right font-medium hidden sm:table-cell">24h Avg</th>
              <th className="px-3 py-2 text-center font-medium hidden lg:table-cell">Reject %</th>
              <th className="px-3 py-2 text-center font-medium hidden lg:table-cell">Last Share</th>
              <th className="w-6" />
            </tr>
          </thead>
          <tbody>
            {d.workers.map((w) => ({ name: w.name, hash: w.hash, avg: w.hash.replace(/[\d.]+/, (m: string) => (parseFloat(m) * 0.99).toFixed(1)), reject: "0.0%", last: `${Math.floor(Math.random() * 25 + 5)}s ago` })).map((w) => (
              <tr key={w.name} className="border-b border-border/20 last:border-0 hover:bg-muted/50 transition-colors cursor-pointer">
                <td className="px-3 py-2">
                  <span className="font-mono text-primary">{w.name}</span>
                </td>
                <td className="px-3 py-2">
                  <PillBadge className="bg-primary/10 text-primary">
                    <StatusDot color="bg-primary" />Online
                  </PillBadge>
                </td>
                <td className="px-3 py-2 text-right font-mono">{w.hash}</td>
                <td className="px-3 py-2 text-right font-mono text-muted-foreground hidden sm:table-cell">{w.avg}</td>
                <td className="px-3 py-2 text-center font-mono text-primary hidden lg:table-cell">{w.reject}</td>
                <td className="px-3 py-2 text-center text-muted-foreground hidden lg:table-cell">{w.last}</td>
                <td className="px-3 py-2"><svg className="h-3 w-3 text-muted-foreground/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ─── Page: Earnings ─── */

function EarningsView({ coin }: { coin: Coin }) {
  const d = COIN_DATA[coin];
  const barData = [
    { day: "2/11", h: 35 }, { day: "2/12", h: 55 }, { day: "2/13", h: 42 },
    { day: "2/14", h: 68 }, { day: "2/15", h: 48 }, { day: "2/16", h: 58 }, { day: "2/17", h: 42 },
  ];
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-sm font-semibold tracking-tight">Earnings</h2>
        <p className="text-[11px] text-muted-foreground">Track your mining revenue and rewards</p>
      </div>

      {/* 3 stat cards */}
      <div className="grid grid-cols-3 gap-2">
        <MiniStatCard title="Pending Balance" value={`${d.pending} ${coin}`} icon={CoinsIcon} iconBg="bg-muted/60" />
        <MiniStatCard title="Total Paid" value={`${(parseFloat(d.pending) * 7.6).toFixed(4)} ${coin}`} icon={<svg className="h-3 w-3 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>} iconBg="bg-muted/60" />
        <MiniStatCard title="Today Paid" value={`${d.earnedToday} ${coin}`} icon={WalletIcon} iconBg="bg-muted/60" />
      </div>

      {/* Revenue bar chart */}
      <div className="rounded-lg border border-border/40 bg-card">
        <div className="flex items-center justify-between border-b border-border/30 px-3 py-2">
          <p className="text-xs font-semibold">Daily Revenue</p>
          <div className="inline-flex items-center rounded-md bg-muted/50 p-0.5">
            {["1H", "6H", "24H", "7D", "30D"].map((r) => (
              <span key={r} className={`rounded px-1.5 py-0.5 text-[9px] font-medium ${r === "24H" ? "bg-primary/15 text-primary" : "text-muted-foreground"}`}>{r}</span>
            ))}
          </div>
        </div>
        <div className="p-3">
          <div className="flex items-end gap-1 h-16">
            {barData.map((d) => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-0.5">
                <div className="w-full rounded-t-sm bg-primary/80" style={{ height: `${d.h}px` }} />
                <span className="text-[8px] text-muted-foreground">{d.day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Earnings table */}
      <div className="rounded-md border border-border/40">
        <table className="w-full text-[11px]">
          <thead>
            <tr className="border-b border-border/30 text-[10px] text-muted-foreground bg-card">
              <th className="px-3 py-2 text-left font-medium">Date</th>
              <th className="px-3 py-2 text-left font-medium">Type</th>
              <th className="px-3 py-2 text-right font-medium">Amount</th>
              <th className="px-3 py-2 text-right font-medium hidden sm:table-cell">USD Value</th>
              <th className="px-3 py-2 text-left font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {[
              { date: "2 hours ago", type: "block reward", amount: "0.00018000", usd: "$18.47", status: "pending" },
              { date: "5 hours ago", type: "block reward", amount: "0.00022000", usd: "$22.58", status: "confirmed" },
              { date: "8 hours ago", type: "block reward", amount: "0.00019000", usd: "$19.50", status: "confirmed" },
              { date: "12 hours ago", type: "block reward", amount: "0.00024000", usd: "$24.64", status: "confirmed" },
            ].map((e, i) => (
              <tr key={i} className="border-b border-border/20 last:border-0">
                <td className="px-3 py-2 text-muted-foreground">{e.date}</td>
                <td className="px-3 py-2 text-muted-foreground capitalize">{e.type}</td>
                <td className="px-3 py-2 text-right font-mono text-primary">{e.amount}</td>
                <td className="px-3 py-2 text-right font-mono text-muted-foreground hidden sm:table-cell">{e.usd}</td>
                <td className="px-3 py-2">
                  <span className="inline-flex items-center gap-1 text-[10px]">
                    <StatusDot color={e.status === "confirmed" ? "bg-primary" : "bg-blue-500"} />
                    <span className="capitalize">{e.status}</span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ─── Page: Payouts ─── */

function PayoutsView({ coin }: { coin: Coin }) {
  const d = COIN_DATA[coin];
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-sm font-semibold tracking-tight">Payouts</h2>
        <p className="text-[11px] text-muted-foreground">View payout history and configure settings</p>
      </div>

      {/* Two info cards */}
      <div className="grid gap-3 md:grid-cols-2">
        <SectionCard title="Balance" icon={WalletIcon}>
          <div className="space-y-2">
            {[
              { label: "Pending Balance", value: d.pending, highlight: true },
              { label: "Total Paid", value: (parseFloat(d.pending) * 7.6).toFixed(4) },
              { label: "Today Paid", value: d.earnedToday },
            ].map((r) => (
              <div key={r.label} className="flex items-center justify-between text-[11px]">
                <span className="text-muted-foreground">{r.label}</span>
                <span className={`font-mono ${r.highlight ? "text-primary" : ""}`}>{r.value} <Image src={`/coins/${coin.toLowerCase()}.svg`} alt={coin} width={10} height={10} className="inline-block align-text-bottom mx-0.5" />{coin}</span>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Connected Wallet" icon={<svg className="h-3 w-3 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.573-1.066z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-muted-foreground">Address</span>
              <span className="font-mono">bc1q...xk9m</span>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-muted-foreground">Total Payouts</span>
              <span className="font-mono">8</span>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-muted-foreground">Pool Fee</span>
              <span className="rounded bg-secondary px-1.5 py-0.5 text-[10px] font-medium">1% SOLO</span>
            </div>
          </div>
        </SectionCard>
      </div>

      {/* Payouts table */}
      <div className="rounded-md border border-border/40">
        <table className="w-full text-[11px]">
          <thead>
            <tr className="border-b border-border/30 text-[10px] text-muted-foreground bg-card">
              <th className="px-3 py-2 text-left font-medium">Date</th>
              <th className="px-3 py-2 text-right font-medium">Amount</th>
              <th className="px-3 py-2 text-right font-medium hidden sm:table-cell">USD</th>
              <th className="px-3 py-2 text-left font-medium hidden lg:table-cell">TX ID</th>
              <th className="px-3 py-2 text-left font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {[
              { date: "3 days ago", amount: "0.00520000", usd: "$533.56", tx: "a3f8c1...2d1e", status: "completed" },
              { date: "10 days ago", amount: "0.00480000", usd: "$492.48", tx: "b7c2d4...9f3a", status: "completed" },
              { date: "17 days ago", amount: "0.00610000", usd: "$625.86", tx: "d1e5f7...4b7c", status: "completed" },
              { date: "24 days ago", amount: "0.00390000", usd: "$400.14", tx: "f9a1b3...8e2d", status: "completed" },
            ].map((p, i) => (
              <tr key={i} className="border-b border-border/20 last:border-0">
                <td className="px-3 py-2 text-muted-foreground">{p.date}</td>
                <td className="px-3 py-2 text-right font-mono text-primary">{p.amount}</td>
                <td className="px-3 py-2 text-right font-mono text-muted-foreground hidden sm:table-cell">{p.usd}</td>
                <td className="px-3 py-2 hidden lg:table-cell">
                  <span className="flex items-center gap-0.5 font-mono text-muted-foreground">
                    {p.tx}
                    <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                  </span>
                </td>
                <td className="px-3 py-2">
                  <span className="inline-flex items-center gap-1 text-[10px]">
                    <StatusDot color="bg-primary" /> Completed
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ─── Page: Pool Stats ─── */

function PoolStatsView({ coin }: { coin: Coin }) {
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

/* ─── Page: Alerts ─── */

function AlertsView() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-sm font-semibold tracking-tight">Alerts</h2>
        <p className="text-[11px] text-muted-foreground">Configure notifications and view alert history</p>
      </div>

      {/* Alert Configuration */}
      <div className="rounded-lg border border-border/40 bg-card">
        <div className="flex items-center gap-1.5 border-b border-border/30 px-3 py-2">
          <svg className="h-3 w-3 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
          <p className="text-xs font-semibold">Alert Configuration</p>
        </div>
        <div className="p-3 space-y-0">
          {[
            { icon: "text-primary", label: "Hashrate Drop", desc: "Alert when hashrate drops below threshold", input: "15", suffix: "%", enabled: true },
            { icon: "text-red-500", label: "Worker Offline", desc: "Alert when a worker goes offline", input: "15", suffix: "min", enabled: true },
            { icon: "text-primary", label: "Payout Sent", desc: "Alert when a payout is processed", enabled: true },
            { icon: "text-blue-500", label: "Block Found", desc: "Alert when the pool finds a block", enabled: false },
            { icon: "text-green-500", label: "Miner Connected", desc: "Alert when a miner comes online and starts hashing", enabled: false },
          ].map((a, i) => (
            <div key={a.label}>
              {i > 0 && <div className="h-px bg-border/30 my-2" />}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <svg className={`h-3 w-3 ${a.icon}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={
                      a.label === "Hashrate Drop" ? "M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" :
                      a.label === "Worker Offline" ? "M18.364 5.636a9 9 0 010 12.728M15.536 8.464a5 5 0 010 7.072m-7.072 0a5 5 0 010-7.072M5.636 18.364a9 9 0 010-12.728" :
                      a.label === "Payout Sent" ? "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" :
                      a.label === "Block Found" ? "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" :
                      "M13 10V3L4 14h7v7l9-11h-7z"
                    } />
                  </svg>
                  <div>
                    <p className="text-[11px] font-medium">{a.label}</p>
                    <p className="text-[9px] text-muted-foreground">{a.desc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {a.input && (
                    <div className="flex items-center gap-1">
                      <span className="text-[9px] text-muted-foreground">{a.label === "Worker Offline" ? "After" : "Threshold"}</span>
                      <span className="inline-block w-8 rounded border border-border/40 bg-card px-1 py-0.5 text-center font-mono text-[10px]">{a.input}</span>
                      <span className="text-[9px] text-muted-foreground">{a.suffix}</span>
                    </div>
                  )}
                  {/* Toggle switch */}
                  <div className={`w-6 h-3.5 rounded-full flex items-center px-0.5 transition-colors ${a.enabled ? "bg-primary justify-end" : "bg-border/60 justify-start"}`}>
                    <div className="w-2.5 h-2.5 rounded-full bg-white shadow-sm" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Alert History */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-xs font-semibold">Alert History</h3>
          <span className="flex items-center gap-0.5 text-[10px] text-muted-foreground">
            <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            Mark all read
          </span>
        </div>
        <div className="rounded-md border border-border/40">
          <table className="w-full text-[11px]">
            <thead>
              <tr className="border-b border-border/30 text-[10px] text-muted-foreground bg-card">
                <th className="w-4 px-3 py-2" />
                <th className="px-3 py-2 text-left font-medium">Alert</th>
                <th className="px-3 py-2 text-left font-medium hidden sm:table-cell">Type</th>
                <th className="px-3 py-2 text-left font-medium">Time</th>
              </tr>
            </thead>
            <tbody>
              {[
                { color: "bg-primary", title: "Hashrate Drop Detected", msg: "antminer-s19-03 hashrate dropped 24% below average", type: "hashrate drop", time: "2 hours ago", unread: true },
                { color: "bg-red-500", title: "Worker Offline", msg: "antminer-s19-03 has been offline for 15 minutes", type: "worker offline", time: "5 hours ago", unread: true },
                { color: "bg-primary", title: "Payout Sent", msg: "0.0052 BTC sent to bc1q...xk9m", type: "payout sent", time: "3 days ago", unread: false },
              ].map((a, i) => (
                <tr key={i} className="border-b border-border/20 last:border-0">
                  <td className="px-3 py-2">
                    <span className={`inline-block h-1.5 w-1.5 rounded-full ${a.color}`} />
                  </td>
                  <td className="px-3 py-2">
                    <p className={`text-[11px] font-medium ${a.unread ? "text-foreground" : "text-muted-foreground"}`}>{a.title}</p>
                    <p className="text-[10px] text-muted-foreground">{a.msg}</p>
                  </td>
                  <td className="px-3 py-2 hidden sm:table-cell">
                    <span className="rounded bg-secondary px-1.5 py-0.5 text-[10px] capitalize">{a.type}</span>
                  </td>
                  <td className="px-3 py-2 text-muted-foreground">{a.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Component ─── */

export function DashboardPreview() {
  const [activePage, setActivePage] = useState<Page>("dashboard");
  const [activeCoin, setActiveCoin] = useState<Coin>("BTC");
  const [hasClicked, setHasClicked] = useState(false);
  const [coinDropdownOpen, setCoinDropdownOpen] = useState(false);
  const coinDropdownRef = useRef<HTMLDivElement>(null);

  function handleNav(page: Page) {
    setActivePage(page);
    if (!hasClicked) setHasClicked(true);
  }

  function handleCoinChange(coin: Coin) {
    setActiveCoin(coin);
    setCoinDropdownOpen(false);
    if (!hasClicked) setHasClicked(true);
  }

  // Close coin dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (coinDropdownRef.current && !coinDropdownRef.current.contains(e.target as Node)) {
        setCoinDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const coinInfo = COINS.find((c) => c.symbol === activeCoin)!;

  function renderPage() {
    switch (activePage) {
      case "dashboard": return <DashboardView coin={activeCoin} onCoinChange={handleCoinChange} />;
      case "miners": return <MinersView coin={activeCoin} />;
      case "earnings": return <EarningsView coin={activeCoin} />;
      case "payouts": return <PayoutsView coin={activeCoin} />;
      case "pool": return <PoolStatsView coin={activeCoin} />;
      case "alerts": return <AlertsView />;
    }
  }

  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Your mining dashboard
          </h2>
          <p className="mt-2 text-muted-foreground">
            Everything you need to track performance, manage workers, and
            monitor earnings in one place.
          </p>
        </div>

        <div className="gradient-border relative">
          {/* Click to explore — top center, overlapping border */}
          {!hasClicked && (
            <div className="absolute -top-4 left-1/2 z-10 -translate-x-1/2 animate-hint-pulse">
              <div className="flex items-center gap-1.5 rounded-full border border-primary/40 bg-background px-3 py-1.5 text-xs font-medium text-primary shadow-lg">
                Click to explore
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" /><path strokeLinecap="round" strokeLinejoin="round" d="M13 13l6 6" /></svg>
              </div>
            </div>
          )}
          <div className="browser-frame">
            {/* Browser bar */}
            <div className="browser-frame-bar">
              <div className="browser-dot bg-[#ff5f57]" />
              <div className="browser-dot bg-[#febc2e]" />
              <div className="browser-dot bg-[#28c840]" />
              <div className="ml-3 flex-1 rounded-md bg-[oklch(0.18_0_0)] px-3 py-1 text-xs text-muted-foreground font-mono transition-all duration-200">
                {URL_MAP[activePage]}
              </div>
            </div>

            {/* Mobile tab bar */}
            <div className="flex md:hidden overflow-x-auto border-b border-border/30 bg-[oklch(0.13_0_0)] px-2 gap-1 no-scrollbar">
              {NAV_GROUPS.flatMap((g) => g.items).map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`shrink-0 px-3 py-2 text-xs font-medium transition-colors border-b-2 ${
                    activePage === item.id
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="flex h-[700px]">
              {/* Sidebar */}
              <div className="hidden md:flex w-52 shrink-0 flex-col border-r border-border/30 bg-[oklch(0.13_0_0)] relative">
                {/* Logo + coin selector */}
                <div className="border-b border-[oklch(0.22_0_0)] p-3">
                  <Image
                    src="/logo-light.svg"
                    alt="Bitmern Pool"
                    width={120}
                    height={32}
                    className="h-5 w-auto"
                  />
                  {/* Coin selector trigger */}
                  <div className="relative mt-2.5" ref={coinDropdownRef}>
                    <button
                      onClick={() => setCoinDropdownOpen(!coinDropdownOpen)}
                      className="w-full flex items-center justify-between rounded-md px-2 py-1.5 hover:bg-[oklch(0.2_0_0)] transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-1.5">
                        <Image src={`/coins/${activeCoin.toLowerCase()}.svg`} alt={activeCoin} width={16} height={16} className="rounded-full" />
                        <span className="text-xs font-medium">{activeCoin}</span>
                        <span className="text-[11px] text-muted-foreground">{coinInfo.name}</span>
                      </div>
                      <svg className={`h-3 w-3 text-muted-foreground transition-transform ${coinDropdownOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                    </button>
                    {coinDropdownOpen && (
                      <div className="absolute left-0 right-0 top-full z-10 mt-1 rounded-md border border-border/40 bg-[oklch(0.15_0_0)] py-1 shadow-lg">
                        {COINS.map((c) => (
                          <button
                            key={c.symbol}
                            onClick={() => handleCoinChange(c.symbol)}
                            className={`w-full flex items-center gap-2 px-2 py-1.5 text-left transition-colors hover:bg-[oklch(0.2_0_0)] ${
                              activeCoin === c.symbol ? "bg-[oklch(0.2_0_0)]" : ""
                            }`}
                          >
                            <Image src={`/coins/${c.symbol.toLowerCase()}.svg`} alt={c.symbol} width={14} height={14} className="rounded-full" />
                            <span className="text-[11px] font-medium">{c.symbol}</span>
                            <span className="text-[10px] text-muted-foreground">{c.name}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Nav groups */}
                <div className="flex-1 overflow-auto p-2 space-y-3">
                  {NAV_GROUPS.map((group) => (
                    <div key={group.label}>
                      <p className="px-2 mb-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                        {group.label}
                      </p>
                      <div className="space-y-0.5">
                        {group.items.map((item) => (
                          <button
                            key={item.id}
                            onClick={() => handleNav(item.id)}
                            className={`w-full flex items-center gap-2 rounded-md px-2 py-1.5 text-xs transition-colors cursor-pointer ${
                              activePage === item.id
                                ? "bg-[oklch(0.2_0_0)] text-foreground font-medium"
                                : "text-muted-foreground hover:text-foreground hover:bg-[oklch(0.18_0_0)]"
                            }`}
                          >
                            <NavIcon d={item.icon} />
                            <span>{item.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}

                </div>

                {/* User footer */}
                <div className="border-t border-[oklch(0.22_0_0)] p-3 flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-medium text-primary shrink-0">
                    MI
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[11px] font-medium">Miner</p>
                    <p className="truncate text-[10px] text-muted-foreground">miner@example.com</p>
                  </div>
                  <svg className="h-3.5 w-3.5 text-muted-foreground shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                </div>
              </div>

              {/* Main content */}
              <div className="flex-1 p-3 sm:p-4 overflow-auto">
                {renderPage()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
