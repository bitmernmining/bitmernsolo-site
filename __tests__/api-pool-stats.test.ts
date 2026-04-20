import { describe, test } from "bun:test";

describe("GET /api/pool-stats (BUG-04)", () => {
  test.todo("returns a PoolInfo[] array with one entry per POOL_ORDER entry that exists");
  test.todo("pools are fetched in parallel — Promise.all fans out simultaneously");
  test.todo("when worker count fetch fails, pool is included with workerCount: 0");
  test.todo("when pool performance fetch fails, pool is included with empty performance array");
  test.todo("returns 500 with JSON error body when initial pool list fetch fails");
});
