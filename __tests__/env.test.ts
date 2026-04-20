import { describe, test } from "bun:test";

// These tests will be implemented once lib/env-validation.ts exists (created in plan 01-02).
// Using test.todo() keeps the suite green while the module is absent.

describe("env validation", () => {
  test.todo("throws with message naming the missing var when NEXT_PUBLIC_SUPABASE_URL is unset");
  test.todo("throws with message naming the missing var when NEXT_PUBLIC_SUPABASE_ANON_KEY is unset");
  test.todo("does not throw when all required vars are present");
});
