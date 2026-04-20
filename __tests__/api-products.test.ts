import { describe, test, expect, mock, beforeEach } from "bun:test";
import { readFileSync } from "fs";
import { resolve } from "path";

// --------------------------------------------------------------------------
// Supabase server mock — must be set up before importing the route handler
// --------------------------------------------------------------------------

let mockResolvedData: unknown[] = [];
let mockError: { message: string } | null = null;

const mockOrder = mock(() =>
  Promise.resolve({ data: mockResolvedData, error: mockError })
);
const mockNeq = mock(() => ({ order: mockOrder }));
const mockSelect = mock(() => ({ neq: mockNeq }));
const mockFrom = mock(() => ({ select: mockSelect }));

mock.module("@/lib/supabase/server", () => ({
  createClient: mock(async () => ({ from: mockFrom })),
}));

// Import the route handler AFTER mocking
const { GET } = await import("../app/api/products/route");

// --------------------------------------------------------------------------
// Valid product row fixture
// --------------------------------------------------------------------------

const validRow = {
  id: "prod-1",
  name: "Antminer S21",
  slug: "antminer-s21",
  description: "High performance ASIC miner",
  short_desc: "200 TH/s SHA-256",
  brand: "Bitmain",
  algorithm: "SHA-256",
  coin_compatible: ["BTC"],
  hashrate: 200,
  hashrate_unit: "TH/s",
  power_watts: 3500,
  price_cents: 499900,
  sale_price_cents: null,
  stripe_price_id: null,
  images: [],
  specs: {},
  stock_count: 10,
  status: "active",
  featured: true,
  created_at: "2024-01-01T00:00:00Z",
  updated_at: "2024-01-01T00:00:00Z",
};

const validRow2 = {
  ...validRow,
  id: "prod-2",
  slug: "antminer-s21-pro",
  name: "Antminer S21 Pro",
};

// Row missing price_cents — will fail ProductSchema.safeParse
const invalidRow = {
  id: "bad-row",
  name: "Bad Product",
  // missing price_cents and other required fields
};

// --------------------------------------------------------------------------
// Tests
// --------------------------------------------------------------------------

describe("GET /api/products (SEC-02)", () => {
  beforeEach(() => {
    mockError = null;
    mockResolvedData = [];
    mockOrder.mockClear();
    mockNeq.mockClear();
    mockSelect.mockClear();
    mockFrom.mockClear();
  });

  test("returns a JSON array of active products", async () => {
    mockResolvedData = [validRow, validRow2];

    const response = await GET();
    const body = await response.json();

    expect(Array.isArray(body)).toBe(true);
    expect(body).toHaveLength(2);
    expect(body[0].id).toBe("prod-1");
    expect(body[1].id).toBe("prod-2");
  });

  test("skips and logs invalid rows — does not return null entries", async () => {
    mockResolvedData = [validRow, invalidRow];

    const response = await GET();
    const body = await response.json();

    expect(Array.isArray(body)).toBe(true);
    expect(body).toHaveLength(1);
    expect(body[0].id).toBe("prod-1");
  });

  test("returns 500 with JSON error body when Supabase query fails", async () => {
    mockError = { message: "DB down" };
    mockResolvedData = [];

    const response = await GET();
    expect(response.status).toBe(500);

    const body = await response.json();
    expect(body).toHaveProperty("error");
  });

  test("uses server Supabase client — lib/supabase/client.ts is not imported", () => {
    const routePath = resolve(
      import.meta.dir,
      "../app/api/products/route.ts"
    );
    const source = readFileSync(routePath, "utf-8");
    expect(source).not.toContain("supabase/client");
  });
});
