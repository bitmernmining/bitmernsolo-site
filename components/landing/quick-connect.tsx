"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Copy } from "lucide-react";
import { STRATUM, type CoinSymbol } from "@/lib/data";

export function QuickConnect() {
  const [coin, setCoin] = useState<CoinSymbol>(STRATUM[0].coin);
  const [portIndex, setPortIndex] = useState(0);
  const [copied, setCopied] = useState<"url" | "host" | null>(null);

  const endpoint = useMemo(
    () => STRATUM.find((s) => s.coin === coin) ?? STRATUM[0],
    [coin]
  );
  const ports = endpoint.ports;
  const selectedPort = ports[Math.min(portIndex, ports.length - 1)] ?? ports[0];
  const stratumUrl = `${endpoint.host}:${selectedPort.port}`;

  function selectCoin(next: CoinSymbol) {
    setCoin(next);
    setPortIndex(0);
    setCopied(null);
  }

  async function copy(value: string, which: "url" | "host") {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(which);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      /* ignore */
    }
  }

  return (
    <section id="quick-connect">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Quick Connect
          </h2>
          <p className="mt-2 text-muted-foreground">
            Pick a coin, copy the stratum URL, and point your miner — default port works for most hardware.
          </p>
        </div>

        <div className="rounded-xl border border-border/40 bg-card p-5 sm:p-6">
          <div className="flex flex-wrap gap-1.5 mb-5" aria-label="Choose coin">
            {STRATUM.map((s) => (
              <button
                key={s.coin}
                type="button"
                aria-pressed={coin === s.coin}
                onClick={() => selectCoin(s.coin)}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                  coin === s.coin
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border/40 bg-background/40 text-muted-foreground hover:text-foreground hover:border-border/60"
                }`}
              >
                <Image src={s.icon} alt="" width={14} height={14} />
                {s.coin}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Image src={endpoint.icon} alt="" width={20} height={20} />
            <span className="text-sm font-semibold">{endpoint.name}</span>
            <span className="text-xs text-muted-foreground font-mono">{endpoint.algo}</span>
          </div>

          <div className="mb-4">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5">
              Stratum URL
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex-1 flex items-center justify-between gap-3 rounded-lg border border-border/40 bg-background/40 px-3 py-2.5">
                <code className="font-mono text-sm break-all">{stratumUrl}</code>
                <button
                  type="button"
                  onClick={() => copy(stratumUrl, "host")}
                  aria-label="Copy host and port"
                  className="shrink-0 inline-flex items-center justify-center rounded-md p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground"
                >
                  {copied === "host" ? (
                    <Check className="h-4 w-4 text-primary" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>
              <button
                type="button"
                onClick={() => copy(stratumUrl, "url")}
                className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-primary/30 bg-primary/10 px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-primary/15"
              >
                {copied === "url" ? (
                  <>
                    <Check className="h-4 w-4 text-primary" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy stratum URL
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="mb-5">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5">
              Port
            </p>
            <div className="flex flex-wrap gap-2">
              {ports.map((p, i) => (
                <button
                  key={p.port}
                  type="button"
                  aria-pressed={i === portIndex}
                  onClick={() => {
                    setPortIndex(i);
                    setCopied(null);
                  }}
                  className={`rounded-lg border px-3 py-2 text-left transition-colors ${
                    i === portIndex
                      ? "border-primary/40 bg-primary/10"
                      : "border-border/40 bg-background/30 hover:border-border/60"
                  }`}
                >
                  <span className="font-mono text-sm font-medium">{p.port}</span>
                  <span className="ml-2 text-[10px] text-muted-foreground">
                    VarDiff {p.diff}
                  </span>
                  <span className="mt-0.5 block text-[10px] text-muted-foreground max-w-[14rem]">
                    {p.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 mb-5">
            <div className="rounded-lg border border-border/40 bg-background/30 px-3 py-2.5">
              <p className="text-[10px] text-muted-foreground mb-0.5">Username</p>
              <code className="font-mono text-xs sm:text-sm break-all">
                YOUR_WALLET_ADDRESS.workerName
              </code>
            </div>
            <div className="rounded-lg border border-border/40 bg-background/30 px-3 py-2.5">
              <p className="text-[10px] text-muted-foreground mb-0.5">Password</p>
              <code className="font-mono text-xs sm:text-sm break-all">
                {coin === "LTC" ? "doge=YourDogeAddress" : "x"}
              </code>
            </div>
          </div>

          {coin === "LTC" ? (
            <p className="mb-5 text-xs text-muted-foreground leading-relaxed">
              Mine LTC, earn LTC + DOGE. Password:{" "}
              <code className="text-foreground">doge=YourDogeAddress</code> (AuxPoW merge).
              Direct DOGE mining still works on doge.bitmernsolo.com.
            </p>
          ) : coin === "DOGE" ? (
            <p className="mb-5 text-xs text-muted-foreground leading-relaxed">
              Direct DOGE stratum. Or merge-mine DOGE while mining LTC with password{" "}
              <code className="text-foreground">doge=YourDogeAddress</code> on the LTC endpoint.
            </p>
          ) : null}

          <div className="text-center sm:text-left">
            <Link
              href="/docs#stratum"
              className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
            >
              Full stratum details in docs
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
