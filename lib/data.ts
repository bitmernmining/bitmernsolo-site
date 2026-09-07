/* ── Shared data for coins, miners, stratum, and wallets ── */

export type {
  CoinSymbol,
  CoinConfig,
  StratumPort,
  StratumEndpoint,
  MinerTier,
  Miner,
  WalletRecommendation,
} from "./data-types";

export { COINS } from "./data-coins";
export { STRATUM } from "./data-stratum";
export { MINERS_SHA256, MINERS_SCRYPT, TIER_LABELS } from "./data-miners";
export { WALLETS } from "./data-wallets";
