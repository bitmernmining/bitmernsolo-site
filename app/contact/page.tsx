import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Clock, ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Contact — Bitmern Solo",
  description:
    "Get in touch with the Bitmern Solo team. Email support, setup help, and quick links to our resources.",
};

const contactMethods = [
  {
    icon: Mail,
    title: "Email",
    description: "General inquiries, support, and partnership requests",
    value: "support@bitmernsolo.com",
    href: "mailto:support@bitmernsolo.com",
  },
  {
    icon: Clock,
    title: "Support Hours",
    description: "We respond to most emails within 24 hours",
    value: "Mon–Fri, 9am–6pm CT",
  },
];

const quickLinks = [
  {
    label: "Getting Started Guide",
    href: "/getting-started",
    description: "Step-by-step setup instructions",
  },
  {
    label: "FAQ",
    href: "/#faq",
    description: "Answers to common questions",
  },
  {
    label: "Pool Dashboard",
    href: "https://app.bitmernsolo.com",
    description: "Log in to your mining dashboard",
    external: true,
  },
  {
    label: "Mining Calculator",
    href: "https://app.bitmernsolo.com/calculator",
    description: "Estimate your solo mining odds",
    external: true,
  },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
      {/* Header */}
      <div className="text-center mb-16">
        <h1
          className="font-bold tracking-tight"
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
        >
          Get in touch
        </h1>
        <p className="mt-3 mx-auto max-w-xl text-muted-foreground leading-relaxed">
          Have a question about solo mining, need help with setup, or want to
          discuss a partnership? We&apos;re here to help.
        </p>
      </div>

      {/* Contact methods */}
      <div className="grid gap-4 sm:grid-cols-2 mb-16">
        {contactMethods.map((method) => (
          <div
            key={method.title}
            className="rounded-xl border border-border/40 bg-card p-6"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <method.icon className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-sm font-semibold">{method.title}</h2>
            </div>
            <p className="text-sm text-muted-foreground">{method.description}</p>
            {method.href ? (
              <a
                href={method.href}
                className="mt-2 inline-block text-sm font-medium text-primary hover:underline"
              >
                {method.value}
              </a>
            ) : (
              <p className="mt-2 text-sm font-medium">{method.value}</p>
            )}
          </div>
        ))}
      </div>

      {/* Quick links */}
      <div className="space-y-4 mb-16">
        <h2 className="text-2xl font-bold tracking-tight">Quick links</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {quickLinks.map((link) => {
            const isExternal = link.external;
            return (
              <div
                key={link.label}
                className="rounded-xl border border-border/40 bg-card p-4"
              >
                {isExternal ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                  >
                    {link.label}
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                ) : (
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                  >
                    {link.label}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                )}
                <p className="mt-1 text-sm text-muted-foreground">
                  {link.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center rounded-xl border border-primary/20 bg-primary/5 p-8">
        <h2 className="text-2xl font-bold tracking-tight">New to solo mining?</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Our getting started guide walks you through everything — from choosing
          hardware to submitting your first share.
        </p>
        <Button size="lg" className="mt-5 glow" asChild>
          <Link href="/getting-started">
            Getting Started Guide
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
