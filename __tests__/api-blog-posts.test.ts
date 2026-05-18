import { describe, expect, test, mock, beforeEach } from "bun:test";

const fromMock = mock();
beforeEach(() => fromMock.mockClear());

mock.module("@/lib/supabase/server", () => ({
  createClient: async () => ({ from: fromMock }),
}));

const { GET } = await import("@/app/api/blog/posts/route");

function makeReq(qs = ""): Request {
  return new Request(`http://localhost/api/blog/posts${qs ? "?" + qs : ""}`);
}

// Helper to set up a multi-mock sequence:
//   1st call: blog_posts (filtered, ordered, ranged) → posts + count
//   2nd call: authors (.in("id", ...)) → author refs
//   3rd call: blog_post_categories joined to blog_categories → category map for primary_category
function mockHappyPath() {
  // Posts query
  fromMock.mockImplementationOnce(() => ({
    select: () => ({
      eq: () => ({
        lte: () => ({
          order: () => ({
            range: async () => ({
              data: [
                {
                  id: "p1",
                  slug: "first-post",
                  title: "First Post",
                  excerpt: "An excerpt",
                  cover_image_url: null,
                  published_at: "2026-05-18T00:00:00Z",
                  read_time_minutes: 3,
                  author_id: "a1",
                },
              ],
              count: 1,
              error: null,
            }),
          }),
        }),
      }),
    }),
  }));
  // Authors hydrate
  fromMock.mockImplementationOnce(() => ({
    select: () => ({
      in: async () => ({
        data: [{ id: "a1", slug: "satoshi", name: "Satoshi", avatar_url: null }],
        error: null,
      }),
    }),
  }));
  // Categories hydrate (for primary_category) — returns empty (post has no category)
  fromMock.mockImplementationOnce(() => ({
    select: () => ({
      in: async () => ({ data: [], error: null }),
    }),
  }));
}

describe("GET /api/blog/posts", () => {
  test("200 with default pagination returns posts + totals", async () => {
    mockHappyPath();
    const res = await GET(makeReq());
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.page).toBe(1);
    expect(json.per_page).toBe(12);
    expect(json.total).toBe(1);
    expect(json.posts).toHaveLength(1);
    expect(json.posts[0].slug).toBe("first-post");
    expect(json.posts[0].author?.slug).toBe("satoshi");
  });

  test("400 on per_page > 50", async () => {
    const res = await GET(makeReq("per_page=51"));
    expect(res.status).toBe(400);
  });

  test("400 on negative page", async () => {
    const res = await GET(makeReq("page=0"));
    expect(res.status).toBe(400);
  });

  test("200 with empty result", async () => {
    fromMock.mockImplementationOnce(() => ({
      select: () => ({
        eq: () => ({
          lte: () => ({
            order: () => ({
              range: async () => ({ data: [], count: 0, error: null }),
            }),
          }),
        }),
      }),
    }));
    const res = await GET(makeReq());
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.posts).toHaveLength(0);
    expect(json.total).toBe(0);
  });

  test("500 when posts query errors", async () => {
    fromMock.mockImplementationOnce(() => ({
      select: () => ({
        eq: () => ({
          lte: () => ({
            order: () => ({
              range: async () => ({ data: null, count: null, error: { message: "boom" } }),
            }),
          }),
        }),
      }),
    }));
    const res = await GET(makeReq());
    expect(res.status).toBe(500);
  });
});
