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
    enabled: false,
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
