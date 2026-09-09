import React from "react";
import Image from "next/image";
import { COINS, COIN_DATA, type Coin } from "./preview-data";
import { MiniStatCard, StatusDot, PillBadge, SectionCard, ActivityIcon, HardDriveIcon, WalletIcon, PickaxeIcon, DollarIcon, CoinsIcon } from "./preview-nav";

export function PayoutsView({ coin }: { coin: Coin }) {
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
