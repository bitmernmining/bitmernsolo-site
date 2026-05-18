import { describe, expect, test } from "bun:test";
import {
  AuthorSchema,
  BlogCategorySchema,
  BlogTagSchema,
  PostSchema,
  PostSummarySchema,
  PostListResponseSchema,
} from "@/lib/schemas/blog";

describe("AuthorSchema", () => {
  test("accepts a valid author row", () => {
    const ok = AuthorSchema.parse({
      id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
      slug: "satoshi",
      name: "Satoshi Nakamoto",
      bio: "Anonymous creator.",
      avatar_url: "https://cdn.example/avatar.webp",
      twitter: null,
      github: null,
      website: null,
      created_at: "2026-05-18T00:00:00Z",
      updated_at: "2026-05-18T00:00:00Z",
    });
    expect(ok.slug).toBe("satoshi");
  });
  test("allows null bio + social links", () => {
    expect(() =>
      AuthorSchema.parse({
        id: "x", slug: "x", name: "X",
        bio: null, avatar_url: null, twitter: null, github: null, website: null,
        created_at: "", updated_at: "",
      }),
    ).not.toThrow();
  });
});

describe("BlogCategorySchema", () => {
  test("accepts a valid category", () => {
    const ok = BlogCategorySchema.parse({
      id: "c1", slug: "mining-guides", name: "Mining Guides",
      description: null, display_order: 0,
      created_at: "", updated_at: "",
    });
    expect(ok.slug).toBe("mining-guides");
  });
});

describe("BlogTagSchema", () => {
  test("accepts a valid tag", () => {
    expect(() =>
      BlogTagSchema.parse({
        id: "t1", slug: "asic", name: "ASIC",
        created_at: "", updated_at: "",
      }),
    ).not.toThrow();
  });
});

describe("PostSchema", () => {
  test("accepts a valid published post", () => {
    const ok = PostSchema.parse({
      id: "p1",
      slug: "intro-to-mining",
      title: "An intro to solo mining",
      excerpt: "Solo mining explained.",
      body_html: "<p>Body</p>",
      cover_image_url: "https://cdn.example/cover.webp",
      author_id: "a1",
      status: "published",
      scheduled_for: null,
      published_at: "2026-05-18T00:00:00Z",
      meta_title: null,
      meta_description: null,
      og_image_url: null,
      read_time_minutes: 5,
      created_at: "2026-05-18T00:00:00Z",
      updated_at: "2026-05-18T00:00:00Z",
    });
    expect(ok.read_time_minutes).toBe(5);
  });

  test("rejects invalid status", () => {
    expect(() =>
      PostSchema.parse({
        id: "p1", slug: "x", title: "X", excerpt: null, body_html: "",
        cover_image_url: null, author_id: null,
        status: "wat",
        scheduled_for: null, published_at: null,
        meta_title: null, meta_description: null, og_image_url: null,
        read_time_minutes: 1, created_at: "", updated_at: "",
      }),
    ).toThrow();
  });
});

describe("PostSummarySchema", () => {
  test("accepts the index-card shape (no body_html)", () => {
    const ok = PostSummarySchema.parse({
      id: "p1", slug: "x", title: "X", excerpt: "y",
      cover_image_url: null, author: {
        id: "a1", slug: "s", name: "Author", avatar_url: null,
      },
      published_at: "2026-05-18T00:00:00Z",
      read_time_minutes: 3,
      primary_category: null,
    });
    expect(ok.read_time_minutes).toBe(3);
  });
});

describe("PostListResponseSchema", () => {
  test("accepts paginated response shape", () => {
    const ok = PostListResponseSchema.parse({
      posts: [],
      page: 1,
      per_page: 12,
      total: 0,
    });
    expect(ok.per_page).toBe(12);
  });
});
