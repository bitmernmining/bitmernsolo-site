import Link from "next/link";
import { ArrowRight, ExternalLink, Cpu, Zap, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const tiers = [
  {
    title: "Flagship ASICs",
    icon: Cpu,
    description: "Maximum hashrate, maximum block-finding probability",
    miners: [
      { name: "Antminer S21 Pro", hashrate: "234 TH/s" },
      { name: "Whatsminer M66S", hashrate: "298 TH/s" },
      { name: "Antminer L9", hashrate: "16 GH/s" },
    ],
  },
  {
    title: "Mid-Range & Hydro",
    icon: Zap,
    description: "Best value for dedicated solo miners",
    miners: [
      { name: "Antminer S19k Pro", hashrate: "120 TH/s" },
      { name: "Antminer L7", hashrate: "9.5 GH/s" },
      { name: "Antminer S21 Hydro", hashrate: "335 TH/s" },
    ],
  },
  {
    title: "Solo & Home Miners",
    icon: Home,
    description: "Affordable entry into solo mining",
    miners: [
      { name: "Bitaxe (open-source)", hashrate: "1.2 TH/s" },
      { name: "Goldshell Mini-Doge III", hashrate: "800 MH/s" },
      { name: "Bitaxe Hex", hashrate: "3.6 TH/s" },
    ],
  },
];

export function RecommendedMiners() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Recommended mining hardware
        </h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Whether you&apos;re running a datacenter or a single miner at home, there&apos;s
          hardware for every budget and ambition.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.title}
              className="flex flex-col rounded-xl border border-border/40 bg-card p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <tier.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold">{tier.title}</h3>
                  <p className="text-xs text-muted-foreground">{tier.description}</p>
                </div>
              </div>

              <div className="flex-1 space-y-2">
                {tier.miners.map((miner) => (
                  <div
                    key={miner.name}
                    className="flex items-center justify-between rounded-lg bg-secondary/50 px-3 py-2"
                  >
                    <span className="text-sm">{miner.name}</span>
                    <span className="font-mono text-xs text-muted-foreground">
                      {miner.hashrate}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex flex-col gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/miners">
                    View All Miners
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <a
                    href="https://shop.bitmernmining.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Shop Hardware
                    <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
