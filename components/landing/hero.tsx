import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

/* Tiny inline SVG icon helper (avoids importing lucide in a server component mockup) */
function I({ d, className = "" }: { d: string; className?: string }) {
  return (
    <svg className={`shrink-0 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d={d} />
    </svg>
  );
}

/* Icon paths */
const ICON = {
  activity: "M22 12h-4l-3 9L9 3l-3 9H2",
  hardDrive: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z",
  wallet: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z",
  coins: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  pickaxe: "M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z",
  dollar: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  dashboard: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  barChart: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
  bell: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9",
  bookOpen: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
  chevDown: "M19 9l-7 7-7-7",
  logOut: "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1",
  trendUp: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
};

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-0">
      {/* Dot-grid background */}
      <div className="pointer-events-none absolute inset-0 dot-grid opacity-30" />

      {/* Centered text content */}
      <div className="relative mx-auto max-w-4xl px-4 pt-20 sm:px-6 sm:pt-28 lg:pt-32 text-center">
        {/* Badge */}
        <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-border/60 bg-card px-3 py-1 text-xs text-muted-foreground mb-8">
          <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
          5 supported coins. 1% pool fee. That&apos;s it.
        </div>

        <h1
          className="animate-fade-up-d1 font-bold tracking-tight leading-[1.08]"
          style={{ fontSize: "clamp(2.75rem, 6.5vw, 5.5rem)" }}
        >
          The solo mining pool{" "}
          <span className="text-gradient">
            built for&nbsp;everyone
          </span>
        </h1>

        <p className="animate-fade-up-d2 mt-6 mx-auto max-w-xl text-lg leading-relaxed text-muted-foreground">
          Connect your miner to Bitmern Solo and keep the entire block reward
          to yourself. Just a flat 1% fee, no shared payouts, and no middlemen.
        </p>

        <div className="animate-fade-up-d3 mt-8 flex flex-wrap justify-center gap-3">
          <Button size="lg" className="glow" asChild>
            <a href="https://app.bitmernsolo.com/signup">
              Create Free Account
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href="#how-it-works">How It Works</a>
          </Button>
        </div>
      </div>

      {/* 3D perspective dashboard mockup */}
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 mt-16 sm:mt-20 mask-fade-bottom">
        <div className="hero-mockup">
          <div className="gradient-border">
            <div className="browser-frame">
              {/* Browser bar */}
              <div className="browser-frame-bar">
                <div className="browser-dot bg-[#ff5f57]" />
                <div className="browser-dot bg-[#febc2e]" />
                <div className="browser-dot bg-[#28c840]" />
                <div className="ml-3 flex-1 rounded-md bg-[oklch(0.18_0_0)] px-3 py-1 text-[11px] text-muted-foreground font-mono">
                  app.bitmernsolo.com/dashboard
                </div>
              </div>

              <div className="flex">
                {/* ─── Sidebar ─── */}
                <div className="hidden md:flex w-44 shrink-0 flex-col border-r border-border/30 bg-[oklch(0.13_0_0)]">
                  {/* Logo + coin selector */}
                  <div className="border-b border-[oklch(0.22_0_0)] p-3">
                    <Image
                      src="/logo-light.svg"
                      alt="Bitmern Pool"
                      width={100}
                      height={28}
                      className="h-4 w-auto"
                    />
                    <div className="mt-2 flex items-center justify-between rounded-md px-1.5 py-1 hover:bg-[oklch(0.2_0_0)]">
                      <div className="flex items-center gap-1.5">
                        <Image src="/coins/btc.svg" alt="BTC" width={14} height={14} className="rounded-full" />
                        <span className="text-[10px] font-medium">BTC</span>
                        <span className="text-[9px] text-muted-foreground">Bitcoin</span>
                      </div>
                      <I d={ICON.chevDown} className="h-2.5 w-2.5 text-muted-foreground" />
                    </div>
                  </div>

                  {/* Nav groups */}
                  <div className="flex-1 p-2 space-y-2.5">
                    <div>
                      <p className="px-1.5 mb-0.5 text-[8px] font-medium uppercase tracking-wider text-muted-foreground/60">Mining</p>
                      <div className="space-y-0.5">
                        {[
                          { label: "Dashboard", icon: ICON.dashboard, active: true },
                          { label: "Miners", icon: ICON.hardDrive },
                          { label: "Earnings", icon: ICON.coins },
                          { label: "Payouts", icon: ICON.wallet },
                        ].map((n) => (
                          <div key={n.label} className={`flex items-center gap-1.5 rounded-md px-1.5 py-1 text-[10px] ${n.active ? "bg-[oklch(0.2_0_0)] text-foreground font-medium" : "text-muted-foreground"}`}>
                            <I d={n.icon} className="h-3 w-3" />
                            {n.label}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="px-1.5 mb-0.5 text-[8px] font-medium uppercase tracking-wider text-muted-foreground/60">Pool</p>
                      <div className="flex items-center gap-1.5 rounded-md px-1.5 py-1 text-[10px] text-muted-foreground">
                        <I d={ICON.barChart} className="h-3 w-3" />
                        Pool Stats
                      </div>
                    </div>
                    <div>
                      <p className="px-1.5 mb-0.5 text-[8px] font-medium uppercase tracking-wider text-muted-foreground/60">Account</p>
                      <div className="flex items-center gap-1.5 rounded-md px-1.5 py-1 text-[10px] text-muted-foreground">
                        <I d={ICON.bell} className="h-3 w-3" />
                        Alerts
                      </div>
                    </div>
                  </div>

                  {/* User footer */}
                  <div className="border-t border-[oklch(0.22_0_0)] p-2.5 flex items-center gap-2">
                    <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center text-[8px] font-medium text-primary shrink-0">MI</div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[9px] font-medium">Miner</p>
                      <p className="truncate text-[8px] text-muted-foreground">miner@example.com</p>
                    </div>
                    <I d={ICON.logOut} className="h-3 w-3 text-muted-foreground shrink-0" />
                  </div>
                </div>

                {/* ─── Main content ─── */}
                <div className="flex-1 p-3 sm:p-4 space-y-3 overflow-hidden">
                  {/* Page header */}
                  <div>
                    <h2 className="text-[11px] font-semibold tracking-tight">Dashboard</h2>
                    <p className="text-[9px] text-muted-foreground">Overview of your mining operations</p>
                  </div>

                  {/* Filter bar */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    <div className="inline-flex items-center gap-0.5">
                      <span className="flex items-center gap-1 rounded-md bg-background px-1.5 py-0.5 text-[8px] font-medium shadow-sm border border-border/40">
                        <Image src="/coins/btc.svg" alt="BTC" width={10} height={10} className="rounded-full" />BTC
                      </span>
                      {["BCH", "LTC", "DOGE", "DGB"].map((c) => (
                        <span key={c} className="px-1 py-0.5 text-[8px] text-muted-foreground/50">{c}</span>
                      ))}
                    </div>
                    <div className="h-2.5 w-px bg-border hidden sm:block" />
                    <div className="inline-flex items-center rounded-md border border-border/40 bg-secondary/30 p-0.5">
                      {["1H", "6H", "24H", "7D"].map((r) => (
                        <span key={r} className={`rounded px-1.5 py-0.5 text-[8px] font-medium ${r === "24H" ? "bg-primary/15 text-primary shadow-sm" : "text-muted-foreground"}`}>{r}</span>
                      ))}
                    </div>
                  </div>

                  {/* 5 stat cards */}
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    {/* Hashrate */}
                    <div className="rounded-lg border border-border/40 bg-card p-2">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-0.5">
                          <p className="text-[8px] text-muted-foreground">Your Hashrate</p>
                          <span className="flex items-center gap-0.5">
                            <span className="relative flex h-1 w-1">
                              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                              <span className="relative inline-flex h-1 w-1 rounded-full bg-primary" />
                            </span>
                            <span className="text-[8px] font-semibold uppercase tracking-wider text-primary">live</span>
                          </span>
                        </div>
                        <div className="rounded-md p-1 bg-primary/10">
                          <I d={ICON.activity} className="h-2.5 w-2.5 text-primary" />
                        </div>
                      </div>
                      <p className="mt-0.5 font-mono text-xs font-bold tabular-nums tracking-tight text-primary">142.8 TH/s</p>
                      <div className="mt-0.5 flex items-center gap-0.5">
                        <span className="flex items-center gap-0.5 text-[8px] font-medium text-primary">
                          <I d={ICON.trendUp} className="h-2 w-2" />2.1%
                        </span>
                        <span className="text-[8px] text-muted-foreground">Updated 5s ago</span>
                      </div>
                    </div>

                    {/* Workers */}
                    <div className="rounded-lg border border-border/40 bg-card p-2">
                      <div className="flex items-start justify-between">
                        <p className="text-[8px] text-muted-foreground">Your Workers</p>
                        <div className="rounded-md p-1 bg-primary/10">
                          <I d={ICON.hardDrive} className="h-2.5 w-2.5 text-primary" />
                        </div>
                      </div>
                      <p className="mt-0.5 font-mono text-xs font-bold tabular-nums tracking-tight text-primary">3</p>
                    </div>

                    {/* Pending Balance */}
                    <div className="rounded-lg border border-border/40 bg-card p-2">
                      <div className="flex items-start justify-between">
                        <p className="text-[8px] text-muted-foreground">Pending Balance</p>
                        <div className="rounded-md p-1 bg-muted/60">
                          <I d={ICON.wallet} className="h-2.5 w-2.5 text-muted-foreground" />
                        </div>
                      </div>
                      <p className="mt-0.5 font-mono text-xs font-bold tabular-nums tracking-tight">0.0041 BTC</p>
                      <p className="text-[8px] text-muted-foreground">&asymp; $421.12</p>
                    </div>

                    {/* Current Effort */}
                    <div className="hidden sm:block rounded-lg border border-border/40 bg-card p-2">
                      <div className="flex items-start justify-between">
                        <p className="text-[8px] text-muted-foreground">Current Effort</p>
                        <div className="rounded-md p-1 bg-muted/60">
                          <I d={ICON.pickaxe} className="h-2.5 w-2.5 text-muted-foreground" />
                        </div>
                      </div>
                      <p className="mt-0.5 font-mono text-xs font-bold tabular-nums tracking-tight">67.3%</p>
                      <p className="text-[8px] text-muted-foreground">Mining</p>
                    </div>

                    {/* Earned Today */}
                    <div className="hidden sm:block rounded-lg border border-border/40 bg-card p-2">
                      <div className="flex items-start justify-between">
                        <p className="text-[8px] text-muted-foreground">Earned Today</p>
                        <div className="rounded-md p-1 bg-muted/60">
                          <I d={ICON.dollar} className="h-2.5 w-2.5 text-muted-foreground" />
                        </div>
                      </div>
                      <p className="mt-0.5 font-mono text-xs font-bold tabular-nums tracking-tight">0.00018 BTC</p>
                      <p className="text-[8px] text-muted-foreground">&asymp; $18.47</p>
                    </div>
                  </div>

                  {/* Hashrate chart card */}
                  <div className="rounded-lg border border-border/40 bg-card">
                    <div className="flex items-center justify-between border-b border-border/30 px-2.5 py-1.5">
                      <p className="text-[10px] font-semibold">Hashrate</p>
                      <div className="inline-flex items-center rounded-md bg-muted/50 p-0.5">
                        {["1H", "6H", "24H", "7D", "30D"].map((r) => (
                          <span key={r} className={`rounded px-1 py-0.5 text-[8px] font-medium ${r === "24H" ? "bg-primary/15 text-primary" : "text-muted-foreground"}`}>{r}</span>
                        ))}
                      </div>
                    </div>
                    <div className="p-2.5">
                      <svg viewBox="0 0 500 90" className="w-full" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="hcGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="oklch(0.795 0.153 78)" stopOpacity="0.25" />
                            <stop offset="100%" stopColor="oklch(0.795 0.153 78)" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        <line x1="0" y1="22" x2="500" y2="22" stroke="oklch(0.22 0 0)" strokeWidth="0.5" />
                        <line x1="0" y1="45" x2="500" y2="45" stroke="oklch(0.22 0 0)" strokeWidth="0.5" />
                        <line x1="0" y1="68" x2="500" y2="68" stroke="oklch(0.22 0 0)" strokeWidth="0.5" />
                        <path
                          d="M0,50 C25,48 50,52 75,46 C100,40 125,44 150,38 C175,32 200,35 225,30 C250,25 275,28 300,22 C325,18 350,20 375,16 C400,12 425,15 450,11 C470,8 490,10 500,8 L500,90 L0,90 Z"
                          fill="url(#hcGrad)"
                        />
                        <path
                          d="M0,50 C25,48 50,52 75,46 C100,40 125,44 150,38 C175,32 200,35 225,30 C250,25 275,28 300,22 C325,18 350,20 375,16 C400,12 425,15 450,11 C470,8 490,10 500,8"
                          fill="none"
                          stroke="oklch(0.795 0.153 78)"
                          strokeWidth="1.5"
                        />
                        <text x="4" y="18" className="text-[8px]" fill="oklch(0.556 0 0)">160 TH/s</text>
                        <text x="4" y="42" className="text-[8px]" fill="oklch(0.556 0 0)">140 TH/s</text>
                        <text x="4" y="65" className="text-[8px]" fill="oklch(0.556 0 0)">120 TH/s</text>
                        <text x="60" y="88" className="text-[7px]" fill="oklch(0.556 0 0)">12:00</text>
                        <text x="180" y="88" className="text-[7px]" fill="oklch(0.556 0 0)">18:00</text>
                        <text x="300" y="88" className="text-[7px]" fill="oklch(0.556 0 0)">00:00</text>
                        <text x="420" y="88" className="text-[7px]" fill="oklch(0.556 0 0)">06:00</text>
                      </svg>
                    </div>
                  </div>

                  {/* Quick actions */}
                  <div className="flex flex-wrap gap-1">
                    {[
                      { label: "View Workers", icon: ICON.hardDrive },
                      { label: "Payouts", icon: ICON.wallet },
                      { label: "Alerts", icon: ICON.bell },
                      { label: "Setup Guide", icon: ICON.bookOpen },
                    ].map((btn) => (
                      <span key={btn.label} className="inline-flex items-center gap-0.5 rounded-md border border-border/40 px-1.5 py-0.5 text-[8px] font-medium text-muted-foreground">
                        <I d={btn.icon} className="h-2.5 w-2.5" />
                        {btn.label}
                      </span>
                    ))}
                  </div>

                  {/* Workers + Recent Earnings */}
                  <div className="grid gap-2 lg:grid-cols-2">
                    {/* Workers card */}
                    <div className="rounded-lg border border-border/40 bg-card">
                      <div className="flex items-center justify-between border-b border-border/30 px-2.5 py-1.5">
                        <p className="text-[10px] font-semibold">Workers</p>
                        <I d={ICON.hardDrive} className="h-3 w-3 text-muted-foreground" />
                      </div>
                      <div className="p-2.5">
                        <table className="w-full text-[9px]">
                          <thead>
                            <tr className="border-b border-border/30 text-[8px] text-muted-foreground">
                              <th className="pb-1 text-left font-medium">Worker</th>
                              <th className="pb-1 text-right font-medium">Hashrate</th>
                              <th className="pb-1 text-right font-medium">Shares/s</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              { name: "antminer-s21-01", hash: "52.4 TH/s", shares: "1.82" },
                              { name: "antminer-s21-02", hash: "51.8 TH/s", shares: "1.79" },
                              { name: "antminer-s19-03", hash: "38.6 TH/s", shares: "1.34" },
                            ].map((w) => (
                              <tr key={w.name} className="border-b border-border/20 last:border-0">
                                <td className="py-1 font-mono">
                                  <span className="flex items-center gap-1">
                                    <span className="inline-block h-1 w-1 rounded-full bg-emerald-500" />
                                    <span className="text-primary">{w.name}</span>
                                  </span>
                                </td>
                                <td className="py-1 text-right font-mono">{w.hash}</td>
                                <td className="py-1 text-right font-mono">{w.shares}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <p className="mt-1.5 text-center text-[8px] text-muted-foreground">View all 3 workers &rsaquo;</p>
                      </div>
                    </div>

                    {/* Recent Earnings card */}
                    <div className="rounded-lg border border-border/40 bg-card">
                      <div className="flex items-center justify-between border-b border-border/30 px-2.5 py-1.5">
                        <p className="text-[10px] font-semibold">Recent Earnings</p>
                        <I d={ICON.coins} className="h-3 w-3 text-muted-foreground" />
                      </div>
                      <div className="p-2.5">
                        <table className="w-full text-[9px]">
                          <thead>
                            <tr className="border-b border-border/30 text-[8px] text-muted-foreground">
                              <th className="pb-1 text-left font-medium">Time</th>
                              <th className="pb-1 text-right font-medium">Amount</th>
                              <th className="pb-1 text-right font-medium">USD</th>
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
                                <td className="py-1 text-muted-foreground">{e.time}</td>
                                <td className="py-1 text-right font-mono text-primary">{e.amount}</td>
                                <td className="py-1 text-right font-mono text-muted-foreground">{e.usd}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <p className="mt-1.5 text-center text-[8px] text-muted-foreground">View all earnings &rsaquo;</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
