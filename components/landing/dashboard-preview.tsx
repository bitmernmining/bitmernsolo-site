import Image from "next/image";

export function DashboardPreview() {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            See what you get
          </h2>
          <p className="mt-2 text-muted-foreground">
            A full dashboard purpose-built for solo miners.
          </p>
        </div>

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

            <div className="flex min-h-[420px]">
              {/* Sidebar — hidden on mobile */}
              <div className="hidden md:flex w-52 shrink-0 flex-col border-r border-border/30 bg-[oklch(0.13_0_0)] p-4">
                {/* Logo */}
                <div className="flex items-center gap-2 mb-6">
                  <Image
                    src="/logo-light.svg"
                    alt="Bitmern Solo"
                    width={120}
                    height={32}
                    className="h-5 w-auto opacity-80"
                  />
                </div>

                {/* Coin pill */}
                <div className="flex items-center gap-2 rounded-md border border-border/40 bg-card/50 px-2.5 py-1.5 mb-5">
                  <Image src="/coins/btc.svg" alt="BTC" width={16} height={16} className="h-4 w-4" />
                  <span className="text-xs font-medium">Bitcoin</span>
                  <span className="ml-auto text-[10px] text-muted-foreground">BTC</span>
                </div>

                {/* Nav groups */}
                <div className="space-y-1 text-xs">
                  <div className="rounded-md bg-primary/10 px-2.5 py-1.5 text-primary font-medium">
                    Dashboard
                  </div>
                  <div className="px-2.5 py-1.5 text-muted-foreground">Miners</div>
                  <div className="px-2.5 py-1.5 text-muted-foreground">Earnings</div>
                  <div className="px-2.5 py-1.5 text-muted-foreground">Payouts</div>
                  <div className="px-2.5 py-1.5 text-muted-foreground">Pool Stats</div>
                  <div className="px-2.5 py-1.5 text-muted-foreground">Alerts</div>
                </div>

                {/* User avatar at bottom */}
                <div className="mt-auto flex items-center gap-2 pt-4">
                  <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-semibold text-primary">
                    M
                  </div>
                  <span className="text-xs text-muted-foreground truncate">miner@example.com</span>
                </div>
              </div>

              {/* Main content area */}
              <div className="flex-1 p-4 sm:p-5 space-y-4 overflow-hidden">
                {/* Stat cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                  {/* Hashrate */}
                  <div className="rounded-lg border border-border/40 bg-card/50 p-3">
                    <p className="text-[10px] text-muted-foreground">Your Hashrate</p>
                    <div className="mt-1 flex items-center gap-1.5">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                      </span>
                      <span className="font-mono text-sm font-semibold">142.8</span>
                      <span className="text-[10px] text-muted-foreground">TH/s</span>
                    </div>
                    <p className="text-[10px] text-green-500 mt-0.5">+2.1%</p>
                  </div>

                  {/* Workers */}
                  <div className="rounded-lg border border-border/40 bg-card/50 p-3">
                    <p className="text-[10px] text-muted-foreground">Your Workers</p>
                    <div className="mt-1 flex items-baseline gap-1">
                      <span className="font-mono text-sm font-semibold">3</span>
                      <span className="text-[10px] text-green-500">/ 3 online</span>
                    </div>
                  </div>

                  {/* Pending Balance */}
                  <div className="rounded-lg border border-border/40 bg-card/50 p-3">
                    <p className="text-[10px] text-muted-foreground">Pending Balance</p>
                    <div className="mt-1">
                      <span className="font-mono text-sm font-semibold">0.0041</span>
                      <span className="text-[10px] text-muted-foreground ml-1">BTC</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground">≈ $421.12</p>
                  </div>

                  {/* Effort */}
                  <div className="hidden sm:block rounded-lg border border-border/40 bg-card/50 p-3">
                    <p className="text-[10px] text-muted-foreground">Effort</p>
                    <div className="mt-1">
                      <span className="font-mono text-sm font-semibold">67.3</span>
                      <span className="text-[10px] text-muted-foreground ml-0.5">%</span>
                    </div>
                    <div className="mt-1 h-1 w-full rounded-full bg-border/40">
                      <div className="h-1 rounded-full bg-primary" style={{ width: "67.3%" }} />
                    </div>
                  </div>

                  {/* Earned Today */}
                  <div className="hidden lg:block rounded-lg border border-border/40 bg-card/50 p-3">
                    <p className="text-[10px] text-muted-foreground">Earned Today</p>
                    <div className="mt-1">
                      <span className="font-mono text-sm font-semibold">0.00018</span>
                      <span className="text-[10px] text-muted-foreground ml-1">BTC</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground">≈ $18.47</p>
                  </div>
                </div>

                {/* Chart */}
                <div className="rounded-lg border border-border/40 bg-card/50 p-3">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-medium">Hashrate (24h)</p>
                    <div className="flex gap-3 text-[10px] text-muted-foreground">
                      <span>12:00</span>
                      <span>18:00</span>
                      <span>00:00</span>
                      <span>06:00</span>
                      <span>Now</span>
                    </div>
                  </div>
                  <svg
                    viewBox="0 0 500 100"
                    className="w-full"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient id="previewChartGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="oklch(0.795 0.153 78)" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="oklch(0.795 0.153 78)" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0,55 C15,52 30,50 50,48 C70,46 90,52 110,50 C130,48 150,42 170,38 C190,34 210,36 230,32 C250,28 270,30 290,26 C310,22 330,24 350,20 C370,16 390,18 410,14 C430,10 450,12 470,10 C485,8 495,6 500,5 L500,100 L0,100 Z"
                      fill="url(#previewChartGrad)"
                    />
                    <path
                      d="M0,55 C15,52 30,50 50,48 C70,46 90,52 110,50 C130,48 150,42 170,38 C190,34 210,36 230,32 C250,28 270,30 290,26 C310,22 330,24 350,20 C370,16 390,18 410,14 C430,10 450,12 470,10 C485,8 495,6 500,5"
                      fill="none"
                      stroke="oklch(0.795 0.153 78)"
                      strokeWidth="1.5"
                    />
                    {/* Y-axis labels */}
                    <text x="4" y="12" className="text-[8px]" fill="oklch(0.556 0 0)">160</text>
                    <text x="4" y="52" className="text-[8px]" fill="oklch(0.556 0 0)">140</text>
                    <text x="4" y="92" className="text-[8px]" fill="oklch(0.556 0 0)">120</text>
                  </svg>
                </div>

                {/* Workers table */}
                <div className="rounded-lg border border-border/40 bg-card/50 p-3">
                  <p className="text-xs font-medium mb-3">Workers</p>
                  <table className="w-full text-[11px]">
                    <thead>
                      <tr className="border-b border-border/30 text-[10px] text-muted-foreground">
                        <th className="pb-2 text-left font-medium">Worker</th>
                        <th className="pb-2 text-left font-medium">Status</th>
                        <th className="pb-2 text-right font-medium">Hashrate</th>
                        <th className="pb-2 text-right font-medium hidden sm:table-cell">Shares/s</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border/20">
                        <td className="py-2 font-mono">antminer-s21-01</td>
                        <td className="py-2">
                          <span className="inline-flex items-center gap-1">
                            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                            <span className="text-green-500">Online</span>
                          </span>
                        </td>
                        <td className="py-2 text-right font-mono">52.4 TH/s</td>
                        <td className="py-2 text-right font-mono hidden sm:table-cell">1.82</td>
                      </tr>
                      <tr className="border-b border-border/20">
                        <td className="py-2 font-mono">antminer-s21-02</td>
                        <td className="py-2">
                          <span className="inline-flex items-center gap-1">
                            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                            <span className="text-green-500">Online</span>
                          </span>
                        </td>
                        <td className="py-2 text-right font-mono">51.8 TH/s</td>
                        <td className="py-2 text-right font-mono hidden sm:table-cell">1.79</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-mono">antminer-s19-03</td>
                        <td className="py-2">
                          <span className="inline-flex items-center gap-1">
                            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                            <span className="text-green-500">Online</span>
                          </span>
                        </td>
                        <td className="py-2 text-right font-mono">38.6 TH/s</td>
                        <td className="py-2 text-right font-mono hidden sm:table-cell">1.34</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
