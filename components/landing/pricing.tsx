import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BarChart3,
  Bell,
  Calculator,
  Coins,
  Gauge,
  History,
} from "lucide-react";

const included = [
  { icon: BarChart3, label: "Real-time hashrate and worker monitoring" },
  { icon: Bell, label: "Email alerts for downtime and payouts" },
  { icon: Coins, label: "Five coins from a single account" },
  { icon: Gauge, label: "VarDiff stratum with multiple ports" },
  { icon: Calculator, label: "Mining profitability calculator" },
  { icon: History, label: "Full earnings history with explorer links" },
];

export function Pricing() {
  return (
    <section id="pricing" className="relative section-elevated">
      <div className="pointer-events-none absolute inset-0 dot-grid opacity-20" />

      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-2 text-muted-foreground">
            One flat fee on block rewards. No subscriptions, no tiers, no
            surprises.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr] items-start">
          {/* Fee card */}
          <div className="gradient-border">
            <div className="bg-[oklch(0.145_0_0)] p-8 sm:p-10 flex flex-col items-center text-center">
              <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Pool fee on block rewards
              </p>

              <p className="mt-6 font-mono text-8xl font-bold tracking-tighter sm:text-9xl">
                <span className="text-gradient pr-1">1%</span>
              </p>

              <p className="mt-4 text-sm text-muted-foreground">
                You keep 99% of every block you find
              </p>

              {/* Visual fee comparison */}
              <div className="mt-8 w-full max-w-xs space-y-3">
                <div>
                  <div className="flex items-center justify-between text-[11px] mb-1.5">
                    <span className="font-medium text-primary">Bitmern Solo</span>
                    <span className="font-mono text-primary">1%</span>
                  </div>
                  <div className="h-2.5 w-full rounded-full bg-border/40 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: "33%" }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between text-[11px] mb-1.5">
                    <span className="text-muted-foreground">Typical shared pool</span>
                    <span className="font-mono text-muted-foreground">2-3%</span>
                  </div>
                  <div className="h-2.5 w-full rounded-full bg-border/40 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-muted-foreground/40"
                      style={{ width: "100%" }}
                    />
                  </div>
                </div>
              </div>

              {/* Payout example */}
              <div className="mt-8 w-full rounded-lg border border-border/40 bg-background/30 p-4">
                <p className="text-[11px] text-muted-foreground mb-2">
                  Example: BTC block found
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <p className="text-[11px] text-muted-foreground">
                      Block reward
                    </p>
                    <p className="font-mono text-sm font-semibold">3.125 BTC</p>
                  </div>
                  <div className="text-[11px] text-muted-foreground px-2">
                    →
                  </div>
                  <div className="text-left">
                    <p className="text-[11px] text-muted-foreground">Fee</p>
                    <p className="font-mono text-sm text-muted-foreground">
                      0.031 BTC
                    </p>
                  </div>
                  <div className="text-[11px] text-muted-foreground px-2">
                    →
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] text-muted-foreground">
                      You receive
                    </p>
                    <p className="font-mono text-sm font-semibold text-primary">
                      3.094 BTC
                    </p>
                  </div>
                </div>
              </div>

              <Button className="mt-8 glow w-full sm:w-auto" asChild>
                <a href="https://app.bitmernsolo.com/signup">
                  Start Mining Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* Included features */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-1">
              Included with every account
            </h3>

            {included.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-4 rounded-xl border border-border/40 bg-card px-5 py-4 transition-colors hover:border-border/60"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border/40 bg-background/50">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm">{label}</span>
              </div>
            ))}

            <p className="mt-2 text-[11px] text-muted-foreground text-center lg:text-left">
              No credit card needed. Create an account and start mining in
              minutes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
