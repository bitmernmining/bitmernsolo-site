"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  ArrowRight,
  ChevronDown,
  ExternalLink,
  Pickaxe,
} from "lucide-react";

/* ── Dropdown menu data ── */

interface NavLink {
  label: string;
  href: string;
  icon?: string;
  external?: boolean;
  description?: string;
}

const dropdownColumns: { heading: string; links: NavLink[] }[] = [
  {
    heading: "Get Started",
    links: [
      { label: "Getting Started", href: "/getting-started", description: "Step-by-step setup guide" },
      { label: "Recommended Miners", href: "/miners", description: "Hardware for every budget" },
      {
        label: "Calculator",
        href: "https://app.bitmernsolo.com/calculator",
        external: true,
        description: "Estimate your mining odds",
      },
    ],
  },
  {
    heading: "Pool",
    links: [
      { label: "Pool Stats", href: "/pool-stats", description: "Live hashrate & network data" },
      { label: "How It Works", href: "/how-it-works", description: "Solo mining explained" },
      { label: "FAQ", href: "/faq", description: "Common questions answered" },
      { label: "Pricing", href: "/#pricing", description: "Simple 1% fee on blocks" },
    ],
  },
  {
    heading: "Coins",
    links: [
      { label: "Bitcoin", href: "/coins/btc", icon: "/coins/btc.svg" },
      { label: "Litecoin", href: "/coins/ltc", icon: "/coins/ltc.svg" },
      { label: "Dogecoin", href: "/coins/doge", icon: "/coins/doge.svg" },
      {
        label: "Bitcoin Cash",
        href: "/coins/bch",
        icon: "/coins/bch.svg",
      },
      { label: "DigiByte", href: "/coins/dgb", icon: "/coins/dgb.svg" },
    ],
  },
];

/* ── Mobile accordion data ── */

const mobileGroups: { label: string; links: NavLink[] }[] = [
  {
    label: "Mining",
    links: [
      { label: "Getting Started", href: "/getting-started", description: "Step-by-step setup guide" },
      { label: "Recommended Miners", href: "/miners", description: "Hardware for every budget" },
      {
        label: "Calculator",
        href: "https://app.bitmernsolo.com/calculator",
        external: true,
        description: "Estimate your mining odds",
      },
      { label: "Pool Stats", href: "/pool-stats", description: "Live hashrate & network data" },
      { label: "How It Works", href: "/how-it-works", description: "Solo mining explained" },
      { label: "FAQ", href: "/faq", description: "Common questions answered" },
      { label: "Pricing", href: "/#pricing", description: "Simple 1% fee on blocks" },
    ],
  },
  {
    label: "Coins",
    links: [
      { label: "Bitcoin", href: "/coins/btc", icon: "/coins/btc.svg" },
      { label: "Litecoin", href: "/coins/ltc", icon: "/coins/ltc.svg" },
      { label: "Dogecoin", href: "/coins/doge", icon: "/coins/doge.svg" },
      { label: "Bitcoin Cash", href: "/coins/bch", icon: "/coins/bch.svg" },
      { label: "DigiByte", href: "/coins/dgb", icon: "/coins/dgb.svg" },
    ],
  },
];

const topLevelLinks = [
  {
    label: "Docs",
    href: "/docs",
  },
  {
    label: "Shop",
    href: "https://shop.bitmernmining.com",
    external: true,
  },
  {
    label: "Hosting",
    href: "https://bitmernmining.com",
    external: true,
  },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(null);
  const pathname = usePathname();

  // Close dropdown and mobile menu on route change
  useEffect(() => {
    setDropdownOpen(false);
    setMobileOpen(false);
    setMobileExpanded(null);
  }, [pathname]);

  // Scroll listener for glass-morphism background
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // IntersectionObserver for active section highlighting (homepage hash links only)
  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection("");
      return;
    }

    const sectionIds = ["features", "pools", "how-it-works", "pricing", "faq"];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
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
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDropdownOpen(false);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    if (!dropdownOpen) return;
    const onClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [dropdownOpen]);

  const openDropdown = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setDropdownOpen(true);
  }, []);

  const scheduleClose = useCallback(() => {
    closeTimer.current = setTimeout(() => setDropdownOpen(false), 150);
  }, []);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 px-4 pt-3 sm:px-6">
        <div
          className={`relative mx-auto flex h-14 max-w-5xl items-center justify-between rounded-xl px-4 sm:px-5 transition-all duration-300 ${
            scrolled
              ? "border border-border/40 bg-background/80 backdrop-blur-lg"
              : "border border-transparent bg-transparent"
          }`}
        >
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

          {/* Desktop nav — centered */}
          <nav aria-label="Main navigation" className="absolute left-1/2 -translate-x-1/2 hidden items-center gap-1 md:flex">
            {/* Mining dropdown trigger */}
            <div
              className="relative"
              onMouseEnter={openDropdown}
              onMouseLeave={scheduleClose}
            >
              <button
                ref={triggerRef}
                onClick={() => setDropdownOpen((o) => !o)}
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
                className={`flex items-center gap-1 rounded-md px-3 py-1.5 text-sm transition-colors ${
                  dropdownOpen
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Pickaxe className="h-3.5 w-3.5" aria-hidden="true" />
                Mining
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>

            {/* Top-level links */}
            {topLevelLinks.map((link) => {
              const isHash = link.href.startsWith("/#");
              const isActive =
                isHash && activeSection === link.href.replace("/", "");

              if (link.external) {
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                    <ExternalLink className="h-3 w-3" aria-hidden="true" />
                    <span className="sr-only">(opens in new tab)</span>
                  </a>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3 py-1.5 text-sm transition-colors ${
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-3 right-3 h-0.5 rounded-full bg-primary" />
                  )}
                </Link>
              );
            })}
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
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Desktop dropdown panel */}
        <div
          ref={dropdownRef}
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
          aria-hidden={!dropdownOpen}
          className={`absolute left-0 right-0 mx-auto max-w-5xl px-4 sm:px-6 transition-all duration-200 hidden md:block ${
            dropdownOpen
              ? "pointer-events-auto translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-2 opacity-0"
          }`}
        >
          <div className="mt-2 rounded-xl border border-border/40 bg-background/95 backdrop-blur-xl p-6">
            <div className="grid grid-cols-3 gap-8">
              {dropdownColumns.map((col) => (
                <div key={col.heading}>
                  <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {col.heading}
                  </h3>
                  <ul className="space-y-1.5">
                    {col.links.map((link) => {
                      const isExternal = link.external;
                      const hasIcon = link.icon;

                      if (isExternal) {
                        return (
                          <li key={link.href}>
                            <a
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex flex-col rounded-md px-2 py-1.5 transition-colors hover:bg-secondary/50"
                            >
                              <span className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                                {link.label}
                                <ExternalLink className="h-3 w-3" aria-hidden="true" />
                                <span className="sr-only">(opens in new tab)</span>
                              </span>
                              {link.description && (
                                <span className="text-xs text-muted-foreground">{link.description}</span>
                              )}
                            </a>
                          </li>
                        );
                      }

                      return (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            onClick={() => setDropdownOpen(false)}
                            className="flex items-center gap-2 rounded-md px-2 py-1.5 transition-colors hover:bg-secondary/50"
                          >
                            {hasIcon && (
                              <Image
                                src={link.icon!}
                                alt=""
                                width={16}
                                height={16}
                                className="h-4 w-4"
                              />
                            )}
                            <div className="flex flex-col">
                              <span className="text-sm text-muted-foreground group-hover:text-foreground">{link.label}</span>
                              {link.description && (
                                <span className="text-xs text-muted-foreground">{link.description}</span>
                              )}
                            </div>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>
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

        {/* Mobile links */}
        <nav aria-label="Mobile navigation" className="flex-1 overflow-y-auto px-6 py-4">
          {/* Accordion groups */}
          {mobileGroups.map((group) => {
            const isExpanded = mobileExpanded === group.label;
            return (
              <div key={group.label} className="border-b border-border/20">
                <button
                  onClick={() =>
                    setMobileExpanded(isExpanded ? null : group.label)
                  }
                  aria-expanded={isExpanded}
                  className="flex w-full items-center justify-between py-4 text-left"
                >
                  <span className="text-base font-medium">{group.label}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-200 ${
                    isExpanded ? "max-h-96 pb-3" : "max-h-0 invisible"
                  }`}
                >
                  <div className="space-y-1 pl-2">
                    {group.links.map((link) => {
                      const isExternal = link.external;
                      const hasIcon = link.icon;

                      if (isExternal) {
                        return (
                          <a
                            key={link.href}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center gap-2 rounded-md px-3 py-2"
                          >
                            {hasIcon && (
                              <Image
                                src={link.icon!}
                                alt=""
                                width={16}
                                height={16}
                                className="h-4 w-4"
                              />
                            )}
                            <div className="flex flex-col">
                              <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                                {link.label}
                                <ExternalLink className="h-3 w-3" aria-hidden="true" />
                                <span className="sr-only">(opens in new tab)</span>
                              </span>
                              {link.description && (
                                <span className="text-xs text-muted-foreground">{link.description}</span>
                              )}
                            </div>
                          </a>
                        );
                      }

                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center gap-2 rounded-md px-3 py-2"
                        >
                          {hasIcon && (
                            <Image
                              src={link.icon!}
                              alt=""
                              width={16}
                              height={16}
                              className="h-4 w-4"
                            />
                          )}
                          <div className="flex flex-col">
                            <span className="text-sm text-muted-foreground">{link.label}</span>
                            {link.description && (
                              <span className="text-xs text-muted-foreground">{link.description}</span>
                            )}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Top-level standalone links */}
          {topLevelLinks.map((link) => {
            if (link.external) {
              return (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 border-b border-border/20 py-4 text-base font-medium"
                >
                  {link.label}
                  <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
                  <span className="sr-only">(opens in new tab)</span>
                </a>
              );
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block border-b border-border/20 py-4 text-base font-medium"
              >
                {link.label}
              </Link>
            );
          })}
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
