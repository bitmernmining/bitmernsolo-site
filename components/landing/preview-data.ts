export type Page = "dashboard" | "miners" | "earnings" | "payouts" | "pool" | "alerts";
export type Coin = "BTC" | "BCH" | "LTC" | "DOGE" | "DGB" | "XEC" | "ETC" | "ZEC" | "XMR" | "RVN";

export const COINS: { symbol: Coin; name: string; algo: string }[] = [
  { symbol: "BTC", name: "Bitcoin", algo: "SHA-256" },
  { symbol: "BCH", name: "Bitcoin Cash", algo: "SHA-256" },
  { symbol: "LTC", name: "Litecoin", algo: "Scrypt" },
  { symbol: "DOGE", name: "Dogecoin", algo: "Scrypt" },
  { symbol: "DGB", name: "DigiByte", algo: "SHA-256" },
  { symbol: "XEC", name: "eCash", algo: "SHA-256" },
  { symbol: "ETC", name: "Ethereum Classic", algo: "Etchash" },
  { symbol: "ZEC", name: "Zcash", algo: "Equihash" },
  { symbol: "XMR", name: "Monero", algo: "RandomX" },
  { symbol: "RVN", name: "Ravencoin", algo: "KawPow" },
];

export const COIN_DATA: Record<Coin, {
  hashrate: string; hashUnit: string; trend: number;
  workers: { name: string; hash: string; shares: string }[];
  pending: string; pendingUsd: string;
  effort: string; earnedToday: string; earnedTodayUsd: string;
  poolHash: string; price: string; difficulty: string; networkHash: string;
  blockReward: string; blockTime: string;
}> = {
  BTC: {
    hashrate: "142.8", hashUnit: "TH/s", trend: 2.1,
    workers: [
      { name: "antminer-s21-01", hash: "52.4 TH/s", shares: "1.82" },
      { name: "antminer-s21-02", hash: "51.8 TH/s", shares: "1.79" },
      { name: "antminer-s19-03", hash: "38.6 TH/s", shares: "1.34" },
    ],
    pending: "0.0041", pendingUsd: "$421.12",
    effort: "67.3", earnedToday: "0.00018", earnedTodayUsd: "$18.47",
    poolHash: "213.9 TH/s", price: "$102,614", difficulty: "110.45 T",
    networkHash: "789.2 EH/s", blockReward: "3.125 BTC", blockTime: "10m 0s",
  },
  BCH: {
    hashrate: "48.2", hashUnit: "TH/s", trend: 1.8,
    workers: [
      { name: "antminer-s19-01", hash: "24.6 TH/s", shares: "2.14" },
      { name: "antminer-s19-02", hash: "23.6 TH/s", shares: "2.01" },
    ],
    pending: "0.0830", pendingUsd: "$38.94",
    effort: "42.1", earnedToday: "0.00410", earnedTodayUsd: "$1.92",
    poolHash: "71.4 TH/s", price: "$469", difficulty: "1.02 T",
    networkHash: "6.8 EH/s", blockReward: "6.25 BCH", blockTime: "10m 0s",
  },
  LTC: {
    hashrate: "9.8", hashUnit: "GH/s", trend: -0.4,
    workers: [
      { name: "antminer-l9-01", hash: "5.2 GH/s", shares: "3.41" },
      { name: "antminer-l9-02", hash: "4.6 GH/s", shares: "3.12" },
    ],
    pending: "0.2140", pendingUsd: "$24.61",
    effort: "83.7", earnedToday: "0.01200", earnedTodayUsd: "$1.38",
    poolHash: "14.2 GH/s", price: "$115", difficulty: "42.89 M",
    networkHash: "2.1 PH/s", blockReward: "6.25 LTC", blockTime: "2m 30s",
  },
  DOGE: {
    hashrate: "9.8", hashUnit: "GH/s", trend: 3.2,
    workers: [
      { name: "antminer-l9-01", hash: "5.2 GH/s", shares: "3.41" },
      { name: "antminer-l9-02", hash: "4.6 GH/s", shares: "3.12" },
    ],
    pending: "142.50", pendingUsd: "$35.63",
    effort: "51.2", earnedToday: "12.400", earnedTodayUsd: "$3.10",
    poolHash: "14.2 GH/s", price: "$0.25", difficulty: "24.16 M",
    networkHash: "1.8 PH/s", blockReward: "10000 DOGE", blockTime: "1m 0s",
  },
  DGB: {
    hashrate: "312.4", hashUnit: "GH/s", trend: 0.9,
    workers: [
      { name: "antminer-s19-01", hash: "162.1 GH/s", shares: "4.82" },
      { name: "antminer-s19-02", hash: "150.3 GH/s", shares: "4.51" },
    ],
    pending: "824.10", pendingUsd: "$8.24",
    effort: "29.4", earnedToday: "48.200", earnedTodayUsd: "$0.48",
    poolHash: "486.1 GH/s", price: "$0.01", difficulty: "2.41 M",
    networkHash: "182.4 TH/s", blockReward: "665 DGB", blockTime: "15s",
  },
  XEC: {
    hashrate: "86.4", hashUnit: "TH/s", trend: 1.2,
    workers: [
      { name: "antminer-s19-01", hash: "44.2 TH/s", shares: "2.08" },
      { name: "antminer-s19-02", hash: "42.2 TH/s", shares: "1.97" },
    ],
    pending: "1850000", pendingUsd: "$42.55",
    effort: "38.6", earnedToday: "92000", earnedTodayUsd: "$2.12",
    poolHash: "124.8 TH/s", price: "$0.000023", difficulty: "98.4 G",
    networkHash: "4.1 EH/s", blockReward: "1562500 XEC", blockTime: "10m 0s",
  },
  ETC: {
    hashrate: "412.0", hashUnit: "MH/s", trend: 0.6,
    workers: [
      { name: "gpu-rig-01", hash: "218.0 MH/s", shares: "5.12" },
      { name: "gpu-rig-02", hash: "194.0 MH/s", shares: "4.68" },
    ],
    pending: "0.8420", pendingUsd: "$16.84",
    effort: "55.1", earnedToday: "0.04800", earnedTodayUsd: "$0.96",
    poolHash: "612.0 MH/s", price: "$20.00", difficulty: "1.84 P",
    networkHash: "185.2 TH/s", blockReward: "2.56 ETC", blockTime: "13s",
  },
  ZEC: {
    hashrate: "184.0", hashUnit: "Sol/s", trend: -0.2,
    workers: [
      { name: "equihash-01", hash: "98.0 Sol/s", shares: "2.44" },
      { name: "equihash-02", hash: "86.0 Sol/s", shares: "2.18" },
    ],
    pending: "0.1280", pendingUsd: "$5.12",
    effort: "71.4", earnedToday: "0.00940", earnedTodayUsd: "$0.38",
    poolHash: "241.0 Sol/s", price: "$40.00", difficulty: "68.2 M",
    networkHash: "8.4 GSol/s", blockReward: "1.5625 ZEC", blockTime: "1m 15s",
  },
  XMR: {
    hashrate: "18.6", hashUnit: "KH/s", trend: 2.4,
    workers: [
      { name: "cpu-node-01", hash: "9.8 KH/s", shares: "1.62" },
      { name: "cpu-node-02", hash: "8.8 KH/s", shares: "1.48" },
    ],
    pending: "0.0840", pendingUsd: "$14.28",
    effort: "46.8", earnedToday: "0.00620", earnedTodayUsd: "$1.05",
    poolHash: "28.4 KH/s", price: "$170.00", difficulty: "312.4 G",
    networkHash: "3.1 GH/s", blockReward: "0.6 XMR", blockTime: "2m 0s",
  },
  RVN: {
    hashrate: "96.0", hashUnit: "MH/s", trend: 1.1,
    workers: [
      { name: "gpu-rvn-01", hash: "52.0 MH/s", shares: "3.22" },
      { name: "gpu-rvn-02", hash: "44.0 MH/s", shares: "2.86" },
    ],
    pending: "1840.00", pendingUsd: "$36.80",
    effort: "33.9", earnedToday: "124.00", earnedTodayUsd: "$2.48",
    poolHash: "148.0 MH/s", price: "$0.02", difficulty: "68.5 K",
    networkHash: "5.8 TH/s", blockReward: "2500 RVN", blockTime: "1m 0s",
  },
};
