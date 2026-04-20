import { describe, test } from "bun:test";

describe("GET /api/cart/checkout-url", () => {
  test.todo("returns { url: string } with base64-encoded cart entries (SEC-04)");
  test.todo(
    "URL contains ?cart= query param pointing to app.bitmernsolo.com/shop/cart/import"
  );
  test.todo(
    "each cart entry in encoded payload has shape { productId: string, quantity: number }"
  );
  test.todo("returns checkout URL with empty cart array when no session present");
});
