import { describe, expect, test, mock, beforeEach } from "bun:test";

const fromMock = mock();
beforeEach(() => fromMock.mockClear());

mock.module("@/lib/supabase/server", () => ({
  createClient: async () => ({ from: fromMock }),
}));

const { GET } = await import("@/app/api/faqs/route");

describe("GET /api/faqs", () => {
  test("200 with groups", async () => {
    fromMock.mockImplementationOnce(() => ({
      select: () => ({
        order: async () => ({
          data: [
            { id: "c1", name: "Shipping", slug: "shipping", display_order: 0, created_at: "2026-05-14T00:00:00Z", updated_at: "2026-05-14T00:00:00Z" },
          ],
          error: null,
        }),
      }),
    }));
    fromMock.mockImplementationOnce(() => ({
      select: () => ({
        eq: () => ({
          order: async () => ({
            data: [
              { id: "f1", question: "Q", answer: "A", category_id: "c1", display_order: 0, is_published: true, created_at: "2026-05-14T00:00:00Z", updated_at: "2026-05-14T00:00:00Z" },
            ],
            error: null,
          }),
        }),
      }),
    }));
    const res = await GET();
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.groups).toHaveLength(1);
    expect(json.groups[0].faqs).toHaveLength(1);
  });

  test("500 when categories fetch fails", async () => {
    fromMock.mockImplementationOnce(() => ({
      select: () => ({ order: async () => ({ data: null, error: { message: "boom" } }) }),
    }));
    const res = await GET();
    expect(res.status).toBe(500);
  });
});
