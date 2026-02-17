import { UserPlus, Settings, Pickaxe } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    step: "01",
    title: "Create an Account",
    description:
      "Sign up for free and set your wallet address. No personal info required — just an email and your payout address.",
  },
  {
    icon: Settings,
    step: "02",
    title: "Configure Your Miner",
    description:
      "Point your ASIC to our stratum endpoint. Choose your coin and port based on your hashrate. We handle VarDiff automatically.",
  },
  {
    icon: Pickaxe,
    step: "03",
    title: "Mine & Earn",
    description:
      "Watch your hashrate in real time. When you find a block, the full reward goes straight to your wallet. No middlemen.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-t border-border/40 bg-card/30">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Start mining in 3 steps
          </h2>
          <p className="mt-4 text-muted-foreground">
            From sign-up to your first share in under 5 minutes.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {steps.map((step, i) => (
            <div key={step.step} className="relative text-center">
              {/* Connector line (desktop only) */}
              {i < steps.length - 1 && (
                <div className="absolute right-0 top-8 hidden h-px w-8 translate-x-full bg-border/60 lg:block" />
              )}

              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-border/40 bg-card">
                <step.icon className="h-7 w-7 text-primary" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                Step {step.step}
              </span>
              <h3 className="mt-2 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
