import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  COINS,
  STRATUM,
  MINERS_SHA256,
  MINERS_SCRYPT,
  WALLETS,
  TIER_LABELS,
  type CoinSymbol,
} from "@/lib/data";

const validCoins = ["btc", "ltc", "doge", "bch", "dgb"] as const;

export function generateStaticParams() {
  return validCoins.map((coin) => ({ coin }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ coin: string }>;
}): Promise<Metadata> {
  return params.then(({ coin: slug }) => {
    const symbol = slug.toUpperCase() as CoinSymbol;
    const coinData = COINS.find((c) => c.symbol === symbol);
    if (!coinData) return { title: "Not Found — Bitmern Solo" };
    return {
      title: `Solo Mine ${coinData.name} (${coinData.symbol}) — Bitmern Solo`,
      description: coinData.description,
    };
  });
}

export default async function CoinPage({
  params,
}: {
  params: Promise<{ coin: string }>;
}) {
  const { coin: slug } = await params;
  const symbol = slug.toUpperCase() as CoinSymbol;

  const coinData = COINS.find((c) => c.symbol === symbol);
  if (!coinData) notFound();

  const stratum = STRATUM.find((s) => s.coin === symbol);
  const miners =
    coinData.algorithm === "SHA-256" ? MINERS_SHA256 : MINERS_SCRYPT;
  const walletData = WALLETS[symbol];

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
      {/* Coin header */}
      <div className="flex items-center gap-4 mb-4">
        <Image
          src={coinData.icon}
          alt={coinData.name}
          width={48}
          height={48}
          className="h-12 w-12"
        />
        <div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {coinData.name}
          </h1>
          <div className="mt-1 flex items-center gap-2">
            <Badge variant="secondary">{coinData.symbol}</Badge>
            <Badge variant="outline">{coinData.algorithm}</Badge>
          </div>
        </div>
      </div>
      <p className="max-w-2xl text-muted-foreground leading-relaxed mb-12">
        {coinData.description}
      </p>

      {/* Quick stats */}
      <div className="grid gap-4 sm:grid-cols-3 mb-16">
        <div className="rounded-xl border border-border/40 bg-card p-5">
          <p className="text-xs text-muted-foreground">Block Time</p>
          <p className="mt-1 text-lg font-semibold">{coinData.blockTime}</p>
        </div>
        <div className="rounded-xl border border-border/40 bg-card p-5">
          <p className="text-xs text-muted-foreground">Block Reward</p>
          <p className="mt-1 text-lg font-semibold">{coinData.blockReward}</p>
        </div>
        <div className="rounded-xl border border-border/40 bg-card p-5">
          <p className="text-xs text-muted-foreground">Algorithm</p>
          <p className="mt-1 text-lg font-semibold">{coinData.algorithm}</p>
        </div>
      </div>

      {/* Stratum configuration */}
      {stratum && (
        <div className="space-y-4 mb-16">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Stratum configuration
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Copy these into your miner&apos;s pool configuration. All ports use
              VarDiff — difficulty auto-adjusts to your miner&apos;s speed.
            </p>
          </div>

          <div className="rounded-xl border border-border/40 bg-card overflow-hidden">
            <div className="flex items-center gap-2.5 border-b border-border/40 px-4 py-3">
              <Image src={stratum.icon} alt={stratum.name} width={20} height={20} />
              <span className="text-sm font-semibold">{stratum.name}</span>
              <span className="text-xs text-muted-foreground font-mono">
                {stratum.algo}
              </span>
            </div>
            <div className="p-4 space-y-2">
              {stratum.ports.map((p, i) => (
                <div
                  key={p.port}
                  className={`flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 rounded-lg px-3 py-2.5 ${
                    i === 0
                      ? "bg-primary/10 border border-primary/20"
                      : "bg-secondary/50"
                  }`}
                >
                  <code className="font-mono text-sm font-medium shrink-0">
                    {stratum.host}:{p.port}
                  </code>
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-secondary px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                      VarDiff {p.diff}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {p.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Worker credentials */}
          <div className="rounded-xl border border-border/40 bg-card p-5">
            <h3 className="text-sm font-semibold mb-3">Worker credentials</h3>
            <div className="rounded-lg bg-secondary/50 px-4 py-3 space-y-2 font-mono text-sm">
              <div>
                <span className="text-xs text-muted-foreground font-sans">Username</span>
                <p className="text-primary">YOUR_{symbol}_ADDRESS.worker1</p>
              </div>
              <div>
                <span className="text-xs text-muted-foreground font-sans">Password</span>
                <p>x</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recommended hardware */}
      <div className="space-y-4 mb-16">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Recommended hardware
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {coinData.algorithm} ASIC miners compatible with {coinData.name}
          </p>
        </div>

        <div className="rounded-xl border border-border/40 bg-card overflow-hidden">
          <div className="divide-y divide-border/40">
            {miners.map((miner) => (
              <div
                key={miner.name}
                className="flex items-center justify-between px-4 py-3"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">{miner.name}</p>
                    <Badge variant="outline" className="text-[10px]">
                      {TIER_LABELS[miner.tier]}
                    </Badge>
                  </div>
                  {miner.note && (
                    <p className="text-xs text-muted-foreground">{miner.note}</p>
                  )}
                </div>
                <div className="ml-4 shrink-0 text-right">
                  <p className="font-mono text-sm">{miner.hashrate}</p>
                  <p className="font-mono text-xs text-muted-foreground">
                    {miner.power}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          Any {coinData.algorithm} ASIC that supports stratum will work.{" "}
          <Link href="/miners" className="text-primary hover:underline">
            View all recommended hardware
          </Link>
        </p>
      </div>

      {/* Recommended wallets */}
      {walletData && (
        <div className="space-y-4 mb-16">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Recommended wallets
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Use a wallet where you control the private keys. Never use an exchange
              address for mining payouts.
            </p>
          </div>

          <div className="rounded-xl border border-border/40 bg-card p-5">
            <ul className="space-y-3">
              {walletData.wallets.map((w) => (
                <li key={w.name} className="flex items-start gap-3">
                  <span className="shrink-0 rounded bg-secondary px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                    {w.type}
                  </span>
                  <div>
                    {w.url ? (
                      <a
                        href={w.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline"
                      >
                        {w.name}
                      </a>
                    ) : (
                      <span className="text-sm">{w.name}</span>
                    )}
                    <span className="text-sm text-muted-foreground">
                      {" "}
                      — {w.note}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="text-center rounded-xl border border-primary/20 bg-primary/5 p-8">
        <h2 className="text-2xl font-bold tracking-tight">
          Start mining {coinData.name}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Create a free account, add your {symbol} wallet, and start submitting
          shares in minutes.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Button size="lg" className="glow" asChild>
            <a href="https://app.bitmernsolo.com/signup">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/getting-started">Setup Guide</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
