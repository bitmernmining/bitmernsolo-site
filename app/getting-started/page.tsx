import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Getting Started — Bitmern Solo",
  description:
    "Step-by-step guide to solo mining with Bitmern. Sign up, connect your ASIC, and start submitting shares in minutes.",
};

/* ── Data ── */

const STEPS = [
  {
    n: 1,
    title: "Create a free account",
    description:
      "Sign up at app.bitmernsolo.com with just an email address. No KYC, no verification delays. You'll be in your dashboard in under a minute.",
    cta: { label: "Create Account", href: "https://app.bitmernsolo.com/signup" },
  },
  {
    n: 2,
    title: "Get a wallet you control",
    description:
      "You need a wallet where you own the private keys. Do not use an exchange address — if your miner finds a block, the reward goes directly to this wallet.",
  },
  {
    n: 3,
    title: "Add your wallet address",
    description:
      "In your Bitmern dashboard, enter your wallet address for the coin you want to mine. This is where block rewards are sent when you find a block.",
  },
  {
    n: 4,
    title: "Configure your miner",
    description:
      "Point your ASIC at one of our stratum endpoints using the connection details below. Your miner will start submitting shares within seconds.",
  },
  {
    n: 5,
    title: "Start mining",
    description:
      "Once connected, your hashrate, workers, and stats show up in your dashboard in real time. That's it — you're solo mining.",
  },
];

const WALLETS: Record<string, { coin: string; wallets: { name: string; type: string; url: string; note: string }[] }> = {
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
};

const STRATUM = [
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
      { port: 3062, diff: "25k", label: "Default — works with any Scrypt ASIC" },
      { port: 3072, diff: "10k", label: "For smaller ASICs" },
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
];

const HARDWARE = [
  {
    algo: "SHA-256d",
    coins: "BTC, BCH, DGB",
    miners: [
      { name: "Bitmain Antminer S21 Pro", hashrate: "~234 TH/s", note: "Current flagship" },
      { name: "Bitmain Antminer S21", hashrate: "~200 TH/s", note: "High-end" },
      { name: "Bitmain Antminer S19k Pro", hashrate: "~120 TH/s", note: "Mid-range" },
      { name: "MicroBT Whatsminer M60S", hashrate: "~186 TH/s", note: "High-end" },
      { name: "MicroBT Whatsminer M50S", hashrate: "~126 TH/s", note: "Mid-range" },
      { name: "Bitaxe (open-source)", hashrate: "~1.2 TH/s", note: "Solo miner hobbyist hardware" },
    ],
  },
  {
    algo: "Scrypt",
    coins: "LTC, DOGE",
    miners: [
      { name: "Bitmain Antminer L9", hashrate: "~16 GH/s", note: "Current flagship" },
      { name: "Bitmain Antminer L7", hashrate: "~9.5 GH/s", note: "High-end" },
      { name: "Elphapex DG1+", hashrate: "~14 GH/s", note: "High-end" },
      { name: "Goldshell Mini-Doge III", hashrate: "~800 MH/s", note: "Compact home miner" },
    ],
  },
];

const DIFF_GUIDE = [
  { hashrate: "< 10 TH/s", sha256Port: "Lowest available", scryptPort: "Lowest available", note: "Small ASICs, Bitaxe, older hardware" },
  { hashrate: "10–100 TH/s", sha256Port: "Low or Medium", scryptPort: "Default", note: "Single mid-range ASIC" },
  { hashrate: "100+ TH/s", sha256Port: "Default (highest)", scryptPort: "Default (highest)", note: "Modern ASICs, multiple units" },
];

/* ── Page ── */

export default function GettingStartedPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
      {/* Header */}
      <div className="text-center mb-16">
        <h1
          className="font-bold tracking-tight"
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
        >
          Getting started
        </h1>
        <p className="mt-3 mx-auto max-w-xl text-muted-foreground leading-relaxed">
          From zero to mining in about five minutes. Create an account, point
          your miner at our stratum, and you&apos;re done.
        </p>
      </div>

      {/* How it works summary */}
      <div className="rounded-xl border border-primary/20 bg-primary/5 p-6 mb-16">
        <h2 className="text-lg font-semibold mb-1">How Bitmern Solo works</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Bitmern is a <span className="text-foreground font-medium">solo mining pool</span>.
          Your miners submit shares to our infrastructure, and when one of your workers
          finds a valid block, the entire block reward goes to your wallet. We take a
          flat 1% fee. No shared payouts, no splitting rewards with strangers.
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-border/40 bg-card p-3">
            <p className="text-sm font-medium">100% of the block reward</p>
            <p className="text-xs text-muted-foreground mt-0.5">Minus 1% pool fee</p>
          </div>
          <div className="rounded-lg border border-border/40 bg-card p-3">
            <p className="text-sm font-medium">Direct to your wallet</p>
            <p className="text-xs text-muted-foreground mt-0.5">No custodial holding</p>
          </div>
          <div className="rounded-lg border border-border/40 bg-card p-3">
            <p className="text-sm font-medium">5 coins supported</p>
            <p className="text-xs text-muted-foreground mt-0.5">BTC, LTC, DOGE, BCH, DGB</p>
          </div>
        </div>
      </div>

      {/* ── Steps ── */}
      <div className="space-y-6 mb-16">
        <h2 className="text-2xl font-bold tracking-tight">Setup in 5 steps</h2>
        <div className="space-y-4">
          {STEPS.map((step) => (
            <div
              key={step.n}
              className="flex gap-4 rounded-xl border border-border/40 bg-card p-5"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                {step.n}
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-semibold">{step.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
                {step.cta && (
                  <Button size="sm" className="mt-3 glow" asChild>
                    <a href={step.cta.href}>
                      {step.cta.label}
                      <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                    </a>
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Wallet recommendations ── */}
      <div className="space-y-6 mb-16">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Recommended wallets
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            You must use a wallet where you control the private keys. Never use
            an exchange address for mining payouts.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {Object.entries(WALLETS).map(([symbol, { coin, wallets }]) => (
            <div
              key={symbol}
              className="rounded-xl border border-border/40 bg-card p-4"
            >
              <div className="flex items-center gap-2 mb-3">
                <Image
                  src={`/coins/${symbol.toLowerCase()}.svg`}
                  alt={coin}
                  width={20}
                  height={20}
                />
                <span className="text-sm font-semibold">{coin}</span>
              </div>
              <ul className="space-y-2">
                {wallets.map((w) => (
                  <li key={w.name} className="flex items-start gap-2 text-sm">
                    <span className="shrink-0 rounded bg-secondary px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                      {w.type}
                    </span>
                    <div className="min-w-0">
                      {w.url ? (
                        <a
                          href={w.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          {w.name}
                        </a>
                      ) : (
                        <span>{w.name}</span>
                      )}
                      <span className="text-muted-foreground"> — {w.note}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── Stratum endpoints ── */}
      <div className="space-y-6 mb-16">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Stratum endpoints
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Copy these into your miner&apos;s pool configuration. All ports use{" "}
            <span className="text-foreground font-medium">VarDiff</span> —
            difficulty auto-adjusts to match your miner&apos;s speed. The number
            shown is the starting difficulty.
          </p>
        </div>

        <div className="space-y-4">
          {STRATUM.map((s) => (
            <div
              key={s.coin}
              className="rounded-xl border border-border/40 bg-card overflow-hidden"
            >
              <div className="flex items-center gap-2.5 border-b border-border/40 px-4 py-3">
                <Image src={s.icon} alt={s.name} width={20} height={20} />
                <span className="text-sm font-semibold">{s.name}</span>
                <span className="text-xs text-muted-foreground font-mono">
                  {s.algo}
                </span>
              </div>
              <div className="p-4 space-y-2">
                {s.ports.map((p, i) => (
                  <div
                    key={p.port}
                    className={`flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 rounded-lg px-3 py-2.5 ${
                      i === 0
                        ? "bg-primary/10 border border-primary/20"
                        : "bg-secondary/50"
                    }`}
                  >
                    <code className="font-mono text-sm font-medium shrink-0">
                      {s.host}:{p.port}
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
          ))}
        </div>

        {/* Worker credentials */}
        <div className="rounded-xl border border-border/40 bg-card p-5">
          <h3 className="text-sm font-semibold mb-3">Worker credentials</h3>
          <div className="rounded-lg bg-secondary/50 px-4 py-3 space-y-2 font-mono text-sm">
            <div>
              <span className="text-xs text-muted-foreground font-sans">
                Username
              </span>
              <p className="text-primary">YOUR_WALLET_ADDRESS.worker1</p>
            </div>
            <div>
              <span className="text-xs text-muted-foreground font-sans">
                Password
              </span>
              <p>x</p>
            </div>
          </div>
          <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
            The part after the dot is your worker name — use any label you want
            (e.g.{" "}
            <code className="text-foreground">antminer-s21</code>,{" "}
            <code className="text-foreground">garage-rig</code>). Each worker
            shows up separately in your dashboard. Password can be anything.
          </p>
        </div>

        {/* Config examples */}
        <div className="rounded-xl border border-border/40 bg-card p-5">
          <h3 className="text-sm font-semibold mb-3">Configuration examples</h3>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-muted-foreground mb-1.5">
                Antminer / Whatsminer web interface
              </p>
              <div className="rounded-lg bg-secondary/50 px-4 py-3">
                <pre className="font-mono text-xs leading-loose text-foreground">
{`Pool URL:  stratum+tcp://btc.bitmernsolo.com:3102
Worker:    YOUR_WALLET_ADDRESS.worker1
Password:  x`}
                </pre>
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1.5">
                CGMiner / BFGMiner / command line
              </p>
              <div className="rounded-lg bg-secondary/50 px-4 py-3">
                <pre className="font-mono text-xs leading-loose text-foreground">
{`cgminer -o stratum+tcp://btc.bitmernsolo.com:3102 \\
  -u YOUR_WALLET_ADDRESS.worker1 \\
  -p x`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Mining hardware guide ── */}
      <div className="space-y-6 mb-16">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Compatible mining hardware
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Any ASIC miner that supports the stratum protocol will work. Here are
            popular models for each algorithm we support.
          </p>
        </div>

        {HARDWARE.map((group) => (
          <div
            key={group.algo}
            className="rounded-xl border border-border/40 bg-card overflow-hidden"
          >
            <div className="border-b border-border/40 px-4 py-3">
              <span className="text-sm font-semibold">{group.algo}</span>
              <span className="ml-2 text-xs text-muted-foreground">
                {group.coins}
              </span>
            </div>
            <div className="divide-y divide-border/40">
              {group.miners.map((m) => (
                <div
                  key={m.name}
                  className="flex items-center justify-between px-4 py-2.5"
                >
                  <div>
                    <p className="text-sm">{m.name}</p>
                    <p className="text-xs text-muted-foreground">{m.note}</p>
                  </div>
                  <span className="font-mono text-xs text-muted-foreground shrink-0 ml-3">
                    {m.hashrate}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}

        <p className="text-xs text-muted-foreground">
          This is not an exhaustive list. Any SHA-256 or Scrypt ASIC miner that
          supports the stratum protocol will work with Bitmern Solo.
        </p>
      </div>

      {/* ── Difficulty guide ── */}
      <div className="space-y-6 mb-16">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Choosing the right port
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            All ports use VarDiff, which automatically adjusts difficulty to your
            miner&apos;s speed. The starting difficulty just sets where VarDiff
            begins. If you&apos;re unsure, use the default (highest) port — it
            works for everyone.
          </p>
        </div>

        <div className="rounded-xl border border-border/40 bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/40 bg-secondary/30">
                  <th className="px-4 py-2.5 text-left font-medium">Your hashrate</th>
                  <th className="px-4 py-2.5 text-left font-medium">SHA-256 port</th>
                  <th className="px-4 py-2.5 text-left font-medium">Scrypt port</th>
                  <th className="px-4 py-2.5 text-left font-medium">Examples</th>
                </tr>
              </thead>
              <tbody>
                {DIFF_GUIDE.map((row) => (
                  <tr key={row.hashrate} className="border-b border-border/40 last:border-0">
                    <td className="px-4 py-2.5 font-mono text-xs">{row.hashrate}</td>
                    <td className="px-4 py-2.5 text-xs">{row.sha256Port}</td>
                    <td className="px-4 py-2.5 text-xs">{row.scryptPort}</td>
                    <td className="px-4 py-2.5 text-xs text-muted-foreground">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-lg border border-border/40 bg-secondary/30 p-4">
          <h3 className="text-sm font-semibold mb-1">What is VarDiff?</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            VarDiff (Variable Difficulty) automatically adjusts the share
            difficulty sent to your miner based on how fast it&apos;s hashing.
            This keeps your miner submitting shares at a steady rate — not too
            fast (which wastes bandwidth) and not too slow (which makes your
            dashboard stats laggy). You don&apos;t need to configure anything;
            it happens automatically on our end.
          </p>
        </div>
      </div>

      {/* ── FAQ-style tips ── */}
      <div className="space-y-6 mb-16">
        <h2 className="text-2xl font-bold tracking-tight">
          Common questions
        </h2>

        <div className="space-y-3">
          {[
            {
              q: "How long until I find a block?",
              a: "It depends on your hashrate relative to the network. Solo mining is like a lottery — you might find a block in an hour or it might take months. Use the calculator in your dashboard to estimate your odds.",
            },
            {
              q: "Can I mine multiple coins at once?",
              a: "Yes. Add wallet addresses for each coin in your dashboard and point different miners at different stratum endpoints. Each coin has its own pool.",
            },
            {
              q: "What happens if my miner disconnects?",
              a: "Nothing bad. Reconnect whenever you're ready. If you have alerts enabled, we'll email you when a worker goes offline.",
            },
            {
              q: "Do I need to keep my computer on?",
              a: "Your ASIC miner needs to stay running and connected to the internet, but you don't need a computer on. The Bitmern dashboard is a web app — check it from any device.",
            },
            {
              q: "Where is the pool server located?",
              a: "Our infrastructure is in Dallas, TX (US Central). We plan to add more regions based on demand.",
            },
          ].map((item) => (
            <div
              key={item.q}
              className="rounded-xl border border-border/40 bg-card p-4"
            >
              <h3 className="text-sm font-semibold">{item.q}</h3>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
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
            <a href="https://app.bitmernsolo.com/login">
              Log In
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
