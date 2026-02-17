import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";

const included = [
  "Real-time hashrate monitoring with SSE",
  "Email alerts for offline workers & payouts",
  "Multi-coin support (5 coins)",
  "VarDiff stratum with multiple ports",
  "Mining profitability calculator",
  "Earnings history & block explorer links",
];

export function Pricing() {
  return (
    <section id="pricing">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Pricing
        </h2>
        <p className="mt-2 text-muted-foreground">
          One fee. No subscriptions, no tiers, no hidden costs.
        </p>

        <div className="mt-12 flex flex-col items-center">
          {/* Fee card — centered with gradient border */}
          <div className="gradient-border w-full max-w-lg">
            <div className="bg-[oklch(0.145_0_0)] p-8 text-center">
              <p className="text-sm text-muted-foreground">Pool fee on block rewards</p>
              <p className="mt-4 font-mono text-7xl font-bold tracking-tighter sm:text-8xl">
                <span className="text-gradient">1</span>
                <span className="text-gradient">%</span>
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                vs. 2–3% at shared pools
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground max-w-sm mx-auto">
                When your miner solves a block, 99% of the block reward goes directly
                to your wallet. No fee on transactions that don&apos;t find a block.
              </p>

              <Button className="mt-6 glow" asChild>
                <a href="https://app.bitmernsolo.com/signup">
                  Start Mining
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* Included — 2-col grid below */}
          <div className="mt-10 w-full max-w-lg">
            <h3 className="text-sm font-semibold mb-4">Included for every miner</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {included.map((item) => (
                <div key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
