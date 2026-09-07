import type { CoinConfig, CoinSymbol } from "@/types/coin";

export const COINS: Record<CoinSymbol, CoinConfig> = {
  BTC: {
    symbol: "BTC",
    name: "Bitcoin",
    algorithm: "SHA-256",
    hashUnit: "TH/s",
    blockReward: 3.125,
    color: "var(--color-btc)",
    icon: "/coins/btc.svg",
    enabled: true,
  },
  BCH: {
    symbol: "BCH",
    name: "Bitcoin Cash",
    algorithm: "SHA-256",
    hashUnit: "TH/s",
    blockReward: 3.125,
    color: "var(--color-bch)",
    icon: "/coins/bch.svg",
    enabled: true,
  },
  LTC: {
    symbol: "LTC",
    name: "Litecoin",
    algorithm: "Scrypt",
    hashUnit: "GH/s",
    blockReward: 6.25,
    color: "var(--color-ltc)",
    icon: "/coins/ltc.svg",
    enabled: true,
  },
  DOGE: {
    symbol: "DOGE",
    name: "Dogecoin",
    algorithm: "Scrypt",
    hashUnit: "GH/s",
    blockReward: 10000,
    color: "var(--color-doge)",
    icon: "/coins/doge.svg",
    enabled: true,
  },
  DGB: {
    symbol: "DGB",
    name: "DigiByte",
    algorithm: "SHA-256",
    hashUnit: "TH/s",
    blockReward: 625,
    color: "var(--color-dgb)",
    icon: "/coins/dgb.svg",
    enabled: true,
  },
  XEC: {
    symbol: "XEC",
    name: "eCash",
    algorithm: "SHA-256",
    hashUnit: "TH/s",
    blockReward: 1562500,
    color: "var(--color-xec)",
    icon: "/coins/xec.svg",
    enabled: true,
  },
  ETC: {
    symbol: "ETC",
    name: "Ethereum Classic",
    algorithm: "Etchash",
    hashUnit: "MH/s",
    blockReward: 2.56,
    color: "var(--color-etc)",
    icon: "/coins/etc.svg",
    enabled: true,
  },
  ZEC: {
    symbol: "ZEC",
    name: "Zcash",
    algorithm: "Equihash",
    hashUnit: "Sol/s",
    blockReward: 1.5625,
    color: "var(--color-zec)",
    icon: "/coins/zec.svg",
    enabled: true,
  },
  XMR: {
    symbol: "XMR",
    name: "Monero",
    algorithm: "RandomX",
    hashUnit: "KH/s",
    blockReward: 0.6,
    color: "var(--color-xmr)",
    icon: "/coins/xmr.svg",
    enabled: true,
  },
  RVN: {
    symbol: "RVN",
    name: "Ravencoin",
    algorithm: "KawPow",
    hashUnit: "MH/s",
    blockReward: 2500,
    color: "var(--color-rvn)",
    icon: "/coins/rvn.svg",
    enabled: true,
  },
};

export function getCoin(symbol: CoinSymbol): CoinConfig {
  return COINS[symbol];
}

export function getAllCoins(): CoinConfig[] {
  return Object.values(COINS);
}

export function getEnabledCoins(): CoinConfig[] {
  return Object.values(COINS).filter((c) => c.enabled);
}
