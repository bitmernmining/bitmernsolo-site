"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { COINS, type Coin, type Page } from "./preview-data";
import { DashboardView } from "./preview-dashboard";
import { MinersView } from "./preview-miners";
import { EarningsView } from "./preview-earnings";
import { PayoutsView } from "./preview-payouts";
import { PoolStatsView } from "./preview-pool";
import { AlertsView } from "./preview-alerts";
import { NAV_GROUPS, URL_MAP, NavIcon } from "./preview-nav";

export function DashboardPreview() {
  const [activePage, setActivePage] = useState<Page>("dashboard");
  const [activeCoin, setActiveCoin] = useState<Coin>("BTC");
  const [hasClicked, setHasClicked] = useState(false);
  const [coinDropdownOpen, setCoinDropdownOpen] = useState(false);
  const coinDropdownRef = useRef<HTMLDivElement>(null);

  function handleNav(page: Page) {
    setActivePage(page);
    if (!hasClicked) setHasClicked(true);
  }

  function handleCoinChange(coin: Coin) {
    setActiveCoin(coin);
    setCoinDropdownOpen(false);
    if (!hasClicked) setHasClicked(true);
  }

  // Close coin dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (coinDropdownRef.current && !coinDropdownRef.current.contains(e.target as Node)) {
        setCoinDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const coinInfo = COINS.find((c) => c.symbol === activeCoin)!;

  function renderPage() {
    switch (activePage) {
      case "dashboard": return <DashboardView coin={activeCoin} onCoinChange={handleCoinChange} />;
      case "miners": return <MinersView coin={activeCoin} />;
      case "earnings": return <EarningsView coin={activeCoin} />;
      case "payouts": return <PayoutsView coin={activeCoin} />;
      case "pool": return <PoolStatsView coin={activeCoin} />;
      case "alerts": return <AlertsView />;
    }
  }

  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Your mining dashboard
          </h2>
          <p className="mt-2 text-muted-foreground">
            Everything you need to track performance, manage workers, and
            monitor earnings in one place.
          </p>
        </div>

        <div className="gradient-border relative">
          {/* Click to explore — top center, overlapping border */}
          {!hasClicked && (
            <div className="absolute -top-4 left-1/2 z-10 -translate-x-1/2 animate-hint-pulse">
              <div className="flex items-center gap-1.5 rounded-full border border-primary/40 bg-background px-3 py-1.5 text-xs font-medium text-primary shadow-lg">
                Click to explore
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" /><path strokeLinecap="round" strokeLinejoin="round" d="M13 13l6 6" /></svg>
              </div>
            </div>
          )}
          <div className="browser-frame">
            {/* Browser bar */}
            <div className="browser-frame-bar">
              <div className="browser-dot bg-[#ff5f57]" />
              <div className="browser-dot bg-[#febc2e]" />
              <div className="browser-dot bg-[#28c840]" />
              <div className="ml-3 flex-1 rounded-md bg-[oklch(0.18_0_0)] px-3 py-1 text-xs text-muted-foreground font-mono transition-all duration-200">
                {URL_MAP[activePage]}
              </div>
            </div>

            {/* Mobile tab bar */}
            <div className="flex md:hidden overflow-x-auto border-b border-border/30 bg-[oklch(0.13_0_0)] px-2 gap-1 no-scrollbar">
              {NAV_GROUPS.flatMap((g) => g.items).map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`shrink-0 px-3 py-2 text-xs font-medium transition-colors border-b-2 ${
                    activePage === item.id
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="flex h-[700px]">
              {/* Sidebar */}
              <div className="hidden md:flex w-52 shrink-0 flex-col border-r border-border/30 bg-[oklch(0.13_0_0)] relative">
                {/* Logo + coin selector */}
                <div className="border-b border-[oklch(0.22_0_0)] p-3">
                  <Image
                    src="/logo-light.svg"
                    alt="Bitmern Pool"
                    width={120}
                    height={32}
                    className="h-5 w-auto"
                  />
                  {/* Coin selector trigger */}
                  <div className="relative mt-2.5" ref={coinDropdownRef}>
                    <button
                      onClick={() => setCoinDropdownOpen(!coinDropdownOpen)}
                      className="w-full flex items-center justify-between rounded-md px-2 py-1.5 hover:bg-[oklch(0.2_0_0)] transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-1.5">
                        <Image src={`/coins/${activeCoin.toLowerCase()}.svg`} alt={activeCoin} width={16} height={16} className="rounded-full" />
                        <span className="text-xs font-medium">{activeCoin}</span>
                        <span className="text-[11px] text-muted-foreground">{coinInfo.name}</span>
                      </div>
                      <svg className={`h-3 w-3 text-muted-foreground transition-transform ${coinDropdownOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                    </button>
                    {coinDropdownOpen && (
                      <div className="absolute left-0 right-0 top-full z-10 mt-1 rounded-md border border-border/40 bg-[oklch(0.15_0_0)] py-1 shadow-lg">
                        {COINS.map((c) => (
                          <button
                            key={c.symbol}
                            onClick={() => handleCoinChange(c.symbol)}
                            className={`w-full flex items-center gap-2 px-2 py-1.5 text-left transition-colors hover:bg-[oklch(0.2_0_0)] ${
                              activeCoin === c.symbol ? "bg-[oklch(0.2_0_0)]" : ""
                            }`}
                          >
                            <Image src={`/coins/${c.symbol.toLowerCase()}.svg`} alt={c.symbol} width={14} height={14} className="rounded-full" />
                            <span className="text-[11px] font-medium">{c.symbol}</span>
                            <span className="text-[10px] text-muted-foreground">{c.name}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Nav groups */}
                <div className="flex-1 overflow-auto p-2 space-y-3">
                  {NAV_GROUPS.map((group) => (
                    <div key={group.label}>
                      <p className="px-2 mb-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                        {group.label}
                      </p>
                      <div className="space-y-0.5">
                        {group.items.map((item) => (
                          <button
                            key={item.id}
                            onClick={() => handleNav(item.id)}
                            className={`w-full flex items-center gap-2 rounded-md px-2 py-1.5 text-xs transition-colors cursor-pointer ${
                              activePage === item.id
                                ? "bg-[oklch(0.2_0_0)] text-foreground font-medium"
                                : "text-muted-foreground hover:text-foreground hover:bg-[oklch(0.18_0_0)]"
                            }`}
                          >
                            <NavIcon d={item.icon} />
                            <span>{item.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}

                </div>

                {/* User footer */}
                <div className="border-t border-[oklch(0.22_0_0)] p-3 flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-medium text-primary shrink-0">
                    MI
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[11px] font-medium">Miner</p>
                    <p className="truncate text-[10px] text-muted-foreground">miner@example.com</p>
                  </div>
                  <svg className="h-3.5 w-3.5 text-muted-foreground shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                </div>
              </div>

              {/* Main content */}
              <div className="flex-1 p-3 sm:p-4 overflow-auto">
                {renderPage()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
