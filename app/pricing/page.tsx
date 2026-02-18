import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BarChart3,
  Bell,
  Calculator,
  Check,
  Coins,
  Gauge,
  History,
  X,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing — Bitmern Solo",
  description:
    "Simple, transparent pricing. 1% flat fee on block rewards only. No subscriptions, no tiers, no hidden charges.",
};

/* ── Data ── */

const PAYOUT_EXAMPLES = [
  { coin: "BTC", icon: "/coins/btc.svg", reward: "3.125 BTC", fee: "0.03125 BTC", receive: "3.09375 BTC" },
  { coin: "LTC", icon: "/coins/ltc.svg", reward: "6.25 LTC", fee: "0.0625 LTC", receive: "6.1875 LTC" },
  { coin: "DOGE", icon: "/coins/doge.svg", reward: "10,000 DOGE", fee: "100 DOGE", receive: "9,900 DOGE" },
  { coin: "BCH", icon: "/coins/bch.svg", reward: "3.125 BCH", fee: "0.03125 BCH", receive: "3.09375 BCH" },
  { coin: "DGB", icon: "/coins/dgb.svg", reward: "665 DGB", fee: "6.65 DGB", receive: "658.35 DGB" },
];

const INCLUDED = [
  { icon: BarChart3, label: "Real-time hashrate and worker monitoring" },
  { icon: Bell, label: "Email alerts for downtime and payouts" },
  { icon: Coins, label: "Five coins from a single account" },
  { icon: Gauge, label: "VarDiff stratum with multiple ports per coin" },
  { icon: Calculator, label: "Mining profitability calculator" },
  { icon: History, label: "Full earnings and payout history with explorer links" },
];

const COMPARISON = [
  { feature: "Pool fee", bitmern: "1%", shared: "2–3%" },
  { feature: "Fee charged", bitmern: "Only on blocks you find", shared: "On every payout" },
  { feature: "Block reward", bitmern: "100% to finder (minus fee)", shared: "Split among all miners" },
  { feature: "Subscriptions", bitmern: "None", shared: "Sometimes required" },
  { feature: "Withdrawal fees", bitmern: "None", shared: "Varies" },
  { feature: "Hidden charges", bitmern: "None", shared: "Sometimes" },
];

const NO_FEES = [
  "Account creation",
  "Worker connections",
  "Dashboard access",
  "Email alerts",
  "API access",
  "Switching between coins",
];

/* ── Page ── */

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
      {/* Header */}
      <div className="text-center mb-16">
        <h1
          className="font-bold tracking-tight"
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
        >
          Simple, transparent pricing
        </h1>
        <p className="mt-3 mx-auto max-w-xl text-muted-foreground leading-relaxed">
          One flat fee on block rewards. No subscriptions, no tiers, no
          surprises.
        </p>
      </div>

      {/* ── Big 1% card ── */}
      <div className="rounded-xl border border-primary/20 bg-primary/5 p-8 sm:p-10 text-center mb-16">
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Pool fee on block rewards
        </p>
        <p className="mt-4 font-mono text-8xl font-bold tracking-tighter sm:text-9xl text-primary">
          1%
        </p>
        <p className="mt-4 text-muted-foreground">
          You keep <span className="text-foreground font-semibold">99%</span> of
          every block you find
        </p>

        {/* Visual comparison bar */}
        <div className="mt-8 mx-auto max-w-xs space-y-3">
          <div>
            <div className="flex items-center justify-between text-[11px] mb-1.5">
              <span className="font-medium text-primary">Bitmern Solo</span>
              <span className="font-mono text-primary">1%</span>
            </div>
            <div className="h-2.5 w-full rounded-full bg-border/40 overflow-hidden">
              <div className="h-full rounded-full bg-primary" style={{ width: "33%" }} />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between text-[11px] mb-1.5">
              <span className="text-muted-foreground">Typical shared pool</span>
              <span className="font-mono text-muted-foreground">2–3%</span>
            </div>
            <div className="h-2.5 w-full rounded-full bg-border/40 overflow-hidden">
              <div className="h-full rounded-full bg-muted-foreground/40" style={{ width: "100%" }} />
            </div>
          </div>
        </div>

        <Button className="mt-8 glow" size="lg" asChild>
          <a href="https://app.bitmernsolo.com/signup">
            Start Mining Free
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </div>

      {/* ── How the fee works ── */}
      <div className="space-y-6 mb-16">
        <h2 className="text-2xl font-bold tracking-tight">How the fee works</h2>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-border/40 bg-card p-5">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary mb-3">
              1
            </div>
            <h3 className="text-sm font-semibold mb-1">You find a block</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Your miner submits a share that meets the full network difficulty.
              The pool broadcasts the block to the network.
            </p>
          </div>
          <div className="rounded-xl border border-border/40 bg-card p-5">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary mb-3">
              2
            </div>
            <h3 className="text-sm font-semibold mb-1">Block matures</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              The network confirms the block. Once the required confirmations are
              reached, the coinbase reward becomes spendable.
            </p>
          </div>
          <div className="rounded-xl border border-border/40 bg-card p-5">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary mb-3">
              3
            </div>
            <h3 className="text-sm font-semibold mb-1">You get paid</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              The pool deducts 1% and sends the remaining 99% directly to your
              wallet. No manual action needed.
            </p>
          </div>
        </div>

        <div className="rounded-lg border border-border/40 bg-secondary/30 p-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            <strong className="text-foreground">No block = no fee.</strong>{" "}
            If you mine for a week without finding a block, you pay nothing. The
            fee only applies to block rewards, never to anything else.
          </p>
        </div>
      </div>

      {/* ── Payout examples ── */}
      <div className="space-y-6 mb-16">
        <h2 className="text-2xl font-bold tracking-tight">Payout examples</h2>
        <p className="text-sm text-muted-foreground">
          Here&apos;s exactly what you receive for each coin when you find a block.
        </p>

        <div className="rounded-xl border border-border/40 bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/40 bg-secondary/30">
                  <th className="px-4 py-3 text-left font-medium">Coin</th>
                  <th className="px-4 py-3 text-left font-medium">Block Reward</th>
                  <th className="px-4 py-3 text-left font-medium">1% Fee</th>
                  <th className="px-4 py-3 text-left font-medium text-primary">You Receive</th>
                </tr>
              </thead>
              <tbody>
                {PAYOUT_EXAMPLES.map((row) => (
                  <tr key={row.coin} className="border-b border-border/40 last:border-0">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Image src={row.icon} alt={row.coin} width={16} height={16} />
                        <span className="font-mono font-medium">{row.coin}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-mono text-muted-foreground">{row.reward}</td>
                    <td className="px-4 py-3 font-mono text-muted-foreground">{row.fee}</td>
                    <td className="px-4 py-3 font-mono font-medium text-primary">{row.receive}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── What does the fee cover ── */}
      <div className="space-y-6 mb-16">
        <h2 className="text-2xl font-bold tracking-tight">What does the fee cover?</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Infrastructure costs — everything it takes to run a reliable solo
          mining pool.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-border/40 bg-card p-5">
            <h3 className="text-sm font-semibold mb-2">Mining infrastructure</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Dedicated servers in Dallas, TX running Miningcore. Stratum protocol
              handling, share validation, VarDiff computation, and block
              broadcasting for five coins across multiple ports.
            </p>
          </div>
          <div className="rounded-xl border border-border/40 bg-card p-5">
            <h3 className="text-sm font-semibold mb-2">Dashboard & monitoring</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Real-time web dashboard with hashrate charts, worker management,
              earnings tracking, payout history, email alerts, and a profitability
              calculator. Globally distributed via edge network.
            </p>
          </div>
        </div>
      </div>

      {/* ── No fees for ── */}
      <div className="space-y-6 mb-16">
        <h2 className="text-2xl font-bold tracking-tight">Free. Always.</h2>
        <p className="text-sm text-muted-foreground">
          These things will never cost you anything.
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          {NO_FEES.map((item) => (
            <div key={item} className="flex items-center gap-3 rounded-xl border border-border/40 bg-card px-4 py-3">
              <Check className="h-4 w-4 shrink-0 text-emerald-400" />
              <span className="text-sm">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Comparison table ── */}
      <div className="space-y-6 mb-16">
        <h2 className="text-2xl font-bold tracking-tight">Bitmern vs shared pools</h2>
        <p className="text-sm text-muted-foreground">
          See how our fee structure compares.
        </p>

        <div className="rounded-xl border border-border/40 bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/40 bg-secondary/30">
                  <th className="px-4 py-3 text-left font-medium w-[35%]">Feature</th>
                  <th className="px-4 py-3 text-left font-medium text-primary w-[32.5%]">Bitmern Solo</th>
                  <th className="px-4 py-3 text-left font-medium w-[32.5%]">Typical Shared Pool</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row) => (
                  <tr key={row.feature} className="border-b border-border/40 last:border-0">
                    <td className="px-4 py-3 font-medium">{row.feature}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.bitmern}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.shared}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── Included with every account ── */}
      <div className="space-y-6 mb-16">
        <h2 className="text-2xl font-bold tracking-tight">
          Included with every account
        </h2>
        <p className="text-sm text-muted-foreground">
          No premium tiers. Every miner gets the full feature set.
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          {INCLUDED.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-4 rounded-xl border border-border/40 bg-card px-5 py-4"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border/40 bg-background/50">
                <Icon className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── FAQ ── */}
      <div className="space-y-6 mb-16">
        <h2 className="text-2xl font-bold tracking-tight">Pricing FAQ</h2>

        <div className="space-y-3">
          {[
            {
              q: "Is there a minimum payout?",
              a: "The minimum payout is 0.001 BTC (or equivalent for other coins). Since this is solo mining, payouts only happen when you find a block — and a single block reward far exceeds any minimum.",
            },
            {
              q: "Are there any monthly or recurring fees?",
              a: "No. There are no subscriptions, monthly fees, or recurring charges of any kind. The only fee is 1% of block rewards when you find a block.",
            },
            {
              q: "What if I mine for months without finding a block?",
              a: "You pay nothing. The fee is only deducted from block rewards. Solo mining is probabilistic — you might find a block quickly or it might take a while depending on your hashrate vs network difficulty.",
            },
            {
              q: "Can the fee change?",
              a: "The 1% fee is fixed. We won't increase it. If anything changes in the future, existing miners will be notified well in advance.",
            },
            {
              q: "Are transaction fees included?",
              a: "The miner who finds a block also earns the transaction fees included in that block, on top of the block subsidy. The 1% pool fee applies to the total reward (subsidy + fees).",
            },
          ].map((item) => (
            <div
              key={item.q}
              className="rounded-xl border border-border/40 bg-card p-5"
            >
              <h3 className="text-sm font-semibold">{item.q}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="text-center rounded-xl border border-primary/20 bg-primary/5 p-8">
        <h2 className="text-2xl font-bold tracking-tight">Ready to mine?</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          No credit card needed. Create an account and start mining in minutes.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Button size="lg" className="glow" asChild>
            <a href="https://app.bitmernsolo.com/signup">
              Create Free Account
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/getting-started">Getting Started Guide</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
