import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock } from "lucide-react";
import { PostCard } from "@/components/blog/post-card";
import { createClient } from "@/lib/supabase/server";
import { renderBlogBody } from "@/lib/markdown";
import type {
  Post,
  AuthorRef,
  BlogCategoryRef,
  BlogTag,
  PostSummary,
} from "@/lib/schemas/blog";

export const revalidate = 300;

const SITE_URL = "https://www.bitmernsolo.com";

type Detail = {
  post: Post;
  author: AuthorRef | null;
  categories: BlogCategoryRef[];
  tags: BlogTag[];
  related: PostSummary[];
  prev: { slug: string; title: string } | null;
  next: { slug: string; title: string } | null;
};

async function fetchDetail(slug: string): Promise<Detail | null> {
  const supabase = await createClient();
  const nowIso = new Date().toISOString();

  const { data: postRow } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .lte("published_at", nowIso)
    .maybeSingle();

  if (!postRow) return null;
  const post = postRow as Post;

  let author: AuthorRef | null = null;
  if (post.author_id) {
    const { data: aRow } = await supabase
      .from("authors")
      .select("id, slug, name, avatar_url")
      .eq("id", post.author_id)
      .maybeSingle();
    if (aRow) author = aRow as AuthorRef;
  }

  const { data: pcRows } = await supabase
    .from("blog_post_categories")
    .select("blog_categories!inner(id, slug, name, display_order)")
    .eq("post_id", post.id);
  const categories: BlogCategoryRef[] = [];
  for (const r of (pcRows ?? []) as unknown as Array<{ blog_categories: { id: string; slug: string; name: string; display_order: number } | { id: string; slug: string; name: string; display_order: number }[] }>) {
    const c = Array.isArray(r.blog_categories) ? r.blog_categories[0] : r.blog_categories;
    if (c) categories.push({ id: c.id, slug: c.slug, name: c.name });
  }
  categories.sort((a, b) => a.name.localeCompare(b.name));

  const { data: ptRows } = await supabase
    .from("blog_post_tags")
    .select("blog_tags!inner(id, slug, name, created_at, updated_at)")
    .eq("post_id", post.id);
  const tags: BlogTag[] = [];
  for (const r of (ptRows ?? []) as unknown as Array<{ blog_tags: BlogTag | BlogTag[] }>) {
    const t = Array.isArray(r.blog_tags) ? r.blog_tags[0] : r.blog_tags;
    if (t) tags.push(t);
  }

  // Related: 3 most-recent OTHER published posts (broad heuristic; can be refined later)
  const { data: relRows } = await supabase
    .from("blog_posts")
    .select("id, slug, title, excerpt, cover_image_url, published_at, read_time_minutes, author_id")
    .eq("status", "published")
    .lte("published_at", nowIso)
    .neq("id", post.id)
    .order("published_at", { ascending: false })
    .limit(3);

  const relAuthorIds = Array.from(new Set(((relRows ?? []) as Array<{ author_id: string | null }>).map((r) => r.author_id).filter((id): id is string => !!id)));
  const relAuthorMap = new Map<string, AuthorRef>();
  if (relAuthorIds.length > 0) {
    const { data: aRows } = await supabase.from("authors").select("id, slug, name, avatar_url").in("id", relAuthorIds);
    for (const a of aRows ?? []) relAuthorMap.set(a.id, a as AuthorRef);
  }
  const related: PostSummary[] = ((relRows ?? []) as Array<{
    id: string; slug: string; title: string; excerpt: string | null;
    cover_image_url: string | null; published_at: string | null;
    read_time_minutes: number; author_id: string | null;
  }>).map((r) => ({
    id: r.id, slug: r.slug, title: r.title, excerpt: r.excerpt,
    cover_image_url: r.cover_image_url,
    author: r.author_id ? relAuthorMap.get(r.author_id) ?? null : null,
    published_at: r.published_at,
    read_time_minutes: r.read_time_minutes,
    primary_category: null as BlogCategoryRef | null,
  }));

  let prev: { slug: string; title: string } | null = null;
  let next: { slug: string; title: string } | null = null;
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

  return { post, author, categories, tags, related, prev, next };
}

function formatDate(iso: string | null): string {
  if (!iso) return "";
  return new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long", day: "numeric" }).format(new Date(iso));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const detail = await fetchDetail(slug);
  if (!detail) return { title: "Post not found" };
  const { post, author } = detail;
  return {
    title: post.meta_title ?? `${post.title} — Bitmern Solo Blog`,
    description: post.meta_description ?? post.excerpt ?? undefined,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt ?? undefined,
      url: `/blog/${post.slug}`,
      type: "article",
      publishedTime: post.published_at ?? undefined,
      modifiedTime: post.updated_at,
      authors: author ? [author.name] : undefined,
      images: post.og_image_url ?? post.cover_image_url ?? undefined,
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const detail = await fetchDetail(slug);
  if (!detail) notFound();

  const { post, author, categories, tags, related, prev, next } = detail;
  const sanitizedHtml = renderBlogBody(post.body_html);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    datePublished: post.published_at,
    dateModified: post.updated_at,
    author: author
      ? { "@type": "Person", name: author.name, url: `${SITE_URL}/blog/author/${author.slug}` }
      : { "@type": "Organization", name: "Bitmern Solo" },
    image: post.og_image_url ?? post.cover_image_url ?? undefined,
    articleBody: post.body_html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim().slice(0, 500),
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
    publisher: {
      "@type": "Organization",
      name: "Bitmern Solo",
      url: SITE_URL,
    },
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <article>
        <header className="mb-10 space-y-5">
          <Link href="/blog" className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-primary">
            ← Back to blog
          </Link>
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <Link key={c.id} href={`/blog/category/${c.slug}`} className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary hover:bg-primary/20">
                  {c.name}
                </Link>
              ))}
            </div>
          )}
          <h1
            className="font-bold tracking-tight"
            style={{ fontSize: "clamp(1.875rem, 4.5vw, 3rem)", lineHeight: 1.1 }}
          >
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="text-lg leading-relaxed text-muted-foreground sm:text-xl">
              {post.excerpt}
            </p>
          )}
          <div className="flex flex-wrap items-center gap-3 border-y border-border/40 py-4 text-sm text-muted-foreground">
            {author && (
              <Link href={`/blog/author/${author.slug}`} className="flex items-center gap-2 hover:text-foreground">
                {author.avatar_url && (
                  <Image src={author.avatar_url} alt={author.name} width={32} height={32} className="rounded-full" />
                )}
                <span className="font-medium text-foreground/90">{author.name}</span>
              </Link>
            )}
            {post.published_at && (
              <>
                <span aria-hidden="true" className="text-border">·</span>
                <time dateTime={post.published_at}>{formatDate(post.published_at)}</time>
              </>
            )}
            <span aria-hidden="true" className="text-border">·</span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              {post.read_time_minutes} min read
            </span>
          </div>
        </header>

        {post.cover_image_url && (
          <div className="relative -mx-4 mb-12 aspect-[2/1] overflow-hidden sm:mx-0 sm:rounded-xl sm:border sm:border-border">
            <Image src={post.cover_image_url} alt={post.title} fill priority sizes="(min-width: 768px) 768px, 100vw" className="object-cover" />
          </div>
        )}

        <div
          className="blog-body"
          dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
        />

        {tags.length > 0 && (
          <div className="mt-12 flex flex-wrap gap-2 border-t border-border/40 pt-6">
            {tags.map((t) => (
              <Link key={t.id} href={`/blog/tag/${t.slug}`} className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground hover:border-primary hover:text-primary">
                #{t.name}
              </Link>
            ))}
          </div>
        )}
      </article>

      {(prev || next) && (
        <nav className="mt-12 grid gap-4 border-t border-border/40 pt-6 sm:grid-cols-2" aria-label="Post navigation">
          {prev ? (
            <Link href={`/blog/${prev.slug}`} className="rounded-lg border border-border p-4 hover:border-primary/40">
              <p className="text-xs text-muted-foreground">← Previous</p>
              <p className="mt-1 text-sm font-medium">{prev.title}</p>
            </Link>
          ) : (<div />)}
          {next ? (
            <Link href={`/blog/${next.slug}`} className="rounded-lg border border-border p-4 text-right hover:border-primary/40">
              <p className="text-xs text-muted-foreground">Next →</p>
              <p className="mt-1 text-sm font-medium">{next.title}</p>
            </Link>
          ) : (<div />)}
        </nav>
      )}

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 text-xl font-semibold">Related posts</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {related.map((p) => (<PostCard key={p.id} post={p} />))}
          </div>
        </section>
      )}
    </div>
  );
}
