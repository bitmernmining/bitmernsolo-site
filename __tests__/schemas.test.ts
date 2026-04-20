import { describe, test } from "bun:test";

// Tests will be implemented once lib/schemas/product.ts exists (created in plan 01-03).

describe("ProductSchema", () => {
  test.todo("returns success:true for a valid product row");
  test.todo("returns success:false and does not throw for a row missing price_cents");
  test.todo("returns success:false for a row with an invalid status value");
  test.todo("handles null sale_price_cents without failing");
});
