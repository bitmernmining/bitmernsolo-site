import Image from "next/image";

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

interface PoolData {
  id: string;
  coin: { name: string; symbol: string; algorithm: string };
  poolStats: { poolHashrate: number; connectedMiners: number };
  networkStats: { networkHashrate: number; blockHeight: number };
}

async function fetchPools(): Promise<PoolData[]> {
  try {
    const res = await fetch("http://207.148.13.103:4000/api/pools", {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.pools ?? [];
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
    .filter((p): p is PoolData => !!p);

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
            const miners = pool.poolStats.connectedMiners;
            const isActive = pool.poolStats.poolHashrate > 0;

            return (
              <div
                key={pool.id}
                className="rounded-xl border border-border/40 bg-card/30 p-5 transition-colors hover:border-border/60"
              >
                {/* Coin header */}
                <div className="flex items-center gap-3 mb-4">
                  {meta && (
                    <Image
                      src={meta.icon}
                      alt={pool.coin.name}
                      width={32}
                      height={32}
                      className="h-8 w-8"
                    />
                  )}
                  <div>
                    <p className="text-sm font-semibold">{pool.coin.name}</p>
                    <p className="text-[10px] text-muted-foreground font-mono">{pool.coin.algorithm}</p>
                  </div>
                </div>

                {/* Pool hashrate */}
                <div className="mb-3">
                  <p className="text-[10px] text-muted-foreground mb-0.5">Pool Hashrate</p>
                  <div className="flex items-baseline gap-1">
                    {isActive ? (
                      <>
                        <span className="font-mono text-lg font-semibold">{hr.value}</span>
                        <span className="text-[11px] text-muted-foreground">{hr.unit}</span>
                      </>
                    ) : (
                      <span className="text-sm text-muted-foreground">—</span>
                    )}
                  </div>
                </div>

                {/* Miners & Network */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-md border border-border/40 bg-background/30 px-2 py-1.5">
                    <p className="text-[9px] text-muted-foreground">Miners</p>
                    <div className="flex items-center gap-1">
                      <span className={`h-1.5 w-1.5 rounded-full ${isActive ? "bg-green-500" : "bg-muted-foreground/30"}`} />
                      <span className="font-mono text-xs font-medium">{miners}</span>
                    </div>
                  </div>
                  <div className="rounded-md border border-border/40 bg-background/30 px-2 py-1.5">
                    <p className="text-[9px] text-muted-foreground">Network</p>
                    <span className="font-mono text-[10px] text-muted-foreground">{netHr.value} {netHr.unit}</span>
                  </div>
                </div>

                {/* Block height */}
                <div className="mt-2 text-[10px] text-muted-foreground font-mono text-center">
                  Block #{pool.networkStats.blockHeight.toLocaleString()}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
