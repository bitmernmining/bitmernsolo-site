import Image from "next/image";
import { Sparkles } from "lucide-react";
import { fetchBlocksSummary } from "@/lib/pool-blocks";

const COIN_ICON: Record<string, string> = {
  BTC: "/coins/btc.svg",
  BCH: "/coins/bch.svg",
  LTC: "/coins/ltc.svg",
  DOGE: "/coins/doge.svg",
  DGB: "/coins/dgb.svg",
};

const WITHIN_MINUTES = 60;

function isRecent(iso: string, minutes: number): boolean {
  const t = new Date(iso).getTime();
  if (Number.isNaN(t)) return false;
  return Date.now() - t < minutes * 60_000;
}

function formatRelative(iso: string): string {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "moments ago";
  const minsAgo = Math.max(1, Math.round((Date.now() - then) / 60_000));
  if (minsAgo < 60) return `${minsAgo} minute${minsAgo === 1 ? "" : "s"} ago`;
  return "less than an hour ago";
}

export async function NewBlockBanner() {
  let latest: Awaited<ReturnType<typeof fetchBlocksSummary>>["latest"] = null;
  try {
    const summary = await fetchBlocksSummary();
    latest = summary.latest;
  } catch {
    return null;
  }

  if (!latest || latest.status !== "confirmed") return null;
  if (!isRecent(latest.created, WITHIN_MINUTES)) return null;

  const icon = COIN_ICON[latest.symbol];

  return (
    <div className="border-b border-amber-500/30 bg-amber-500/10">
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-3 px-4 py-2.5 text-sm sm:px-6">
        <Sparkles className="h-4 w-4 shrink-0 text-amber-400" aria-hidden />
        <span>
          <span className="font-semibold text-foreground">New block found!</span>{" "}
          <span className="text-muted-foreground">
            {icon ? (
              <Image
                src={icon}
                alt={latest.symbol}
                width={14}
                height={14}
                className="mx-1 inline-block align-text-bottom rounded-full"
              />
            ) : null}
            <span className="font-medium text-foreground">{latest.symbol}</span>{" "}
            <span className="font-mono">#{latest.height.toLocaleString()}</span>
            {" · "}
            {formatRelative(latest.created)}
          </span>
        </span>
      </div>
    </div>
  );
}
