import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PostCard } from "@/components/blog/post-card";
import { PostPager } from "@/components/blog/post-pager";
import { createClient } from "@/lib/supabase/server";
import type { PostSummary, AuthorRef, BlogCategoryRef } from "@/lib/schemas/blog";

export const metadata: Metadata = {
  title: "Blog — Bitmern Solo",
  description: "Mining guides, hardware reviews, and pool updates from the Bitmern Solo team.",
  alternates: {
    canonical: "/blog",
    types: { "application/rss+xml": "/blog/rss.xml" },
  },
};

export const revalidate = 300;

const PER_PAGE = 12;

async function fetchPosts(page: number): Promise<{ posts: PostSummary[]; total: number }> {
  const supabase = await createClient();
  const nowIso = new Date().toISOString();
  const { data, count } = await supabase
    .from("blog_posts")
    .select("id, slug, title, excerpt, cover_image_url, published_at, read_time_minutes, author_id", { count: "exact" })
    .eq("status", "published")
    .lte("published_at", nowIso)
    .order("published_at", { ascending: false })
    .range((page - 1) * PER_PAGE, page * PER_PAGE - 1);

  const rows = (data ?? []) as Array<{
    id: string; slug: string; title: string; excerpt: string | null;
    cover_image_url: string | null; published_at: string | null;
    read_time_minutes: number; author_id: string | null;
  }>;

  const authorIds = Array.from(new Set(rows.map((r) => r.author_id).filter((id): id is string => !!id)));
  const authorMap = new Map<string, AuthorRef>();
  if (authorIds.length > 0) {
    const { data: aRows } = await supabase.from("authors").select("id, slug, name, avatar_url").in("id", authorIds);
    for (const a of aRows ?? []) authorMap.set(a.id, a as AuthorRef);
  }

  const posts: PostSummary[] = rows.map((r) => ({
    id: r.id,
    slug: r.slug,
    title: r.title,
    excerpt: r.excerpt,
    cover_image_url: r.cover_image_url,
    author: r.author_id ? authorMap.get(r.author_id) ?? null : null,
    published_at: r.published_at,
    read_time_minutes: r.read_time_minutes,
    primary_category: null as BlogCategoryRef | null,
  }));

  return { posts, total: count ?? 0 };
}

export default async function BlogIndexPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const sp = await searchParams;
  const page = Math.max(1, Number(sp.page) || 1);
  const { posts, total } = await fetchPosts(page);
  const totalPages = Math.max(1, Math.ceil(total / PER_PAGE));

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      {/* Header */}
      <div className="text-center mb-16">
        <h1
          className="font-bold tracking-tight"
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
        >
          Blog
        </h1>
        <p className="mt-3 mx-auto max-w-xl text-muted-foreground leading-relaxed">
          Mining guides, hardware reviews, and pool updates from the Bitmern
          Solo team.
        </p>
      </div>

      {posts.length === 0 ? (
        <p className="text-center text-muted-foreground py-16">
          No posts yet — check back soon.
        </p>
      ) : (
        <div className="mb-16">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </div>
          <PostPager current={page} total={totalPages} basePath="/blog" />
        </div>
      )}

      {/* CTA */}
      <div className="text-center rounded-xl border border-primary/20 bg-primary/5 p-8">
        <h2 className="text-2xl font-bold tracking-tight">
          Ready to start mining?
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Connect your miner in minutes and keep the full block reward when you
          win.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Button size="lg" className="glow" asChild>
            <a href="https://app.bitmernsolo.com/signup">
              Start Mining
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/getting-started">Getting Started</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
