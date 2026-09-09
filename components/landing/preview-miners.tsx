import React from "react";
import { COINS, COIN_DATA, type Coin } from "./preview-data";
import { MiniStatCard, StatusDot, PillBadge, SectionCard, ActivityIcon, HardDriveIcon, WalletIcon, PickaxeIcon, DollarIcon, CoinsIcon } from "./preview-nav";

export function MinersView({ coin }: { coin: Coin }) {
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
