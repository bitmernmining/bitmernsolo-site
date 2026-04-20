import { describe, test, expect, beforeEach, afterEach } from "bun:test";
import { validateEnv } from "@/lib/env-validation";

describe("validateEnv", () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    // Ensure both vars are set as a baseline
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example.supabase.co";
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "test-anon-key";
  });

  afterEach(() => {
    // Restore original env
    process.env.NEXT_PUBLIC_SUPABASE_URL = originalEnv.NEXT_PUBLIC_SUPABASE_URL;
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = originalEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  });

  test("throws with message naming the missing var when NEXT_PUBLIC_SUPABASE_URL is unset", () => {
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    expect(() => validateEnv()).toThrow(
      "Missing required environment variable: NEXT_PUBLIC_SUPABASE_URL"
    );
  });

  test("throws with message naming the missing var when NEXT_PUBLIC_SUPABASE_ANON_KEY is unset", () => {
    delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    expect(() => validateEnv()).toThrow(
      "Missing required environment variable: NEXT_PUBLIC_SUPABASE_ANON_KEY"
    );
  });

  test("does not throw when all required vars are present", () => {
    expect(() => validateEnv()).not.toThrow();
  });
});
