import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, ArrowRight } from "lucide-react";

const included = [
  "0% pool fee — you keep the full block reward",
  "Real-time hashrate & worker monitoring",
  "Email & in-app alerts (offline, hashrate drop, payouts)",
  "Multi-coin support (BTC, LTC, DOGE, BCH, DGB)",
  "VarDiff stratum with multiple ports per coin",
  "Mining profitability calculator",
  "24/7 uptime with enterprise infrastructure",
];

export function Pricing() {
  return (
    <section id="pricing">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Simple pricing: <span className="text-primary">free</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            No pool fees. No subscriptions. No hidden costs. Solo mining means you keep everything.
          </p>
        </div>

        <Card className="mx-auto mt-14 max-w-lg border-primary/20 bg-card/60">
          <CardContent className="p-8">
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground">Pool Fee</p>
              <p className="mt-2 font-mono text-5xl font-bold tracking-tight text-primary">0%</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Forever. The block reward is 100% yours.
              </p>
            </div>

            <ul className="mt-8 space-y-3">
              {included.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span className="text-sm text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>

            <Button size="lg" className="mt-8 w-full glow text-base" asChild>
              <a href="https://app.bitmernsolo.com/signup">
                Start Mining Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
