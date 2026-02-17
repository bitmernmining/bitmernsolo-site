import Link from "next/link";
import { Pickaxe } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const footerLinks = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Supported Coins", href: "#coins" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ],
  Resources: [
    { label: "Getting Started", href: "https://app.bitmernsolo.com/getting-started" },
    { label: "Documentation", href: "https://app.bitmernsolo.com/docs" },
    { label: "Calculator", href: "https://app.bitmernsolo.com/calculator" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Contact", href: "mailto:support@bitmernsolo.com" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Pickaxe className="h-4.5 w-4.5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold tracking-tight" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                Bitmern<span className="text-primary">Solo</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Solo mining pool with real-time dashboards, multi-coin support, and zero pool fees.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="mb-3 text-sm font-semibold">{heading}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8 bg-border/40" />

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Bitmern Solo. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
