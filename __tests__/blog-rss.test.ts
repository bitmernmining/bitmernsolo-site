import { describe, expect, test, mock, beforeEach } from "bun:test";

const fromMock = mock();
beforeEach(() => fromMock.mockClear());

mock.module("@/lib/supabase/server", () => ({
  createClient: async () => ({ from: fromMock }),
}));

const { GET } = await import("@/app/blog/rss.xml/route");

describe("GET /blog/rss.xml", () => {
  test("200 with valid RSS 2.0 XML", async () => {
    fromMock.mockReturnValueOnce({
      select: () => ({
        eq: () => ({
          lte: () => ({
            order: () => ({
              limit: async () => ({
                data: [
                  {
                    slug: "first-post",
                    title: "First Post",
                    excerpt: "An excerpt.",
                    body_html: "<p>Body content</p>",
                    published_at: "2026-05-18T00:00:00Z",
                  },
                  {
                    slug: "second-post",
                    title: "Second Post",
                    excerpt: null,
                    body_html: "<p>Different body</p>",
                    published_at: "2026-05-17T00:00:00Z",
                  },
                ],
                error: null,
              }),
            }),
          }),
        }),
      }),
    });
    const res = await GET();
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toMatch(/application\/xml/);
    const body = await res.text();
    expect(body).toMatch(/^<\?xml version="1\.0"/);
    expect(body).toMatch(/<rss version="2\.0"/);
    expect(body).toMatch(/<channel>/);
    expect(body).toMatch(/<title>Bitmern Solo Blog<\/title>/);
    expect(body).toMatch(/<item>/);
    expect(body).toMatch(/First Post/);
    expect(body).toMatch(/Second Post/);
    expect(body).toMatch(/https:\/\/www\.bitmernsolo\.com\/blog\/first-post/);
  });

  test("200 with empty feed when no posts", async () => {
    fromMock.mockReturnValueOnce({
      select: () => ({
        eq: () => ({
          lte: () => ({
            order: () => ({
              limit: async () => ({ data: [], error: null }),
            }),
          }),
        }),
      }),
    });
    const res = await GET();
    expect(res.status).toBe(200);
    const body = await res.text();
    expect(body).toMatch(/<channel>/);
    expect(body).not.toMatch(/<item>/);
  });

  test("500 on DB error", async () => {
    fromMock.mockReturnValueOnce({
      select: () => ({
        eq: () => ({
          lte: () => ({
            order: () => ({
              limit: async () => ({ data: null, error: { message: "boom" } }),
            }),
          }),
        }),
      }),
    });
    const res = await GET();
    expect(res.status).toBe(500);
  });
});
