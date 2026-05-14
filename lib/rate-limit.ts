export const RATE_LIMIT_MAX = 10;
export const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;

type RateLimitResult = { allowed: true; retryAfterMs: 0 } | { allowed: false; retryAfterMs: number };

const buckets = new Map<string, number[]>();

export function checkRateLimit(key: string, now: () => number = Date.now): RateLimitResult {
  const t = now();
  const cutoff = t - RATE_LIMIT_WINDOW_MS;
  const arr = (buckets.get(key) ?? []).filter((ts) => ts > cutoff);

  if (arr.length >= RATE_LIMIT_MAX) {
    buckets.set(key, arr);
    return { allowed: false, retryAfterMs: arr[0] + RATE_LIMIT_WINDOW_MS - t };
  }
  arr.push(t);
  buckets.set(key, arr);
  return { allowed: true, retryAfterMs: 0 };
}

export function resetRateLimit(): void {
  buckets.clear();
}
