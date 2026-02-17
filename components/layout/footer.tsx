import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const linkColumns = {
  Product: [
    { label: "Features", href: "/#features" },
    { label: "Pool Stats", href: "/pool-stats" },
    { label: "Pricing", href: "/#pricing" },
    { label: "FAQ", href: "/faq" },
  ],
  Mining: [
    { label: "Getting Started", href: "/getting-started" },
    { label: "Recommended Miners", href: "/miners" },
    { label: "Calculator", href: "https://app.bitmernsolo.com/calculator", external: true },
    { label: "Shop", href: "https://shop.bitmernmining.com", external: true },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Hosting", href: "https://bitmernmining.com", external: true },
  ],
};

const coinLinks = [
  { symbol: "BTC", icon: "/coins/btc.svg", href: "/coins/btc" },
  { symbol: "LTC", icon: "/coins/ltc.svg", href: "/coins/ltc" },
  { symbol: "DOGE", icon: "/coins/doge.svg", href: "/coins/doge" },
  { symbol: "BCH", icon: "/coins/bch.svg", href: "/coins/bch" },
  { symbol: "DGB", icon: "/coins/dgb.svg", href: "/coins/dgb" },
];

export function Footer() {
  return (
    <footer aria-label="Site footer" className="border-t border-border/40">
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

            {/* Coin icons — now linked to coin pages */}
            <div className="mt-4 flex items-center gap-2">
              {coinLinks.map((c) => (
                <Link key={c.symbol} href={c.href} title={c.symbol}>
                  <Image
                    src={c.icon}
                    alt={c.symbol}
                    width={20}
                    height={20}
                    className="h-5 w-5 opacity-60 transition-opacity hover:opacity-100"
                  />
                </Link>
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
                <h3 className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {heading}
                </h3>
                <ul className="space-y-2">
                  {links.map((link) => {
                    const isExternal = "external" in link && link.external;
                    const isInternal =
                      link.href.startsWith("/") || link.href.startsWith("#");

                    if (isExternal) {
                      return (
                        <li key={link.label}>
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                          >
                            {link.label}
                            <ExternalLink className="h-3 w-3" aria-hidden="true" />
                            <span className="sr-only">(opens in new tab)</span>
                          </a>
                        </li>
                      );
                    }

                    if (isInternal) {
                      return (
                        <li key={link.label}>
                          <Link
                            href={link.href}
                            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                          >
                            {link.label}
                          </Link>
                        </li>
                      );
                    }

                    return (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                          {link.label}
                        </a>
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
