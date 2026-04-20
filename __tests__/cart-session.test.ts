import { describe, test, expect, spyOn } from "bun:test";
import { parseSessionCart } from "@/lib/cart-session";

describe("parseSessionCart", () => {
  test("returns empty array when input is undefined (SEC-03 — absent cookie)", () => {
    expect(parseSessionCart(undefined)).toEqual([]);
  });
  test("returns empty array and logs warn when input is malformed JSON (BUG-03)", () => {
    const spy = spyOn(console, "warn").mockImplementation(() => {});
    expect(parseSessionCart("not an array")).toEqual([]);
    expect(spy).toHaveBeenCalledWith(
      "[cart-session] Malformed cart data discarded",
      "not an array"
    );
    spy.mockRestore();
  });
  test("returns empty array when entry has negative quantity (BUG-03)", () => {
    expect(parseSessionCart([{ productId: "abc", quantity: -1 }])).toEqual([]);
  });
  test("returns empty array when entry has zero quantity", () => {
    expect(parseSessionCart([{ productId: "abc", quantity: 0 }])).toEqual([]);
  });
  test("returns validated CartEntry array when input is valid", () => {
    const input = [{ productId: "prod-1", quantity: 2 }];
    expect(parseSessionCart(input)).toEqual(input);
  });
  test("strips unknown fields from cart entries", () => {
    const input = [{ productId: "prod-1", quantity: 1, extra: "junk" }];
    expect(parseSessionCart(input)).toEqual([{ productId: "prod-1", quantity: 1 }]);
  });
});
