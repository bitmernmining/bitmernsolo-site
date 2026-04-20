import { z } from "zod";

// Source of truth for coin symbols. types/coin.ts re-exports from here.
const COIN_SYMBOLS = ["BTC", "BCH", "LTC", "DOGE", "DGB"] as const;
export const CoinSymbolSchema = z.enum(COIN_SYMBOLS);
export type CoinSymbol = z.infer<typeof CoinSymbolSchema>;
