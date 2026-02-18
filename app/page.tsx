import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { DashboardPreview } from "@/components/landing/dashboard-preview";
import { Pools } from "@/components/landing/pools";
import { SupportedCoins } from "@/components/landing/supported-coins";
import { HowItWorks } from "@/components/landing/how-it-works";
import { RecommendedMiners } from "@/components/landing/recommended-miners";
import { Hosting } from "@/components/landing/hosting";
import { Pricing } from "@/components/landing/pricing";
import { SoloChances } from "@/components/landing/solo-chances";
import { FAQ } from "@/components/landing/faq";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <Pools />
      <DashboardPreview />
      <HowItWorks />
      <SupportedCoins />
      <RecommendedMiners />
      <Hosting />
      <SoloChances />
      <Pricing />
      <FAQ />

      {/* Final CTA */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 dot-grid opacity-30" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 text-center">
          <h2 className="text-4xl font-bold tracking-tight lg:text-5xl">
            Start mining{" "}
            <span className="text-gradient">solo</span> today
          </h2>
          <p className="mt-4 mx-auto max-w-lg text-muted-foreground">
            Create a free account, point your miner at our stratum, and start
            submitting shares in minutes.
          </p>
          <Button size="lg" className="mt-8 glow" asChild>
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
