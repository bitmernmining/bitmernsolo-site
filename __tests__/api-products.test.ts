import { describe, test } from "bun:test";

describe("GET /api/products (SEC-02)", () => {
  test.todo("returns a JSON array of active products");
  test.todo("skips and logs invalid rows — does not return null entries");
  test.todo("returns 500 with JSON error body when Supabase query fails");
  test.todo("uses server Supabase client — lib/supabase/client.ts is not imported");
});
