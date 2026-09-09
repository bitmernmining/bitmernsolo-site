import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function HiwInfraAndCta() {
  return (
    <>
      <div className="space-y-6 mb-16">
        <h2 className="text-2xl font-bold tracking-tight">Our infrastructure</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Bitmern Solo is built on production-grade infrastructure designed for
          reliability and low latency.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-border/40 bg-card p-5">
            <h3 className="text-sm font-semibold mb-2">Miningcore backend</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Our mining engine is built on Miningcore, a high-performance,
              open-source mining pool framework. It handles stratum protocol
              communication, share validation, block submission, and payout
              processing.
            </p>
          </div>
          <div className="rounded-xl border border-border/40 bg-card p-5">
            <h3 className="text-sm font-semibold mb-2">Stratum protocol</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              All connections use the standard stratum mining protocol, compatible
              with every major ASIC manufacturer. Multiple ports per coin with
              different starting difficulties let you optimize for your hardware.
            </p>
          </div>
          <div className="rounded-xl border border-border/40 bg-card p-5">
            <h3 className="text-sm font-semibold mb-2">VarDiff on every port</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Variable Difficulty automatically tunes share difficulty to your
              miner&apos;s speed. Whether you run a 1 TH/s Bitaxe or a 234 TH/s
              S21 Pro, VarDiff ensures optimal share submission rates.
            </p>
          </div>
          <div className="rounded-xl border border-border/40 bg-card p-5">
            <h3 className="text-sm font-semibold mb-2">Contabo EU datacenter</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Our mining backend runs in a Contabo EU (Germany) datacenter with
              enterprise-grade networking. The dashboard is served globally via
              Vercel&apos;s edge network for instant page loads from anywhere.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center rounded-xl border border-primary/20 bg-primary/5 p-8">
        <h2 className="text-2xl font-bold tracking-tight">Ready to start?</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Create a free account and start submitting shares in minutes.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Button size="lg" className="glow" asChild>
            <a href="https://app.bitmernsolo.com/signup">
              Start Mining
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href="/getting-started">Getting Started Guide</a>
          </Button>
        </div>
      </div>
    </>
  );
}
