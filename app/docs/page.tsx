import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { COINS, STRATUM } from "@/lib/data";
import { DocsSidebar } from "@/components/docs/docs-sidebar";

export const metadata: Metadata = {
  title: "Documentation — Bitmern Solo",
  description:
    "Complete documentation for Bitmern Solo mining pool. Supported coins, stratum endpoints, worker configuration, public API reference, fee structure, and more.",
};

/* ── Static data ── */

const API_BASE = "https://api.bitmernsolo.com";

const POOL_IDS = [
  { coin: "Bitcoin", id: "btc" },
  { coin: "Litecoin", id: "ltc" },
  { coin: "Dogecoin", id: "doge" },
  { coin: "Bitcoin Cash", id: "bch" },
  { coin: "DigiByte", id: "dgb" },
];

const API_ENDPOINTS = [
  {
    method: "GET",
    path: "/api/pools",
    description: "List all available pools with basic configuration.",
    example: `curl ${API_BASE}/api/pools`,
    response: `[
  {
    "id": "btc",
    "coin": { "type": "BTC", "name": "Bitcoin", "algorithm": "SHA256d" },
    "ports": { ... },
    "paymentProcessing": { ... },
    "poolStats": { "connectedMiners": 12, "poolHashrate": 845000000000000 },
    "networkStats": { ... }
  },
  ...
]`,
  },
  {
    method: "GET",
    path: "/api/pools/{id}",
    description:
      "Detailed stats for a specific pool — hashrate, connected miners, network difficulty, and available ports.",
    example: `curl ${API_BASE}/api/pools/btc`,
    response: `{
  "id": "btc",
  "coin": { "type": "BTC", "name": "Bitcoin", "algorithm": "SHA256d" },
  "ports": {
    "3102": { "difficulty": 25000, "varDiff": { "minDiff": 25000, "maxDiff": 1000000 } }
  },
  "poolStats": {
    "connectedMiners": 12,
    "poolHashrate": 845000000000000,
    "sharesPerSecond": 0.42
  },
  "networkStats": {
    "networkHashrate": 8.5e20,
    "networkDifficulty": 1.13e14,
    "blockHeight": 892341,
    "lastNetworkBlockTime": "2025-03-15T12:34:56Z"
  }
}`,
  },
  {
    method: "GET",
    path: "/api/pools/{id}/performance",
    description: "Pool-level hashrate history. Returns hourly samples.",
    example: `curl ${API_BASE}/api/pools/btc/performance`,
    response: `{
  "stats": [
    {
      "created": "2025-03-15T12:00:00Z",
      "poolHashrate": 845000000000000,
      "connectedMiners": 12
    },
    ...
  ]
}`,
  },
  {
    method: "GET",
    path: "/api/pools/{id}/blocks",
    description: "Blocks found by the pool, newest first.",
    example: `curl ${API_BASE}/api/pools/btc/blocks`,
    response: `[
  {
    "blockHeight": 892340,
    "status": "confirmed",
    "confirmationProgress": 1.0,
    "effort": 0.85,
    "reward": 3.125,
    "miner": "bc1q...",
    "created": "2025-03-15T10:22:00Z"
  },
  ...
]`,
  },
  {
    method: "GET",
    path: "/api/pools/{id}/miners/{address}",
    description:
      "Stats for a specific miner — pending balance, effort, and per-worker performance snapshot.",
    example: `curl ${API_BASE}/api/pools/btc/miners/bc1qexample...`,
    response: `{
  "pendingShares": 128,
  "pendingBalance": 0.0,
  "totalPaid": 6.1875,
  "todayPaid": 0.0,
  "lastPayment": "2025-03-10T08:15:00Z",
  "performance": {
    "workers": {
      "worker1": { "hashrate": 234000000000000, "sharesPerSecond": 0.12 }
    }
  },
  "performanceSamples": [ ... ]
}`,
  },
  {
    method: "GET",
    path: "/api/pools/{id}/miners/{address}/performance",
    description:
      "Miner hashrate history with per-worker breakdown. Hourly samples.",
    example: `curl ${API_BASE}/api/pools/btc/miners/bc1qexample.../performance`,
    response: `{
  "stats": [
    {
      "created": "2025-03-15T12:00:00Z",
      "workers": {
        "worker1": { "hashrate": 234000000000000, "sharesPerSecond": 0.12 },
        "worker2": { "hashrate": 120000000000000, "sharesPerSecond": 0.06 }
      }
    },
    ...
  ]
}`,
  },
  {
    method: "GET",
    path: "/api/pools/{id}/miners/{address}/payments",
    description: "Payment history for a miner address.",
    example: `curl ${API_BASE}/api/pools/btc/miners/bc1qexample.../payments`,
    response: `[
  {
    "coin": "BTC",
    "address": "bc1q...",
    "amount": 3.09375,
    "transactionConfirmationData": "txid...",
    "created": "2025-03-10T08:15:00Z"
  },
  ...
]`,
  },
  {
    method: "GET",
    path: "/api/pools/{id}/miners/{address}/earnings/daily",
    description: "Daily earnings breakdown for a miner address.",
    example: `curl ${API_BASE}/api/pools/btc/miners/bc1qexample.../earnings/daily`,
    response: `[
  { "date": "2025-03-15", "amount": 0.0, "status": "pending" },
  ...
]`,
  },
];

const CONFIRMATIONS = [
  { coin: "BTC", name: "Bitcoin", confirmations: 100, approxTime: "~16 hours" },
  { coin: "LTC", name: "Litecoin", confirmations: 60, approxTime: "~2.5 hours" },
  { coin: "DOGE", name: "Dogecoin", confirmations: 40, approxTime: "~40 minutes" },
  { coin: "BCH", name: "Bitcoin Cash", confirmations: 100, approxTime: "~16 hours" },
  { coin: "DGB", name: "DigiByte", confirmations: 240, approxTime: "~1 hour" },
];

const DIFF_GUIDE = [
  { hashrate: "< 10 TH/s", recommendation: "Lowest available port", note: "Bitaxe, NerdMiner, older ASICs" },
  { hashrate: "10–100 TH/s", recommendation: "Low or medium port", note: "Single mid-range ASIC" },
  { hashrate: "100+ TH/s", recommendation: "Default (highest) port", note: "Modern flagship ASICs, multiple units" },
];

/* ── Helpers ── */

function SectionHeading({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="scroll-mt-24 text-xl font-bold tracking-tight pb-3 border-b border-border/40">
      {children}
    </h2>
  );
}

function CodeBlock({ children, label }: { children: string; label?: string }) {
  return (
    <div className="rounded-lg border border-border/40 overflow-hidden">
      {label && (
        <div className="bg-secondary/50 border-b border-border/40 px-4 py-1.5">
          <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">{label}</span>
        </div>
      )}
      <div className="bg-[hsl(0_0%_6%)] px-4 py-3 overflow-x-auto">
        <pre className="font-mono text-[13px] leading-relaxed text-[hsl(0_0%_75%)]">{children}</pre>
      </div>
    </div>
  );
}

/* ── Page ── */

export default function DocsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      {/* Page header */}
      <div className="mb-12">
        <p className="text-sm font-medium text-primary mb-2">Documentation</p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Bitmern Solo Pool
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground leading-relaxed">
          Everything you need to connect your miners, understand the pool
          mechanics, and integrate with our public API.
        </p>
      </div>

      {/* Sidebar + content layout */}
      <div className="flex gap-12">
        {/* Sticky sidebar — hidden on mobile */}
        <aside className="hidden lg:block w-56 shrink-0">
          <div className="sticky top-24">
            <DocsSidebar />
          </div>
        </aside>

        {/* Main content */}
        <article className="min-w-0 flex-1 space-y-16">

          {/* ── Supported Coins ── */}
          <section>
            <SectionHeading id="coins">Supported Coins</SectionHeading>
            <p className="mt-4 text-sm text-muted-foreground mb-6">
              Five proof-of-work coins across two mining algorithms.
            </p>

            <div className="rounded-lg border border-border/40 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/40 bg-secondary/30">
                    <th className="px-4 py-2.5 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Coin</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Symbol</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Algorithm</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Block Time</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Block Reward</th>
                  </tr>
                </thead>
                <tbody>
                  {COINS.map((c) => (
                    <tr key={c.symbol} className="border-b border-border/40 last:border-0">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <Image src={c.icon} alt={c.name} width={18} height={18} />
                          <span className="font-medium text-sm">{c.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{c.symbol}</td>
                      <td className="px-4 py-3 text-sm">{c.algorithm}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{c.blockTime}</td>
                      <td className="px-4 py-3 font-mono text-sm text-primary">{c.blockReward}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* ── Stratum Endpoints ── */}
          <section>
            <SectionHeading id="stratum">Stratum Endpoints</SectionHeading>
            <p className="mt-4 text-sm text-muted-foreground mb-6">
              Point your ASIC at the endpoint for your coin. All ports use{" "}
              <strong className="text-foreground">VarDiff</strong> — the number
              shown is the starting difficulty.
            </p>

            <div className="space-y-4">
              {STRATUM.map((s) => (
                <div key={s.coin} className="rounded-lg border border-border/40 overflow-hidden">
                  <div className="flex items-center gap-2.5 border-b border-border/40 bg-secondary/20 px-4 py-2.5">
                    <Image src={s.icon} alt={s.name} width={18} height={18} />
                    <span className="text-sm font-semibold">{s.name}</span>
                    <span className="font-mono text-[11px] text-muted-foreground">{s.algo}</span>
                  </div>
                  <div className="p-3 space-y-1.5">
                    {s.ports.map((p, i) => (
                      <div
                        key={p.port}
                        className={`flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 rounded-md px-3 py-2 ${
                          i === 0 ? "bg-primary/10 border border-primary/20" : "bg-secondary/30"
                        }`}
                      >
                        <code className="font-mono text-[13px] font-medium shrink-0">{s.host}:{p.port}</code>
                        <div className="flex items-center gap-2">
                          <span className="rounded bg-secondary px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">VarDiff {p.diff}</span>
                          <span className="text-xs text-muted-foreground">{p.label}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <h3 className="mt-8 text-sm font-semibold mb-3">Credentials</h3>
            <CodeBlock label="Miner configuration">{`Username:  YOUR_WALLET_ADDRESS.workerName
Password:  x`}</CodeBlock>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              The part after the dot is your worker name — use any label you want
              (e.g. <code className="rounded bg-secondary/80 px-1.5 py-0.5 text-xs text-foreground">antminer-s21</code>,{" "}
              <code className="rounded bg-secondary/80 px-1.5 py-0.5 text-xs text-foreground">garage-rig</code>). Password can be anything.
            </p>

            <h3 className="mt-8 text-sm font-semibold mb-3">Configuration examples</h3>
            <div className="space-y-4">
              <CodeBlock label="ASIC web interface (Antminer / Whatsminer)">{`Pool URL:  stratum+tcp://btc.bitmernsolo.com:3102
Worker:    YOUR_WALLET_ADDRESS.worker1
Password:  x`}</CodeBlock>

              <CodeBlock label="CGMiner / BFGMiner (command line)">{`cgminer -o stratum+tcp://btc.bitmernsolo.com:3102 \\
  -u YOUR_WALLET_ADDRESS.worker1 \\
  -p x`}</CodeBlock>
            </div>
          </section>

          {/* ── Worker Configuration ── */}
          <section>
            <SectionHeading id="workers">Worker Configuration</SectionHeading>
            <p className="mt-4 text-sm text-muted-foreground mb-6">
              Workers are identified by the label after the dot in your stratum username.
            </p>

            <div className="space-y-4">
              <div className="rounded-lg border border-border/40 p-5">
                <h3 className="text-sm font-semibold mb-3">Naming format</h3>
                <CodeBlock>{`WALLET_ADDRESS.workerName`}</CodeBlock>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  Use letters, numbers, and hyphens. Keep names short and descriptive — they appear in your dashboard exactly as entered.
                </p>
              </div>

              <div className="rounded-lg border border-border/40 p-5">
                <h3 className="text-sm font-semibold mb-3">Multiple workers</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  Run as many workers as you want under the same wallet address. Each gets its own hashrate chart and status. Use a different name for each machine.
                </p>
                <CodeBlock>{`bc1q...abc.s21-pro
bc1q...abc.s19k-garage
bc1q...abc.bitaxe`}</CodeBlock>
              </div>

              <div className="rounded-lg border border-border/40 p-5">
                <h3 className="text-sm font-semibold mb-2">Dashboard visibility</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Each worker appears as a separate row in your Miners page with its own hashrate, shares per second, and online/offline status.
                  Click into any worker to see its 24-hour hashrate chart and connection details.
                  Workers are automatically detected when they connect — no manual registration required.
                </p>
              </div>
            </div>
          </section>

          {/* ── VarDiff ── */}
          <section>
            <SectionHeading id="vardiff">VarDiff</SectionHeading>
            <p className="mt-4 text-sm text-muted-foreground mb-6">
              Variable Difficulty automatically adjusts the share difficulty sent to your miner based on how fast it&apos;s hashing.
            </p>

            <div className="grid gap-4 sm:grid-cols-2 mb-6">
              <div className="rounded-lg border border-border/40 p-5">
                <h3 className="text-sm font-semibold mb-2">How it works</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  VarDiff monitors how quickly your miner submits shares and adjusts difficulty up or down to maintain a steady submission rate.
                  This prevents flooding the pool with easy shares (wasting bandwidth) or struggling with shares that are too hard (making stats laggy).
                </p>
              </div>
              <div className="rounded-lg border border-border/40 p-5">
                <h3 className="text-sm font-semibold mb-2">Starting difficulty</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Each port has a different starting difficulty — this is just where VarDiff begins. It adjusts to your actual hashrate within minutes.
                  If unsure which port to use, pick the default (highest starting difficulty) port. It works for everyone.
                </p>
              </div>
            </div>

            <h3 className="text-sm font-semibold mb-3">Port selection guide</h3>
            <div className="rounded-lg border border-border/40 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/40 bg-secondary/30">
                    <th className="px-4 py-2.5 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Your hashrate</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Recommended port</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Examples</th>
                  </tr>
                </thead>
                <tbody>
                  {DIFF_GUIDE.map((row) => (
                    <tr key={row.hashrate} className="border-b border-border/40 last:border-0">
                      <td className="px-4 py-3 font-mono text-sm">{row.hashrate}</td>
                      <td className="px-4 py-3 text-sm">{row.recommendation}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* ── Fees & Payouts ── */}
          <section>
            <SectionHeading id="payouts">Fees &amp; Payouts</SectionHeading>

            <div className="mt-4 rounded-lg border border-primary/20 bg-primary/5 p-5 mb-6">
              <p className="text-sm leading-relaxed">
                <strong className="text-foreground">1% flat fee</strong>{" "}
                <span className="text-muted-foreground">
                  — deducted only when you find a block. No block, no fee.
                  No hidden charges, no subscription, no withdrawal fees.
                </span>
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 mb-6">
              <div className="rounded-lg border border-border/40 p-5">
                <h3 className="text-sm font-semibold mb-2">When is the fee deducted?</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  When your miner finds a block, the pool deducts 1% from the block reward before sending the remaining 99% to your wallet.
                </p>
              </div>
              <div className="rounded-lg border border-border/40 p-5">
                <h3 className="text-sm font-semibold mb-2">Payout flow</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Block found → confirmations accumulate → coinbase matures → 99% sent to your wallet automatically. No manual action needed.
                </p>
              </div>
            </div>

            <h3 className="text-sm font-semibold mb-3">Payout examples</h3>
            <div className="rounded-lg border border-border/40 overflow-hidden mb-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/40 bg-secondary/30">
                    <th className="px-4 py-2.5 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Coin</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Block Reward</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">1% Fee</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium uppercase tracking-wider text-primary">You Receive</th>
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
                      <td className="px-4 py-3 font-mono font-medium">{row.coin}</td>
                      <td className="px-4 py-3 font-mono text-muted-foreground">{row.reward}</td>
                      <td className="px-4 py-3 font-mono text-muted-foreground">{row.fee}</td>
                      <td className="px-4 py-3 font-mono font-medium text-primary">{row.receive}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 className="text-sm font-semibold mb-3">Confirmation requirements</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Blocks must reach these confirmation counts before the coinbase reward matures and payout is sent.
            </p>
            <div className="rounded-lg border border-border/40 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/40 bg-secondary/30">
                    <th className="px-4 py-2.5 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Coin</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Confirmations</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Approx. time</th>
                  </tr>
                </thead>
                <tbody>
                  {CONFIRMATIONS.map((row) => (
                    <tr key={row.coin} className="border-b border-border/40 last:border-0">
                      <td className="px-4 py-3">
                        <span className="font-mono text-sm font-medium">{row.coin}</span>
                        <span className="ml-2 text-sm text-muted-foreground">{row.name}</span>
                      </td>
                      <td className="px-4 py-3 font-mono text-sm">{row.confirmations}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{row.approxTime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* ── Pool API ── */}
          <section>
            <SectionHeading id="api">Pool API</SectionHeading>
            <p className="mt-4 text-sm text-muted-foreground mb-2">
              Public REST API for reading pool and miner data. No authentication required — all endpoints are read-only.
            </p>
            <div className="mb-6">
              <CodeBlock label="Base URL">{API_BASE}</CodeBlock>
            </div>

            <h3 className="text-sm font-semibold mb-3">Pool IDs</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Use these IDs in the <code className="rounded bg-secondary/80 px-1.5 py-0.5 text-xs text-foreground">{"{id}"}</code> path parameter.
            </p>
            <div className="rounded-lg border border-border/40 overflow-hidden mb-8">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/40 bg-secondary/30">
                    <th className="px-4 py-2.5 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Coin</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Pool ID</th>
                  </tr>
                </thead>
                <tbody>
                  {POOL_IDS.map((p) => (
                    <tr key={p.id} className="border-b border-border/40 last:border-0">
                      <td className="px-4 py-2.5 text-sm">{p.coin}</td>
                      <td className="px-4 py-2.5 font-mono text-sm text-primary">{p.id}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 className="text-sm font-semibold mb-4">Endpoints</h3>
            <div className="space-y-6">
              {API_ENDPOINTS.map((ep) => (
                <div key={ep.path} className="rounded-lg border border-border/40 overflow-hidden">
                  <div className="flex items-center gap-3 border-b border-border/40 bg-secondary/20 px-4 py-2.5">
                    <span className="rounded bg-emerald-500/15 px-2 py-0.5 text-[11px] font-bold font-mono text-emerald-400">
                      {ep.method}
                    </span>
                    <code className="font-mono text-[13px] font-medium">{ep.path}</code>
                  </div>
                  <div className="p-4 space-y-4">
                    <p className="text-sm text-muted-foreground">{ep.description}</p>
                    <CodeBlock label="Request">{ep.example}</CodeBlock>
                    <CodeBlock label="Response">{ep.response}</CodeBlock>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Dashboard Features ── */}
          <section>
            <SectionHeading id="dashboard">Dashboard Features</SectionHeading>
            <p className="mt-4 text-sm text-muted-foreground mb-6">
              Your Bitmern dashboard at{" "}
              <a href="https://app.bitmernsolo.com" className="text-primary hover:underline font-medium">app.bitmernsolo.com</a>{" "}
              gives you full visibility into your mining operation.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { title: "Real-time hashrate chart", desc: "Live hashrate graph with hourly samples. See your total mining power and per-worker breakdown over the last 24 hours." },
                { title: "Worker management", desc: "View all connected workers with individual hashrate, shares per second, and online/offline status. Click any worker for its 24h chart." },
                { title: "Earnings tracking", desc: "Daily earnings history with running totals. See exactly when blocks were found and how much you earned." },
                { title: "Payout history", desc: "Complete payout log with transaction IDs linked to block explorers. Track every payout from discovery to wallet." },
                { title: "Profitability calculator", desc: "Estimate your odds of finding a block based on your hashrate and current network difficulty. Uses live coin prices." },
                { title: "Email alerts", desc: "Get notified when a worker goes offline, hashrate drops, a payout is sent, or a block is found. Configurable thresholds." },
              ].map((item) => (
                <div key={item.title} className="rounded-lg border border-border/40 p-5">
                  <h3 className="text-sm font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Alerts ── */}
          <section>
            <SectionHeading id="alerts">Alerts</SectionHeading>
            <p className="mt-4 text-sm text-muted-foreground mb-6">
              Bitmern monitors your mining operation and can notify you by email when something needs attention.
            </p>

            <div className="rounded-lg border border-border/40 overflow-hidden mb-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/40 bg-secondary/30">
                    <th className="px-4 py-2.5 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Alert type</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { type: "Worker offline", desc: "Triggered when a worker stops submitting shares. Configurable delay (default: 15 min)." },
                    { type: "Hashrate drop", desc: "Triggered when hashrate drops below a % of its recent average. Configurable threshold (default: 50%)." },
                    { type: "Payout sent", desc: "Notification when a block reward payout is sent to your wallet." },
                    { type: "Block found", desc: "Notification when one of your workers finds a valid block." },
                  ].map((a) => (
                    <tr key={a.type} className="border-b border-border/40 last:border-0">
                      <td className="px-4 py-3 font-medium text-sm whitespace-nowrap">{a.type}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{a.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="rounded-lg border border-border/40 bg-secondary/20 p-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Configure alerts</strong> at{" "}
                <a href="https://app.bitmernsolo.com/alerts" className="text-primary hover:underline">Dashboard → Alerts</a>.
                {" "}Customize thresholds for offline delay and hashrate drop percentage.
                Make sure email notifications are enabled in your profile settings.
              </p>
            </div>
          </section>

          {/* ── Infrastructure ── */}
          <section>
            <SectionHeading id="infrastructure">Infrastructure</SectionHeading>
            <p className="mt-4 text-sm text-muted-foreground mb-6">
              High-level overview of the technology powering Bitmern Solo.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { title: "Mining engine", desc: "Powered by Miningcore, a high-performance open-source pool framework. Handles stratum communication, share validation, block submission, and payouts." },
                { title: "Stratum protocol", desc: "Standard stratum protocol compatible with every major ASIC manufacturer. Multiple ports per coin with VarDiff on every connection." },
                { title: "Datacenter", desc: "Mining backend runs in a Dallas, TX datacenter with enterprise-grade networking. Additional regions planned based on demand." },
                { title: "Dashboard", desc: "Web dashboard is globally distributed via edge network for instant page loads. Real-time updates via server-sent events (SSE)." },
              ].map((item) => (
                <div key={item.title} className="rounded-lg border border-border/40 p-5">
                  <h3 className="text-sm font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── CTA ── */}
          <div className="rounded-lg border border-primary/20 bg-primary/5 p-8 text-center">
            <h2 className="text-2xl font-bold tracking-tight">Ready to mine?</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Create a free account and start submitting shares in minutes.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <Button size="lg" className="glow" asChild>
                <a href="https://app.bitmernsolo.com/signup">
                  Start Mining <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/getting-started">Getting Started Guide</Link>
              </Button>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
