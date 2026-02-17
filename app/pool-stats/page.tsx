import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { PoolStatsViewer, type PoolInfo } from "@/components/pool-stats/pool-stats-viewer";

export const metadata: Metadata = {
  title: "Pool Stats — Bitmern Solo",
  description:
    "Live pool hashrate, connected workers, network data, and block heights for all five coins on Bitmern Solo.",
};

/* ── Miningcore fetch ── */

const COIN_MAP: Record<string, { symbol: string; icon: string; algo: string }> = {
  "bitcoin-solo": { symbol: "BTC", icon: "/coins/btc.svg", algo: "SHA-256d" },
  "litecoin-solo": { symbol: "LTC", icon: "/coins/ltc.svg", algo: "Scrypt" },
  "dogecoin-solo": { symbol: "DOGE", icon: "/coins/doge.svg", algo: "Scrypt" },
  "bitcoincash-solo": { symbol: "BCH", icon: "/coins/bch.svg", algo: "SHA-256d" },
  "digibyte-solo": { symbol: "DGB", icon: "/coins/dgb.svg", algo: "SHA-256d" },
};

const POOL_ORDER = ["bitcoin-solo", "litecoin-solo", "dogecoin-solo", "bitcoincash-solo", "digibyte-solo"];

interface MiningcorePool {
  id: string;
  coin: { name: string; symbol: string; algorithm: string };
  poolStats: { poolHashrate: number; connectedMiners: number };
  networkStats: { networkHashrate: number; blockHeight: number; networkDifficulty: number };
  topMiners: { miner: string; hashrate: number; sharesPerSecond: number }[];
}

interface PerformanceSample {
  created: string;
  poolHashrate: number;
  connectedMiners: number;
  networkHashrate: number;
  networkDifficulty: number;
}

async function fetchPoolData(): Promise<PoolInfo[]> {
  try {
    const res = await fetch("http://207.148.13.103:4000/api/pools", {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    const pools: MiningcorePool[] = data.pools ?? [];

    const results = await Promise.all(
      POOL_ORDER.map(async (poolId) => {
        const pool = pools.find((p) => p.id === poolId);
        if (!pool) return null;
        const meta = COIN_MAP[poolId];
        if (!meta) return null;

        // Fetch performance history
        let performance: PerformanceSample[] = [];
        try {
          const perfRes = await fetch(
            `http://207.148.13.103:4000/api/pools/${poolId}/performance`,
            { next: { revalidate: 60 } }
          );
          if (perfRes.ok) {
            const perfData = await perfRes.json();
            performance = perfData.stats ?? [];
          }
        } catch { /* ignore */ }

        // Count workers across all top miners
        const miners = pool.topMiners ?? [];
        let workerCount = 0;
        if (miners.length > 0) {
          const counts = await Promise.all(
            miners.map(async (m) => {
              try {
                const minerRes = await fetch(
                  `http://207.148.13.103:4000/api/pools/${poolId}/miners/${encodeURIComponent(m.miner)}`,
                  { next: { revalidate: 60 } }
                );
                if (!minerRes.ok) return 0;
                const minerData = await minerRes.json();
                const workers = minerData?.performance?.workers;
                return workers ? Object.keys(workers).length : 0;
              } catch {
                return 0;
              }
            })
          );
          workerCount = counts.reduce((a, b) => a + b, 0);
        }

        return {
          id: poolId,
          symbol: meta.symbol,
          name: pool.coin.name,
          icon: meta.icon,
          algo: meta.algo,
          poolHashrate: pool.poolStats.poolHashrate,
          connectedMiners: pool.poolStats.connectedMiners,
          workerCount,
          networkHashrate: pool.networkStats.networkHashrate,
          networkDifficulty: pool.networkStats.networkDifficulty,
          blockHeight: pool.networkStats.blockHeight,
          performance,
        } satisfies PoolInfo;
      })
    );

    return results.filter((p): p is PoolInfo => p !== null);
  } catch {
    return [];
  }
}

/* ── Page ── */

export default async function PoolStatsPage() {
  const pools = await fetchPoolData();

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
      {/* Header */}
      <div className="text-center mb-12">
        <h1
          className="font-bold tracking-tight"
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
        >
          Pool stats
        </h1>
        <p className="mt-3 mx-auto max-w-xl text-muted-foreground leading-relaxed">
          Live hashrate, workers, and network data for every coin we support.
          Refreshed every 60 seconds.
        </p>
      </div>

      {/* Interactive pool viewer */}
      <div className="mb-20">
        <PoolStatsViewer pools={pools} />
      </div>

      {/* ── Educational content ── */}
      <div className="space-y-20">
        {/* Understanding pool stats */}
        <section>
          <div className="mb-8">
            <h2 className="text-2xl font-bold tracking-tight">Understanding pool stats</h2>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-2xl">
              The numbers above come directly from our Miningcore backend and
              the blockchain networks. Here is what each metric means.
            </p>
          </div>

          <div className="grid gap-px rounded-xl border border-border/40 bg-border/40 overflow-hidden sm:grid-cols-2">
            {[
              {
                label: "Pool Hashrate",
                desc: "The combined computational power of every worker connected to Bitmern Solo for a given coin. Higher pool hashrate means more shares being submitted and a greater collective chance of finding a block.",
              },
              {
                label: "Connected Workers",
                desc: "The number of individual mining devices currently submitting shares. A single miner account can have multiple workers, each appearing in your dashboard with its own name, hashrate, and status.",
              },
              {
                label: "Network Hashrate",
                desc: "The total hashrate of the entire blockchain network worldwide. Your chance of finding a block is your hashrate divided by the network hashrate. Higher network hashrate means harder blocks.",
              },
              {
                label: "Block Height",
                desc: "The sequential number of the latest block on the blockchain. Each time any miner finds a valid block, the height increments by one. This confirms the network is actively producing blocks.",
              },
              {
                label: "Network Difficulty",
                desc: "A measure of how hard it is to find a valid block hash. Difficulty adjusts automatically to keep block times consistent as total network hashrate changes. Higher difficulty means more computation required per block.",
              },
              {
                label: "Miners",
                desc: "The number of unique wallet addresses connected to the pool. Each miner can have one or more workers. Miners are identified by the wallet address used in their stratum connection.",
              },
            ].map((item) => (
              <div key={item.label} className="bg-card px-5 py-4">
                <h3 className="text-sm font-semibold mb-1.5">{item.label}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How blocks are found */}
        <section>
          <div className="mb-8">
            <h2 className="text-2xl font-bold tracking-tight">How blocks are found</h2>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-2xl">
              Your ASIC repeatedly hashes block data with different nonces until
              it finds a hash that meets the network&apos;s difficulty target.
            </p>
          </div>

          <div className="relative">
            {/* Vertical connector line */}
            <div className="absolute left-[19px] top-4 bottom-4 w-px bg-border/40 hidden sm:block" />

            <div className="space-y-3">
              {[
                { title: "Miner receives work", desc: "The pool sends your miner a block template containing pending transactions and a target difficulty." },
                { title: "Shares are submitted", desc: "Your miner finds solutions that meet a lower \"share\" difficulty, proving it is working. These estimate your hashrate." },
                { title: "A valid block is found", desc: "Occasionally a share also meets the full network difficulty — this is a valid block, immediately broadcast to the network." },
                { title: "Network confirmation", desc: "Other nodes verify the block and add it to the chain. After enough confirmations (100 for BTC), the reward matures." },
                { title: "Reward payout", desc: "The entire block reward (minus 1% fee) is sent directly to your wallet. No splitting, no waiting." },
              ].map((step, i) => (
                <div key={step.title} className="flex gap-4 items-start">
                  <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border/40 bg-card text-xs font-bold text-primary">
                    {i + 1}
                  </div>
                  <div className="min-w-0 pt-1.5">
                    <h3 className="text-sm font-semibold">{step.title}</h3>
                    <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Effort and luck + VarDiff — side by side on desktop */}
        <section className="grid gap-8 lg:grid-cols-2">
          {/* Effort and luck */}
          <div>
            <h2 className="text-2xl font-bold tracking-tight mb-4">Effort & luck</h2>
            <div className="rounded-xl border border-border/40 bg-card p-5 space-y-4">
              <div>
                <h3 className="text-sm font-semibold mb-1">What is effort?</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Effort is the percentage of expected work completed toward
                  finding a block. At 100% you have done exactly the
                  statistically expected work. Below 100% is lucky, above is
                  unlucky — but the odds reset with every hash.
                </p>
              </div>
              <div className="grid gap-2 grid-cols-3">
                <div className="rounded-md bg-green-500/10 border border-green-500/20 px-3 py-2 text-center">
                  <p className="font-mono text-sm font-semibold text-green-400">0–100%</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">Lucky</p>
                </div>
                <div className="rounded-md bg-yellow-500/10 border border-yellow-500/20 px-3 py-2 text-center">
                  <p className="font-mono text-sm font-semibold text-yellow-400">100–200%</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">Normal</p>
                </div>
                <div className="rounded-md bg-red-500/10 border border-red-500/20 px-3 py-2 text-center">
                  <p className="font-mono text-sm font-semibold text-red-400">200%+</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">Unlucky</p>
                </div>
              </div>
            </div>
          </div>

          {/* VarDiff */}
          <div>
            <h2 className="text-2xl font-bold tracking-tight mb-4">VarDiff explained</h2>
            <div className="rounded-xl border border-border/40 bg-card p-5 space-y-4">
              <div>
                <h3 className="text-sm font-semibold mb-1">How it works</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  VarDiff automatically adjusts share difficulty based on how
                  fast your miner hashes. Shares coming too fast? Difficulty
                  goes up. Too slow? It goes down. This keeps submissions at an
                  optimal rate without any configuration on your part.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-1">Does it affect block chances?</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  No. Share difficulty is purely an accounting measure. Whether
                  you submit one high-difficulty share or many low-difficulty
                  shares, the total work is the same. Your block chances depend
                  only on hashrate vs. network hashrate.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ── CTA ── */}
      <div className="text-center rounded-xl border border-primary/20 bg-primary/5 p-8 mt-20">
        <h2 className="text-2xl font-bold tracking-tight">Start mining today</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Create a free account, point your miner at our stratum, and watch your
          stats appear in real time.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Button size="lg" className="glow" asChild>
            <a href="https://app.bitmernsolo.com/signup">
              Create Free Account
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href="/getting-started">
              Getting Started Guide
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
