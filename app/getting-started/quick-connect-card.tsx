"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Copy, ArrowRight } from "lucide-react";
import { STRATUM, type CoinSymbol } from "@/lib/data";

const PLACEHOLDER_ADDRESS = "YOUR_WALLET_ADDRESS";

function buildConfigText(host: string, port: number): string {
  return [
    `Pool URL: ${host}:${port}`,
    `Worker:   ${PLACEHOLDER_ADDRESS}.worker1`,
    `Password: x`,
  ].join("\n");
}

export function QuickConnectCard() {
  const [coin, setCoin] = useState<CoinSymbol>("BTC");
  const [copied, setCopied] = useState(false);

  const endpoint = STRATUM.find((s) => s.coin === coin) ?? STRATUM[0];
  const defaultPort = endpoint.ports[0];
  const configText = buildConfigText(endpoint.host, defaultPort.port);

  function handleCopy() {
    navigator.clipboard.writeText(configText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <h2 className="text-lg font-semibold">Quick Connect</h2>
        <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Choose coin">
          {STRATUM.map((s) => (
            <button
              key={s.coin}
              type="button"
              role="tab"
              aria-selected={coin === s.coin}
              onClick={() => setCoin(s.coin)}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                coin === s.coin
                  ? "border-primary bg-primary/10 text-foreground"
                  : "border-border/40 bg-card text-muted-foreground hover:text-foreground"
              }`}
            >
              <Image src={s.icon} alt="" width={14} height={14} />
              {s.coin}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-3 flex items-center gap-2">
        <Badge className="text-[10px] h-4 px-1.5">Recommended port</Badge>
        <span className="text-xs text-muted-foreground">
          Works with any {endpoint.algo} ASIC — VarDiff starts at {defaultPort.diff}
        </span>
      </div>

      <div className="relative rounded-lg bg-secondary/60 border border-border/40 px-4 py-3">
        <pre className="font-mono text-xs sm:text-sm leading-loose pr-10 whitespace-pre-wrap break-all">{configText}</pre>
        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy connection config"
          className="absolute right-2 top-2 inline-flex items-center justify-center rounded-md p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground"
        >
          {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
        </button>
      </div>

      <p className="mt-3 text-xs text-muted-foreground">
        Replace <code className="text-foreground">{PLACEHOLDER_ADDRESS}</code> with the {endpoint.name} address you control. Worker name (<code className="text-foreground">.worker1</code>) is any label you choose. Password can be anything.
      </p>

      <div className="mt-5 flex flex-wrap gap-3">
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
  );
}
