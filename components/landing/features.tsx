import { Card, CardContent } from "@/components/ui/card";
import {
  Pickaxe,
  BarChart3,
  Bell,
  Shield,
  Gauge,
  Coins,
} from "lucide-react";

const features = [
  {
    icon: Pickaxe,
    title: "True Solo Mining",
    description:
      "No shared payouts. When you find a block, you keep 100% of the reward. Your hashrate, your luck, your reward.",
  },
  {
    icon: Coins,
    title: "Multi-Coin Support",
    description:
      "Mine BTC, LTC, DOGE, BCH, and DGB from a single dashboard. Switch coins anytime with one click.",
  },
  {
    icon: BarChart3,
    title: "Real-Time Dashboards",
    description:
      "Live hashrate charts, worker status, earnings history, and payout tracking — all updating in real time via SSE.",
  },
  {
    icon: Bell,
    title: "Smart Alerts",
    description:
      "Get notified instantly when a worker goes offline, hashrate drops, or a payout is sent. Email and in-app alerts.",
  },
  {
    icon: Gauge,
    title: "VarDiff Stratum",
    description:
      "Automatic difficulty adjustment for every miner. Multiple ports per coin for optimal share submission rates.",
  },
  {
    icon: Shield,
    title: "Enterprise Infrastructure",
    description:
      "Built on Miningcore with DDoS protection, high-availability servers, and 99.9% uptime — so you never miss a block.",
  },
];

export function Features() {
  return (
    <section id="features" className="border-t border-border/40 bg-card/30">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need to mine solo
          </h2>
          <p className="mt-4 text-muted-foreground">
            Professional-grade mining infrastructure with a dashboard built for solo miners.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="border-border/40 bg-card/60 transition-colors hover:border-primary/20">
              <CardContent className="p-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-base font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
