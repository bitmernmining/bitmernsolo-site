"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X, ArrowRight } from "lucide-react";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Pools", href: "#pools" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Scroll listener for glass-morphism background
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // IntersectionObserver for active section highlighting
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector(l.href))
      .filter(Boolean) as Element[];

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        }
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close mobile menu on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-border/40 bg-background/80 backdrop-blur-lg"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            className="flex items-center opacity-80 transition-opacity hover:opacity-100"
          >
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
                className={`relative py-1 text-sm transition-colors ${
                  activeSection === link.href
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 rounded-full bg-primary transition-all duration-300 ${
                    activeSection === link.href ? "w-full" : "w-0"
                  }`}
                />
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Button variant="ghost" size="sm" asChild>
              <a href="https://app.bitmernsolo.com/login">Log in</a>
            </Button>
            <Button size="sm" className="glow" asChild>
              <a href="https://app.bitmernsolo.com/signup">
                Start Mining <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
          </div>

          <button
            className="p-2 text-muted-foreground md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile full-screen overlay */}
      <div
        className={`fixed inset-0 z-40 flex flex-col transition-all duration-300 md:hidden ${
          mobileOpen
            ? "pointer-events-auto bg-background/95 opacity-100 backdrop-blur-xl"
            : "pointer-events-none opacity-0"
        }`}
      >
        {/* Top bar with logo + close */}
        <div className="flex h-18 items-center justify-between px-4 sm:px-6">
          <Image
            src="/logo-light.svg"
            alt="Bitmern Solo"
            width={160}
            height={44}
            className="h-8 w-auto"
          />
          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
            className="p-2 text-muted-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Links centered in remaining space */}
        <nav className="flex flex-1 flex-col items-center justify-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`text-lg font-medium transition-colors ${
                activeSection === link.href
                  ? "text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTAs at bottom */}
        <div className="flex flex-col gap-3 px-6 pb-8">
          <Button variant="outline" size="lg" className="w-full" asChild>
            <a href="https://app.bitmernsolo.com/login">Log in</a>
          </Button>
          <Button size="lg" className="w-full glow" asChild>
            <a href="https://app.bitmernsolo.com/signup">
              Start Mining <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </>
  );
}
