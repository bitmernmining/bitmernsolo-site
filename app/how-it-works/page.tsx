import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  UserPlus,
  Wallet,
  Cpu,
  Share2,
  Box,
  BadgeDollarSign,
} from "lucide-react";

export const metadata: Metadata = {
  title: "How It Works — Bitmern Solo",
  description:
    "Learn how solo mining works on Bitmern. From account creation to block rewards, understand every step of the solo mining process.",
};

/* ── Data ── */

const steps = [
  {
    n: 1,
    icon: UserPlus,
    title: "Create your account",
    desc: "Sign up with just an email address. No KYC, no identity verification, no waiting period. Your account is ready in seconds.",
  },
  {
    n: 2,
    icon: Wallet,
    title: "Set up your wallet",
    desc: "Add a wallet address for each coin you want to mine. You must use a wallet where you control the private keys — never an exchange address. When your miner finds a block, the reward goes directly to this address.",
  },
  {
    n: 3,
    icon: Cpu,
    title: "Configure your miner",
    desc: "Point your ASIC at the stratum endpoint for your coin. Use your wallet address as the username and any value as the password. The part after the dot in your username is your worker name — use it to identify different machines.",
  },
  {
    n: 4,
    icon: Share2,
    title: "Submitting shares",
    desc: "Once connected, your miner starts hashing and submitting shares. Shares are proof that your hardware is working. The pool uses them to estimate your hashrate and track your contribution. VarDiff automatically adjusts share difficulty to keep submissions at an optimal rate.",
  },
  {
    n: 5,
    icon: Box,
    title: "Finding a block",
    desc: "Every share has a chance of being a valid block. When one of your shares meets the full network difficulty, your miner has found a block. The pool immediately broadcasts it to the network. After enough confirmations, the block reward matures.",
  },
  {
    n: 6,
    icon: BadgeDollarSign,
    title: "Getting paid",
    desc: "Since this is a solo pool, the entire block reward (minus our 1% fee) goes to your wallet. No splitting with other miners, no minimum payout threshold, no holding period. The reward is yours as soon as the network confirms the block.",
  },
];

const comparison = [
  {
    feature: "Block reward",
    solo: "100% goes to the finder (minus 1% fee)",
    shared: "Split proportionally among all participants",
  },
  {
    feature: "Payout frequency",
    solo: "Only when you find a block",
    shared: "Regular, predictable payouts",
  },
  {
    feature: "Income variance",
    solo: "High — long gaps between large payouts",
    shared: "Low — steady, smaller payouts",
  },
  {
    feature: "Best for",
    solo: "Large miners who can absorb variance",
    shared: "Smaller miners who need consistent income",
  },
  {
    feature: "Minimum hashrate",
    solo: "Any hashrate works — lower = longer wait",
    shared: "Any hashrate works — lower = smaller share",
  },
  {
    feature: "Fee structure",
    solo: "1% of block reward only when found",
    shared: "1–3% of every payout, always charged",
  },
  {
    feature: "Privacy",
    solo: "Your blocks, your wallet, no shared data",
    shared: "Pool sees all miners' contributions",
  },
];

/* ── Page ── */

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
      {/* Header */}
      <div className="text-center mb-16">
        <h1
          className="font-bold tracking-tight"
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
        >
          How it works
        </h1>
        <p className="mt-3 mx-auto max-w-xl text-muted-foreground leading-relaxed">
          Solo mining explained from start to finish. Understand how your miner
          connects, how blocks are found, and how you get paid.
        </p>
      </div>

      {/* ── 6-step walkthrough ── */}
      <div className="space-y-6 mb-16">
        <h2 className="text-2xl font-bold tracking-tight">Six steps to your first block</h2>
        <div className="space-y-4">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.n}
                className="flex gap-4 rounded-xl border border-border/40 bg-card p-5"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border/40 bg-background/50">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                      {step.n}
                    </span>
                    <h3 className="text-sm font-semibold">{step.title}</h3>
                  </div>
                  <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── What happens when you find a block ── */}
      <div className="space-y-6 mb-16">
        <h2 className="text-2xl font-bold tracking-tight">
          What happens when you find a block
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Finding a block is the moment everything pays off. Here is the full
          lifecycle from discovery to your wallet.
        </p>

        <div className="rounded-xl border border-border/40 bg-card overflow-hidden">
          <div className="divide-y divide-border/40">
            {[
              {
                label: "Block discovered",
                time: "T+0",
                desc: "Your miner submits a share that meets the full network difficulty. The pool recognizes this as a valid block.",
              },
              {
                label: "Broadcast to network",
                time: "T+1s",
                desc: "The pool immediately broadcasts the block to the blockchain network. Other nodes begin verifying it.",
              },
              {
                label: "Confirmations begin",
                time: "T+10min",
                desc: "Each new block mined on top of yours adds a confirmation. The reward is locked until enough confirmations accumulate (typically 100 for BTC, fewer for other coins).",
              },
              {
                label: "Reward matures",
                time: "T+~16hr (BTC)",
                desc: "After reaching the required confirmation count, the coinbase reward matures and becomes spendable.",
              },
              {
                label: "Payout sent",
                time: "Shortly after maturity",
                desc: "The pool sends 99% of the block reward to your configured wallet address. The 1% fee is deducted automatically. No action needed on your part.",
              },
            ].map((item) => (
              <div key={item.label} className="flex gap-4 p-5">
                <div className="shrink-0">
                  <span className="inline-block rounded bg-primary/10 px-2 py-0.5 font-mono text-[11px] font-medium text-primary">
                    {item.time}
                  </span>
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold">{item.label}</h3>
                  <p className="mt-0.5 text-sm text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Solo vs shared ── */}
      <div className="space-y-6 mb-16">
        <h2 className="text-2xl font-bold tracking-tight">Solo vs shared pool</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The key difference: in a shared pool, rewards are split among all
          participants. In a solo pool, the entire reward goes to whoever finds
          the block.
        </p>

        <div className="rounded-xl border border-border/40 bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/40 bg-secondary/30">
                  <th className="px-4 py-3 text-left font-medium w-[30%]">Feature</th>
                  <th className="px-4 py-3 text-left font-medium text-primary w-[35%]">Solo Pool</th>
                  <th className="px-4 py-3 text-left font-medium w-[35%]">Shared Pool</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr
                    key={row.feature}
                    className="border-b border-border/40 last:border-0"
                  >
                    <td className="px-4 py-3 font-medium">{row.feature}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.solo}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.shared}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            <span className="font-medium text-foreground">Bottom line:</span>{" "}
            Solo mining is higher risk, higher reward. If you have significant
            hashrate and can afford to wait for blocks, solo mining maximizes
            your earnings per block. If you need steady daily income, a shared
            pool may be more suitable.
          </p>
        </div>
      </div>

      {/* ── The 1% fee explained ── */}
      <div className="space-y-6 mb-16">
        <h2 className="text-2xl font-bold tracking-tight">The 1% fee explained</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Bitmern Solo charges a flat 1% fee on block rewards. Here is exactly
          how it works.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-border/40 bg-card p-5">
            <h3 className="text-sm font-semibold mb-2">When is the fee charged?</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Only when you find a block. If you mine for a week without finding
              one, you pay nothing. The fee is deducted from the block reward
              before it is sent to your wallet.
            </p>
          </div>
          <div className="rounded-xl border border-border/40 bg-card p-5">
            <h3 className="text-sm font-semibold mb-2">What does the fee cover?</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Infrastructure costs — servers, bandwidth, monitoring, stratum
              protocol handling, VarDiff computation, block broadcasting, and the
              real-time dashboard. No hidden charges or additional fees.
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-border/40 bg-card p-5">
          <h3 className="text-sm font-semibold mb-3">Payout examples</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/40">
                  <th className="px-3 py-2 text-left font-medium">Coin</th>
                  <th className="px-3 py-2 text-left font-medium">Block Reward</th>
                  <th className="px-3 py-2 text-left font-medium">1% Fee</th>
                  <th className="px-3 py-2 text-left font-medium text-primary">You Receive</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { coin: "BTC", reward: "3.125 BTC", fee: "0.03125 BTC", receive: "3.09375 BTC" },
                  { coin: "LTC", reward: "6.25 LTC", fee: "0.0625 LTC", receive: "6.1875 LTC" },
                  { coin: "DOGE", reward: "10,000 DOGE", fee: "100 DOGE", receive: "9,900 DOGE" },
                  { coin: "BCH", reward: "3.125 BCH", fee: "0.03125 BCH", receive: "3.09375 BCH" },
                  { coin: "DGB", reward: "665 DGB", fee: "6.65 DGB", receive: "658.35 DGB" },
                ].map((row) => (
                  <tr key={row.coin} className="border-b border-border/40 last:border-0">
                    <td className="px-3 py-2 font-mono font-medium">{row.coin}</td>
                    <td className="px-3 py-2 font-mono text-muted-foreground">{row.reward}</td>
                    <td className="px-3 py-2 font-mono text-muted-foreground">{row.fee}</td>
                    <td className="px-3 py-2 font-mono font-medium text-primary">{row.receive}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── Our infrastructure ── */}
      <div className="space-y-6 mb-16">
        <h2 className="text-2xl font-bold tracking-tight">Our infrastructure</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Bitmern Solo is built on production-grade infrastructure designed for
          reliability and low latency.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-border/40 bg-card p-5">
            <h3 className="text-sm font-semibold mb-2">Miningcore backend</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Our mining engine is built on Miningcore, a high-performance,
              open-source mining pool framework. It handles stratum protocol
              communication, share validation, block submission, and payout
              processing.
            </p>
          </div>
          <div className="rounded-xl border border-border/40 bg-card p-5">
            <h3 className="text-sm font-semibold mb-2">Stratum protocol</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              All connections use the standard stratum mining protocol, compatible
              with every major ASIC manufacturer. Multiple ports per coin with
              different starting difficulties let you optimize for your hardware.
            </p>
          </div>
          <div className="rounded-xl border border-border/40 bg-card p-5">
            <h3 className="text-sm font-semibold mb-2">VarDiff on every port</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Variable Difficulty automatically tunes share difficulty to your
              miner&apos;s speed. Whether you run a 1 TH/s Bitaxe or a 234 TH/s
              S21 Pro, VarDiff ensures optimal share submission rates.
            </p>
          </div>
          <div className="rounded-xl border border-border/40 bg-card p-5">
            <h3 className="text-sm font-semibold mb-2">Dallas datacenter</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Our mining backend runs in a Dallas, TX datacenter with
              enterprise-grade networking. The dashboard is served globally via
              Vercel&apos;s edge network for instant page loads from anywhere.
            </p>
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="text-center rounded-xl border border-primary/20 bg-primary/5 p-8">
        <h2 className="text-2xl font-bold tracking-tight">Ready to start?</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Create a free account and start submitting shares in minutes.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Button size="lg" className="glow" asChild>
            <a href="https://app.bitmernsolo.com/signup">
              Create Free Account
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href="/getting-started">
              Getting Started Guide
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
