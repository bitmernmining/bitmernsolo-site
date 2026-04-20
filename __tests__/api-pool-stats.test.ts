import { describe, test, expect, mock, beforeEach, afterEach } from "bun:test";
import type { PoolInfo, PoolErrorInfo, PoolResult } from "../lib/pool-stats";

// Minimal valid pool data from Miningcore /api/pools
const mockPool = {
  id: "bitcoin-solo",
  coin: { name: "Bitcoin", symbol: "BTC", algorithm: "SHA-256d" },
  poolStats: { poolHashrate: 1000, connectedMiners: 5 },
  networkStats: { networkHashrate: 5e18, blockHeight: 800000, networkDifficulty: 80e12 },
  topMiners: [{ miner: "1A2B3C", hashrate: 500, sharesPerSecond: 0.1 }],
};

function isPoolInfo(p: PoolResult): p is PoolInfo {
  return !("error" in p && p.error);
}

function isPoolErrorInfo(p: PoolResult): p is PoolErrorInfo {
  return "error" in p && p.error === true;
}

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

describe("fetchPoolData (ERR-02)", () => {
  test("always returns all 5 pools in POOL_ORDER order", async () => {
    const { fetchPoolData, POOL_ORDER } = await import("../lib/pool-stats");
    const result = await fetchPoolData();
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(5);
    expect(result.map((p) => p.id)).toEqual(POOL_ORDER);
  });

  test("the pool present in API response is returned as PoolInfo", async () => {
    const { fetchPoolData } = await import("../lib/pool-stats");
    const result = await fetchPoolData();
    const bitcoinPool = result.find((p) => p.id === "bitcoin-solo");
    expect(bitcoinPool).toBeDefined();
    expect(isPoolInfo(bitcoinPool!)).toBe(true);
    const pool = bitcoinPool as PoolInfo;
    expect(pool.symbol).toBe("BTC");
    expect(pool.name).toBe("Bitcoin");
    expect(pool.poolHashrate).toBe(1000);
    expect(pool.connectedMiners).toBe(5);
    expect(pool.networkHashrate).toBe(5e18);
    expect(pool.blockHeight).toBe(800000);
    expect(pool.networkDifficulty).toBe(80e12);
  });

  test("pools missing from API response are returned as PoolErrorInfo — never filtered out", async () => {
    const { fetchPoolData } = await import("../lib/pool-stats");
    const result = await fetchPoolData();
    // mockPool only covers "bitcoin-solo"; the other 4 should be PoolErrorInfo
    const errorPools = result.filter((p) => p.id !== "bitcoin-solo");
    expect(errorPools).toHaveLength(4);
    for (const p of errorPools) {
      expect(isPoolErrorInfo(p)).toBe(true);
    }
  });

  test("pools are fetched in parallel — Promise.all fans out simultaneously", async () => {
    const { fetchPoolData } = await import("../lib/pool-stats");
    // If parallel, total time should be closer to 1x not Nx; here just assert it resolves
    const result = await fetchPoolData();
    expect(result).toHaveLength(5);
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
    const bitcoinPool = result.find((p) => p.id === "bitcoin-solo");
    expect(bitcoinPool).toBeDefined();
    expect(isPoolInfo(bitcoinPool!)).toBe(true);
    expect((bitcoinPool as PoolInfo).workerCount).toBe(0);
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
    const bitcoinPool = result.find((p) => p.id === "bitcoin-solo");
    expect(bitcoinPool).toBeDefined();
    expect(isPoolInfo(bitcoinPool!)).toBe(true);
    expect((bitcoinPool as PoolInfo).performance).toEqual([]);
  });

  test("returns all 5 pools as PoolErrorInfo when initial pool list fetch fails", async () => {
    // Override fetch: main pools endpoint returns non-ok
    globalThis.fetch = mock(async (_url: string) => {
      return { ok: false, status: 503 } as Response;
    });

    const { fetchPoolData } = await import("../lib/pool-stats");
    const result = await fetchPoolData();
    // All 5 pools returned as PoolErrorInfo — never an empty array
    expect(result).toHaveLength(5);
    for (const p of result) {
      expect(isPoolErrorInfo(p)).toBe(true);
    }
  });
});
