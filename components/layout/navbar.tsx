"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Pools", href: "#pools" },
  { label: "Coins", href: "#coins" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Solo Chances", href: "#chances" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo-light.svg"
            alt="Bitmern Solo"
            width={160}
            height={44}
            className="h-8 w-auto"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button variant="ghost" size="sm" asChild>
            <a href="https://app.bitmernsolo.com/login">Log in</a>
          </Button>
          <Button size="sm" className="glow" asChild>
            <a href="https://app.bitmernsolo.com/signup">Start Mining</a>
          </Button>
        </div>

        <button
          className="md:hidden p-2 text-muted-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-border/40 bg-background px-4 pb-4 md:hidden">
          <nav className="flex flex-col gap-3 pt-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="mt-2 flex flex-col gap-2">
              <Button variant="outline" size="sm" asChild>
                <a href="https://app.bitmernsolo.com/login">Log in</a>
              </Button>
              <Button size="sm" asChild>
                <a href="https://app.bitmernsolo.com/signup">Start Mining</a>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
