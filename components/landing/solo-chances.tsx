import { SoloChancesClient } from "./solo-chances-client";
import type { CoinNetworkData } from "./solo-chances-client";

const COINGECKO_IDS: Record<string, string> = {
  btc: "bitcoin",
  bch: "bitcoin-cash",
  ltc: "litecoin",
  doge: "dogecoin",
  dgb: "digibyte",
};

async function fetchNetworkData(): Promise<CoinNetworkData[]> {
  try {
    const res = await fetch("http://207.148.13.103:4000/api/pools", {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    const pools = data.pools ?? [];

    return pools.map((pool: { id: string; networkStats: { networkDifficulty: number; networkHashrate: number }; blockReward?: number }) => ({
      poolId: pool.id,
      networkDifficulty: pool.networkStats?.networkDifficulty ?? 0,
      networkHashrate: pool.networkStats?.networkHashrate ?? 0,
      blockReward: pool.blockReward,
    }));
  } catch {
    return [];
  }
}

async function fetchPrices(): Promise<Record<string, number>> {
  try {
    const ids = Object.values(COINGECKO_IDS).join(",");
    const res = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return {};
    const data = await res.json();
    const prices: Record<string, number> = {};
    for (const [coinId, geckoId] of Object.entries(COINGECKO_IDS)) {
      prices[coinId] = data[geckoId]?.usd ?? 0;
    }
    return prices;
  } catch {
    return {};
  }
}

export async function SoloChances() {
  const [networkData, prices] = await Promise.all([
    fetchNetworkData(),
    fetchPrices(),
  ]);

  return <SoloChancesClient networkData={networkData} prices={prices} />;
}
