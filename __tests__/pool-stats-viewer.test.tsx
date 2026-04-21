import { describe, test, expect, mock } from "bun:test";
import { render, screen, fireEvent } from "@testing-library/react";
import { createElement } from "react";
import type { PoolResult } from "@/lib/pool-stats";

mock.module("next/image", () => ({
  default: ({ src, alt }: { src: string; alt: string }) =>
    createElement("img", { src, alt }),
}));

mock.module("@/components/pool-stats/pool-stats-chart", () => ({
  PoolStatsChart: () => createElement("div", { "data-testid": "chart-stub" }),
}));

const { PoolStatsViewer } = await import(
  "@/components/pool-stats/pool-stats-viewer"
);

const healthyPool: PoolResult = {
  id: "bitcoin-solo",
  name: "Bitcoin",
  symbol: "BTC",
  icon: "/coins/btc.svg",
  algo: "SHA-256d",
  poolHashrate: 1e12,
  connectedMiners: 3,
  workerCount: 5,
  networkHashrate: 5e18,
  networkDifficulty: 80e12,
  blockHeight: 800000,
  performance: [],
};

const errorPool: PoolResult = {
  id: "litecoin-solo",
  name: "Litecoin",
  symbol: "LTC",
  icon: "/coins/ltc.svg",
  algo: "Scrypt",
  error: true,
};

describe("PoolStatsViewer", () => {
  test("renders tab buttons for each pool (pool name visible)", () => {
    render(createElement(PoolStatsViewer, { pools: [healthyPool] }));
    expect(screen.getByText("Bitcoin")).toBeTruthy();
  });

  test("renders hashrate for healthy pool", () => {
    render(createElement(PoolStatsViewer, { pools: [healthyPool] }));
    // 1e12 H/s = 1.00 TH/s — getAllByText handles multiple occurrences
    const hashrateEls = screen.getAllByText("1.00 TH/s");
    expect(hashrateEls.length).toBeGreaterThan(0);
  });

  test("renders worker count for healthy pool", () => {
    render(createElement(PoolStatsViewer, { pools: [healthyPool] }));
    const workerEls = screen.getAllByText("5");
    expect(workerEls.length).toBeGreaterThan(0);
  });

  test("renders 'Unavailable' label on error pool tab", () => {
    render(createElement(PoolStatsViewer, { pools: [healthyPool, errorPool] }));
    // Error pool tab shows 'Unavailable' inline label
    expect(screen.getByText("Unavailable")).toBeTruthy();
  });

  test("renders error message when error pool is selected", () => {
    // Render with error pool first so it is selected by default
    render(createElement(PoolStatsViewer, { pools: [errorPool] }));
    expect(screen.getByText("Pool data temporarily unavailable.")).toBeTruthy();
  });

  test("chart stub renders (no canvas errors)", () => {
    render(createElement(PoolStatsViewer, { pools: [healthyPool] }));
    const stubs = screen.getAllByTestId("chart-stub");
    expect(stubs.length).toBeGreaterThan(0);
  });
});
