import { describe, test } from "bun:test";

describe("POST /api/cart/add", () => {
  test.todo(
    "returns 200 with { success: true, clamped: false } when quantity is within stock"
  );
  test.todo(
    "returns 200 with { success: true, clamped: true, clampedTo: N } when quantity exceeds stock (BUG-01)"
  );
  test.todo(
    "returns 200 with empty cart array when no session cookie present (SEC-03)"
  );
  test.todo("merges quantity with existing entry instead of creating duplicate");
});

describe("POST /api/cart/update", () => {
  test.todo(
    "returns 200 with { success: true, clamped: true, clampedTo: N } when new quantity exceeds stock"
  );
  test.todo("removes entry when quantity is set to 0");
});

describe("POST /api/cart/remove", () => {
  test.todo("returns 200 after removing item from session");
});

describe("POST /api/cart/clear", () => {
  test.todo("returns 200 with empty cart after clearing session");
});
