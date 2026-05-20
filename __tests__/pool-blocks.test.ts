import { describe, test, expect } from "bun:test";
import { summarizeBlocks, type PoolBlocksInfo } from "../lib/pool-blocks";

const mkPool = (overrides: Partial<PoolBlocksInfo>): PoolBlocksInfo => ({
  id: "bitcoin-solo",
  symbol: "BTC",
  name: "Bitcoin",
  icon: "/coins/btc.svg",
  confirmed: 0,
  pending: 0,
  total: 0,
  lastBlock: null,
  ...overrides,
});

describe("summarizeBlocks", () => {
  test("returns zeroed summary for empty input", () => {
    const s = summarizeBlocks([]);
    expect(s.totalConfirmed).toBe(0);
    expect(s.totalAll).toBe(0);
    expect(s.latest).toBeNull();
    expect(s.perCoin).toEqual([]);
  });

  test("sums confirmed and total across coins, ignoring orphaned in confirmed", () => {
    const s = summarizeBlocks([
      mkPool({ symbol: "BTC", confirmed: 1, pending: 0, total: 1 }),
      mkPool({ symbol: "DGB", confirmed: 174, pending: 3, total: 177 }),
    ]);
    expect(s.totalConfirmed).toBe(175);
    expect(s.totalAll).toBe(178);
  });

  test("picks the latest block across coins by created timestamp", () => {
    const older = "2026-05-19T10:00:00.000Z";
    const newer = "2026-05-20T15:30:00.000Z";
    const s = summarizeBlocks([
      mkPool({
        symbol: "BTC",
        confirmed: 5,
        total: 5,
        lastBlock: { height: 800001, created: older, status: "confirmed" },
      }),
      mkPool({
        symbol: "DGB",
        confirmed: 174,
        total: 174,
        lastBlock: { height: 4832001, created: newer, status: "confirmed" },
      }),
    ]);
    expect(s.latest).not.toBeNull();
    expect(s.latest?.symbol).toBe("DGB");
    expect(s.latest?.height).toBe(4832001);
    expect(s.latest?.created).toBe(newer);
  });

  test("returns null latest when no pool has any block", () => {
    const s = summarizeBlocks([
      mkPool({ symbol: "BTC" }),
      mkPool({ symbol: "DGB" }),
    ]);
    expect(s.latest).toBeNull();
  });

  test("propagates pending count in perCoin without inflating confirmed", () => {
    const s = summarizeBlocks([
      mkPool({ symbol: "DGB", confirmed: 174, pending: 2, total: 176 }),
    ]);
    expect(s.totalConfirmed).toBe(174);
    expect(s.totalAll).toBe(176);
    expect(s.perCoin[0]?.pending).toBe(2);
  });
});
