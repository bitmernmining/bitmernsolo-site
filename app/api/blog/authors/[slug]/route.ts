import { NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import {
  AuthorSchema,
  PostSummarySchema,
  type Author,
  type PostSummary,
  type AuthorRef,
  type BlogCategoryRef,
} from "@/lib/schemas/blog";

export const dynamic = "force-dynamic";

const SlugSchema = z.string().min(1).max(80).regex(/^[a-z0-9-]+$/);

type Ctx = { params: Promise<{ slug: string }> };

export async function GET(_req: Request, ctx: Ctx): Promise<NextResponse<{ author: Author; posts: PostSummary[] } | { error: string }>> {
  try {
    const { slug } = await ctx.params;
    const slugCheck = SlugSchema.safeParse(slug);
    if (!slugCheck.success) {
      return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
    }

    const supabase = await createClient();

    // 1. Author
    const { data: aRow, error: aErr } = await supabase
      .from("authors")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();

    if (aErr) throw aErr;
    if (!aRow) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const authorParsed = AuthorSchema.safeParse(aRow);
    if (!authorParsed.success) {
      Sentry.captureException(new Error(`AuthorSchema parse failed for ${slug}`));
      return NextResponse.json({ error: "Invalid author data" }, { status: 500 });
    }
    const author: Author = authorParsed.data;

    // 2. Their published posts (PostSummary shape)
    const { data: postRows, error: pErr } = await supabase
      .from("blog_posts")
      .select("id, slug, title, excerpt, cover_image_url, published_at, read_time_minutes")
      .eq("author_id", author.id)
      .eq("status", "published")
      .lte("published_at", new Date().toISOString())
      .order("published_at", { ascending: false });

    if (pErr) throw pErr;

    const authorRef: AuthorRef = {
      id: author.id,
      slug: author.slug,
      name: author.name,
      avatar_url: author.avatar_url,
    };

    const posts: PostSummary[] = [];
    for (const row of (postRows ?? []) as Array<{
      id: string; slug: string; title: string; excerpt: string | null;
      cover_image_url: string | null; published_at: string | null; read_time_minutes: number;
    }>) {
      const summary = {
        id: row.id,
        slug: row.slug,
        title: row.title,
        excerpt: row.excerpt,
        cover_image_url: row.cover_image_url,
        author: authorRef,
        published_at: row.published_at,
        read_time_minutes: row.read_time_minutes,
        primary_category: null as BlogCategoryRef | null,
      };
      const parsed = PostSummarySchema.safeParse(summary);
      if (parsed.success) posts.push(parsed.data);
    }

    return NextResponse.json({ author, posts });
  } catch (err) {
    Sentry.captureException(err);
    console.error("[api/blog/authors/[slug]] failed", err);
    return NextResponse.json({ error: "Failed to load author" }, { status: 500 });
  }
}
