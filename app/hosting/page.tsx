import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Server, Zap, Shield, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "ASIC Hosting & Colocation — Bitmern Solo",
  description:
    "Enterprise-grade ASIC hosting and colocation from Bitmern Mining. Low electricity rates, 24/7 monitoring, and seamless integration with Bitmern Solo pool.",
};

const features = [
  {
    icon: Server,
    title: "Enterprise Infrastructure",
    description:
      "Purpose-built facility with industrial cooling, redundant power feeds, and backup generators. Your hardware runs 24/7/365.",
  },
  {
    icon: Zap,
    title: "Competitive Electricity",
    description:
      "Direct utility contracts at wholesale rates. No markups — we pass the savings directly to you.",
  },
  {
    icon: Shield,
    title: "Physical Security",
    description:
      "24/7 security, access control, and CCTV monitoring. Your investment is protected around the clock.",
  },
  {
    icon: Globe,
    title: "Remote Management",
    description:
      "Monitor your machines from anywhere. Full remote access to power cycling, firmware updates, and performance dashboards.",
  },
];

const services = [
  {
    title: "Colocation",
    description:
      "Bring your own ASICs — we provide power, cooling, internet, and rack space. You retain full ownership and control.",
    features: [
      "Ship your hardware directly to our facility",
      "We rack, cable, and commission your miners",
      "Pay per kW consumed — no hidden fees",
      "Remote access to manage your fleet",
    ],
  },
  {
    title: "Managed Hosting",
    description:
      "We source, deploy, and maintain the hardware. You choose the miners and coins — we handle everything else.",
    features: [
      "Hardware procurement at volume pricing",
      "Full setup and configuration included",
      "Proactive maintenance and firmware updates",
      "Replacement parts on standby",
    ],
  },
];

export default function HostingPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
      {/* Hero */}
      <div className="text-center mb-16">
        <h1
          className="font-bold tracking-tight"
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
        >
          Enterprise-grade ASIC hosting
        </h1>
        <p className="mt-3 mx-auto max-w-xl text-muted-foreground leading-relaxed">
          Don&apos;t want the noise and heat at home? Bitmern Mining offers
          professional colocation and managed hosting for miners of all sizes.
        </p>
      </div>

      {/* Why host with us */}
      <div className="grid gap-4 sm:grid-cols-2 mb-16">
        {features.map((f) => (
          <div
            key={f.title}
            className="rounded-xl border border-border/40 bg-card p-5"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                <f.icon className="h-4.5 w-4.5 text-primary" />
              </div>
              <h3 className="text-sm font-semibold">{f.title}</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {f.description}
            </p>
          </div>
        ))}
      </div>

      {/* Services */}
      <div className="space-y-6 mb-16">
        <h2 className="text-2xl font-bold tracking-tight">Our services</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {services.map((s) => (
            <div
              key={s.title}
              className="rounded-xl border border-border/40 bg-card p-6"
            >
              <h3 className="text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {s.description}
              </p>
              <ul className="mt-4 space-y-2">
                {s.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2 text-sm">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span className="text-muted-foreground">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center rounded-xl border border-primary/20 bg-primary/5 p-8">
        <h2 className="text-2xl font-bold tracking-tight">
          Ready to host your miners?
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Visit Bitmern Mining for pricing, availability, and to get started.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Button size="lg" className="glow" asChild>
            <a
              href="https://bitmernmining.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn More at Bitmern Mining
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
