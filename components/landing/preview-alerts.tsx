import React from "react";
import { COINS, COIN_DATA, type Coin } from "./preview-data";
import { MiniStatCard, StatusDot, PillBadge, SectionCard, ActivityIcon, HardDriveIcon, WalletIcon, PickaxeIcon, DollarIcon, CoinsIcon } from "./preview-nav";

export function AlertsView() {
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
