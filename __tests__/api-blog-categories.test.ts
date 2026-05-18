import { describe, expect, test, mock, beforeEach } from "bun:test";

const fromMock = mock();
beforeEach(() => fromMock.mockClear());

mock.module("@/lib/supabase/server", () => ({
  createClient: async () => ({ from: fromMock }),
}));

const { GET } = await import("@/app/api/blog/categories/route");

describe("GET /api/blog/categories", () => {
  test("200 with rows", async () => {
    fromMock.mockReturnValueOnce({
      select: () => ({
        order: () => ({
          order: async () => ({
            data: [
              { id: "c1", slug: "mining-guides", name: "Mining Guides", description: null, display_order: 0, created_at: "2026-05-18T00:00:00Z", updated_at: "2026-05-18T00:00:00Z" },
            ],
            error: null,
          }),
        }),
      }),
    });
    const res = await GET();
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.categories).toHaveLength(1);
  });

  test("500 on DB error", async () => {
    fromMock.mockReturnValueOnce({
      select: () => ({
        order: () => ({
          order: async () => ({ data: null, error: { message: "boom" } }),
        }),
      }),
    });
    const res = await GET();
    expect(res.status).toBe(500);
  });
});
