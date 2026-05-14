import { describe, expect, test, mock, beforeEach } from "bun:test";
import { resetRateLimit } from "@/lib/rate-limit";

const insertMock = mock();
mock.module("@/lib/supabase/server", () => ({
  createClient: async () => ({
    from: () => ({
      insert: () => ({ select: () => ({ single: insertMock }) }),
    }),
  }),
}));

const fetchMock = mock(async () => new Response(null, { status: 200 }));
beforeEach(() => {
  resetRateLimit();
  insertMock.mockClear();
  fetchMock.mockClear();
  globalThis.fetch = fetchMock as typeof fetch;
});

const { POST } = await import("@/app/api/support-tickets/route");

function req(body: unknown, ip = "1.2.3.4"): Request {
  return new Request("http://localhost/api/support-tickets", {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": ip },
    body: JSON.stringify(body),
  });
}

const valid = { name: "Sat", email: "sat@example.com", subject: "Q", message: "M" };

describe("POST /api/support-tickets", () => {
  test("200 on valid input", async () => {
    insertMock.mockResolvedValueOnce({ data: { id: "abc" }, error: null });
    const res = await POST(req(valid));
    expect(res.status).toBe(200);
    expect(insertMock).toHaveBeenCalledTimes(1);
  });

  test("400 on missing email", async () => {
    const res = await POST(req({ ...valid, email: "" }));
    expect(res.status).toBe(400);
  });

  test("400 on honeypot filled", async () => {
    const res = await POST(req({ ...valid, _honeypot: "I am a bot" }));
    expect(res.status).toBe(400);
  });

  test("429 after RATE_LIMIT_MAX submissions", async () => {
    insertMock.mockResolvedValue({ data: { id: "x" }, error: null });
    for (let i = 0; i < 10; i++) {
      const ok = await POST(req(valid, "9.9.9.9"));
      expect(ok.status).toBe(200);
    }
    const blocked = await POST(req(valid, "9.9.9.9"));
    expect(blocked.status).toBe(429);
  });

  test("500 when Supabase insert fails", async () => {
    insertMock.mockResolvedValueOnce({ data: null, error: { message: "fail" } });
    const res = await POST(req(valid, "8.8.8.8"));
    expect(res.status).toBe(500);
  });
});
