import { ArrowRight, Server, Zap, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Server,
    title: "99.9% Uptime",
    description: "Enterprise-grade infrastructure with redundant power and cooling",
  },
  {
    icon: Zap,
    title: "Competitive Rates",
    description: "Low electricity costs passed directly to you — no markups",
  },
  {
    icon: Shield,
    title: "Remote Management",
    description: "Monitor and control your machines from anywhere via web dashboard",
  },
];

export function Hosting() {
  return (
    <section className="relative section-elevated">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left — copy */}
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Need hosting for your ASICs?
            </h2>
            <p className="mt-4 max-w-lg text-muted-foreground leading-relaxed">
              Bitmern Mining offers enterprise-grade colocation and managed hosting
              for ASIC miners. Bring your own hardware or let us set everything up.
              Low electricity rates, 24/7 monitoring, and direct integration with
              Bitmern Solo.
            </p>
            <Button size="lg" className="mt-6 glow" asChild>
              <a
                href="https://bitmernmining.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn More at Bitmern Mining
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>

          {/* Right — feature cards */}
          <div className="space-y-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="flex items-start gap-4 rounded-xl border border-border/40 bg-card p-5"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <f.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold">{f.title}</h3>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {f.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
