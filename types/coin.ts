// CoinSymbol is now derived from the Zod schema (single source of truth).
export type { CoinSymbol } from "@/lib/schemas/coin";

export type WalletAddresses = Partial<Record<import("@/lib/schemas/coin").CoinSymbol, string>>;

export interface CoinConfig {
  symbol: import("@/lib/schemas/coin").CoinSymbol;
  name: string;
  algorithm: string;
  hashUnit: string;
  blockReward: number;
  color: string;
  icon: string;
  enabled: boolean;
}
