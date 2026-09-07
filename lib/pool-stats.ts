import * as Sentry from "@sentry/nextjs";

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

export interface PoolErrorInfo {
  id: string;
  symbol: string;
  name: string;
  icon: string;
  algo: string;
  error: true;
}

export type PoolResult = PoolInfo | PoolErrorInfo;

interface MiningcorePool {
  id: string;
  coin: { name: string; symbol: string; algorithm: string };
  poolStats: { poolHashrate: number; connectedMiners: number };
  networkStats: { networkHashrate: number; blockHeight: number; networkDifficulty: number };
  topMiners: { miner: string; hashrate: number; sharesPerSecond: number }[];
}

/** Display metadata keyed by Miningcore pool id. Never fall back to raw ids in UI. */
export const COIN_MAP: Record<
  string,
  { symbol: string; name: string; icon: string; algo: string }
> = {
  "bitcoin-solo": { symbol: "BTC", name: "Bitcoin", icon: "/coins/btc.svg", algo: "SHA-256d" },
  "bitcoincash-solo": { symbol: "BCH", name: "Bitcoin Cash", icon: "/coins/bch.svg", algo: "SHA-256d" },
  "litecoin-solo": { symbol: "LTC", name: "Litecoin", icon: "/coins/ltc.svg", algo: "Scrypt" },
  "dogecoin-solo": { symbol: "DOGE", name: "Dogecoin", icon: "/coins/doge.svg", algo: "Scrypt" },
  "digibyte-solo": { symbol: "DGB", name: "DigiByte", icon: "/coins/dgb.svg", algo: "SHA-256d" },
  "ecash-solo": { symbol: "XEC", name: "eCash", icon: "/coins/xec.svg", algo: "SHA-256d" },
  "ethereumclassic-solo": { symbol: "ETC", name: "Ethereum Classic", icon: "/coins/etc.svg", algo: "Etchash" },
  "zcash-solo": { symbol: "ZEC", name: "Zcash", icon: "/coins/zec.svg", algo: "Equihash" },
  "monero-solo": { symbol: "XMR", name: "Monero", icon: "/coins/xmr.svg", algo: "RandomX" },
  "ravencoin-solo": { symbol: "RVN", name: "Ravencoin", icon: "/coins/rvn.svg", algo: "KawPow" },
};

/** BTC → BCH → LTC → DOGE → DGB → XEC → ETC → ZEC → XMR → RVN */
export const POOL_ORDER = [
  "bitcoin-solo",
  "bitcoincash-solo",
  "litecoin-solo",
  "dogecoin-solo",
  "digibyte-solo",
  "ecash-solo",
  "ethereumclassic-solo",
  "zcash-solo",
  "monero-solo",
  "ravencoin-solo",
] as const;

const DEFAULT_MININGCORE_API = "http://api.bitmernsolo.com";

/**
 * Resolve Miningcore API base URL.
 * api.bitmernsolo.com currently has broken TLS on :443 (ECONNRESET), while
 * plain HTTP on :80 serves the pools API correctly. Downgrade that host to
 * http:// so Vercel SSR / route handlers can reach it.
 */
export function getMiningcoreApiBase(): string {
  const raw = (process.env.MININGCORE_API_URL ?? "").trim().replace(/\/+$/, "");
  if (!raw) return DEFAULT_MININGCORE_API;

  try {
    const withProto = raw.includes("://") ? raw : `http://${raw}`;
    const u = new URL(withProto);
    if (u.hostname === "api.bitmernsolo.com" || u.hostname === "www.api.bitmernsolo.com") {
      u.protocol = "http:";
    }
    return u.origin;
  } catch {
    return DEFAULT_MININGCORE_API;
  }
}

function errorInfo(poolId: string): PoolErrorInfo {
  const meta = COIN_MAP[poolId];
  return {
    id: poolId,
    symbol: meta?.symbol ?? poolId.toUpperCase().split("-")[0] ?? poolId,
    name: meta?.name ?? "Unknown",
    icon: meta?.icon ?? "",
    algo: meta?.algo ?? "",
    error: true,
  };
}

async function fetchJson(url: string): Promise<unknown | null> {
  try {
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    Sentry.captureException(err);
    console.warn("[miningcore] fetch failed", { url, err });
    return null;
  }
}

export async function fetchPoolData(): Promise<PoolResult[]> {
  const base = getMiningcoreApiBase();
  let pools: MiningcorePool[] = [];

  const data = (await fetchJson(`${base}/api/pools`)) as { pools?: MiningcorePool[] } | null;
  if (data?.pools) {
    pools = data.pools;
  } else if (base !== DEFAULT_MININGCORE_API) {
    // Last-resort fallback if env pointed somewhere unreachable
    const fallback = (await fetchJson(`${DEFAULT_MININGCORE_API}/api/pools`)) as {
      pools?: MiningcorePool[];
    } | null;
    if (fallback?.pools) pools = fallback.pools;
  }

  const results = await Promise.all(
    POOL_ORDER.map(async (poolId) => {
      const pool = pools.find((p) => p.id === poolId);
      const meta = COIN_MAP[poolId];

      if (!pool || !meta) {
        return errorInfo(poolId);
      }

      try {
        let performance: PerformanceSample[] = [];
        const perfData = (await fetchJson(`${base}/api/pools/${poolId}/performance`)) as {
          stats?: PerformanceSample[];
        } | null;
        if (perfData?.stats) performance = perfData.stats;

        const miners = pool.topMiners ?? [];
        let workerCount = 0;
        if (miners.length > 0) {
          const counts = await Promise.all(
            miners.map(async (m) => {
              try {
                const minerRes = await fetch(
                  `${base}/api/pools/${poolId}/miners/${encodeURIComponent(m.miner)}`,
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
          name: meta.name,
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
      } catch (err) {
        Sentry.captureException(err);
        console.warn("[fetchPoolData] per-pool fetch failed", { poolId, err });
        return {
          id: poolId,
          symbol: meta.symbol,
          name: meta.name,
          icon: meta.icon,
          algo: meta.algo,
          error: true,
        } satisfies PoolErrorInfo;
      }
    })
  );

  return results;
}
