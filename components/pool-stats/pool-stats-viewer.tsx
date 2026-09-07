"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { type PoolResult, type PoolInfo } from "@/lib/pool-stats";
import { PoolStatsChart } from "./pool-stats-chart";
import { formatDifficulty, formatHashrateCompact } from "@/lib/format";

function isError(p: PoolResult): p is Extract<PoolResult, { error: true }> {
  return "error" in p && p.error === true;
}

interface Props {
  pools: PoolResult[];
}

export function PoolStatsViewer({ pools }: Props) {
  const firstLive = useMemo(
    () => pools.findIndex((p) => !isError(p)),
    [pools]
  );
  const [selectedId, setSelectedId] = useState<string | null>(
    () => (firstLive >= 0 ? pools[firstLive].id : pools[0]?.id ?? null)
  );

  if (pools.length === 0) {
    return (
      <div className="rounded-2xl border border-border/40 bg-card/80 p-12 text-center">
        <div className="mx-auto mb-3 h-10 w-10 rounded-full border border-primary/30 bg-primary/10" />
        <p className="text-sm font-medium text-foreground">Pool stats are syncing</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Live Miningcore data will appear here shortly.
        </p>
      </div>
    );
  }

  const selected =
    pools.find((p) => p.id === selectedId) ?? pools[0];
  const selectedOk = selected && !isError(selected) ? (selected as PoolInfo) : null;

  return (
    <div className="space-y-6">
      {/* Coin cards grid — coins first / clear */}
      <div
        role="tablist"
        aria-label="Select coin"
        className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5"
      >
        {pools.map((p) => {
          const err = isError(p);
          const active = selected?.id === p.id;
          const live = !err && (p as PoolInfo).poolHashrate > 0;
          const hr = !err
            ? formatHashrateCompact((p as PoolInfo).poolHashrate)
            : null;

          return (
            <button
              key={p.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setSelectedId(p.id)}
              className={`group relative flex flex-col rounded-xl border p-4 text-left transition-all
                ${
                  active
                    ? "border-primary/50 bg-primary/5 shadow-[0_0_0_1px_rgba(212,175,55,0.15)] ring-1 ring-primary/20"
                    : "border-border/40 bg-card hover:border-border/70 hover:bg-card/90"
                }
              `}
            >
              <div className="mb-3 flex items-center gap-2.5">
                {p.icon ? (
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/40 bg-background/40">
                    <Image
                      src={p.icon}
                      alt=""
                      width={28}
                      height={28}
                      className={`h-7 w-7 ${err ? "opacity-70" : ""}`}
                    />
                  </span>
                ) : (
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary/40 text-[10px] font-bold text-muted-foreground">
                    {p.symbol.slice(0, 3)}
                  </span>
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <p className="truncate text-sm font-semibold tracking-tight">{p.name}</p>
                    <span className="shrink-0 rounded bg-secondary/60 px-1.5 py-0.5 font-mono text-[10px] font-medium text-muted-foreground">
                      {p.symbol}
                    </span>
                  </div>
                  <p className="truncate font-mono text-[10px] text-muted-foreground">{p.algo}</p>
                </div>
              </div>

              <div className="mb-3">
                <p className="mb-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                  Pool Hashrate
                </p>
                {err ? (
                  <div className="space-y-1.5">
                    <div className="h-5 w-24 animate-pulse rounded bg-secondary/50" />
                    <p className="text-[10px] font-medium text-primary/80">Syncing…</p>
                  </div>
                ) : live && hr ? (
                  <div className="flex h-7 items-baseline gap-1">
                    <span className="font-mono text-lg font-semibold leading-none text-foreground">
                      {hr.value}
                    </span>
                    <span className="text-[10px] text-muted-foreground">{hr.unit}</span>
                  </div>
                ) : (
                  <div className="flex h-7 items-baseline">
                    <span className="font-mono text-lg leading-none text-muted-foreground">—</span>
                  </div>
                )}
              </div>

              <div className="mt-auto grid grid-cols-2 gap-1.5">
                <div className="rounded-md border border-border/40 bg-background/30 px-2 py-1.5">
                  <p className="text-[9px] text-muted-foreground">Workers</p>
                  {err ? (
                    <div className="mt-1 h-3 w-8 animate-pulse rounded bg-secondary/40" />
                  ) : (
                    <div className="flex items-center gap-1">
                      <span
                        className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                          live ? "bg-green-500" : "bg-muted-foreground/30"
                        }`}
                      />
                      <span className="font-mono text-xs font-medium">
                        {(p as PoolInfo).workerCount}
                      </span>
                    </div>
                  )}
                </div>
                <div className="rounded-md border border-border/40 bg-background/30 px-2 py-1.5">
                  <p className="text-[9px] text-muted-foreground">Network</p>
                  {err ? (
                    <div className="mt-1 h-3 w-12 animate-pulse rounded bg-secondary/40" />
                  ) : (
                    <p className="truncate font-mono text-xs text-muted-foreground">
                      {(() => {
                        const n = formatHashrateCompact((p as PoolInfo).networkHashrate);
                        return `${n.value} ${n.unit}`;
                      })()}
                    </p>
                  )}
                </div>
              </div>

              <p className="mt-2 text-center font-mono text-[10px] text-muted-foreground">
                {err ? (
                  <span className="inline-flex items-center gap-1">
                    <span className="h-1 w-1 animate-pulse rounded-full bg-primary" />
                    Awaiting sync
                  </span>
                ) : (
                  <>Block #{(p as PoolInfo).blockHeight.toLocaleString()}</>
                )}
              </p>
            </button>
          );
        })}
      </div>

      {/* Detail panel for selected coin */}
      <div
        role="tabpanel"
        aria-label={selected ? `${selected.name} pool details` : "Pool details"}
        className="overflow-hidden rounded-2xl border border-border/40 bg-card"
      >
        {selectedOk ? (
          <>
            <div className="flex items-center justify-between border-b border-border/40 px-5 py-4">
              <div className="flex items-center gap-3">
                <Image
                  src={selectedOk.icon}
                  alt=""
                  width={32}
                  height={32}
                  className="h-8 w-8"
                />
                <div>
                  <h2 className="text-sm font-semibold">
                    {selectedOk.name}{" "}
                    <span className="font-mono text-xs text-muted-foreground">
                      {selectedOk.symbol}
                    </span>
                  </h2>
                  <p className="font-mono text-xs text-muted-foreground">
                    {selectedOk.algo} · Pool hashrate
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`h-2 w-2 rounded-full ${
                    selectedOk.poolHashrate > 0
                      ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"
                      : "bg-muted-foreground/30"
                  }`}
                />
                <span className="text-xs text-muted-foreground">
                  {selectedOk.poolHashrate > 0 ? "Active" : "Idle"}
                </span>
              </div>
            </div>

            <div className="px-4 py-4">
              <PoolStatsChart data={selectedOk.performance} />
            </div>

            <div className="grid grid-cols-2 border-t border-border/40 sm:grid-cols-5">
              {[
                {
                  label: "Pool Hashrate",
                  value:
                    selectedOk.poolHashrate > 0
                      ? (() => {
                          const h = formatHashrateCompact(selectedOk.poolHashrate);
                          return `${h.value} ${h.unit}`;
                        })()
                      : "—",
                },
                { label: "Workers", value: String(selectedOk.workerCount) },
                {
                  label: "Network Hashrate",
                  value: (() => {
                    const h = formatHashrateCompact(selectedOk.networkHashrate);
                    return `${h.value} ${h.unit}`;
                  })(),
                },
                {
                  label: "Difficulty",
                  value: formatDifficulty(selectedOk.networkDifficulty),
                },
                {
                  label: "Block Height",
                  value: `#${selectedOk.blockHeight.toLocaleString()}`,
                },
              ].map((stat, i, arr) => (
                <div
                  key={stat.label}
                  className={`px-5 py-4 ${
                    i < arr.length - 1 ? "border-b border-border/40 sm:border-b-0 sm:border-r" : ""
                  } ${i < 2 ? "sm:border-b-0" : ""}`}
                >
                  <p className="mb-1 text-[10px] uppercase tracking-wider text-muted-foreground">
                    {stat.label}
                  </p>
                  <p className="font-mono text-sm font-semibold">{stat.value}</p>
                </div>
              ))}
            </div>
          </>
        ) : selected ? (
          <div className="px-6 py-14 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/25 bg-primary/10">
              {selected.icon ? (
                <Image src={selected.icon} alt="" width={32} height={32} className="h-8 w-8 opacity-90" />
              ) : null}
            </div>
            <p className="text-sm font-semibold">
              {selected.name}{" "}
              <span className="font-mono text-xs text-muted-foreground">{selected.symbol}</span>
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Pool data is syncing from Miningcore.
            </p>
            <p className="mt-1 text-xs text-muted-foreground/80">
              Other coins stay available — this card will fill in automatically.
            </p>
            <div className="mx-auto mt-6 grid max-w-md grid-cols-3 gap-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-16 animate-pulse rounded-lg border border-border/30 bg-secondary/30"
                  style={{ animationDelay: `${i * 120}ms` }}
                />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
