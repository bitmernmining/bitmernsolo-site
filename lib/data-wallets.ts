import type { CoinSymbol, WalletRecommendation } from "./data-types";

/* ── Wallets ── */

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
