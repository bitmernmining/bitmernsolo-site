import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const HASH_UNITS = ["H/s", "KH/s", "MH/s", "GH/s", "TH/s", "PH/s", "EH/s", "ZH/s"];

function formatHashrate(h: number): { value: string; unit: string } {
  if (h === 0) return { value: "0", unit: "H/s" };
  let i = 0;
  let v = h;
  while (v >= 1000 && i < HASH_UNITS.length - 1) {
    v /= 1000;
    i++;
  }
  return { value: v.toFixed(2), unit: HASH_UNITS[i] };
}

const COIN_MAP: Record<string, { symbol: string; icon: string }> = {
  "bitcoin-solo": { symbol: "BTC", icon: "/coins/btc.svg" },
  "litecoin-solo": { symbol: "LTC", icon: "/coins/ltc.svg" },
  "dogecoin-solo": { symbol: "DOGE", icon: "/coins/doge.svg" },
  "bitcoincash-solo": { symbol: "BCH", icon: "/coins/bch.svg" },
  "digibyte-solo": { symbol: "DGB", icon: "/coins/dgb.svg" },
};

interface TopMiner {
  miner: string;
  hashrate: number;
  sharesPerSecond: number;
}

interface PoolData {
  id: string;
  coin: { name: string; symbol: string; algorithm: string };
  poolStats: { poolHashrate: number; connectedMiners: number };
  networkStats: { networkHashrate: number; blockHeight: number };
  topMiners: TopMiner[];
}

interface PoolWithWorkers extends PoolData {
  workerCount: number;
}

async function fetchPools(): Promise<PoolWithWorkers[]> {
  try {
    const res = await fetch("http://207.148.13.103:4000/api/pools", {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    const pools: PoolData[] = data.pools ?? [];

    // For each pool, fetch individual miner details to count workers
    const poolsWithWorkers = await Promise.all(
      pools.map(async (pool) => {
        const miners = pool.topMiners ?? [];
        if (miners.length === 0) return { ...pool, workerCount: 0 };

        const workerCounts = await Promise.all(
          miners.map(async (m) => {
            try {
              const minerRes = await fetch(
                `http://207.148.13.103:4000/api/pools/${pool.id}/miners/${encodeURIComponent(m.miner)}`,
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

        return { ...pool, workerCount: workerCounts.reduce((a, b) => a + b, 0) };
      })
    );

    return poolsWithWorkers;
  } catch {
    return [];
  }
}

export async function Pools() {
  const pools = await fetchPools();

  // Desired display order
  const order = ["bitcoin-solo", "litecoin-solo", "dogecoin-solo", "bitcoincash-solo", "digibyte-solo"];
  const sorted = order
    .map((id) => pools.find((p) => p.id === id))
    .filter((p): p is PoolWithWorkers => !!p);

  return (
    <section id="pools">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Pool stats
          </h2>
          <p className="mt-2 text-muted-foreground">
            Live data pulled directly from our mining infrastructure, refreshed every 60 seconds.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {sorted.map((pool) => {
            const meta = COIN_MAP[pool.id];
            const hr = formatHashrate(pool.poolStats.poolHashrate);
            const netHr = formatHashrate(pool.networkStats.networkHashrate);
            const workers = pool.workerCount;
            const isActive = pool.poolStats.poolHashrate > 0;

            return (
              <div
                key={pool.id}
                className="flex flex-col rounded-xl border border-border/40 bg-card p-4 transition-colors hover:border-border/60"
              >
                {/* Coin header */}
                <div className="flex items-center gap-2.5 mb-3">
                  {meta && (
                    <Image
                      src={meta.icon}
                      alt={pool.coin.name}
                      width={28}
                      height={28}
                      className="h-7 w-7"
                    />
                  )}
                  <div className="min-w-0">
                    <p className="text-sm font-semibold truncate">{pool.coin.name}</p>
                    <p className="text-[10px] text-muted-foreground font-mono">{pool.coin.algorithm}</p>
                  </div>
                </div>

                {/* Pool hashrate — fixed height for alignment */}
                <div className="mb-3">
                  <p className="text-[10px] text-muted-foreground mb-0.5">Pool Hashrate</p>
                  <div className="flex items-baseline gap-1 h-7">
                    {isActive ? (
                      <>
                        <span className="font-mono text-lg font-semibold leading-none">{hr.value}</span>
                        <span className="text-[10px] text-muted-foreground">{hr.unit}</span>
                      </>
                    ) : (
                      <span className="font-mono text-lg leading-none text-muted-foreground">—</span>
                    )}
                  </div>
                </div>

                {/* Miners & Network */}
                <div className="grid grid-cols-2 gap-1.5 mt-auto">
                  <div className="rounded-md border border-border/40 bg-background/30 px-2 py-1.5">
                    <p className="text-[9px] text-muted-foreground">Workers</p>
                    <div className="flex items-center gap-1">
                      <span className={`h-1.5 w-1.5 rounded-full shrink-0 ${isActive ? "bg-green-500" : "bg-muted-foreground/30"}`} />
                      <span className="font-mono text-xs font-medium">{workers}</span>
                    </div>
                  </div>
                  <div className="rounded-md border border-border/40 bg-background/30 px-2 py-1.5">
                    <p className="text-[9px] text-muted-foreground">Network</p>
                    <p className="font-mono text-xs text-muted-foreground truncate">{netHr.value} {netHr.unit}</p>
                  </div>
                </div>

                {/* Block height */}
                <p className="mt-2 text-[10px] text-muted-foreground font-mono text-center">
                  Block #{pool.networkStats.blockHeight.toLocaleString()}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/pool-stats"
            className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
          >
            View full pool stats
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
