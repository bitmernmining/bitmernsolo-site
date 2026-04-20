import { describe, test } from "bun:test";

describe("parseSessionCart", () => {
  test.todo("returns empty array when input is undefined (SEC-03 — absent cookie)");
  test.todo(
    "returns empty array and logs warn when input is malformed JSON (BUG-03)"
  );
  test.todo(
    "returns empty array when entry has negative quantity (BUG-03)"
  );
  test.todo("returns validated CartEntry array when input is valid");
  test.todo("strips unknown fields from cart entries");
});
