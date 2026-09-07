import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface HeroProps {
  blocksFound?: number | null;
}

export function Hero({ blocksFound }: HeroProps = {}) {
  return (
    <section className="relative overflow-hidden pb-0">
      <div className="pointer-events-none absolute inset-0 dot-grid opacity-30" />
      <div className="relative mx-auto max-w-4xl px-4 pt-20 sm:px-6 sm:pt-28 lg:pt-32 text-center">
        <div className="animate-fade-up flex flex-wrap items-center justify-center gap-2 mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card px-3 py-1 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
            10 supported coins. 1% pool fee. That&apos;s it.
          </div>
          {blocksFound && blocksFound > 0 ? (
            <a href="#blocks-found" className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card px-3 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              <span className="font-medium text-foreground tabular-nums">{blocksFound.toLocaleString()}</span> blocks found
            </a>
          ) : null}
        </div>
        <h1 className="animate-fade-up-d1 font-bold tracking-tight leading-[1.08]" style={{ fontSize: "clamp(2.75rem, 6.5vw, 5.5rem)" }}>
          The solo mining pool <span className="text-gradient">built for&nbsp;everyone</span>
        </h1>
        <p className="animate-fade-up-d2 mt-6 mx-auto max-w-xl text-lg leading-relaxed text-muted-foreground">
          Connect your miner to Bitmern Solo and keep the entire block reward to yourself. Just a flat 1% fee, no shared payouts, and no middlemen.
        </p>
        <div className="animate-fade-up-d3 mt-8 flex flex-wrap justify-center gap-3">
          <Button size="lg" className="glow" asChild>
            <a href="https://app.bitmernsolo.com/signup">Create Free Account<ArrowRight className="ml-2 h-4 w-4" /></a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href="#how-it-works">How It Works</a>
          </Button>
        </div>
        <div className="animate-fade-up-d3 mt-10 flex flex-wrap items-center justify-center gap-3">
          {["BTC", "LTC", "DOGE", "BCH", "DGB", "XEC", "ETC", "ZEC", "XMR", "RVN"].map((symbol) => (
            <div key={symbol} className="flex items-center gap-1.5 rounded-full border border-border/40 bg-card px-2.5 py-1">
              <Image src={`/coins/${symbol.toLowerCase()}.svg`} alt={symbol} width={16} height={16} className="h-4 w-4" />
              <span className="text-[11px] font-medium text-muted-foreground">{symbol}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="h-16 sm:h-24" />
    </section>
  );
}
