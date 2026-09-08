import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Boxes, ExternalLink, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchBlocksSummary, type BlockStatus } from "@/lib/pool-blocks";
import { fetchRecentFoundBlocks, type FoundBlock } from "@/lib/found-blocks";

export const metadata: Metadata = {
  title: "DigiByte Blocks Found — Bitmern Solo",
  description:
    "DigiByte (and other coin) blocks discovered on Bitmern Solo with explorer verification links. Flat 1% pool fee — keep 99%.",
};

function formatRelative(iso: string): string {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "—";
  const mins = Math.round((Date.now() - then) / 60_000);
  if (mins < 60) return `${Math.max(1, mins)}m ago`;
  const hours = Math.round(mins / 60);
  if (hours < 48) return `${hours}h ago`;
  return `${Math.round(hours / 24)}d ago`;
}

function StatusBadge({ status }: { status: BlockStatus }) {
  const styles =
    status === "confirmed"
      ? "border-green-500/30 bg-green-500/10 text-green-400"
      : "border-yellow-500/30 bg-yellow-500/10 text-yellow-400";
  return (
    <span className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase ${styles}`}>
      {status}
    </span>
  );
}

function BlockRow({ block }: { block: FoundBlock }) {
  const shortHash = block.hash ? `${block.hash.slice(0, 10)}…${block.hash.slice(-8)}` : null;
  return (
    <tr className="border-b border-border/30 last:border-0 hover:bg-secondary/20">
      <td className="px-3 py-3 sm:px-4">
        <div className="flex items-center gap-2.5">
          {block.icon ? <Image src={block.icon} alt="" width={22} height={22} className="rounded-full" /> : null}
          <div>
            <div className="text-sm font-semibold">{block.symbol}</div>
            <div className="text-[11px] text-muted-foreground">{block.name}</div>
          </div>
        </div>
      </td>
      <td className="px-3 py-3 font-mono text-sm tabular-nums">#{block.height.toLocaleString()}</td>
      <td className="px-3 py-3"><StatusBadge status={block.status} /></td>
      <td className="px-3 py-3 text-sm text-muted-foreground whitespace-nowrap">{formatRelative(block.created)}</td>
      <td className="px-3 py-3 hidden md:table-cell font-mono text-xs text-muted-foreground">{shortHash ?? "—"}</td>
      <td className="px-3 py-3 text-right">
        {block.explorerUrl ? (
          <a href={block.explorerUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-primary hover:underline font-medium">
            Verify <ExternalLink className="h-3.5 w-3.5" aria-hidden />
            <span className="sr-only">(opens explorer)</span>
          </a>
        ) : (
          <span className="text-xs text-muted-foreground">—</span>
        )}
      </td>
    </tr>
  );
}

export default async function BlocksPage() {
  const [summary, blocks] = await Promise.all([
    fetchBlocksSummary(),
    fetchRecentFoundBlocks(120),
  ]);

  const digibyte = summary.perCoin.find((c) => c.symbol === "DGB");
  const digibyteConfirmed = digibyte?.confirmed ?? 0;

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card px-3 py-1 text-xs text-muted-foreground mb-6">
          <Boxes className="h-3.5 w-3.5" /> Live from Miningcore
        </div>
        <h1 className="font-bold tracking-tight" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
          DigiByte blocks we&apos;ve found
        </h1>
        <p className="mt-3 mx-auto max-w-2xl text-muted-foreground leading-relaxed">
          Public record of Bitmern Solo finds by coin (currently dominated by{" "}
          <span className="text-foreground font-medium">DigiByte</span>). Each row links to a blockchain explorer.
          Flat <span className="text-foreground font-medium">1% pool fee</span> — miners keep 99%.
          These are not Bitcoin blocks unless the coin column says BTC.
        </p>
      </div>

      <div className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {summary.perCoin.map((c) => (
          <div key={c.id} className="flex items-center gap-3 rounded-lg border border-border/60 bg-card/50 px-4 py-3">
            {c.icon ? <Image src={c.icon} alt={c.name} width={28} height={28} className="rounded-full" /> : null}
            <div>
              <div className="text-xs text-muted-foreground">{c.name} ({c.symbol})</div>
              <div className="text-lg font-bold tabular-nums">{c.confirmed.toLocaleString()}</div>
              <div className="text-[10px] text-muted-foreground">confirmed</div>
              {c.pending > 0 ? <div className="text-[10px] text-muted-foreground">+{c.pending} pending</div> : null}
            </div>
          </div>
        ))}
      </div>

      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">Recent blocks</h2>
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{digibyteConfirmed.toLocaleString()} DigiByte</span> confirmed
            {summary.totalConfirmed !== digibyteConfirmed
              ? ` · ${summary.totalConfirmed.toLocaleString()} across all coins`
              : ""}
            {summary.latest ? ` · latest ${summary.latest.symbol === "DGB" ? "DigiByte" : summary.latest.symbol} #${summary.latest.height.toLocaleString()}` : ""}
          </p>
        </div>
        <Link href="/pool-stats" className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline font-medium">
          View pool stats <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {blocks.length === 0 ? (
        <div className="rounded-xl border border-border/40 bg-card/40 px-6 py-16 text-center">
          <Boxes className="mx-auto h-8 w-8 text-muted-foreground/40 mb-3" />
          <h3 className="font-heading font-medium">No DigiByte (or other) blocks to show yet</h3>
          <p className="mt-1 text-sm text-muted-foreground">When the pool finds a block, it appears here with an explorer link.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-border/40 bg-card/40">
          <table className="w-full min-w-[640px] text-left">
            <thead>
              <tr className="border-b border-border/40 text-[11px] uppercase tracking-wider text-muted-foreground">
                <th className="px-3 py-3 font-medium">Coin</th>
                <th className="px-3 py-3 font-medium">Height</th>
                <th className="px-3 py-3 font-medium">Status</th>
                <th className="px-3 py-3 font-medium">Found</th>
                <th className="px-3 py-3 font-medium hidden md:table-cell">Hash</th>
                <th className="px-3 py-3 font-medium text-right">Explorer</th>
              </tr>
            </thead>
            <tbody>
              {blocks.map((b) => (
                <BlockRow key={`${b.poolId}-${b.height}-${b.hash ?? b.created}`} block={b} />
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-16 text-center rounded-xl border border-primary/20 bg-primary/5 p-8">
        <h2 className="text-2xl font-bold tracking-tight">Mine the next DigiByte block</h2>
        <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
          Point your miner at Bitmern Solo. Keep 99% of the reward — flat 1% pool fee.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Button size="lg" className="glow" asChild>
            <a href="https://app.bitmernsolo.com/signup">Start Mining <ArrowRight className="ml-2 h-4 w-4" /></a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/getting-started">Getting Started</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
