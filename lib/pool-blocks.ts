import * as Sentry from "@sentry/nextjs";
import { POOL_ORDER } from "./pool-stats";

export interface PoolBlocksInfo {
  id: string;
  symbol: string;
  name: string;
  icon: string;
  confirmed: number;
  pending: number;
  total: number;
  lastBlock: {
    height: number;
    created: string;
    status: BlockStatus;
  } | null;
}

export type BlockStatus = "confirmed" | "pending" | "orphaned";

interface MiningcoreBlock {
  blockHeight: number;
  status: string;
  created: string;
}

const COIN_LABELS: Record<string, { symbol: string; name: string; icon: string }> = {
  "bitcoin-solo": { symbol: "BTC", name: "Bitcoin", icon: "/coins/btc.svg" },
  "litecoin-solo": { symbol: "LTC", name: "Litecoin", icon: "/coins/ltc.svg" },
  "dogecoin-solo": { symbol: "DOGE", name: "Dogecoin", icon: "/coins/doge.svg" },
  "bitcoincash-solo": { symbol: "BCH", name: "Bitcoin Cash", icon: "/coins/bch.svg" },
  "digibyte-solo": { symbol: "DGB", name: "DigiByte", icon: "/coins/dgb.svg" },
};

const BASE = process.env.MININGCORE_API_URL ?? "";

// Miningcore returns the most recent 50 by default. Page through to get the full count.
// Cap pagination at 20 pages (1000 blocks per coin) to bound the request budget.
const PAGE_SIZE = 50;
const MAX_PAGES = 20;

function normalizeStatus(raw: string): BlockStatus {
  const s = raw.toLowerCase();
  if (s === "confirmed") return "confirmed";
  if (s === "orphaned") return "orphaned";
  return "pending";
}

async function fetchPoolBlocks(poolId: string): Promise<MiningcoreBlock[]> {
  const out: MiningcoreBlock[] = [];
  for (let page = 0; page < MAX_PAGES; page++) {
    const url = `${BASE}/api/pools/${poolId}/blocks?page=${page}&pageSize=${PAGE_SIZE}`;
    let chunk: MiningcoreBlock[] = [];
    try {
      const res = await fetch(url, { next: { revalidate: 60, tags: ["blocks-found"] } });
      if (!res.ok) break;
      const data = (await res.json()) as unknown;
      chunk = Array.isArray(data) ? (data as MiningcoreBlock[]) : [];
    } catch (err) {
      Sentry.captureException(err);
      break;
    }
    if (chunk.length === 0) break;
    out.push(...chunk);
    if (chunk.length < PAGE_SIZE) break;
  }
  return out;
}

export async function fetchBlocksByPool(): Promise<PoolBlocksInfo[]> {
  const results = await Promise.all(
    POOL_ORDER.map(async (poolId) => {
      const meta = COIN_LABELS[poolId];
      if (!meta) {
        return {
          id: poolId,
          symbol: poolId.toUpperCase(),
          name: poolId,
          icon: "",
          confirmed: 0,
          pending: 0,
          total: 0,
          lastBlock: null,
        } satisfies PoolBlocksInfo;
      }

      const blocks = await fetchPoolBlocks(poolId);
      let confirmed = 0;
      let pending = 0;
      let latest: MiningcoreBlock | null = null;
      let latestStatus: BlockStatus = "pending";

      for (const b of blocks) {
        const status = normalizeStatus(b.status);
        if (status === "confirmed") confirmed++;
        else if (status === "pending") pending++;

        if (!latest || new Date(b.created).getTime() > new Date(latest.created).getTime()) {
          latest = b;
          latestStatus = status;
        }
      }

      return {
        id: poolId,
        symbol: meta.symbol,
        name: meta.name,
        icon: meta.icon,
        confirmed,
        pending,
        total: confirmed + pending,
        lastBlock: latest
          ? { height: latest.blockHeight, created: latest.created, status: latestStatus }
          : null,
      } satisfies PoolBlocksInfo;
    })
  );

  return results;
}

export interface BlocksSummary {
  totalConfirmed: number;
  totalAll: number;
  perCoin: PoolBlocksInfo[];
  latest: { symbol: string; height: number; created: string; status: BlockStatus } | null;
}

export function summarizeBlocks(perCoin: PoolBlocksInfo[]): BlocksSummary {
  let totalConfirmed = 0;
  let totalAll = 0;
  let latest: BlocksSummary["latest"] = null;

  for (const p of perCoin) {
    totalConfirmed += p.confirmed;
    totalAll += p.total;
    if (
      p.lastBlock &&
      (!latest || new Date(p.lastBlock.created).getTime() > new Date(latest.created).getTime())
    ) {
      latest = {
        symbol: p.symbol,
        height: p.lastBlock.height,
        created: p.lastBlock.created,
        status: p.lastBlock.status,
      };
    }
  }

  return { totalConfirmed, totalAll, perCoin, latest };
}

export async function fetchBlocksSummary(): Promise<BlocksSummary> {
  const perCoin = await fetchBlocksByPool();
  return summarizeBlocks(perCoin);
}
