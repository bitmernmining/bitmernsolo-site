import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[600px] w-[800px] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32 lg:py-40">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5">
            <Zap className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-medium text-primary">Solo Mining Pool — You Keep the Block</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Mine Solo.{" "}
            <span className="text-shimmer">Keep 100%.</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Connect your ASIC miners to Bitmern Solo and keep the entire block reward.
            No pool fees. No shared payouts. Real-time dashboards and multi-coin support.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="glow text-base" asChild>
              <a href="https://app.bitmernsolo.com/signup">
                Start Mining Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button variant="outline" size="lg" className="text-base" asChild>
              <a href="#how-it-works">See How It Works</a>
            </Button>
          </div>

          {/* Social proof */}
          <p className="mt-8 text-sm text-muted-foreground">
            Supporting <span className="font-semibold text-foreground">5 coins</span> &middot;
            Powered by <span className="font-semibold text-foreground">Miningcore</span> &middot;
            Enterprise-grade uptime
          </p>
        </div>
      </div>
    </section>
  );
}
