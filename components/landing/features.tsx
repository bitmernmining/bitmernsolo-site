import {
  BarChart3,
  Bell,
  Gauge,
  Lock,
  Cpu,
} from "lucide-react";
import Image from "next/image";

const coins = [
  { id: "btc", label: "Bitcoin", symbol: "BTC" },
  { id: "ltc", label: "Litecoin", symbol: "LTC" },
  { id: "doge", label: "Dogecoin", symbol: "DOGE" },
  { id: "bch", label: "Bitcoin Cash", symbol: "BCH" },
  { id: "dgb", label: "DigiByte", symbol: "DGB" },
];

const wallets = [
  { coin: "btc", label: "BTC", addr: "bc1q...xk9m4f", color: "text-orange-400" },
  { coin: "ltc", label: "LTC", addr: "ltc1q...p72kd", color: "text-blue-400" },
  { coin: "doge", label: "DOGE", addr: "D8vKn...j3nR", color: "text-yellow-400" },
];

export function Features() {
  return (
    <section id="features" className="relative section-elevated">
      <div className="pointer-events-none absolute inset-0 dot-grid opacity-30" />

      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Built for serious miners
          </h2>
          <p className="mt-2 text-muted-foreground">
            Whether you run one machine or a full farm, these tools keep you in control.
          </p>
        </div>

        {/* Row 1 — Two hero feature cards */}
        <div className="grid gap-4 lg:grid-cols-2">
          {/* 5 coins */}
          <div className="flex flex-col rounded-xl border border-border/40 bg-card p-6 transition-colors hover:border-border/60">
            <h3 className="text-base font-semibold">Five coins, one account</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Mine Bitcoin, Litecoin, Dogecoin, Bitcoin Cash, or DigiByte. Switch
              coins anytime from a single dashboard with dedicated stratum endpoints.
            </p>
            <div className="mt-auto pt-4 flex items-center gap-3">
              {coins.map((coin) => (
                <div
                  key={coin.id}
                  className="flex flex-1 flex-col items-center gap-1.5 rounded-lg border border-border/40 bg-background/30 py-2.5"
                >
                  <Image
                    src={`/coins/${coin.id}.svg`}
                    alt={coin.label}
                    width={24}
                    height={24}
                    className="h-6 w-6"
                  />
                  <span className="text-[11px] font-medium text-muted-foreground">{coin.symbol}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Live hashrate — animated morphing chart */}
          <div className="rounded-xl border border-border/40 bg-card p-6 transition-colors hover:border-border/60">
            <div className="flex items-start gap-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border/40 bg-background/50">
                <BarChart3 className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-semibold">Real-time monitoring</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  See your hashrate, workers, shares, and effort update live. No refreshing needed.
                </p>
              </div>
            </div>
            <div className="mt-4 rounded-lg border border-border/40 bg-background/30 p-3">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] text-muted-foreground">24h Hashrate</span>
                <span className="text-[11px] font-mono text-primary">142.8 TH/s</span>
              </div>
              <svg viewBox="0 0 300 55" className="w-full" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="fSparkGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.795 0.153 78)" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="oklch(0.795 0.153 78)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <line x1="0" y1="14" x2="300" y2="14" stroke="oklch(0.22 0 0)" strokeWidth="0.5" />
                <line x1="0" y1="28" x2="300" y2="28" stroke="oklch(0.22 0 0)" strokeWidth="0.5" />
                <line x1="0" y1="42" x2="300" y2="42" stroke="oklch(0.22 0 0)" strokeWidth="0.5" />
                {/* Animated area fill */}
                <path fill="url(#fSparkGrad)">
                  <animate
                    attributeName="d"
                    dur="8s"
                    repeatCount="indefinite"
                    values="
                      M0,35 C20,33 40,36 65,30 C90,24 115,28 145,22 C175,16 205,20 235,15 C260,11 285,13 300,10 L300,55 L0,55 Z;
                      M0,30 C20,28 40,32 65,26 C90,30 115,22 145,28 C175,20 205,15 235,18 C260,14 285,10 300,8 L300,55 L0,55 Z;
                      M0,28 C20,32 40,26 65,34 C90,28 115,32 145,24 C175,18 205,22 235,12 C260,16 285,11 300,14 L300,55 L0,55 Z;
                      M0,35 C20,33 40,36 65,30 C90,24 115,28 145,22 C175,16 205,20 235,15 C260,11 285,13 300,10 L300,55 L0,55 Z
                    "
                  />
                </path>
                {/* Animated line */}
                <path fill="none" stroke="oklch(0.795 0.153 78)" strokeWidth="1.5">
                  <animate
                    attributeName="d"
                    dur="8s"
                    repeatCount="indefinite"
                    values="
                      M0,35 C20,33 40,36 65,30 C90,24 115,28 145,22 C175,16 205,20 235,15 C260,11 285,13 300,10;
                      M0,30 C20,28 40,32 65,26 C90,30 115,22 145,28 C175,20 205,15 235,18 C260,14 285,10 300,8;
                      M0,28 C20,32 40,26 65,34 C90,28 115,32 145,24 C175,18 205,22 235,12 C260,16 285,11 300,14;
                      M0,35 C20,33 40,36 65,30 C90,24 115,28 145,22 C175,16 205,20 235,15 C260,11 285,13 300,10
                    "
                  />
                </path>
              </svg>
            </div>
          </div>
        </div>

        {/* Row 2 — Four uniform feature cards */}
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Alerts — animated popping notifications */}
          <div className="flex flex-col rounded-xl border border-border/40 bg-card p-5 transition-colors hover:border-border/60">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/40 bg-background/50 mb-3">
              <Bell className="h-4 w-4 text-primary" />
            </div>
            <h3 className="text-sm font-semibold">Instant alerts</h3>
            <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
              Get notified by email when a worker goes offline, your hashrate drops, or a payout is sent.
            </p>
            <div className="mt-auto pt-3 relative h-[40px]">
              <div className="animate-notify-1 absolute inset-x-0 top-0 z-[3] rounded-md border border-red-500/30 bg-[oklch(0.16_0.01_20)] px-2.5 py-2 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-red-500 shrink-0" />
                <div>
                  <p className="text-[11px] font-medium">Worker Offline</p>
                  <p className="text-[10px] text-muted-foreground">antminer-s19-03 &middot; just now</p>
                </div>
              </div>
              <div className="animate-notify-2 absolute inset-x-0 top-0 z-[2] rounded-md border border-yellow-500/30 bg-[oklch(0.16_0.01_85)] px-2.5 py-2 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-yellow-500 shrink-0" />
                <div>
                  <p className="text-[11px] font-medium">Hashrate Drop</p>
                  <p className="text-[10px] text-muted-foreground">-15% in the last hour</p>
                </div>
              </div>
              <div className="animate-notify-3 absolute inset-x-0 top-0 z-[1] rounded-md border border-green-500/30 bg-[oklch(0.16_0.01_150)] px-2.5 py-2 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-500 shrink-0" />
                <div>
                  <p className="text-[11px] font-medium">Payout Sent</p>
                  <p className="text-[10px] text-muted-foreground">3.09 BTC → bc1q...m9f4</p>
                </div>
              </div>
            </div>
          </div>

          {/* VarDiff */}
          <div className="flex flex-col rounded-xl border border-border/40 bg-card p-5 transition-colors hover:border-border/60">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/40 bg-background/50 mb-3">
              <Gauge className="h-4 w-4 text-primary" />
            </div>
            <h3 className="text-sm font-semibold">Smart difficulty</h3>
            <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
              VarDiff automatically matches the difficulty to your hashrate. Pick the port that fits your setup.
            </p>
            <div className="mt-auto pt-3 grid grid-cols-2 gap-1.5">
              {[
                { port: "3102", diff: "25k" },
                { port: "3112", diff: "20k" },
                { port: "3122", diff: "15k" },
                { port: "3132", diff: "10k" },
              ].map((p) => (
                <div key={p.port} className="rounded-md border border-border/40 bg-background/30 px-2 py-1.5 text-center">
                  <span className="text-[11px] font-mono text-muted-foreground">:{p.port}</span>
                  <span className="ml-1 text-[10px] text-primary">{p.diff}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Your keys — multiple wallets with coin indicators */}
          <div className="flex flex-col rounded-xl border border-border/40 bg-card p-5 transition-colors hover:border-border/60">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/40 bg-background/50 mb-3">
              <Lock className="h-4 w-4 text-primary" />
            </div>
            <h3 className="text-sm font-semibold">Direct to your wallet</h3>
            <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
              Block rewards are sent straight to your wallet address. Nothing is held on our side.
            </p>
            <div className="mt-auto pt-3 space-y-1.5">
              {wallets.map((w) => (
                <div key={w.coin} className="rounded-md border border-border/40 bg-background/30 px-2.5 py-1.5 flex items-center gap-2">
                  <Image
                    src={`/coins/${w.coin}.svg`}
                    alt={w.label}
                    width={14}
                    height={14}
                    className="h-3.5 w-3.5 shrink-0"
                  />
                  <span className="font-mono text-[11px] text-muted-foreground flex-1 truncate">{w.addr}</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500 shrink-0" />
                </div>
              ))}
            </div>
          </div>

          {/* Miningcore */}
          <div className="flex flex-col rounded-xl border border-border/40 bg-card p-5 transition-colors hover:border-border/60">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/40 bg-background/50 mb-3">
              <Cpu className="h-4 w-4 text-primary" />
            </div>
            <h3 className="text-sm font-semibold">Reliable infrastructure</h3>
            <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
              Powered by Miningcore with DDoS protection and redundant systems designed for continuous uptime.
            </p>
            <div className="mt-auto pt-3 grid grid-cols-2 gap-1.5 text-[11px]">
              {["99.9% uptime", "DDoS protected", "Live pool stats", "Open API"].map((item) => (
                <div key={item} className="rounded-md border border-border/40 bg-background/30 px-2 py-1.5 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500 shrink-0" />
                  <span className="text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
