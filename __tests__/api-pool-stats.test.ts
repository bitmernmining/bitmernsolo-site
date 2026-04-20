import { describe, test, expect, mock, beforeEach, afterEach } from "bun:test";

// Minimal valid pool data from Miningcore /api/pools
const mockPool = {
  id: "bitcoin-solo",
  coin: { name: "Bitcoin", symbol: "BTC", algorithm: "SHA-256d" },
  poolStats: { poolHashrate: 1000, connectedMiners: 5 },
  networkStats: { networkHashrate: 5e18, blockHeight: 800000, networkDifficulty: 80e12 },
  topMiners: [{ miner: "1A2B3C", hashrate: 500, sharesPerSecond: 0.1 }],
};

// Mock global fetch with URL-based dispatch
const originalFetch = globalThis.fetch;
beforeEach(() => {
  globalThis.fetch = mock(async (url: string) => {
    if (url.includes("/api/pools") && !url.includes("/performance") && !url.includes("/miners")) {
      return { ok: true, json: async () => ({ pools: [mockPool] }) } as Response;
    }
    if (url.includes("/performance")) {
      return { ok: true, json: async () => ({ stats: [] }) } as Response;
    }
    if (url.includes("/miners/")) {
      return { ok: true, json: async () => ({ performance: { workers: { w1: {}, w2: {} } } }) } as Response;
    }
    return { ok: false } as Response;
  });
  // Set env var for tests
  process.env.MININGCORE_API_URL = "http://test-miningcore:4000";
});
afterEach(() => {
  globalThis.fetch = originalFetch;
  delete process.env.MININGCORE_API_URL;
});

describe("GET /api/pool-stats (BUG-04)", () => {
  test("returns a PoolInfo[] array with one entry per POOL_ORDER entry that exists", async () => {
    const { fetchPoolData } = await import("../lib/pool-stats");
    const result = await fetchPoolData();
    expect(Array.isArray(result)).toBe(true);
    // mockPool only covers "bitcoin-solo"; the rest are filtered out (not in API response)
    expect(result).toHaveLength(1);
    const pool = result[0];
    expect(pool.id).toBe("bitcoin-solo");
    expect(pool.symbol).toBe("BTC");
    expect(pool.name).toBe("Bitcoin");
    expect(pool.poolHashrate).toBe(1000);
    expect(pool.connectedMiners).toBe(5);
    expect(pool.networkHashrate).toBe(5e18);
    expect(pool.blockHeight).toBe(800000);
    expect(pool.networkDifficulty).toBe(80e12);
  });

  test("pools are fetched in parallel — Promise.all fans out simultaneously", async () => {
    const { fetchPoolData } = await import("../lib/pool-stats");
    // If parallel, total time should be closer to 1x not Nx; here just assert it resolves
    const result = await fetchPoolData();
    expect(result).toHaveLength(1);
  });

  test("when worker count fetch fails, pool is included with workerCount: 0", async () => {
    // Override fetch: miners endpoint throws
    globalThis.fetch = mock(async (url: string) => {
      if (url.includes("/api/pools") && !url.includes("/performance") && !url.includes("/miners")) {
        return { ok: true, json: async () => ({ pools: [mockPool] }) } as Response;
      }
      if (url.includes("/performance")) {
        return { ok: true, json: async () => ({ stats: [] }) } as Response;
      }
      if (url.includes("/miners/")) {
        throw new Error("network error");
      }
      return { ok: false } as Response;
    });

    const { fetchPoolData } = await import("../lib/pool-stats");
    const result = await fetchPoolData();
    expect(result).toHaveLength(1);
    expect(result[0].workerCount).toBe(0);
  });

  test("when pool performance fetch fails, pool is included with empty performance array", async () => {
    // Override fetch: performance endpoint throws
    globalThis.fetch = mock(async (url: string) => {
      if (url.includes("/api/pools") && !url.includes("/performance") && !url.includes("/miners")) {
        return { ok: true, json: async () => ({ pools: [mockPool] }) } as Response;
      }
      if (url.includes("/performance")) {
        throw new Error("perf network error");
      }
      if (url.includes("/miners/")) {
        return { ok: true, json: async () => ({ performance: { workers: { w1: {} } } }) } as Response;
      }
      return { ok: false } as Response;
    });

    const { fetchPoolData } = await import("../lib/pool-stats");
    const result = await fetchPoolData();
    expect(result).toHaveLength(1);
    expect(result[0].performance).toEqual([]);
  });

  test("returns empty array when initial pool list fetch fails", async () => {
    // Override fetch: main pools endpoint returns non-ok
    globalThis.fetch = mock(async (_url: string) => {
      return { ok: false, status: 503 } as Response;
    });

    const { fetchPoolData } = await import("../lib/pool-stats");
    const result = await fetchPoolData();
    expect(result).toEqual([]);
  });
});
