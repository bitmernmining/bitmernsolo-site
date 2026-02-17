import Link from "next/link";
import { UserPlus, Cpu, BarChart3, ArrowRight } from "lucide-react";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative section-elevated">
      <div className="pointer-events-none absolute inset-0 dot-grid opacity-20" />

      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Get started in minutes
          </h2>
          <p className="mt-2 text-muted-foreground">
            Three steps from signup to your first submitted share.
          </p>
        </div>

        {/* Step connector line (desktop only) */}
        <div className="hidden lg:block relative mb-8">
          <div className="absolute top-1/2 left-[16.67%] right-[16.67%] h-px bg-border/40" />
          <div className="flex justify-between px-[calc(16.67%-16px)]">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary bg-background font-mono text-xs font-semibold text-primary"
              >
                {n}
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {/* Step 1 */}
          <div className="flex flex-col rounded-xl border border-border/40 bg-card p-6 transition-colors hover:border-border/60">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary font-mono text-xs font-semibold text-primary lg:hidden">
                1
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/40 bg-background/50">
                <UserPlus className="h-4 w-4 text-primary" />
              </div>
            </div>
            <h3 className="text-base font-semibold">Create your account</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Sign up with an email address and add a wallet for each coin you
              plan to mine. No KYC and no personal information required.
            </p>
            {/* Mini signup form mockup */}
            <div className="mt-auto pt-4 space-y-2">
              <div className="rounded-md border border-border/40 bg-background/30 px-3 py-2">
                <p className="text-[10px] text-muted-foreground mb-1">Email</p>
                <p className="text-[11px] text-foreground/60">miner@example.com</p>
              </div>
              <div className="rounded-md border border-border/40 bg-background/30 px-3 py-2">
                <p className="text-[10px] text-muted-foreground mb-1">BTC Wallet</p>
                <p className="text-[11px] font-mono text-foreground/60">bc1q...xk9m4f</p>
              </div>
              <div className="rounded-md bg-primary/10 border border-primary/20 px-3 py-1.5 text-center">
                <span className="text-[11px] font-medium text-primary">Create Account</span>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col rounded-xl border border-border/40 bg-card p-6 transition-colors hover:border-border/60">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary font-mono text-xs font-semibold text-primary lg:hidden">
                2
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/40 bg-background/50">
                <Cpu className="h-4 w-4 text-primary" />
              </div>
            </div>
            <h3 className="text-base font-semibold">Configure your miner</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Point your ASIC at the stratum endpoint for your coin and use your
              wallet address as the username. VarDiff takes care of the rest.
            </p>
            <div className="mt-auto pt-4 rounded-lg border border-border/40 bg-background/30 p-3 font-mono text-xs space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-muted-foreground w-4">-o</span>
                <span className="text-primary">stratum+tcp://btc.bitmernsolo.com:3102</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-muted-foreground w-4">-u</span>
                <span className="text-foreground/80">your-wallet-address.worker1</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-muted-foreground w-4">-p</span>
                <span className="text-foreground/80">x</span>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col rounded-xl border border-border/40 bg-card p-6 transition-colors hover:border-border/60">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary font-mono text-xs font-semibold text-primary lg:hidden">
                3
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/40 bg-background/50">
                <BarChart3 className="h-4 w-4 text-primary" />
              </div>
            </div>
            <h3 className="text-base font-semibold">Watch it work</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Track your hashrate, workers, and block effort in real time. When
              you find a block, 99% of the reward goes directly to your wallet.
            </p>
            {/* Mini dashboard mockup */}
            <div className="mt-auto pt-4 space-y-2">
              <div className="grid grid-cols-3 gap-2">
                <div className="rounded-md border border-border/40 bg-background/30 px-2 py-2 text-center">
                  <p className="text-[10px] text-muted-foreground">Hashrate</p>
                  <p className="font-mono text-xs font-semibold mt-0.5">142.8 TH/s</p>
                </div>
                <div className="rounded-md border border-border/40 bg-background/30 px-2 py-2 text-center">
                  <p className="text-[10px] text-muted-foreground">Workers</p>
                  <p className="font-mono text-xs font-semibold mt-0.5">3</p>
                </div>
                <div className="rounded-md border border-border/40 bg-background/30 px-2 py-2 text-center">
                  <p className="text-[10px] text-muted-foreground">Effort</p>
                  <p className="font-mono text-xs font-semibold mt-0.5">67.3%</p>
                </div>
              </div>
              {/* Mini chart */}
              <div className="rounded-md border border-border/40 bg-background/30 p-2">
                <svg viewBox="0 0 200 35" className="w-full" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="hiwGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="oklch(0.795 0.153 78)" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="oklch(0.795 0.153 78)" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,22 C15,20 30,24 50,18 C70,12 90,16 120,10 C150,6 175,8 200,5 L200,35 L0,35 Z"
                    fill="url(#hiwGrad)"
                  />
                  <path
                    d="M0,22 C15,20 30,24 50,18 C70,12 90,16 120,10 C150,6 175,8 200,5"
                    fill="none"
                    stroke="oklch(0.795 0.153 78)"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/how-it-works"
            className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
          >
            Learn more about how it works
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
