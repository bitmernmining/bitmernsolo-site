import * as Sentry from "@sentry/nextjs";
import { POOL_ORDER, getMiningcoreApiBase } from "./pool-stats";
import type { BlockStatus } from "./pool-blocks";

export interface FoundBlock {
  poolId: string;
  symbol: string;
  name: string;
  icon: string;
  height: number;
  status: BlockStatus;
  created: string;
  hash: string | null;
  explorerUrl: string | null;
  reward: number | null;
  effort: number | null;
}

interface MiningcoreBlock {
  blockHeight: number;
  status: string;
  created: string;
  hash?: string;
  infoLink?: string;
  reward?: number;
  effort?: number;
}

const COIN_LABELS: Record<string, { symbol: string; name: string; icon: string }> = {
  "bitcoin-solo": { symbol: "BTC", name: "Bitcoin", icon: "/coins/btc.svg" },
  "litecoin-solo": { symbol: "LTC", name: "Litecoin", icon: "/coins/ltc.svg" },
  "dogecoin-solo": { symbol: "DOGE", name: "Dogecoin", icon: "/coins/doge.svg" },
  "bitcoincash-solo": { symbol: "BCH", name: "Bitcoin Cash", icon: "/coins/bch.svg" },
  "digibyte-solo": { symbol: "DGB", name: "DigiByte", icon: "/coins/dgb.svg" },
  "ecash-solo": { symbol: "XEC", name: "eCash", icon: "/coins/xec.svg" },
  "ethereumclassic-solo": { symbol: "ETC", name: "Ethereum Classic", icon: "/coins/etc.svg" },
  "zcash-solo": { symbol: "ZEC", name: "Zcash", icon: "/coins/zec.svg" },
  "monero-solo": { symbol: "XMR", name: "Monero", icon: "/coins/xmr.svg" },
  "ravencoin-solo": { symbol: "RVN", name: "Ravencoin", icon: "/coins/rvn.svg" },
};

const EXPLORER_BY_SYMBOL: Record<string, { byHash?: (h: string) => string; byHeight?: (n: number) => string }> = {
  BTC: { byHash: (h) => `https://mempool.space/block/${h}`, byHeight: (n) => `https://mempool.space/block/${n}` },
  BCH: { byHash: (h) => `https://blockchair.com/bitcoin-cash/block/${h}`, byHeight: (n) => `https://blockchair.com/bitcoin-cash/block/${n}` },
  LTC: { byHash: (h) => `https://litecoinspace.org/block/${h}`, byHeight: (n) => `https://litecoinspace.org/block/${n}` },
  DOGE: { byHash: (h) => `https://dogechain.info/block/${h}`, byHeight: (n) => `https://dogechain.info/block/${n}` },
  DGB: { byHash: (h) => `https://chainz.cryptoid.info/dgb/block.dws?${h}.htm`, byHeight: (n) => `https://chainz.cryptoid.info/dgb/block.dws?${n}.htm` },
  XEC: { byHash: (h) => `https://explorer.e.cash/block/${h}`, byHeight: (n) => `https://explorer.e.cash/block/${n}` },
  ETC: { byHash: (h) => `https://etc.blockscout.com/block/${h}`, byHeight: (n) => `https://etc.blockscout.com/block/${n}` },
  ZEC: { byHash: (h) => `https://mainnet.zcashexplorer.app/blocks/${h}`, byHeight: (n) => `https://mainnet.zcashexplorer.app/blocks/${n}` },
  XMR: { byHeight: (n) => `https://xmrchain.net/block/${n}` },
  RVN: { byHash: (h) => `https://ravencoin.network/block/${h}`, byHeight: (n) => `https://ravencoin.network/block/${n}` },
};

function normalizeStatus(raw: string): BlockStatus {
  const s = raw.toLowerCase();
  if (s === "confirmed") return "confirmed";
  if (s === "orphaned") return "orphaned";
  return "pending";
}

export function resolveExplorerUrl(
  symbol: string,
  block: Pick<MiningcoreBlock, "infoLink" | "hash" | "blockHeight">
): string | null {
  const link = block.infoLink?.trim();
  if (link && /^https?:\/\//i.test(link)) return link;
  const explorers = EXPLORER_BY_SYMBOL[symbol];
  if (!explorers) return null;
  if (block.hash && explorers.byHash) return explorers.byHash(block.hash);
  if (typeof block.blockHeight === "number" && explorers.byHeight) return explorers.byHeight(block.blockHeight);
  return null;
}

async function fetchPoolBlocksRecent(poolId: string, pageSize = 50): Promise<MiningcoreBlock[]> {
  const base = getMiningcoreApiBase();
  const url = `${base}/api/pools/${poolId}/blocks?page=0&pageSize=${pageSize}`;
  try {
    const res = await fetch(url, { next: { revalidate: 60, tags: ["blocks-found"] } });
    if (!res.ok) return [];
    const data = (await res.json()) as unknown;
    return Array.isArray(data) ? (data as MiningcoreBlock[]) : [];
  } catch (err) {
    Sentry.captureException(err);
    return [];
  }
}

/** Recent found blocks for /blocks. Omits miner wallet addresses. */
export async function fetchRecentFoundBlocks(limit = 100): Promise<FoundBlock[]> {
  const pages = await Promise.all(
    POOL_ORDER.map(async (poolId) => {
      const meta = COIN_LABELS[poolId];
      if (!meta) return [] as FoundBlock[];
      const raw = await fetchPoolBlocksRecent(poolId);
      return raw
        .filter((b) => normalizeStatus(b.status) !== "orphaned")
        .map((b): FoundBlock => ({
          poolId,
          symbol: meta.symbol,
          name: meta.name,
          icon: meta.icon,
          height: b.blockHeight,
          status: normalizeStatus(b.status),
          created: b.created,
          hash: b.hash ?? null,
          explorerUrl: resolveExplorerUrl(meta.symbol, b),
          reward: typeof b.reward === "number" ? b.reward : null,
          effort: typeof b.effort === "number" ? b.effort : null,
        }));
    })
  );
  return pages.flat().sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime()).slice(0, limit);
}
