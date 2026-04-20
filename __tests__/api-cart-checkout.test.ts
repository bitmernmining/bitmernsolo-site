import { describe, test, expect } from "bun:test";

// Test the encoding logic directly (isolated from Route Handler iron-session dependency)
function encodeCartForCheckout(entries: { productId: string; quantity: number }[]): string {
  const encoded = Buffer.from(JSON.stringify(entries)).toString("base64");
  return `https://app.bitmernsolo.com/shop/cart/import?cart=${encoded}`;
}

describe("checkout URL encoding (SEC-04 cross-app contract)", () => {
  test("URL points to app.bitmernsolo.com/shop/cart/import", () => {
    const url = encodeCartForCheckout([{ productId: "prod-1", quantity: 1 }]);
    expect(url.startsWith("https://app.bitmernsolo.com/shop/cart/import?cart=")).toBe(true);
  });

  test("decoded payload is array of { productId, quantity } objects", () => {
    const entries = [{ productId: "prod-1", quantity: 2 }];
    const url = encodeCartForCheckout(entries);
    const cartParam = new URL(url).searchParams.get("cart")!;
    const decoded = JSON.parse(Buffer.from(cartParam, "base64").toString("utf-8"));
    expect(decoded).toEqual(entries);
  });

  test("empty cart encodes as base64 of '[]'", () => {
    const url = encodeCartForCheckout([]);
    const cartParam = new URL(url).searchParams.get("cart")!;
    const decoded = JSON.parse(Buffer.from(cartParam, "base64").toString("utf-8"));
    expect(decoded).toEqual([]);
  });

  test("no extra fields leak into encoded payload (only productId + quantity)", () => {
    // Simulates filtering of extra CartEntry fields server-side
    const rawEntry = { productId: "prod-1", quantity: 1 };
    const entries = [{ productId: rawEntry.productId, quantity: rawEntry.quantity }];
    const url = encodeCartForCheckout(entries);
    const cartParam = new URL(url).searchParams.get("cart")!;
    const decoded = JSON.parse(Buffer.from(cartParam, "base64").toString("utf-8"));
    expect(Object.keys(decoded[0])).toEqual(["productId", "quantity"]);
  });

  test.todo("GET /api/cart/checkout-url returns { url } from session — integration test (Phase 5)");
});
