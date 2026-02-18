import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Server, ShoppingBag, Pickaxe } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About — Bitmern Solo",
  description:
    "Bitmern Solo is a solo mining pool that lets you keep 100% of the block reward. Learn about our mission, infrastructure, and ecosystem.",
};

const ecosystem = [
  {
    icon: Pickaxe,
    name: "Bitmern Solo",
    description:
      "Solo mining pool for BTC, LTC, DOGE, BCH, and DGB. Connect your ASIC, keep the entire block reward. 1% fee, real-time dashboards, and alerts.",
    href: "https://app.bitmernsolo.com",
    linkLabel: "Go to Dashboard",
  },
  {
    icon: Server,
    name: "Bitmern Mining",
    description:
      "Professional ASIC hosting and colocation. Enterprise-grade infrastructure with competitive electricity rates and 24/7 monitoring.",
    href: "https://bitmernmining.com",
    linkLabel: "Visit Bitmern Mining",
  },
  {
    icon: ShoppingBag,
    name: "Bitmern Shop",
    description:
      "Hardware sales for mining equipment. From flagship ASICs to solo miners, find the right hardware for your setup.",
    href: "https://shop.bitmernmining.com",
    linkLabel: "Browse Shop",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
      {/* Header */}
      <div className="text-center mb-16">
        <h1
          className="font-bold tracking-tight"
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
        >
          About Bitmern Solo
        </h1>
        <p className="mt-3 mx-auto max-w-xl text-muted-foreground leading-relaxed">
          We&apos;re building the infrastructure to make solo mining accessible to
          everyone — from hobbyists with a single Bitaxe to operators running
          thousands of machines.
        </p>
      </div>

      {/* Our mission */}
      <div className="space-y-4 mb-16">
        <h2 className="text-2xl font-bold tracking-tight">Our mission</h2>
        <div className="rounded-xl border border-border/40 bg-card p-6">
          <p className="text-muted-foreground leading-relaxed">
            Mining pools have centralized too much of the network&apos;s hashrate.
            When a handful of pools control the majority of block production, it
            undermines the decentralization that makes cryptocurrency valuable.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Bitmern Solo exists to give miners a better option. Instead of splitting
            rewards with thousands of strangers, you mine on your own — and when you
            find a block, the entire reward goes to your wallet. We provide the
            infrastructure (stratum endpoints, real-time monitoring, alerts) and take
            a flat 1% fee. That&apos;s it.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Whether you&apos;re running a Bitaxe on your desk or a fleet of S21 Pros
            in a datacenter, you deserve transparent, reliable mining infrastructure.
            We&apos;re here to provide it.
          </p>
        </div>
      </div>

      {/* Infrastructure */}
      <div className="space-y-4 mb-16">
        <h2 className="text-2xl font-bold tracking-tight">Infrastructure</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-border/40 bg-card p-5">
            <p className="text-sm font-semibold">Mining Backend</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Self-hosted Miningcore with stratum endpoints for 5 coins and VarDiff
              on every port.
            </p>
          </div>
          <div className="rounded-xl border border-border/40 bg-card p-5">
            <p className="text-sm font-semibold">Dallas, TX Datacenter</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Low-latency US Central location with redundant connectivity and power.
            </p>
          </div>
          <div className="rounded-xl border border-border/40 bg-card p-5">
            <p className="text-sm font-semibold">Edge Delivery</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Dashboard served via Vercel&apos;s global edge network for fast access
              from anywhere.
            </p>
          </div>
        </div>
      </div>

      {/* The ecosystem */}
      <div className="space-y-4 mb-16">
        <h2 className="text-2xl font-bold tracking-tight">The Bitmern ecosystem</h2>
        <div className="space-y-4">
          {ecosystem.map((item) => (
            <div
              key={item.name}
              className="flex items-start gap-4 rounded-xl border border-border/40 bg-card p-5"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <item.icon className="h-5 w-5 text-primary" />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-semibold">{item.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center text-sm text-primary hover:underline"
                >
                  {item.linkLabel}
                  <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact CTA */}
      <div className="text-center rounded-xl border border-primary/20 bg-primary/5 p-8">
        <h2 className="text-2xl font-bold tracking-tight">Get in touch</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Questions, feedback, or partnership inquiries — we&apos;d love to hear from
          you.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Button size="lg" className="glow" asChild>
            <Link href="/contact">
              Contact Us
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href="mailto:support@bitmernsolo.com">
              support@bitmernsolo.com
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
