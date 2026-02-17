import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { SupportedCoins } from "@/components/landing/supported-coins";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Pricing } from "@/components/landing/pricing";
import { FAQ } from "@/components/landing/faq";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <SupportedCoins />
      <HowItWorks />
      <Pricing />
      <FAQ />

      {/* Final CTA */}
      <section className="border-t border-border/40">
        <div className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6 sm:py-24">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to mine solo?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
            Create your free account, point your miner, and keep 100% of the block reward.
          </p>
          <Button size="lg" className="mt-8 glow text-base" asChild>
            <a href="https://app.bitmernsolo.com/signup">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </section>
    </>
  );
}
