import Image from "next/image";
import { Boxes } from "lucide-react";
import { fetchBlocksSummary } from "@/lib/pool-blocks";

const RELATIVE_UNITS: Array<[Intl.RelativeTimeFormatUnit, number]> = [
  ["second", 60],
  ["minute", 60],
  ["hour", 24],
  ["day", 30],
  ["month", 12],
  ["year", Infinity],
];

function formatRelative(iso: string): string {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "—";
  const diffSec = Math.round((then - Date.now()) / 1000);
  let value = diffSec;
  let unit: Intl.RelativeTimeFormatUnit = "second";
  for (const [u, threshold] of RELATIVE_UNITS) {
    if (Math.abs(value) < threshold) {
      unit = u;
      break;
    }
    value = Math.round(value / threshold);
  }
  return new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(value, unit);
}

function isRecent(iso: string, withinMinutes: number): boolean {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return false;
  return Date.now() - then < withinMinutes * 60_000;
}

export async function BlocksFound() {
  const summary = await fetchBlocksSummary();

  // Hide the section entirely if upstream fully failed and we have zero data.
  if (summary.totalAll === 0 && summary.perCoin.every((c) => c.total === 0)) {
    return null;
  }

  const recent = summary.latest ? isRecent(summary.latest.created, 60) : false;

  return (
    <section id="blocks-found" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 dot-grid opacity-30" />
      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card px-3 py-1 text-xs text-muted-foreground mb-6">
            <Boxes className="h-3.5 w-3.5" />
            Live from the pool
          </div>
          <h2 className="text-4xl font-bold tracking-tight lg:text-5xl">
            <span className="text-gradient">{summary.totalConfirmed.toLocaleString()}</span> blocks found
          </h2>
          <p className="mt-4 mx-auto max-w-xl text-muted-foreground">
            Every block Bitmern Solo has discovered, across all five chains. Updated live from the pool — confirmed only.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {summary.perCoin.map((c) => (
            <div
              key={c.id}
              className="flex items-center gap-3 rounded-lg border border-border/60 bg-card/50 px-4 py-3"
            >
              {c.icon ? (
                <Image src={c.icon} alt={c.symbol} width={32} height={32} className="rounded-full" />
              ) : null}
              <div className="min-w-0">
                <div className="text-xs text-muted-foreground">{c.symbol}</div>
                <div className="text-xl font-bold tabular-nums">{c.confirmed.toLocaleString()}</div>
                {c.pending > 0 ? (
                  <div className="text-[10px] text-muted-foreground">+{c.pending} pending</div>
                ) : null}
              </div>
            </div>
          ))}
        </div>

        {summary.latest ? (
          <div className="mt-10 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <span
              className={`h-2 w-2 rounded-full ${recent ? "bg-green-500 animate-pulse" : "bg-muted-foreground/40"}`}
              aria-hidden
            />
            <span>
              Last block:{" "}
              <span className="font-medium text-foreground">{summary.latest.symbol}</span>{" "}
              <span className="font-mono">#{summary.latest.height.toLocaleString()}</span>
              {" · "}
              {formatRelative(summary.latest.created)}
            </span>
          </div>
        ) : null}
      </div>
    </section>
  );
}
