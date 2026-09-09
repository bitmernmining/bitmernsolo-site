import type { Metadata } from "next";
import { HiwSteps } from "./sections/steps";
import { HiwLifecycle } from "./sections/lifecycle";
import { HiwComparison } from "./sections/comparison";
import { HiwFee } from "./sections/fee";
import { HiwInfraAndCta } from "./sections/infra";

export const metadata: Metadata = {
  title: "How It Works — Bitmern Solo",
  description:
    "Learn how solo mining works on Bitmern. From account creation to block rewards, understand every step of the solo mining process.",
};

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="text-center mb-16">
        <h1
          className="font-bold tracking-tight"
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
        >
          How it works
        </h1>
        <p className="mt-3 mx-auto max-w-xl text-muted-foreground leading-relaxed">
          Solo mining explained from start to finish. Understand how your miner
          connects, how blocks are found, and how you get paid.
        </p>
      </div>
      <HiwSteps />
      <HiwLifecycle />
      <HiwComparison />
      <HiwFee />
      <HiwInfraAndCta />
    </div>
  );
}
