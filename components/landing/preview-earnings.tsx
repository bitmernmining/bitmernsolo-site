import React from "react";
import { COINS, COIN_DATA, type Coin } from "./preview-data";
import { MiniStatCard, StatusDot, PillBadge, SectionCard, ActivityIcon, HardDriveIcon, WalletIcon, PickaxeIcon, DollarIcon, CoinsIcon } from "./preview-nav";

export function EarningsView({ coin }: { coin: Coin }) {
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
