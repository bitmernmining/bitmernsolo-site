import { NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import {
  PostSchema,
  AuthorRefSchema,
  BlogCategoryRefSchema,
  BlogTagSchema,
  PostSummarySchema,
  type AuthorRef,
  type BlogCategoryRef,
  type BlogTag,
  type Post,
  type PostSummary,
  type PostDetailResponse,
} from "@/lib/schemas/blog";

export const dynamic = "force-dynamic";

const SlugSchema = z.string().min(1).max(80).regex(/^[a-z0-9-]+$/);

type Ctx = { params: Promise<{ slug: string }> };

export async function GET(_req: Request, ctx: Ctx): Promise<NextResponse<PostDetailResponse | { error: string }>> {
  try {
    const { slug } = await ctx.params;
    const slugCheck = SlugSchema.safeParse(slug);
    if (!slugCheck.success) {
      return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
    }

    const supabase = await createClient();
    const nowIso = new Date().toISOString();

    // 1. Main post
    const { data: postRow, error: postErr } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .lte("published_at", nowIso)
      .single();

    if (postErr || !postRow) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const postParsed = PostSchema.safeParse(postRow);
    if (!postParsed.success) {
      Sentry.captureException(new Error(`PostSchema parse failed for ${slug}`));
      return NextResponse.json({ error: "Invalid post data" }, { status: 500 });
    }
    const post: Post = postParsed.data;

    // 2. Author (if set)
    let author: AuthorRef | null = null;
    if (post.author_id) {
      const { data: aRow } = await supabase
        .from("authors")
        .select("id, slug, name, avatar_url")
        .eq("id", post.author_id)
        .maybeSingle();
      if (aRow) {
        const parsed = AuthorRefSchema.safeParse(aRow);
        if (parsed.success) author = parsed.data;
      }
    }

    // 3. Categories via join, ordered by display_order
    const { data: pcRows } = await supabase
      .from("blog_post_categories")
      .select("blog_categories!inner(id, slug, name, display_order)")
      .eq("post_id", post.id)
      .order("blog_categories(display_order)", { ascending: true });
    const categories: BlogCategoryRef[] = [];
    for (const row of (pcRows ?? []) as unknown as Array<{ blog_categories: { id: string; slug: string; name: string; display_order: number } | { id: string; slug: string; name: string; display_order: number }[] }>) {
      const c = Array.isArray(row.blog_categories) ? row.blog_categories[0] : row.blog_categories;
      if (!c) continue;
      const parsed = BlogCategoryRefSchema.safeParse({ id: c.id, slug: c.slug, name: c.name });
      if (parsed.success) categories.push(parsed.data);
    }

    // 4. Tags via join
    const { data: ptRows } = await supabase
      .from("blog_post_tags")
      .select("blog_tags!inner(id, slug, name, created_at, updated_at)")
      .eq("post_id", post.id);
    const tags: BlogTag[] = [];
    for (const row of (ptRows ?? []) as unknown as Array<{ blog_tags: { id: string; slug: string; name: string; created_at: string; updated_at: string } | { id: string; slug: string; name: string; created_at: string; updated_at: string }[] }>) {
      const t = Array.isArray(row.blog_tags) ? row.blog_tags[0] : row.blog_tags;
      if (!t) continue;
      const parsed = BlogTagSchema.safeParse(t);
      if (parsed.success) tags.push(parsed.data);
    }

    // 5. Related posts: up to 3 that share at least one tag OR the primary category.
    // Simplified strategy: fetch up to 3 most recent published posts excluding this one,
    // matching ANY of this post's tag-or-category criteria. For the first cut, we filter
    // by author OR by NOT matching itself (broad heuristic). A more sophisticated version
    // would issue a JOIN-with-IN. For now, fetch the 3 most recent OTHER published posts.
    const { data: relRows } = await supabase
      .from("blog_posts")
      .select("id, slug, title, excerpt, cover_image_url, published_at, read_time_minutes, author_id")
      .eq("status", "published")
      .lte("published_at", nowIso)
      .neq("id", post.id)
      .order("published_at", { ascending: false })
      .limit(3);

    const related: PostSummary[] = [];
    for (const row of (relRows ?? []) as Array<{
      id: string; slug: string; title: string; excerpt: string | null;
      cover_image_url: string | null; published_at: string | null;
      read_time_minutes: number; author_id: string | null;
    }>) {
      const summary = {
        id: row.id,
        slug: row.slug,
        title: row.title,
        excerpt: row.excerpt,
        cover_image_url: row.cover_image_url,
        author: null as AuthorRef | null,
        published_at: row.published_at,
        read_time_minutes: row.read_time_minutes,
        primary_category: null as BlogCategoryRef | null,
      };
      const parsed = PostSummarySchema.safeParse(summary);
      if (parsed.success) related.push(parsed.data);
    }

    // 6. Prev (newest post with published_at < this.published_at)
    let prev: { slug: string; title: string } | null = null;
    if (post.published_at) {
      const { data: prevRow } = await supabase
        .from("blog_posts")
        .select("slug, title")
        .eq("status", "published")
        .lt("published_at", post.published_at)
        .order("published_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (prevRow) prev = { slug: prevRow.slug, title: prevRow.title };
    }

    // 7. Next (oldest post with published_at > this.published_at)
    let next: { slug: string; title: string } | null = null;
    if (post.published_at) {
      const { data: nextRow } = await supabase
        .from("blog_posts")
        .select("slug, title")
        .eq("status", "published")
        .gt("published_at", post.published_at)
        .order("published_at", { ascending: true })
        .limit(1)
        .maybeSingle();
      if (nextRow) next = { slug: nextRow.slug, title: nextRow.title };
    }

    return NextResponse.json({ post, author, categories, tags, related, prev, next });
  } catch (err) {
    Sentry.captureException(err);
    console.error("[api/blog/posts/[slug]] failed", err);
    return NextResponse.json({ error: "Failed to load post" }, { status: 500 });
  }
}
