import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Getting Started — Bitmern Solo",
  description:
    "Solo mining setup: paste your wallet address, copy the pool config, start mining.",
};

export default function GettingStartedPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="text-center mb-10">
        <h1
          className="font-bold tracking-tight"
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
        >
          Getting started
        </h1>
        <p className="mt-3 mx-auto max-w-xl text-muted-foreground leading-relaxed">
          Paste your wallet address, copy the config, point your miner at us.
          Full setup guide is being restored — start mining from the app anytime.
        </p>
      </div>
      <div className="text-center rounded-xl border border-primary/20 bg-primary/5 p-8">
        <h2 className="text-2xl font-bold tracking-tight">Ready to mine?</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Start mining — submit shares in minutes.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Button size="lg" className="glow" asChild>
            <a href="https://app.bitmernsolo.com/signup">
              Start Mining
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href="https://app.bitmernsolo.com/login">Log In</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
