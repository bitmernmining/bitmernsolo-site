import { describe, expect, test, beforeEach, mock } from "bun:test";
import { cleanup, render, screen } from "@testing-library/react";
import { createElement } from "react";

// Mock next/image and next/link to avoid SSR overhead in tests
mock.module("next/image", () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) =>
    createElement("img", { src, alt }),
}));
mock.module("next/link", () => ({
  __esModule: true,
  default: ({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) =>
    createElement("a", { href, className }, children),
}));

const { PostCard } = await import("@/components/blog/post-card");
import type { PostSummary } from "@/lib/schemas/blog";

const basePost: PostSummary = {
  id: "p1",
  slug: "intro-to-mining",
  title: "An intro to solo mining",
  excerpt: "Solo mining explained in simple terms.",
  cover_image_url: "https://cdn.example/cover.webp",
  author: {
    id: "a1",
    slug: "satoshi",
    name: "Satoshi Nakamoto",
    avatar_url: null,
  },
  published_at: "2026-05-18T00:00:00Z",
  read_time_minutes: 5,
  primary_category: { id: "c1", slug: "mining-guides", name: "Mining Guides" },
};

describe("PostCard", () => {
  beforeEach(() => cleanup());

  test("renders title and excerpt", () => {
    render(<PostCard post={basePost} />);
    expect(screen.getByText(/intro to solo mining/i)).toBeTruthy();
    expect(screen.getByText(/Solo mining explained/i)).toBeTruthy();
  });

  test("renders cover image when set", () => {
    render(<PostCard post={basePost} />);
    const img = screen.getByAltText(/intro to solo mining/i);
    expect(img.getAttribute("src")).toBe("https://cdn.example/cover.webp");
  });

  test("renders author name when set", () => {
    render(<PostCard post={basePost} />);
    expect(screen.getByText(/satoshi nakamoto/i)).toBeTruthy();
  });

  test("renders primary category badge when set", () => {
    render(<PostCard post={basePost} />);
    expect(screen.getByText(/mining guides/i)).toBeTruthy();
  });

  test("renders read time", () => {
    render(<PostCard post={basePost} />);
    expect(screen.getByText(/5 min/i)).toBeTruthy();
  });

  test("does not crash with null fields", () => {
    const nullish: PostSummary = {
      ...basePost,
      excerpt: null,
      cover_image_url: null,
      author: null,
      primary_category: null,
      published_at: null,
    };
    expect(() => render(<PostCard post={nullish} />)).not.toThrow();
  });

  test("post link uses slug", () => {
    render(<PostCard post={basePost} />);
    const link = screen.getByRole("link", { name: /intro to solo mining/i });
    expect(link.getAttribute("href")).toBe("/blog/intro-to-mining");
  });
});
