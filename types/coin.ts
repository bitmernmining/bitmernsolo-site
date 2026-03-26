export type CoinSymbol = "BTC" | "BCH" | "LTC" | "DOGE" | "DGB";

export type WalletAddresses = Partial<Record<CoinSymbol, string>>;

export interface CoinConfig {
  symbol: CoinSymbol;
  name: string;
  algorithm: string;
  hashUnit: string;
  blockReward: number;
  color: string;
  icon: string;
  enabled: boolean;
}
