import type { Metadata } from "next";
import { PostCard } from "@/components/blog/post-card";
import { PostPager } from "@/components/blog/post-pager";
import { createClient } from "@/lib/supabase/server";
import { PostListResponseSchema, type PostSummary, type AuthorRef, type BlogCategoryRef } from "@/lib/schemas/blog";

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
    <main className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Blog</h1>
        <p className="mt-2 text-muted-foreground">
          Mining guides, hardware reviews, and pool updates from the Bitmern Solo team.
        </p>
      </header>
      {posts.length === 0 ? (
        <p className="text-center text-muted-foreground py-16">No posts yet — check back soon.</p>
      ) : (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (<PostCard key={p.id} post={p} />))}
          </div>
          <PostPager current={page} total={totalPages} basePath="/blog" />
        </>
      )}
    </main>
  );
}
