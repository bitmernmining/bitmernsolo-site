import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight } from "lucide-react";
import { STRATUM, WALLETS, type CoinSymbol } from "@/lib/data";
import { QuickConnectCard } from "./quick-connect-card";

export const metadata: Metadata = {
  title: "Getting Started — Bitmern Solo",
  description:
    "Solo mining setup in two steps: paste your wallet address, copy the pool config. ViaBTC-simple, with all the depth available when you need it.",
};

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

const FAQ = [
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
];

export default function GettingStartedPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="text-center mb-10">
        <h1 className="font-bold tracking-tight" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
          Getting started
        </h1>
        <p className="mt-3 mx-auto max-w-xl text-muted-foreground leading-relaxed">
          Paste your wallet address, copy the config, point your miner at us. Done.
        </p>
      </div>

      {/* Thin trust strip */}
      <p className="mb-6 text-center text-xs sm:text-sm text-muted-foreground">
        <span className="text-foreground font-medium">Solo mining</span>
        <span className="mx-2 text-border">·</span>
        <span className="text-foreground font-medium">1% fee only on found blocks</span>
        <span className="mx-2 text-border">·</span>
        <span className="text-foreground font-medium">Direct payouts to your wallet</span>
      </p>

      {/* Above the fold — Quick Connect */}
      <QuickConnectCard />

      {/* Below the fold — collapsibles */}
      <div className="mt-12">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
          More setup details
        </h2>
        <Accordion type="multiple" className="w-full">
          <AccordionItem value="wallets">
            <AccordionTrigger>Don&apos;t have a wallet yet? Recommended options</AccordionTrigger>
            <AccordionContent>
              <p className="mb-3 text-sm text-muted-foreground">
                You must use a wallet where you control the private keys. Never use an exchange address for mining payouts.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {(Object.entries(WALLETS) as [CoinSymbol, typeof WALLETS[CoinSymbol]][]).map(([symbol, { coin, wallets }]) => (
                  <div key={symbol} className="rounded-xl border border-border/40 bg-card p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Image src={`/coins/${symbol.toLowerCase()}.svg`} alt={coin} width={20} height={20} />
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
                              <a href={w.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
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
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="all-ports">
            <AccordionTrigger>All stratum endpoints &amp; ports</AccordionTrigger>
            <AccordionContent>
              <p className="mb-3 text-sm text-muted-foreground">
                Copy these into your miner&apos;s pool configuration. All ports use{" "}
                <span className="text-foreground font-medium">VarDiff</span> — difficulty auto-adjusts to match your miner&apos;s speed. The number shown is the starting difficulty.
              </p>
              <div className="space-y-4">
                {STRATUM.map((s) => (
                  <div key={s.coin} className="rounded-xl border border-border/40 bg-card overflow-hidden">
                    <div className="flex items-center gap-2.5 border-b border-border/40 px-4 py-3">
                      <Image src={s.icon} alt={s.name} width={20} height={20} />
                      <span className="text-sm font-semibold">{s.name}</span>
                      <span className="text-xs text-muted-foreground font-mono">{s.algo}</span>
                    </div>
                    <div className="p-4 space-y-2">
                      {s.ports.map((p, i) => (
                        <div
                          key={p.port}
                          className={`flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 rounded-lg px-3 py-2.5 ${
                            i === 0 ? "bg-primary/10 border border-primary/20" : "bg-secondary/50"
                          }`}
                        >
                          <code className="font-mono text-sm font-medium shrink-0">{s.host}:{p.port}</code>
                          <div className="flex items-center gap-2">
                            <span className="rounded bg-secondary px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                              VarDiff {p.diff}
                            </span>
                            <span className="text-xs text-muted-foreground">{p.label}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="hardware">
            <AccordionTrigger>Compatible mining hardware</AccordionTrigger>
            <AccordionContent>
              <p className="mb-3 text-sm text-muted-foreground">
                Any ASIC miner that supports the stratum protocol will work. Here are popular models for each algorithm we support.
              </p>
              <div className="space-y-4">
                {HARDWARE.map((group) => (
                  <div key={group.algo} className="rounded-xl border border-border/40 bg-card overflow-hidden">
                    <div className="border-b border-border/40 px-4 py-3">
                      <span className="text-sm font-semibold">{group.algo}</span>
                      <span className="ml-2 text-xs text-muted-foreground">{group.coins}</span>
                    </div>
                    <div className="divide-y divide-border/40">
                      {group.miners.map((m) => (
                        <div key={m.name} className="flex items-center justify-between px-4 py-2.5">
                          <div>
                            <p className="text-sm">{m.name}</p>
                            <p className="text-xs text-muted-foreground">{m.note}</p>
                          </div>
                          <span className="font-mono text-xs text-muted-foreground shrink-0 ml-3">{m.hashrate}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="port-guide">
            <AccordionTrigger>Choosing the right port (difficulty guide)</AccordionTrigger>
            <AccordionContent>
              <p className="mb-3 text-sm text-muted-foreground">
                All ports use VarDiff, which automatically adjusts difficulty to your miner&apos;s speed. If you&apos;re unsure, use the default (highest) port — it works for everyone.
              </p>
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
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="faq">
            <AccordionTrigger>Common questions</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3">
                {FAQ.map((item) => (
                  <div key={item.q} className="rounded-xl border border-border/40 bg-card p-4">
                    <h3 className="text-sm font-semibold">{item.q}</h3>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Final CTA */}
      <div className="mt-16 text-center rounded-xl border border-primary/20 bg-primary/5 p-8">
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
            <a href="https://app.bitmernsolo.com/login">Log In</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
