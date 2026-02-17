"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Target, Clock, DollarSign } from "lucide-react";

/* ─── Coin config ─── */

interface CoinDef {
  id: string;
  poolId: string;
  symbol: string;
  name: string;
  icon: string;
  hashUnit: string;
  hashMultiplier: number;
  blockTime: number;
  blockReward: number;
}

const COINS: CoinDef[] = [
  { id: "btc", poolId: "bitcoin-solo", symbol: "BTC", name: "Bitcoin", icon: "/coins/btc.svg", hashUnit: "TH/s", hashMultiplier: 1e12, blockTime: 600, blockReward: 3.125 },
  { id: "bch", poolId: "bitcoincash-solo", symbol: "BCH", name: "Bitcoin Cash", icon: "/coins/bch.svg", hashUnit: "TH/s", hashMultiplier: 1e12, blockTime: 600, blockReward: 3.125 },
  { id: "ltc", poolId: "litecoin-solo", symbol: "LTC", name: "Litecoin", icon: "/coins/ltc.svg", hashUnit: "GH/s", hashMultiplier: 1e9, blockTime: 150, blockReward: 6.25 },
  { id: "doge", poolId: "dogecoin-solo", symbol: "DOGE", name: "Dogecoin", icon: "/coins/doge.svg", hashUnit: "GH/s", hashMultiplier: 1e9, blockTime: 60, blockReward: 10000 },
  { id: "dgb", poolId: "digibyte-solo", symbol: "DGB", name: "DigiByte", icon: "/coins/dgb.svg", hashUnit: "TH/s", hashMultiplier: 1e12, blockTime: 15, blockReward: 625 },
];

/* ─── Types ─── */

export interface CoinNetworkData {
  poolId: string;
  networkDifficulty: number;
  networkHashrate: number;
  blockReward?: number;
}

/* ─── Formatting helpers ─── */

function formatNumber(num: number, decimals = 0): string {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);
}

function formatUsd(amount: number): string {
  const abs = Math.abs(amount);
  const maxDecimals = abs > 0 && abs < 0.01 ? 4 : 2;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: maxDecimals,
  }).format(amount);
}

function formatDifficulty(difficulty: number): string {
  if (difficulty >= 1e12) return `${(difficulty / 1e12).toFixed(2)}T`;
  if (difficulty >= 1e9) return `${(difficulty / 1e9).toFixed(2)}B`;
  if (difficulty >= 1e6) return `${(difficulty / 1e6).toFixed(2)}M`;
  if (difficulty >= 1e3) return `${(difficulty / 1e3).toFixed(2)}K`;
  return difficulty.toFixed(2);
}

function formatHashrate(hashesPerSecond: number): string {
  const units = ["H/s", "KH/s", "MH/s", "GH/s", "TH/s", "PH/s", "EH/s", "ZH/s"];
  if (hashesPerSecond === 0) return "0 H/s";
  let i = 0;
  let v = hashesPerSecond;
  while (v >= 1000 && i < units.length - 1) { v /= 1000; i++; }
  return `${v.toFixed(2)} ${units[i]}`;
}

function formatOdds(probability: number): string {
  if (probability <= 0) return "\u2014";
  if (probability >= 1) return "1 in 1";
  return `1 in ${formatNumber(Math.round(1 / probability))}`;
}

function formatProbabilityPercent(probability: number): string {
  if (probability <= 0) return "0%";
  if (probability >= 1) return "~100%";
  if (probability >= 0.01) return `${(probability * 100).toFixed(1)}%`;
  if (probability >= 0.0001) return `${(probability * 100).toFixed(4)}%`;
  return `${(probability * 100).toExponential(2)}%`;
}

function formatExpectedTime(seconds: number): string {
  if (!isFinite(seconds) || seconds <= 0) return "\u2014";
  if (seconds < 3600) return `~${Math.round(seconds / 60)} minutes`;
  if (seconds < 86400) return `~${(seconds / 3600).toFixed(1)} hours`;
  if (seconds < 604800) return `~${(seconds / 86400).toFixed(1)} days`;
  if (seconds < 2592000) return `~${(seconds / 604800).toFixed(1)} weeks`;
  if (seconds < 31536000) return `~${(seconds / 2592000).toFixed(1)} months`;
  return `~${(seconds / 31536000).toFixed(1)} years`;
}

/* ─── Periods ─── */

const PERIODS = [
  { label: "Per Block", seconds: 0 },
  { label: "Per Hour", seconds: 3600 },
  { label: "Per Day", seconds: 86400 },
  { label: "Per Week", seconds: 604800 },
  { label: "Per Month", seconds: 2592000 },
  { label: "Per Year", seconds: 31536000 },
];

/* ─── Component ─── */

interface SoloChancesClientProps {
  networkData: CoinNetworkData[];
  prices: Record<string, number>;
}

export function SoloChancesClient({ networkData, prices }: SoloChancesClientProps) {
  const [selectedCoin, setSelectedCoin] = useState("btc");
  const [hashrate, setHashrate] = useState("100");

  const coin = COINS.find((c) => c.id === selectedCoin)!;
  const net = networkData.find((n) => n.poolId === coin.poolId);
  const networkDifficulty = net?.networkDifficulty ?? 0;
  const networkHash = net?.networkHashrate ?? 0;
  const blockReward = net?.blockReward || coin.blockReward;
  const price = prices[selectedCoin] ?? 0;

  const chances = useMemo(() => {
    const hr = parseFloat(hashrate) || 0;
    const hashrateHps = hr * coin.hashMultiplier;
    const TWO_POW_32 = 4294967296;
    const pBlock = networkDifficulty > 0
      ? (hashrateHps * coin.blockTime) / (networkDifficulty * TWO_POW_32)
      : 0;
    const expectedSeconds = pBlock > 0 ? coin.blockTime / pBlock : Infinity;
    const blockValue = blockReward * price;

    const rows = PERIODS.map((period) => {
      if (period.seconds === 0) {
        return { label: period.label, probability: pBlock, odds: formatOdds(pBlock) };
      }
      const blocksInPeriod = period.seconds / coin.blockTime;
      const pAtLeastOne = 1 - Math.pow(1 - pBlock, blocksInPeriod);
      return { label: period.label, probability: pAtLeastOne, odds: formatOdds(pAtLeastOne) };
    });

    return { pBlock, expectedSeconds, blockValue, rows };
  }, [hashrate, networkDifficulty, coin, price, blockReward]);

  return (
    <section id="chances">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Solo mining chances
          </h2>
          <p className="mt-2 text-muted-foreground">
            Calculate your probability of finding a block based on your hashrate and live network data.
          </p>
        </div>

        {/* Coin switcher */}
        <div className="flex justify-center gap-2 mb-10">
          {COINS.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCoin(c.id)}
              className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-colors cursor-pointer ${
                selectedCoin === c.id
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border/40 bg-card text-muted-foreground hover:border-border/60 hover:text-foreground"
              }`}
            >
              <Image src={c.icon} alt={c.symbol} width={20} height={20} className="h-5 w-5" />
              <span className="hidden sm:inline">{c.name}</span>
              <span className="sm:hidden">{c.symbol}</span>
            </button>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left column — Input + Network data */}
          <div className="space-y-4">
            {/* Hashrate input */}
            <div className="rounded-xl border border-border/40 bg-card p-5">
              <p className="text-sm font-semibold mb-3">Your Hashrate</p>
              <div className="space-y-1.5">
                <label className="text-xs text-muted-foreground">
                  Hashrate ({coin.hashUnit})
                </label>
                <input
                  type="number"
                  value={hashrate}
                  onChange={(e) => setHashrate(e.target.value)}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
            </div>

            {/* Network data */}
            <div className="rounded-xl border border-border/40 bg-card p-5">
              <p className="text-xs font-medium text-muted-foreground mb-3">
                Live Network Data — {coin.symbol}
              </p>
              <div className="space-y-2.5">
                {[
                  { label: "Price", value: price > 0 ? formatUsd(price) : "Loading..." },
                  { label: "Block Reward", value: `${blockReward} ${coin.symbol}` },
                  { label: "Difficulty", value: networkDifficulty > 0 ? formatDifficulty(networkDifficulty) : "Loading..." },
                  { label: "Block Time", value: `${Math.floor(coin.blockTime / 60)}m ${coin.blockTime % 60}s` },
                  { label: "Network Hashrate", value: networkHash > 0 ? formatHashrate(networkHash) : "Loading..." },
                ].map((row) => (
                  <div key={row.label} className="flex justify-between text-xs">
                    <span className="text-muted-foreground">{row.label}</span>
                    <span className="font-mono">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column — Results */}
          <div className="space-y-4 lg:col-span-2">
            {/* 3 stat cards */}
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-border/40 bg-card p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-4 w-4 text-muted-foreground" />
                  <p className="text-xs font-medium text-muted-foreground">Chance per Block</p>
                </div>
                <p className="text-xl font-bold font-mono">
                  {chances.pBlock > 0 ? formatOdds(chances.pBlock) : "\u2014"}
                </p>
              </div>
              <div className="rounded-xl border border-border/40 bg-card p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <p className="text-xs font-medium text-muted-foreground">Expected Time</p>
                </div>
                <p className="text-xl font-bold font-mono">
                  {formatExpectedTime(chances.expectedSeconds)}
                </p>
              </div>
              <div className="rounded-xl border border-border/40 bg-card p-5">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <p className="text-xs font-medium text-muted-foreground">Block Value</p>
                </div>
                <p className="text-xl font-bold font-mono text-primary">
                  {formatUsd(chances.blockValue)}
                </p>
              </div>
            </div>

            {/* Probability table */}
            <div className="rounded-xl border border-border/40 bg-card overflow-hidden">
              <div className="px-5 py-3 border-b border-border/30">
                <p className="text-sm font-semibold">
                  Probability of Finding a Block — {coin.symbol}
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/30">
                      <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground">Period</th>
                      <th className="px-5 py-3 text-right text-xs font-medium text-muted-foreground">Probability</th>
                      <th className="px-5 py-3 text-right text-xs font-medium text-muted-foreground">Odds</th>
                    </tr>
                  </thead>
                  <tbody>
                    {chances.rows.map((row) => (
                      <tr key={row.label} className="border-b border-border/20 last:border-0">
                        <td className="px-5 py-3 font-medium">{row.label}</td>
                        <td className="px-5 py-3 text-right font-mono text-primary">
                          {formatProbabilityPercent(row.probability)}
                        </td>
                        <td className="px-5 py-3 text-right font-mono">
                          {row.odds}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
