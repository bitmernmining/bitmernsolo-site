import { describe, test, expect } from "bun:test";
import {
  formatHashrate,
  formatUsd,
  formatEfficiency,
  formatUptime,
  formatRelativeTime,
  truncateAddress,
  formatPriceCents,
} from "@/lib/format";

describe("formatHashrate", () => {
  test("returns '0 H/s' for zero", () => {
    expect(formatHashrate(0)).toBe("0 H/s");
  });

  test("scales 1000 H/s to KH/s", () => {
    expect(formatHashrate(1000)).toBe("1.00 KH/s");
  });

  test("scales 1e12 H/s to TH/s", () => {
    expect(formatHashrate(1e12)).toBe("1.00 TH/s");
  });

  test("scales 1.5e9 H/s to GH/s", () => {
    expect(formatHashrate(1.5e9)).toBe("1.50 GH/s");
  });
});

describe("formatUsd", () => {
  test("uses 4 decimal places for values less than $0.01", () => {
    const result = formatUsd(0.005);
    // Intl.NumberFormat minimumFractionDigits:2 maximumFractionDigits:4 → "$0.005"
    // The 4-decimal path activates for abs < 0.01 — trailing zeros are omitted by Intl
    expect(result).toMatch(/\$0\.00[1-9]/);
  });

  test("formats $1.50 with 2 decimal places", () => {
    expect(formatUsd(1.5)).toBe("$1.50");
  });

  test("formats $100 with 2 decimal places", () => {
    expect(formatUsd(100)).toBe("$100.00");
  });
});

describe("formatEfficiency", () => {
  test("returns 'N/A' when hashrate is zero", () => {
    expect(formatEfficiency(0, 3500, "SHA-256")).toBe("N/A");
  });

  test("computes J/TH for SHA-256", () => {
    // 3500W / (100e12 / 1e12 TH/s) = 3500 / 100 = 35.0 J/TH
    expect(formatEfficiency(100e12, 3500, "SHA-256")).toBe("35.0 J/TH");
  });

  test("computes J/GH for Scrypt", () => {
    // 500W / (1e12 / 1e9 GH/s) = 500 / 1000 = 0.5 J/GH
    expect(formatEfficiency(1e12, 500, "Scrypt")).toBe("0.5 J/GH");
  });
});

describe("formatUptime", () => {
  test("formats 3600 seconds as '1h 0m'", () => {
    expect(formatUptime(3600)).toBe("1h 0m");
  });

  test("formats 86400 seconds as '1d 0h'", () => {
    expect(formatUptime(86400)).toBe("1d 0h");
  });

  test("formats 45 seconds as '0m'", () => {
    expect(formatUptime(45)).toBe("0m");
  });

  test("formats 90 seconds as '1m'", () => {
    expect(formatUptime(90)).toBe("1m");
  });
});

describe("truncateAddress", () => {
  test("returns short address unchanged when it fits within start+end", () => {
    expect(truncateAddress("abc", 8, 6)).toBe("abc");
  });

  test("truncates long address with ellipsis", () => {
    expect(truncateAddress("0x1234567890abcdef", 8, 6)).toBe("0x123456...abcdef");
  });
});

describe("formatPriceCents", () => {
  test("converts 9999 cents to $99.99", () => {
    expect(formatPriceCents(9999)).toBe("$99.99");
  });

  test("converts 0 cents to $0.00", () => {
    expect(formatPriceCents(0)).toBe("$0.00");
  });
});

describe("formatRelativeTime", () => {
  test("returns a relative time string for a recent date", () => {
    const recentDate = new Date(Date.now() - 5 * 60 * 1000).toISOString();
    const result = formatRelativeTime(recentDate);
    expect(result).toMatch(/\d+m ago/);
  });

  test("returns seconds ago for very recent date", () => {
    const veryRecentDate = new Date(Date.now() - 30 * 1000).toISOString();
    const result = formatRelativeTime(veryRecentDate);
    expect(result).toMatch(/\d+s ago/);
  });
});
