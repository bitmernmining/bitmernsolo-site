import { describe, expect, test, beforeEach } from "bun:test";
import { checkRateLimit, resetRateLimit, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS } from "@/lib/rate-limit";

describe("checkRateLimit", () => {
  beforeEach(() => resetRateLimit());

  test("constants are correct", () => {
    expect(RATE_LIMIT_MAX).toBe(10);
    expect(RATE_LIMIT_WINDOW_MS).toBe(60 * 60 * 1000);
  });

  test("allows first request", () => {
    expect(checkRateLimit("1.2.3.4")).toEqual({ allowed: true, retryAfterMs: 0 });
  });

  test("allows exactly RATE_LIMIT_MAX", () => {
    for (let i = 0; i < RATE_LIMIT_MAX; i++) {
      expect(checkRateLimit("1.2.3.4").allowed).toBe(true);
    }
  });

  test("blocks RATE_LIMIT_MAX+1", () => {
    for (let i = 0; i < RATE_LIMIT_MAX; i++) checkRateLimit("1.2.3.4");
    const r = checkRateLimit("1.2.3.4");
    expect(r.allowed).toBe(false);
    expect(r.retryAfterMs).toBeGreaterThan(0);
  });

  test("isolates between IPs", () => {
    for (let i = 0; i < RATE_LIMIT_MAX; i++) checkRateLimit("1.2.3.4");
    expect(checkRateLimit("5.6.7.8").allowed).toBe(true);
  });

  test("expires entries after window", () => {
    const fakeNow = { value: 1_000_000 };
    const nowFn = () => fakeNow.value;
    for (let i = 0; i < RATE_LIMIT_MAX; i++) checkRateLimit("1.2.3.4", nowFn);
    expect(checkRateLimit("1.2.3.4", nowFn).allowed).toBe(false);
    fakeNow.value += RATE_LIMIT_WINDOW_MS + 1;
    expect(checkRateLimit("1.2.3.4", nowFn).allowed).toBe(true);
  });
});
