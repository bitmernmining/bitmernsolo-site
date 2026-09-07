import type { CoinConfig } from "./data-types";

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
      "Scrypt solo mining with AuxPoW merge: mine LTC and earn LTC + DOGE. Password doge=YourDogeAddress on the LTC stratum. 2.5-minute blocks.",
    blockTime: "~2.5 minutes",
    blockReward: "6.25 LTC",
  },
  {
    symbol: "DOGE",
    name: "Dogecoin",
    algorithm: "Scrypt",
    icon: "/coins/doge.svg",
    description:
      "Scrypt solo mining with 1-minute blocks. Mine DOGE directly here, or earn DOGE via LTC AuxPoW merge (password doge=YourDogeAddress on the LTC stratum).",
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
