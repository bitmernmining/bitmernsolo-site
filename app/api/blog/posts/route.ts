import { NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import {
  AuthorRefSchema,
  BlogCategoryRefSchema,
  type AuthorRef,
  type BlogCategoryRef,
  type PostSummary,
  type PostListResponse,
} from "@/lib/schemas/blog";

export const dynamic = "force-dynamic";

const QuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  per_page: z.coerce.number().int().min(1).max(50).default(12),
  category: z.string().min(1).max(80).regex(/^[a-z0-9-]+$/).optional(),
  tag: z.string().min(1).max(80).regex(/^[a-z0-9-]+$/).optional(),
  author: z.string().min(1).max(80).regex(/^[a-z0-9-]+$/).optional(),
});

type PostRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  cover_image_url: string | null;
  published_at: string | null;
  read_time_minutes: number;
  author_id: string | null;
};

export async function GET(req: Request): Promise<NextResponse<PostListResponse | { error: string }>> {
  try {
    const url = new URL(req.url);
    const parsed = QuerySchema.safeParse(Object.fromEntries(url.searchParams));
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid query parameters", details: parsed.error.flatten() } as { error: string },
        { status: 400 },
      );
    }
    const { page, per_page, category, tag, author } = parsed.data;

    const supabase = await createClient();

    // Filter by category/tag/author slug — each filter is an intersection.
    // Strategy: collect post-IDs that satisfy ALL filters, then apply them to the main query.
    // For now, since each filter requires its own prefetch, we run them sequentially and
    // intersect. If any filter matches zero IDs, short-circuit to empty result.

    let filterPostIds: string[] | null = null;

    async function intersectWith(ids: string[]): Promise<void> {
      if (filterPostIds === null) {
        filterPostIds = ids;
      } else {
        const set = new Set(ids);
        filterPostIds = filterPostIds.filter((id) => set.has(id));
      }
    }

    if (category) {
      const { data: cat } = await supabase
        .from("blog_categories")
        .select("id")
        .eq("slug", category)
        .maybeSingle();
      if (!cat) {
        return NextResponse.json({ posts: [], page, per_page, total: 0 });
      }
      const { data: pcRows, error: pcErr } = await supabase
        .from("blog_post_categories")
        .select("post_id")
        .eq("category_id", cat.id);
      if (pcErr) throw pcErr;
      await intersectWith((pcRows ?? []).map((r) => r.post_id));
    }

    if (tag) {
      const { data: t } = await supabase
        .from("blog_tags")
        .select("id")
        .eq("slug", tag)
        .maybeSingle();
      if (!t) {
        return NextResponse.json({ posts: [], page, per_page, total: 0 });
      }
      const { data: ptRows, error: ptErr } = await supabase
        .from("blog_post_tags")
        .select("post_id")
        .eq("tag_id", t.id);
      if (ptErr) throw ptErr;
      await intersectWith((ptRows ?? []).map((r) => r.post_id));
    }

    if (author) {
      const { data: a } = await supabase
        .from("authors")
        .select("id")
        .eq("slug", author)
        .maybeSingle();
      if (!a) {
        return NextResponse.json({ posts: [], page, per_page, total: 0 });
      }
      // Filter on author_id directly in the main query later — set a marker.
      // For simplicity here, fetch matching post IDs.
      const { data: ap, error: apErr } = await supabase
        .from("blog_posts")
        .select("id")
        .eq("author_id", a.id)
        .eq("status", "published")
        .lte("published_at", new Date().toISOString());
      if (apErr) throw apErr;
      await intersectWith((ap ?? []).map((r) => r.id));
    }

    if (filterPostIds !== null && filterPostIds.length === 0) {
      return NextResponse.json({ posts: [], page, per_page, total: 0 });
    }

    // Build the main query
    let query = supabase
      .from("blog_posts")
      .select(
        "id, slug, title, excerpt, cover_image_url, published_at, read_time_minutes, author_id",
        { count: "exact" },
      )
      .eq("status", "published")
      .lte("published_at", new Date().toISOString());

    if (filterPostIds !== null) {
      query = query.in("id", filterPostIds);
    }

    const { data: postRows, count, error } = await query
      .order("published_at", { ascending: false })
      .range((page - 1) * per_page, page * per_page - 1);

    if (error) throw error;

    const posts = (postRows ?? []) as PostRow[];

    // Hydrate author refs
    const authorIds = Array.from(new Set(posts.map((p) => p.author_id).filter((id): id is string => !!id)));
    const authorMap = new Map<string, AuthorRef>();
    if (authorIds.length > 0) {
      const { data: aRows, error: aErr } = await supabase
        .from("authors")
        .select("id, slug, name, avatar_url")
        .in("id", authorIds);
      if (aErr) throw aErr;
      for (const row of aRows ?? []) {
        const parsed = AuthorRefSchema.safeParse(row);
        if (parsed.success) authorMap.set(parsed.data.id, parsed.data);
      }
    }

    // Hydrate primary_category per post: join blog_post_categories to blog_categories,
    // pick the one with the lowest display_order per post.
    const postIds = posts.map((p) => p.id);
    const primaryCategoryMap = new Map<string, BlogCategoryRef>();
    if (postIds.length > 0) {
      const { data: pcRows, error: pcErr } = await supabase
        .from("blog_post_categories")
        .select("post_id, blog_categories!inner(id, slug, name, display_order)")
        .in("post_id", postIds);
      if (pcErr) throw pcErr;
      // pcRows: each row has post_id + blog_categories (joined object)
      const byPost: Record<string, Array<{ id: string; slug: string; name: string; display_order: number }>> = {};
      for (const row of pcRows ?? []) {
        const cat = (row as { blog_categories: { id: string; slug: string; name: string; display_order: number } }).blog_categories;
        if (!cat) continue;
        const postId = (row as { post_id: string }).post_id;
        if (!byPost[postId]) byPost[postId] = [];
        byPost[postId].push(cat);
      }
      for (const [postId, cats] of Object.entries(byPost)) {
        cats.sort((a, b) => a.display_order - b.display_order);
        const top = cats[0];
        const parsed = BlogCategoryRefSchema.safeParse({ id: top.id, slug: top.slug, name: top.name });
        if (parsed.success) primaryCategoryMap.set(postId, parsed.data);
      }
    }

    const summaries: PostSummary[] = posts.map((p) => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      cover_image_url: p.cover_image_url,
      author: p.author_id ? authorMap.get(p.author_id) ?? null : null,
      published_at: p.published_at,
      read_time_minutes: p.read_time_minutes,
      primary_category: primaryCategoryMap.get(p.id) ?? null,
    }));

    return NextResponse.json({
      posts: summaries,
      page,
      per_page,
      total: count ?? 0,
    });
  } catch (err) {
    Sentry.captureException(err);
    console.error("[api/blog/posts] failed", err);
    return NextResponse.json({ error: "Failed to load posts" }, { status: 500 });
  }
}
