/* Shared coin / stratum types */
export type CoinSymbol =
  | "BTC"
  | "LTC"
  | "DOGE"
  | "BCH"
  | "DGB"
  | "XEC"
  | "ETC"
  | "ZEC"
  | "XMR"
  | "RVN";

export interface CoinConfig {
  symbol: CoinSymbol;
  name: string;
  algorithm: string;
  icon: string;
  description: string;
  blockTime: string;
  blockReward: string;
}

export interface StratumPort {
  port: number;
  diff: string;
  label: string;
}

export interface StratumEndpoint {
  coin: CoinSymbol;
  name: string;
  icon: string;
  algo: string;
  host: string;
  ports: StratumPort[];
}

export type MinerTier = "flagship" | "midrange" | "hydro" | "budget" | "solo";

export interface Miner {
  name: string;
  hashrate: string;
  power: string;
  tier: MinerTier;
  shopUrl?: string;
  note?: string;
}

export interface WalletRecommendation {
  name: string;
  type: string;
  url: string;
  note: string;
}
