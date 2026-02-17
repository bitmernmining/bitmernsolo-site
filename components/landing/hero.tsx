import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-0">
      {/* Ambient background orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="orb-1 absolute -top-32 left-1/4 h-[500px] w-[500px] rounded-full bg-primary/[0.04] blur-[120px]" />
        <div className="orb-2 absolute top-1/4 -right-20 h-[400px] w-[400px] rounded-full bg-primary/[0.06] blur-[100px]" />
        <div className="orb-1 absolute bottom-0 left-1/2 -translate-x-1/2 h-[600px] w-[800px] rounded-full bg-primary/[0.03] blur-[140px]" />
      </div>

      {/* Dot-grid background */}
      <div className="pointer-events-none absolute inset-0 dot-grid opacity-30" />

      {/* Centered text content */}
      <div className="relative mx-auto max-w-4xl px-4 pt-20 sm:px-6 sm:pt-28 lg:pt-32 text-center">
        {/* Badge */}
        <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/50 px-3 py-1 text-xs text-muted-foreground mb-8">
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
                {/* Sidebar — hidden on mobile */}
                <div className="hidden md:flex w-44 shrink-0 flex-col border-r border-border/30 bg-[oklch(0.13_0_0)] p-3">
                  <div className="flex items-center gap-2 mb-5">
                    <Image
                      src="/logo-light.svg"
                      alt="Bitmern Solo"
                      width={100}
                      height={28}
                      className="h-4 w-auto opacity-70"
                    />
                  </div>

                  {/* Coin pill */}
                  <div className="flex items-center gap-2 rounded-md border border-border/40 bg-card/50 px-2 py-1.5 mb-4">
                    <Image src="/coins/btc.svg" alt="BTC" width={14} height={14} className="h-3.5 w-3.5" />
                    <span className="text-[10px] font-medium">Bitcoin</span>
                    <span className="ml-auto text-[9px] text-muted-foreground">BTC</span>
                  </div>

                  <div className="space-y-0.5 text-[10px]">
                    <div className="rounded-md bg-primary/10 px-2 py-1.5 text-primary font-medium">Dashboard</div>
                    <div className="px-2 py-1.5 text-muted-foreground">Miners</div>
                    <div className="px-2 py-1.5 text-muted-foreground">Earnings</div>
                    <div className="px-2 py-1.5 text-muted-foreground">Payouts</div>
                    <div className="px-2 py-1.5 text-muted-foreground">Pool Stats</div>
                    <div className="px-2 py-1.5 text-muted-foreground">Alerts</div>
                  </div>
                </div>

                {/* Main area */}
                <div className="flex-1 p-3 sm:p-4 space-y-3 overflow-hidden">
                  {/* 5 stat cards */}
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    {/* Hashrate */}
                    <div className="rounded-lg border border-border/40 bg-card/50 p-2.5">
                      <p className="text-[9px] text-muted-foreground">Your Hashrate</p>
                      <div className="mt-1 flex items-center gap-1">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-500" />
                        </span>
                        <span className="font-mono text-xs font-semibold">142.8</span>
                        <span className="text-[9px] text-muted-foreground">TH/s</span>
                      </div>
                      <p className="text-[9px] text-green-500 mt-0.5">+2.1%</p>
                    </div>

                    {/* Workers */}
                    <div className="rounded-lg border border-border/40 bg-card/50 p-2.5">
                      <p className="text-[9px] text-muted-foreground">Workers</p>
                      <div className="mt-1 flex items-baseline gap-1">
                        <span className="font-mono text-xs font-semibold">3</span>
                        <span className="text-[9px] text-green-500">/ 3</span>
                      </div>
                    </div>

                    {/* Pending */}
                    <div className="rounded-lg border border-border/40 bg-card/50 p-2.5">
                      <p className="text-[9px] text-muted-foreground">Pending</p>
                      <div className="mt-1">
                        <span className="font-mono text-xs font-semibold">0.0041</span>
                        <span className="text-[9px] text-muted-foreground ml-0.5">BTC</span>
                      </div>
                      <p className="text-[9px] text-muted-foreground">$421</p>
                    </div>

                    {/* Effort — hidden on small */}
                    <div className="hidden sm:block rounded-lg border border-border/40 bg-card/50 p-2.5">
                      <p className="text-[9px] text-muted-foreground">Effort</p>
                      <div className="mt-1">
                        <span className="font-mono text-xs font-semibold">67.3%</span>
                      </div>
                      <div className="mt-1 h-1 w-full rounded-full bg-border/40">
                        <div className="h-1 rounded-full bg-primary" style={{ width: "67.3%" }} />
                      </div>
                    </div>

                    {/* Earned today — hidden on small */}
                    <div className="hidden sm:block rounded-lg border border-border/40 bg-card/50 p-2.5">
                      <p className="text-[9px] text-muted-foreground">Earned Today</p>
                      <div className="mt-1">
                        <span className="font-mono text-xs font-semibold">0.00018</span>
                      </div>
                      <p className="text-[9px] text-muted-foreground">$18.47</p>
                    </div>
                  </div>

                  {/* Chart */}
                  <div className="rounded-lg border border-border/40 bg-card/50 p-2.5">
                    <div className="flex items-center justify-between mb-1.5">
                      <p className="text-[10px] font-medium">Hashrate (24h)</p>
                      <div className="hidden sm:flex gap-3 text-[9px] text-muted-foreground">
                        <span>12:00</span>
                        <span>18:00</span>
                        <span>00:00</span>
                        <span>06:00</span>
                        <span>Now</span>
                      </div>
                    </div>
                    <svg viewBox="0 0 500 90" className="w-full" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="hcGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="oklch(0.795 0.153 78)" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="oklch(0.795 0.153 78)" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      {/* Grid lines */}
                      <line x1="0" y1="22" x2="500" y2="22" stroke="oklch(0.22 0 0)" strokeWidth="0.5" />
                      <line x1="0" y1="45" x2="500" y2="45" stroke="oklch(0.22 0 0)" strokeWidth="0.5" />
                      <line x1="0" y1="68" x2="500" y2="68" stroke="oklch(0.22 0 0)" strokeWidth="0.5" />
                      {/* Area fill */}
                      <path
                        d="M0,50 C25,48 50,52 75,46 C100,40 125,44 150,38 C175,32 200,35 225,30 C250,25 275,28 300,22 C325,18 350,20 375,16 C400,12 425,15 450,11 C470,8 490,10 500,8 L500,90 L0,90 Z"
                        fill="url(#hcGrad)"
                      />
                      {/* Line */}
                      <path
                        d="M0,50 C25,48 50,52 75,46 C100,40 125,44 150,38 C175,32 200,35 225,30 C250,25 275,28 300,22 C325,18 350,20 375,16 C400,12 425,15 450,11 C470,8 490,10 500,8"
                        fill="none"
                        stroke="oklch(0.795 0.153 78)"
                        strokeWidth="1.5"
                      />
                      {/* Y-axis labels */}
                      <text x="4" y="18" fontSize="7" fill="oklch(0.45 0 0)">160</text>
                      <text x="4" y="42" fontSize="7" fill="oklch(0.45 0 0)">140</text>
                      <text x="4" y="65" fontSize="7" fill="oklch(0.45 0 0)">120</text>
                    </svg>
                  </div>

                  {/* Workers table */}
                  <div className="rounded-lg border border-border/40 bg-card/50 p-2.5">
                    <p className="text-[10px] font-medium mb-2">Workers</p>
                    <table className="w-full text-[10px]">
                      <thead>
                        <tr className="border-b border-border/30 text-[9px] text-muted-foreground">
                          <th className="pb-1.5 text-left font-medium">Worker</th>
                          <th className="pb-1.5 text-left font-medium">Status</th>
                          <th className="pb-1.5 text-right font-medium">Hashrate</th>
                          <th className="pb-1.5 text-right font-medium hidden sm:table-cell">Shares/s</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { name: "antminer-s21-01", hr: "52.4 TH/s", shares: "1.82" },
                          { name: "antminer-s21-02", hr: "51.8 TH/s", shares: "1.79" },
                          { name: "antminer-s19-03", hr: "38.6 TH/s", shares: "1.34" },
                        ].map((w) => (
                          <tr key={w.name} className="border-b border-border/15 last:border-0">
                            <td className="py-1.5 font-mono">{w.name}</td>
                            <td className="py-1.5">
                              <span className="inline-flex items-center gap-1">
                                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                                <span className="text-green-500">Online</span>
                              </span>
                            </td>
                            <td className="py-1.5 text-right font-mono">{w.hr}</td>
                            <td className="py-1.5 text-right font-mono hidden sm:table-cell">{w.shares}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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
