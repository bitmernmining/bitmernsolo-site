import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { POOL_ORDER } from "@/lib/pool-stats";

const HASH_UNITS = ["H/s", "KH/s", "MH/s", "GH/s", "TH/s", "PH/s", "EH/s", "ZH/s"];

function formatHashrate(h: number): { value: string; unit: string } {
  if (h === 0) return { value: "0", unit: "H/s" };
  let i = 0;
  let v = h;
  while (v >= 1000 && i < HASH_UNITS.length - 1) {
    v /= 1000;
    i++;
  }
  return { value: v.toFixed(2), unit: HASH_UNITS[i] };
}

const COIN_MAP: Record<string, { symbol: string; name: string; icon: string }> = {
  "bitcoin-solo": { symbol: "BTC", name: "Bitcoin", icon: "/coins/btc.svg" },
  "litecoin-solo": { symbol: "LTC", name: "Litecoin", icon: "/coins/ltc.svg" },
  "dogecoin-solo": { symbol: "DOGE", name: "Dogecoin", icon: "/coins/doge.svg" },
  "bitcoincash-solo": { symbol: "BCH", name: "Bitcoin Cash", icon: "/coins/bch.svg" },
  "digibyte-solo": { symbol: "DGB", name: "DigiByte", icon: "/coins/dgb.svg" },
  "ecash-solo": { symbol: "XEC", name: "eCash", icon: "/coins/xec.svg" },
  "ethereumclassic-solo": { symbol: "ETC", name: "Ethereum Classic", icon: "/coins/etc.svg" },
  "zcash-solo": { symbol: "ZEC", name: "Zcash", icon: "/coins/zec.svg" },
  "monero-solo": { symbol: "XMR", name: "Monero", icon: "/coins/xmr.svg" },
  "ravencoin-solo": { symbol: "RVN", name: "Ravencoin", icon: "/coins/rvn.svg" },
};

interface PoolData {
  id: string;
  coin: { name: string; symbol: string; algorithm: string };
  poolStats: { poolHashrate: number; connectedMiners: number };
  networkStats: { networkHashrate: number; blockHeight: number };
}

async function fetchPools(): Promise<PoolData[]> {
  try {
    const BASE = process.env.MININGCORE_API_URL ?? "";
    const res = await fetch(`${BASE}/api/pools`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.pools ?? [];
  } catch {
    return [];
  }
}

export async function Pools() {
  const pools = await fetchPools();
  const byId = new Map(pools.map((p) => [p.id, p]));

  const rows = POOL_ORDER.map((id) => {
    const meta = COIN_MAP[id];
    const live = byId.get(id);
    const hashrate = live?.poolStats.poolHashrate ?? 0;
    const height = live?.networkStats.blockHeight ?? 0;
    const algo = live?.coin.algorithm ?? "";
    return {
      id,
      meta,
      hashrate,
      height,
      algo,
      isActive: hashrate > 0,
      online: !!live,
    };
  }).filter((r) => r.meta);

  const activeCount = rows.filter((r) => r.isActive).length;
  const onlineCount = rows.filter((r) => r.online).length;

  return (
    <section id="pools">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Pool status
          </h2>
          <p className="mt-2 text-muted-foreground max-w-xl mx-auto">
            {onlineCount} coins online
            {activeCount > 0 ? ` · ${activeCount} with live hashrate` : ""}.
            Full live cards live on the pool stats page — we keep this light while the network is quiet.
          </p>
        </div>

        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
          {rows.map((row) => {
            const hr = formatHashrate(row.hashrate);
            return (
              <div
                key={row.id}
                className="flex items-center gap-3 rounded-xl border border-border/40 bg-card px-3 py-3"
              >
                {row.meta && (
                  <Image
                    src={row.meta.icon}
                    alt={row.meta.name}
                    width={28}
                    height={28}
                    className="h-7 w-7 shrink-0"
                  />
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-semibold truncate">{row.meta?.symbol}</p>
                    <span
                      className={`h-1.5 w-1.5 rounded-full shrink-0 ${
                        row.isActive
                          ? "bg-green-500"
                          : row.online
                            ? "bg-amber-400"
                            : "bg-muted-foreground/30"
                      }`}
                    />
                  </div>
                  {row.isActive ? (
                    <p className="font-mono text-[11px] text-muted-foreground truncate">
                      {hr.value} {hr.unit}
                    </p>
                  ) : (
                    <p className="text-[11px] text-muted-foreground truncate">
                      {row.online
                        ? row.height > 0
                          ? `Ready · #${row.height.toLocaleString()}`
                          : "Ready to mine"
                        : "Coming online"}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
          <Link
            href="#blocks-found"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            See blocks we&apos;ve found
          </Link>
          <Link
            href="/pool-stats"
            className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline font-medium"
          >
            View full pool stats
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
