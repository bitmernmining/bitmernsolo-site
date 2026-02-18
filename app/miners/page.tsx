import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MINERS_SHA256,
  MINERS_SCRYPT,
  TIER_LABELS,
  type Miner,
  type MinerTier,
} from "@/lib/data";

export const metadata: Metadata = {
  title: "Recommended Mining Hardware — Bitmern Solo",
  description:
    "Find the best ASIC miners for solo mining BTC, LTC, DOGE, BCH, and DGB. From flagship to budget hardware, we cover every tier.",
};

const tierOrder: MinerTier[] = ["flagship", "hydro", "midrange", "budget", "solo"];

function groupByTier(miners: Miner[]) {
  const groups: Partial<Record<MinerTier, Miner[]>> = {};
  for (const miner of miners) {
    if (!groups[miner.tier]) groups[miner.tier] = [];
    groups[miner.tier]!.push(miner);
  }
  return tierOrder
    .filter((t) => groups[t])
    .map((t) => ({ tier: t, label: TIER_LABELS[t], miners: groups[t]! }));
}

function MinerCard({ miner }: { miner: Miner }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-border/40 bg-secondary/30 px-4 py-3">
      <div className="min-w-0">
        <p className="text-sm font-medium">{miner.name}</p>
        {miner.note && (
          <p className="text-xs text-muted-foreground">{miner.note}</p>
        )}
      </div>
      <div className="ml-4 flex shrink-0 items-center gap-4 text-right">
        <div>
          <p className="font-mono text-sm font-medium">{miner.hashrate}</p>
          <p className="font-mono text-xs text-muted-foreground">{miner.power}</p>
        </div>
      </div>
    </div>
  );
}

export default function MinersPage() {
  const sha256Groups = groupByTier(MINERS_SHA256);
  const scryptGroups = groupByTier(MINERS_SCRYPT);

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
      {/* Hero header */}
      <div className="text-center mb-16">
        <h1
          className="font-bold tracking-tight"
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
        >
          Recommended mining hardware
        </h1>
        <p className="mt-3 mx-auto max-w-xl text-muted-foreground leading-relaxed">
          The right ASIC miner depends on your budget, electricity cost, and which
          coins you want to mine. Here&apos;s what we recommend for each algorithm.
        </p>
      </div>

      {/* SHA-256 Miners */}
      <div className="space-y-6 mb-16">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">SHA-256 Miners</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            For mining <span className="text-foreground font-medium">BTC</span>,{" "}
            <span className="text-foreground font-medium">BCH</span>, and{" "}
            <span className="text-foreground font-medium">DGB</span>
          </p>
        </div>

        {sha256Groups.map((group) => (
          <div key={group.tier}>
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="secondary">{group.label}</Badge>
            </div>
            <div className="space-y-2">
              {group.miners.map((miner) => (
                <MinerCard key={miner.name} miner={miner} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Scrypt Miners */}
      <div className="space-y-6 mb-16">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Scrypt Miners</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            For mining <span className="text-foreground font-medium">LTC</span> and{" "}
            <span className="text-foreground font-medium">DOGE</span>
          </p>
        </div>

        {scryptGroups.map((group) => (
          <div key={group.tier}>
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="secondary">{group.label}</Badge>
            </div>
            <div className="space-y-2">
              {group.miners.map((miner) => (
                <MinerCard key={miner.name} miner={miner} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* How to choose */}
      <div className="space-y-4 mb-16">
        <h2 className="text-2xl font-bold tracking-tight">How to choose</h2>
        <div className="space-y-3">
          <div className="rounded-xl border border-border/40 bg-card p-5">
            <h3 className="text-sm font-semibold">Hashrate vs. electricity cost</h3>
            <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
              Higher hashrate means better odds of finding a block, but it also means
              higher electricity bills. Calculate your breakeven point: if you&apos;re
              paying $0.10/kWh, a 234 TH/s S21 Pro costs about $8.40/day to run.
              Make sure you can afford to mine while waiting for a block.
            </p>
          </div>
          <div className="rounded-xl border border-border/40 bg-card p-5">
            <h3 className="text-sm font-semibold">Solo mining odds</h3>
            <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
              Solo mining is a lottery. A single S21 Pro has roughly a 1-in-2.8-million
              chance of finding a BTC block per 10 minutes. But when you win, you keep
              the entire 3.125 BTC (~$300k+). Lower-difficulty coins like DGB and DOGE
              give much better odds for solo miners.
            </p>
          </div>
          <div className="rounded-xl border border-border/40 bg-card p-5">
            <h3 className="text-sm font-semibold">Home mining considerations</h3>
            <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
              ASICs are loud (70–80 dB) and produce significant heat. If you&apos;re
              mining at home, consider a Bitaxe or Goldshell Mini-Doge for quiet,
              low-power operation. For full-size ASICs, you&apos;ll want a garage,
              basement, or dedicated space — or consider{" "}
              <a
                href="https://bitmernmining.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                hosted mining
              </a>
              .
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center rounded-xl border border-primary/20 bg-primary/5 p-8">
        <h2 className="text-2xl font-bold tracking-tight">Ready to start mining?</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Pick your hardware, set up your miner, and start submitting shares.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Button size="lg" className="glow" asChild>
            <a
              href="https://shop.bitmernmining.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Buy from Our Shop
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/getting-started">
              Set Up Your Miner
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
