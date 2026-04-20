import { describe, test, expect } from "bun:test";
import { CoinSymbolSchema } from "@/lib/schemas/coin";
import { SlugSchema } from "@/lib/schemas/slug";

describe("CoinSymbolSchema", () => {
  test("accepts valid uppercase coin symbols: BTC, BCH, LTC, DOGE, DGB", () => {
    for (const sym of ["BTC", "BCH", "LTC", "DOGE", "DGB"]) {
      expect(CoinSymbolSchema.safeParse(sym).success).toBe(true);
    }
  });

  test("rejects lowercase coin symbol 'btc'", () => {
    expect(CoinSymbolSchema.safeParse("btc").success).toBe(false);
  });

  test("rejects unknown symbol 'XRP'", () => {
    expect(CoinSymbolSchema.safeParse("XRP").success).toBe(false);
  });
});

describe("SlugSchema", () => {
  test("accepts a valid slug like 'antminer-s19-pro'", () => {
    expect(SlugSchema.safeParse("antminer-s19-pro").success).toBe(true);
  });

  test("rejects a slug with script injection '<script>'", () => {
    expect(SlugSchema.safeParse("<script>alert(1)</script>").success).toBe(false);
  });

  test("rejects a slug exceeding 100 characters", () => {
    expect(SlugSchema.safeParse("a".repeat(101)).success).toBe(false);
  });

  test("rejects an empty slug", () => {
    expect(SlugSchema.safeParse("").success).toBe(false);
  });
});
