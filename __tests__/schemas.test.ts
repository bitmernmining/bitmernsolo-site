import { describe, test, expect } from "bun:test";
import { ProductSchema } from "@/lib/schemas/product";
import { CoinSymbolSchema } from "@/lib/schemas/coin";

const validProductRow = {
  id: "prod-1", name: "Antminer S19 Pro", slug: "antminer-s19-pro",
  description: "High-performance SHA-256 miner", short_desc: "SHA-256 ASIC",
  brand: "Bitmain", algorithm: "SHA-256", coin_compatible: ["BTC"],
  hashrate: 110, hashrate_unit: "TH/s", power_watts: 3250,
  price_cents: 200000, sale_price_cents: null, stripe_price_id: null,
  images: [], specs: {}, stock_count: 5, status: "active",
  featured: true, created_at: "2024-01-01T00:00:00Z", updated_at: "2024-01-01T00:00:00Z",
};

describe("ProductSchema", () => {
  test("returns success:true for a valid product row", () => {
    const result = ProductSchema.safeParse(validProductRow);
    expect(result.success).toBe(true);
  });

  test("returns success:false for a row missing price_cents", () => {
    const { price_cents, ...rowWithoutPrice } = validProductRow;
    const result = ProductSchema.safeParse(rowWithoutPrice);
    expect(result.success).toBe(false);
  });

  test("returns success:false for a row with an invalid status value", () => {
    const result = ProductSchema.safeParse({ ...validProductRow, status: "archived" });
    expect(result.success).toBe(false);
  });

  test("handles null sale_price_cents without failing", () => {
    const result = ProductSchema.safeParse({ ...validProductRow, sale_price_cents: null });
    expect(result.success).toBe(true);
  });
});

describe("CoinSymbolSchema", () => {
  test("accepts valid uppercase coin symbols", () => {
    for (const sym of ["BTC", "BCH", "LTC", "DOGE", "DGB"]) {
      expect(CoinSymbolSchema.safeParse(sym).success).toBe(true);
    }
  });

  test("rejects lowercase coin symbol", () => {
    expect(CoinSymbolSchema.safeParse("btc").success).toBe(false);
  });

  test("rejects unknown symbol", () => {
    expect(CoinSymbolSchema.safeParse("XRP").success).toBe(false);
  });
});
