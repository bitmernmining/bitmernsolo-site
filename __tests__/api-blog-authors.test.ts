import { describe, expect, test, mock, beforeEach } from "bun:test";

const fromMock = mock();
beforeEach(() => fromMock.mockClear());

mock.module("@/lib/supabase/server", () => ({
  createClient: async () => ({ from: fromMock }),
}));

const { GET } = await import("@/app/api/blog/authors/[slug]/route");

function makeReq(slug: string) {
  return {
    req: new Request(`http://localhost/api/blog/authors/${slug}`),
    ctx: { params: Promise.resolve({ slug }) },
  };
}

describe("GET /api/blog/authors/[slug]", () => {
  test("400 on invalid slug", async () => {
    const { req, ctx } = makeReq("INVALID SLUG");
    const res = await GET(req, ctx);
    expect(res.status).toBe(400);
  });

  test("404 when author missing", async () => {
    fromMock.mockReturnValueOnce({
      select: () => ({
        eq: () => ({
          maybeSingle: async () => ({ data: null, error: null }),
        }),
      }),
    });
    const { req, ctx } = makeReq("missing-author");
    const res = await GET(req, ctx);
    expect(res.status).toBe(404);
  });

  test("200 with author + empty posts", async () => {
    // Author fetch
    fromMock.mockReturnValueOnce({
      select: () => ({
        eq: () => ({
          maybeSingle: async () => ({
            data: {
              id: "a1", slug: "satoshi", name: "Satoshi",
              bio: null, avatar_url: null, twitter: null, github: null, website: null,
              created_at: "2026-05-18T00:00:00Z", updated_at: "2026-05-18T00:00:00Z",
            },
            error: null,
          }),
        }),
      }),
    });
    // Posts fetch (empty)
    fromMock.mockReturnValueOnce({
      select: () => ({
        eq: () => ({
          eq: () => ({
            lte: () => ({
              order: async () => ({ data: [], error: null }),
            }),
          }),
        }),
      }),
    });
    const { req, ctx } = makeReq("satoshi");
    const res = await GET(req, ctx);
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.author.slug).toBe("satoshi");
    expect(json.posts).toHaveLength(0);
  });

  test("200 with author + posts", async () => {
    fromMock.mockReturnValueOnce({
      select: () => ({
        eq: () => ({
          maybeSingle: async () => ({
            data: {
              id: "a1", slug: "satoshi", name: "Satoshi",
              bio: "A.", avatar_url: null, twitter: null, github: null, website: null,
              created_at: "2026-05-18T00:00:00Z", updated_at: "2026-05-18T00:00:00Z",
            },
            error: null,
          }),
        }),
      }),
    });
    fromMock.mockReturnValueOnce({
      select: () => ({
        eq: () => ({
          eq: () => ({
            lte: () => ({
              order: async () => ({
                data: [
                  { id: "p1", slug: "first", title: "First", excerpt: null, cover_image_url: null, published_at: "2026-05-18T00:00:00Z", read_time_minutes: 2 },
                ],
                error: null,
              }),
            }),
          }),
        }),
      }),
    });
    const { req, ctx } = makeReq("satoshi");
    const res = await GET(req, ctx);
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.posts).toHaveLength(1);
    expect(json.posts[0].slug).toBe("first");
  });
});
