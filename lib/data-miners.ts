import type { Miner, MinerTier } from "./data-types";

/* ── Mining hardware ── */

export const MINERS_SHA256: Miner[] = [
  { name: "Antminer S21 Pro", hashrate: "234 TH/s", power: "3,510 W", tier: "flagship", note: "Current flagship — maximum hashrate" },
  { name: "Whatsminer M66S", hashrate: "298 TH/s", power: "5,503 W", tier: "flagship", note: "Highest SHA-256 hashrate available" },
  { name: "Antminer S21 Hydro", hashrate: "335 TH/s", power: "5,360 W", tier: "hydro", note: "Water-cooled — requires immersion setup" },
  { name: "Whatsminer M56S++", hashrate: "230 TH/s", power: "5,290 W", tier: "hydro", note: "Hydro-cooled — datacenter grade" },
  { name: "Antminer S19k Pro", hashrate: "120 TH/s", power: "2,760 W", tier: "midrange", note: "Reliable mid-range workhorse" },
  { name: "Whatsminer M50S", hashrate: "126 TH/s", power: "3,276 W", tier: "midrange", note: "Solid mid-range performer" },
  { name: "Antminer S19j Pro", hashrate: "104 TH/s", power: "3,068 W", tier: "budget", note: "Widely available on secondhand market" },
  { name: "Antminer S17", hashrate: "56 TH/s", power: "2,520 W", tier: "budget", note: "Older gen — still viable for BCH/DGB" },
  { name: "Bitaxe (open-source)", hashrate: "1.2 TH/s", power: "15 W", tier: "solo", note: "Open-source solo miner — lottery ticket mining" },
  { name: "Bitaxe Hex", hashrate: "3.6 TH/s", power: "45 W", tier: "solo", note: "6-chip Bitaxe variant — improved odds" },
  { name: "NerdMiner", hashrate: "~50 KH/s", power: "1 W", tier: "solo", note: "ESP32-based novelty miner — extreme long shot" },
];

export const MINERS_SCRYPT: Miner[] = [
  { name: "Antminer L9", hashrate: "16 GH/s", power: "3,360 W", tier: "flagship", note: "Current Scrypt flagship" },
  { name: "Elphapex DG1+", hashrate: "14 GH/s", power: "3,920 W", tier: "flagship", note: "High-performance Scrypt ASIC" },
  { name: "Antminer L7", hashrate: "9.5 GH/s", power: "3,425 W", tier: "midrange", note: "Previous gen flagship — still competitive" },
  { name: "Goldshell Mini-Doge III", hashrate: "800 MH/s", power: "500 W", tier: "budget", note: "Compact home miner — quiet operation" },
];

export const TIER_LABELS: Record<MinerTier, string> = {
  flagship: "Flagship",
  midrange: "Mid-Range",
  hydro: "Hydro / Immersion",
  budget: "Budget / Used",
  solo: "Solo / Home Miners",
};
