/* Static docs tables for app/docs/page.tsx */
export const POOL_IDS = [
  { coin: "Bitcoin", id: "bitcoin-solo" },
  { coin: "Litecoin", id: "litecoin-solo" },
  { coin: "Dogecoin", id: "dogecoin-solo" },
  { coin: "Bitcoin Cash", id: "bitcoincash-solo" },
  { coin: "DigiByte", id: "digibyte-solo" },
  { coin: "eCash", id: "ecash-solo" },
  { coin: "Ethereum Classic", id: "ethereumclassic-solo" },
  { coin: "Zcash", id: "zcash-solo" },
  { coin: "Monero", id: "monero-solo" },
  { coin: "Ravencoin", id: "ravencoin-solo" },
];

export const CONFIRMATIONS = [
  { coin: "BTC", name: "Bitcoin", confirmations: 100, approxTime: "~16 hours" },
  { coin: "LTC", name: "Litecoin", confirmations: 60, approxTime: "~2.5 hours" },
  { coin: "DOGE", name: "Dogecoin", confirmations: 40, approxTime: "~40 minutes" },
  { coin: "BCH", name: "Bitcoin Cash", confirmations: 100, approxTime: "~16 hours" },
  { coin: "DGB", name: "DigiByte", confirmations: 240, approxTime: "~1 hour" },
  { coin: "XEC", name: "eCash", confirmations: 100, approxTime: "~16 hours" },
  { coin: "ETC", name: "Ethereum Classic", confirmations: 120, approxTime: "~26 minutes" },
  { coin: "ZEC", name: "Zcash", confirmations: 60, approxTime: "~75 minutes" },
  { coin: "XMR", name: "Monero", confirmations: 60, approxTime: "~2 hours" },
  { coin: "RVN", name: "Ravencoin", confirmations: 100, approxTime: "~100 minutes" },
];

export const DIFF_GUIDE = [
  { hashrate: "Low / entry-level", recommendation: "Lowest available port", note: "Bitaxe, small GPUs/CPUs, older ASICs" },
  { hashrate: "Mid-range", recommendation: "Low or medium port", note: "Single mid-range ASIC, typical GPU/CPU rigs" },
  { hashrate: "High / multi-unit", recommendation: "Default (highest) port", note: "Flagship ASICs, large GPU farms, multi-CPU setups" },
];

export const PAYOUT_EXAMPLES = [
  { coin: "BTC", reward: "3.125 BTC", fee: "0.03125 BTC", receive: "3.09375 BTC" },
  { coin: "LTC", reward: "6.25 LTC", fee: "0.0625 LTC", receive: "6.1875 LTC" },
  { coin: "DOGE", reward: "10,000 DOGE", fee: "100 DOGE", receive: "9,900 DOGE" },
  { coin: "BCH", reward: "3.125 BCH", fee: "0.03125 BCH", receive: "3.09375 BCH" },
  { coin: "DGB", reward: "665 DGB", fee: "6.65 DGB", receive: "658.35 DGB" },
  { coin: "XEC", reward: "1,562,500 XEC", fee: "15,625 XEC", receive: "1,546,875 XEC" },
  { coin: "ETC", reward: "2.56 ETC", fee: "0.0256 ETC", receive: "2.5344 ETC" },
  { coin: "ZEC", reward: "1.5625 ZEC", fee: "0.015625 ZEC", receive: "1.546875 ZEC" },
  { coin: "XMR", reward: "0.6 XMR", fee: "0.006 XMR", receive: "0.594 XMR" },
  { coin: "RVN", reward: "2,500 RVN", fee: "25 RVN", receive: "2,475 RVN" },
];
