import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const linkColumns = {
  Product: [
    { label: "Features", href: "/#features" },
    { label: "Supported Coins", href: "/#coins" },
    { label: "Pool Stats", href: "/#pools" },
    { label: "Pricing", href: "/#pricing" },
    { label: "FAQ", href: "/#faq" },
  ],
  Resources: [
    { label: "Getting Started", href: "/getting-started" },
    { label: "Documentation", href: "https://app.bitmernsolo.com/docs" },
    { label: "Calculator", href: "https://app.bitmernsolo.com/calculator" },
    { label: "How It Works", href: "/#how-it-works" },
  ],
  Company: [
    { label: "Contact", href: "mailto:support@bitmernsolo.com" },
    { label: "Status", href: "https://app.bitmernsolo.com" },
  ],
};

const coins = [
  { symbol: "BTC", icon: "/coins/btc.svg" },
  { symbol: "LTC", icon: "/coins/ltc.svg" },
  { symbol: "DOGE", icon: "/coins/doge.svg" },
  { symbol: "BCH", icon: "/coins/bch.svg" },
  { symbol: "DGB", icon: "/coins/dgb.svg" },
];

export function Footer() {
  return (
    <footer className="border-t border-border/40">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
        {/* Top section */}
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          {/* Left — branding + CTA */}
          <div>
            <Link href="/">
              <Image
                src="/logo-light.svg"
                alt="Bitmern Solo"
                width={160}
                height={44}
                className="h-8 w-auto"
              />
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground leading-relaxed">
              Solo mining pool with a flat 1% fee. Connect your miner, keep the
              entire block reward. No shared payouts.
            </p>

            {/* Coin icons */}
            <div className="mt-4 flex items-center gap-2">
              {coins.map((c) => (
                <Image
                  key={c.symbol}
                  src={c.icon}
                  alt={c.symbol}
                  width={20}
                  height={20}
                  className="h-5 w-5 opacity-60"
                />
              ))}
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Button size="sm" className="glow" asChild>
                <a href="https://app.bitmernsolo.com/signup">
                  Start Mining
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </a>
              </Button>
              <a
                href="mailto:support@bitmernsolo.com"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                support@bitmernsolo.com
              </a>
            </div>
          </div>

          {/* Right — link columns */}
          <div className="grid grid-cols-3 gap-6">
            {Object.entries(linkColumns).map(([heading, links]) => (
              <div key={heading}>
                <h3 className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
                  {heading}
                </h3>
                <ul className="space-y-2">
                  {links.map((link) => {
                    const isInternal =
                      link.href.startsWith("/") || link.href.startsWith("#");
                    return (
                      <li key={link.label}>
                        {isInternal ? (
                          <Link
                            href={link.href}
                            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                          >
                            {link.label}
                          </Link>
                        ) : (
                          <a
                            href={link.href}
                            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                          >
                            {link.label}
                          </a>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border/40 pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Bitmern Solo. All rights reserved.
          </p>
          <div className="flex gap-5">
            <Link
              href="/privacy"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/cookies"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
