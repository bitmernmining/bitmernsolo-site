import { describe, test, expect, mock } from "bun:test";
import { render, screen } from "@testing-library/react";
import { createElement } from "react";
import type { Product } from "@/types/shop";

mock.module("next/image", () => ({
  default: ({ src, alt }: { src: string; alt: string }) =>
    createElement("img", { src, alt }),
}));

mock.module("next/link", () => ({
  default: ({
    href,
    children,
    className,
  }: {
    href: string;
    children: React.ReactNode;
    className?: string;
  }) => createElement("a", { href, className }, children),
}));

// Mock lucide-react to avoid loading 3500+ individual icon ESM files in bun:test
mock.module("lucide-react", () => ({
  Zap: () => null,
  Cpu: () => null,
  Gauge: () => null,
  Wind: () => null,
  ArrowRight: () => null,
  Box: () => null,
}));

// Import component AFTER mocks
const { ProductCard } = await import("@/components/shop/product-card");

function makeProduct(overrides: Partial<Product> = {}): Product {
  return {
    id: "prod-1",
    name: "Antminer S19 Pro",
    slug: "antminer-s19-pro",
    description: "A fast SHA-256 miner",
    short_desc: "110 TH/s SHA-256 miner",
    brand: "Bitmain",
    algorithm: "SHA-256",
    coin_compatible: ["BTC"],
    hashrate: 110e12,
    hashrate_unit: "TH/s",
    power_watts: 3250,
    price_cents: 49999,
    sale_price_cents: null,
    stripe_price_id: null,
    images: [],
    specs: {},
    stock_count: 10,
    status: "active",
    featured: false,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
    ...overrides,
  } as Product;
}

describe("ProductCard", () => {
  describe("renders product name and price", () => {
    test("renders product name", () => {
      const product = makeProduct();
      render(createElement(ProductCard, { product }));
      expect(screen.getByText("Antminer S19 Pro")).toBeTruthy();
    });

    test("renders formatted price", () => {
      const product = makeProduct({ price_cents: 49999 });
      render(createElement(ProductCard, { product }));
      expect(screen.getByText("$499.99")).toBeTruthy();
    });
  });

  describe("stock status", () => {
    test("shows 'In stock' for stock_count >= 5", () => {
      const product = makeProduct({ stock_count: 10 });
      render(createElement(ProductCard, { product }));
      expect(screen.getByText("In stock")).toBeTruthy();
    });

    test("shows 'Out of stock' for stock_count = 0", () => {
      const product = makeProduct({ stock_count: 0 });
      render(createElement(ProductCard, { product }));
      expect(screen.getByText("Out of stock")).toBeTruthy();
    });

    test("shows 'N left' for low stock (count < 5)", () => {
      const product = makeProduct({ stock_count: 3 });
      render(createElement(ProductCard, { product }));
      expect(screen.getByText("3 left")).toBeTruthy();
    });
  });

  describe("discount badge", () => {
    test("shows SALE badge when sale_price_cents < price_cents", () => {
      const product = makeProduct({ price_cents: 49999, sale_price_cents: 39999 });
      render(createElement(ProductCard, { product }));
      expect(screen.getByText("SALE")).toBeTruthy();
    });

    test("does not show SALE badge when no sale price", () => {
      const product = makeProduct({ sale_price_cents: null });
      render(createElement(ProductCard, { product }));
      expect(screen.queryByText("SALE")).toBeNull();
    });

    test("renders sale price (not original) as main price when on sale", () => {
      const product = makeProduct({ price_cents: 49999, sale_price_cents: 39999 });
      render(createElement(ProductCard, { product }));
      expect(screen.getByText("$399.99")).toBeTruthy();
    });
  });
});
