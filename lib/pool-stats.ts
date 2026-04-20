export interface PerformanceSample {
  created: string;
  poolHashrate: number;
  connectedMiners: number;
  networkHashrate: number;
  networkDifficulty: number;
}

export interface PoolInfo {
  id: string;
  symbol: string;
  name: string;
  icon: string;
  algo: string;
  poolHashrate: number;
  connectedMiners: number;
  workerCount: number;
  networkHashrate: number;
  networkDifficulty: number;
  blockHeight: number;
  performance: PerformanceSample[];
}

interface MiningcorePool {
  id: string;
  coin: { name: string; symbol: string; algorithm: string };
  poolStats: { poolHashrate: number; connectedMiners: number };
  networkStats: { networkHashrate: number; blockHeight: number; networkDifficulty: number };
  topMiners: { miner: string; hashrate: number; sharesPerSecond: number }[];
}

const COIN_MAP: Record<string, { symbol: string; icon: string; algo: string }> = {
  "bitcoin-solo": { symbol: "BTC", icon: "/coins/btc.svg", algo: "SHA-256d" },
  "litecoin-solo": { symbol: "LTC", icon: "/coins/ltc.svg", algo: "Scrypt" },
  "dogecoin-solo": { symbol: "DOGE", icon: "/coins/doge.svg", algo: "Scrypt" },
  "bitcoincash-solo": { symbol: "BCH", icon: "/coins/bch.svg", algo: "SHA-256d" },
  "digibyte-solo": { symbol: "DGB", icon: "/coins/dgb.svg", algo: "SHA-256d" },
};

export const POOL_ORDER = [
  "bitcoin-solo",
  "litecoin-solo",
  "dogecoin-solo",
  "bitcoincash-solo",
  "digibyte-solo",
];

const BASE = process.env.MININGCORE_API_URL ?? "";

export async function fetchPoolData(): Promise<PoolInfo[]> {
  try {
    const res = await fetch(`${BASE}/api/pools`, {
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
            `${BASE}/api/pools/${poolId}/performance`,
            { next: { revalidate: 60 } }
          );
          if (perfRes.ok) {
            const perfData = await perfRes.json();
            performance = perfData.stats ?? [];
          }
        } catch { /* ignore — pool still included with empty performance */ }

        // Count workers across all top miners
        const miners = pool.topMiners ?? [];
        let workerCount = 0;
        if (miners.length > 0) {
          const counts = await Promise.all(
            miners.map(async (m) => {
              try {
                const minerRes = await fetch(
                  `${BASE}/api/pools/${poolId}/miners/${encodeURIComponent(m.miner)}`,
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
