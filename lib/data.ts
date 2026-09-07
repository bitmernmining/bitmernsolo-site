/* ── Shared data for coins, miners, stratum, and wallets ── */

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

export const COINS: CoinConfig[] = [
  {
    symbol: "BTC",
    name: "Bitcoin",
    algorithm: "SHA-256",
    icon: "/coins/btc.svg",
    description:
      "The original cryptocurrency. Solo mining BTC means you keep the entire 3.125 BTC block reward when your miner finds a block.",
    blockTime: "~10 minutes",
    blockReward: "3.125 BTC",
  },
  {
    symbol: "LTC",
    name: "Litecoin",
    algorithm: "Scrypt",
    icon: "/coins/ltc.svg",
    description:
      "A faster, lighter alternative to Bitcoin using the Scrypt algorithm. 2.5-minute block times mean more frequent block opportunities.",
    blockTime: "~2.5 minutes",
    blockReward: "6.25 LTC",
  },
  {
    symbol: "DOGE",
    name: "Dogecoin",
    algorithm: "Scrypt",
    icon: "/coins/doge.svg",
    description:
      "The people's cryptocurrency. Dogecoin uses Scrypt and has a 1-minute block time, giving solo miners more chances at finding blocks.",
    blockTime: "~1 minute",
    blockReward: "10,000 DOGE",
  },
  {
    symbol: "BCH",
    name: "Bitcoin Cash",
    algorithm: "SHA-256",
    icon: "/coins/bch.svg",
    description:
      "A SHA-256 fork of Bitcoin with larger blocks. Lower network difficulty than BTC makes solo mining more accessible.",
    blockTime: "~10 minutes",
    blockReward: "3.125 BCH",
  },
  {
    symbol: "DGB",
    name: "DigiByte",
    algorithm: "SHA-256",
    icon: "/coins/dgb.svg",
    description:
      "A fast, secure UTXO blockchain with 15-second block times. Uses SHA-256 among its five mining algorithms — great odds for solo miners.",
    blockTime: "~15 seconds",
    blockReward: "665 DGB",
  },
  {
    symbol: "XEC",
    name: "eCash",
    algorithm: "SHA-256",
    icon: "/coins/xec.svg",
    description:
      "A SHA-256 UTXO chain descended from Bitcoin Cash. High block rewards and familiar ASIC hardware make solo mining approachable.",
    blockTime: "~10 minutes",
    blockReward: "1,562,500 XEC",
  },
  {
    symbol: "ETC",
    name: "Ethereum Classic",
    algorithm: "Etchash",
    icon: "/coins/etc.svg",
    description:
      "The original Ethereum chain secured by Etchash. GPU miners can solo mine for the full block reward with no DAG epoch surprises on our pool.",
    blockTime: "~13 seconds",
    blockReward: "2.56 ETC",
  },
  {
    symbol: "ZEC",
    name: "Zcash",
    algorithm: "Equihash",
    icon: "/coins/zec.svg",
    description:
      "Privacy-focused cryptocurrency using Equihash. Solo miners keep the entire block reward when they find a Zcash block.",
    blockTime: "~75 seconds",
    blockReward: "1.5625 ZEC",
  },
  {
    symbol: "XMR",
    name: "Monero",
    algorithm: "RandomX",
    icon: "/coins/xmr.svg",
    description:
      "ASIC-resistant privacy coin mined with RandomX on CPUs. Solo mining means your hardware works toward the full block reward.",
    blockTime: "~2 minutes",
    blockReward: "0.6 XMR",
  },
  {
    symbol: "RVN",
    name: "Ravencoin",
    algorithm: "KawPow",
    icon: "/coins/rvn.svg",
    description:
      "Asset-focused blockchain secured by KawPow. Designed for GPU miners who want frequent block opportunities and full solo rewards.",
    blockTime: "~1 minute",
    blockReward: "2,500 RVN",
  },
];

/* ── Stratum endpoints ── */

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

export const STRATUM: StratumEndpoint[] = [
  {
    coin: "BTC",
    name: "Bitcoin",
    icon: "/coins/btc.svg",
    algo: "SHA-256d",
    host: "stratum+tcp://btc.bitmernsolo.com",
    ports: [
      { port: 3102, diff: "25k", label: "Default — works with any SHA-256 ASIC" },
      { port: 3112, diff: "20k", label: "Slightly lower start difficulty" },
      { port: 3122, diff: "15k", label: "For smaller/older ASICs" },
      { port: 3132, diff: "10k", label: "Lowest — entry-level hardware" },
    ],
  },
  {
    coin: "LTC",
    name: "Litecoin",
    icon: "/coins/ltc.svg",
    algo: "Scrypt",
    host: "stratum+tcp://ltc.bitmernsolo.com",
    ports: [
      { port: 3032, diff: "25k", label: "Default — works with any Scrypt ASIC" },
      { port: 3042, diff: "10k", label: "For smaller ASICs" },
      { port: 3052, diff: "1k", label: "Lowest — entry-level / GPU" },
    ],
  },
  {
    coin: "DOGE",
    name: "Dogecoin",
    icon: "/coins/doge.svg",
    algo: "Scrypt",
    host: "stratum+tcp://doge.bitmernsolo.com",
    ports: [
      { port: 3033, diff: "25k", label: "Default — works with any Scrypt ASIC" },
      { port: 3043, diff: "10k", label: "For smaller ASICs" },
      { port: 3053, diff: "1k", label: "Lowest — entry-level / GPU" },
    ],
  },
  {
    coin: "BCH",
    name: "Bitcoin Cash",
    icon: "/coins/bch.svg",
    algo: "SHA-256d",
    host: "stratum+tcp://bch.bitmernsolo.com",
    ports: [
      { port: 13103, diff: "500k", label: "Default — high-throughput SHA-256 ASICs" },
      { port: 13113, diff: "100k", label: "For mid-range ASICs" },
      { port: 13123, diff: "10k", label: "For smaller/older hardware" },
    ],
  },
  {
    coin: "DGB",
    name: "DigiByte",
    icon: "/coins/dgb.svg",
    algo: "SHA-256d",
    host: "stratum+tcp://dgb.bitmernsolo.com",
    ports: [
      { port: 4032, diff: "500k", label: "Default — works with any SHA-256 ASIC" },
      { port: 4042, diff: "100k", label: "For mid-range ASICs" },
      { port: 4052, diff: "10k", label: "For smaller/older hardware" },
    ],
  },
  {
    coin: "XEC",
    name: "eCash",
    icon: "/coins/xec.svg",
    algo: "SHA-256d",
    host: "stratum+tcp://xec.bitmernsolo.com",
    ports: [
      { port: 13302, diff: "500k", label: "Default — high-throughput SHA-256 ASICs" },
      { port: 13312, diff: "100k", label: "For mid-range ASICs" },
      { port: 13322, diff: "10k", label: "For smaller/older hardware" },
    ],
  },
  {
    coin: "ETC",
    name: "Ethereum Classic",
    icon: "/coins/etc.svg",
    algo: "Etchash",
    host: "stratum+tcp://etc.bitmernsolo.com",
    ports: [
      { port: 13402, diff: "4G", label: "Default — GPU / Etchash miners" },
      { port: 13412, diff: "2G", label: "For mid-range GPUs" },
      { port: 13422, diff: "1G", label: "Lowest — smaller GPUs" },
    ],
  },
  {
    coin: "ZEC",
    name: "Zcash",
    icon: "/coins/zec.svg",
    algo: "Equihash",
    host: "stratum+tcp://zec.bitmernsolo.com",
    ports: [
      { port: 13502, diff: "10k", label: "Default — Equihash ASICs / GPUs" },
      { port: 13512, diff: "5k", label: "For mid-range hardware" },
      { port: 13522, diff: "1k", label: "Lowest — smaller setups" },
    ],
  },
  {
    coin: "XMR",
    name: "Monero",
    icon: "/coins/xmr.svg",
    algo: "RandomX",
    host: "stratum+tcp://xmr.bitmernsolo.com",
    ports: [
      { port: 13602, diff: "50k", label: "Default — CPU / RandomX miners" },
      { port: 13612, diff: "25k", label: "For mid-range CPUs" },
      { port: 13622, diff: "10k", label: "Lowest — smaller CPUs" },
    ],
  },
  {
    coin: "RVN",
    name: "Ravencoin",
    icon: "/coins/rvn.svg",
    algo: "KawPow",
    host: "stratum+tcp://rvn.bitmernsolo.com",
    ports: [
      { port: 13702, diff: "4G", label: "Default — GPU / KawPow miners" },
      { port: 13712, diff: "2G", label: "For mid-range GPUs" },
      { port: 13722, diff: "1G", label: "Lowest — smaller GPUs" },
    ],
  },
];

/* ── Mining hardware ── */

export type MinerTier = "flagship" | "midrange" | "hydro" | "budget" | "solo";

export interface Miner {
  name: string;
  hashrate: string;
  power: string;
  tier: MinerTier;
  shopUrl?: string;
  note?: string;
}

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

/* ── Wallets ── */

export interface WalletRecommendation {
  name: string;
  type: string;
  url: string;
  note: string;
}

export const WALLETS: Record<CoinSymbol, { coin: string; wallets: WalletRecommendation[] }> = {
  BTC: {
    coin: "Bitcoin",
    wallets: [
      { name: "Electrum", type: "Desktop", url: "https://electrum.org", note: "Lightweight, battle-tested" },
      { name: "Sparrow Wallet", type: "Desktop", url: "https://sparrowwallet.com", note: "Privacy-focused, full-featured" },
      { name: "Ledger / Trezor / Coldcard", type: "Hardware", url: "", note: "Best security for large holdings" },
    ],
  },
  LTC: {
    coin: "Litecoin",
    wallets: [
      { name: "Litecoin Core", type: "Desktop", url: "https://litecoin.org", note: "Official full-node wallet" },
      { name: "Electrum-LTC", type: "Desktop", url: "https://electrum-ltc.org", note: "Lightweight SPV wallet" },
      { name: "Ledger / Trezor", type: "Hardware", url: "", note: "With LTC app installed" },
    ],
  },
  DOGE: {
    coin: "Dogecoin",
    wallets: [
      { name: "Dogecoin Core", type: "Desktop", url: "https://dogecoin.com", note: "Official full-node wallet" },
      { name: "MultiDoge", type: "Desktop", url: "https://multidoge.org", note: "Lightweight client" },
      { name: "Ledger / Trezor", type: "Hardware", url: "", note: "With DOGE app installed" },
    ],
  },
  BCH: {
    coin: "Bitcoin Cash",
    wallets: [
      { name: "Electron Cash", type: "Desktop", url: "https://electroncash.org", note: "Lightweight SPV wallet" },
      { name: "Bitcoin Cash Node", type: "Desktop", url: "https://bitcoincash.org/wallets", note: "Official full-node wallet" },
      { name: "Ledger / Trezor", type: "Hardware", url: "", note: "With BCH app installed" },
    ],
  },
  DGB: {
    coin: "DigiByte",
    wallets: [
      { name: "DigiByte Core", type: "Desktop", url: "https://digibyte.org/#download", note: "Official full-node wallet" },
      { name: "DigiWallet", type: "Mobile", url: "https://digibyte.org/#download", note: "iOS and Android" },
      { name: "Ledger / Trezor", type: "Hardware", url: "", note: "With DGB app installed" },
    ],
  },
  XEC: {
    coin: "eCash",
    wallets: [
      { name: "Electrum ABC", type: "Desktop", url: "https://www.bitcoinabc.org/electrum/", note: "Lightweight SPV wallet for XEC" },
      { name: "Cashtab", type: "Web / Mobile", url: "https://cashtab.com", note: "Official eCash web wallet" },
      { name: "Ledger", type: "Hardware", url: "", note: "With eCash / XEC app installed" },
    ],
  },
  ETC: {
    coin: "Ethereum Classic",
    wallets: [
      { name: "MyCrypto", type: "Desktop / Web", url: "https://mycrypto.com", note: "ETC-friendly interface wallet" },
      { name: "MetaMask", type: "Browser", url: "https://metamask.io", note: "Add Ethereum Classic network" },
      { name: "Ledger / Trezor", type: "Hardware", url: "", note: "With ETC app / custom chain" },
    ],
  },
  ZEC: {
    coin: "Zcash",
    wallets: [
      { name: "Zashi", type: "Mobile", url: "https://electriccoin.co/zashi/", note: "Modern shielded Zcash wallet" },
      { name: "YWallet", type: "Desktop / Mobile", url: "https://ywallet.app", note: "Lightweight shielded wallet" },
      { name: "Ledger", type: "Hardware", url: "", note: "With Zcash app installed" },
    ],
  },
  XMR: {
    coin: "Monero",
    wallets: [
      { name: "Monero GUI / CLI", type: "Desktop", url: "https://www.getmonero.org/downloads/", note: "Official full-node wallet" },
      { name: "Feather Wallet", type: "Desktop", url: "https://featherwallet.org", note: "Lightweight, privacy-focused" },
      { name: "Cake Wallet", type: "Mobile", url: "https://cakewallet.com", note: "iOS and Android" },
    ],
  },
  RVN: {
    coin: "Ravencoin",
    wallets: [
      { name: "Ravencoin Core", type: "Desktop", url: "https://ravencoin.org/wallet/", note: "Official full-node wallet" },
      { name: "Electrum-RVN", type: "Desktop", url: "https://github.com/Electrum-RVN-SIG/electrum-ravencoin", note: "Lightweight SPV wallet" },
      { name: "Ledger", type: "Hardware", url: "", note: "With Ravencoin app installed" },
    ],
  },
};
