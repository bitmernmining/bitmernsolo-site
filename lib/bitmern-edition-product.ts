import type { Product } from "@/lib/schemas/product";

/**
 * Static Bitmern Edition catalog entry for Phase 1 marketing.
 * Inventory is intentionally 0 — messaging/template only until stock lands in Supabase.
 * Not an official Bitaxe product; stock unmodified AxeOS / ESP-Miner firmware.
 */
export const BITMERN_EDITION_PRODUCT: Product = {
  id: "bitmern-edition-static",
  name: "Bitmern Edition (AxeOS / ESP-Miner)",
  slug: "bitmern-edition",
  brand: "Bitmern Edition",
  algorithm: "SHA-256",
  coin_compatible: ["BTC", "BCH", "DGB", "XEC"],
  hashrate: 1_200_000_000_000,
  hashrate_unit: "TH/s",
  power_watts: 15,
  price_cents: 17900,
  sale_price_cents: null,
  stripe_price_id: null,
  images: [],
  specs: {
    cooling: "Air",
    interface: "Wi-Fi (AxeOS)",
    voltage: "5V",
  },
  stock_count: 0,
  status: "out_of_stock",
  featured: true,
  short_desc:
    "Pre-configured for Bitmern Solo (1% fee). Stock unmodified AxeOS / ESP-Miner — fully unlockable. Not an official Bitaxe.",
  description:
    "Bitmern Edition is our Phase 1 home-miner offering built around open AxeOS / ESP-Miner firmware. " +
    "Units ship with stock, unmodified firmware — we do not lock you in. Devices are pre-configured to point at " +
    "Bitmern Solo (flat 1% pool fee; you keep 99% of any block reward) and remain fully unlockable so you can " +
    "change pool, Wi-Fi, or firmware anytime.\n\n" +
    "This is not an official Bitaxe product. Bitaxe, AxeOS, and ESP-Miner are trademarks of their respective owners; " +
    "we credit the open AxeOS / ESP-Miner projects that power these boards. Inventory shown here is a listing " +
    "template — current stock is 0 while we prepare fulfillment.",
  created_at: "2026-09-01T00:00:00.000Z",
  updated_at: "2026-09-08T00:00:00.000Z",
};

export function withBitmernEditionCatalog(products: Product[]): Product[] {
  const withoutDup = products.filter((p) => p.slug !== BITMERN_EDITION_PRODUCT.slug);
  return [BITMERN_EDITION_PRODUCT, ...withoutDup];
}
