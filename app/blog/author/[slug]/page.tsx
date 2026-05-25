import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PostCard } from "@/components/blog/post-card";
import { createClient } from "@/lib/supabase/server";
import type { Author, PostSummary, AuthorRef, BlogCategoryRef } from "@/lib/schemas/blog";

export const revalidate = 300;

async function fetchAuthor(slug: string): Promise<Author | null> {
  const supabase = await createClient();
  const { data } = await supabase.from("authors").select("*").eq("slug", slug).maybeSingle();
  return (data as Author | null) ?? null;
}

async function fetchAuthorPosts(authorId: string): Promise<PostSummary[]> {
  const supabase = await createClient();
  const nowIso = new Date().toISOString();
  const { data } = await supabase
    .from("blog_posts")
    .select("id, slug, title, excerpt, cover_image_url, published_at, read_time_minutes")
    .eq("author_id", authorId)
    .eq("status", "published")
    .lte("published_at", nowIso)
    .order("published_at", { ascending: false });

  const rows = (data ?? []) as Array<{
    id: string; slug: string; title: string; excerpt: string | null;
    cover_image_url: string | null; published_at: string | null;
    read_time_minutes: number;
  }>;

  return rows.map((r) => ({
    id: r.id, slug: r.slug, title: r.title, excerpt: r.excerpt,
    cover_image_url: r.cover_image_url,
    author: null as AuthorRef | null,
    published_at: r.published_at,
    read_time_minutes: r.read_time_minutes,
    primary_category: null as BlogCategoryRef | null,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const author = await fetchAuthor(slug);
  if (!author) return { title: "Author not found" };
  return {
    title: `${author.name} — Bitmern Solo Blog`,
    description: author.bio ?? `Posts by ${author.name}.`,
    alternates: { canonical: `/blog/author/${author.slug}` },
  };
}

export default async function BlogAuthorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const author = await fetchAuthor(slug);
  if (!author) notFound();
  const posts = await fetchAuthorPosts(author.id);

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="text-center mb-16 flex flex-col items-center gap-4">
        {author.avatar_url && (
          <Image
            src={author.avatar_url}
            alt={author.name}
            width={96}
            height={96}
            className="rounded-full"
          />
        )}
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Author
          </p>
          <h1
            className="mt-2 font-bold tracking-tight"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            {author.name}
          </h1>
          {author.bio && (
            <p className="mt-3 mx-auto max-w-xl text-muted-foreground leading-relaxed">
              {author.bio}
            </p>
          )}
          {(author.twitter || author.github || author.website) && (
            <div className="mt-4 flex justify-center gap-3 text-sm">
              {author.twitter && (
                <Link
                  href={`https://twitter.com/${author.twitter}`}
                  className="text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter
                </Link>
              )}
              {author.github && (
                <Link
                  href={`https://github.com/${author.github}`}
                  className="text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </Link>
              )}
              {author.website && (
                <Link
                  href={author.website}
                  className="text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Website
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
      {posts.length === 0 ? (
        <p className="text-center text-muted-foreground py-16">
          No posts by this author yet.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <PostCard key={p.id} post={p} />
          ))}
        </div>
      )}
    </div>
  );
}
