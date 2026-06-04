import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";
import type { PostSummary } from "@/lib/schemas/blog";

function formatDate(iso: string | null): string {
  if (!iso) return "";
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(iso));
}

function truncate(s: string | null, max: number): string {
  if (!s) return "";
  if (s.length <= max) return s;
  return s.slice(0, max - 1).trimEnd() + "…";
}

export function PostCard({ post }: { post: PostSummary }) {
  const href = `/blog/${post.slug}`;
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card/40 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-card hover:shadow-lg hover:shadow-primary/5">
      {post.cover_image_url ? (
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
          <Image
            src={post.cover_image_url}
            alt={post.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </div>
      ) : (
        <div className="relative aspect-[16/9] w-full bg-gradient-to-br from-muted via-card to-muted">
          <div className="absolute inset-0 dot-grid opacity-30" />
        </div>
      )}

      <div className="flex flex-1 flex-col gap-3 p-5">
        {post.primary_category && (
          <Link
            href={`/blog/category/${post.primary_category.slug}`}
            className="self-start rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary hover:bg-primary/20"
          >
            {post.primary_category.name}
          </Link>
        )}

        <h3 className="text-lg font-semibold leading-snug tracking-tight">
          <Link href={href} className="transition-colors hover:text-primary group-hover:text-primary">
            {post.title}
          </Link>
        </h3>

        {post.excerpt && (
          <p className="text-sm leading-relaxed text-muted-foreground">
            {truncate(post.excerpt, 140)}
          </p>
        )}

        <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            {post.author && (
              <Link href={`/blog/author/${post.author.slug}`} className="hover:text-foreground">
                {post.author.name}
              </Link>
            )}
            {post.published_at && (
              <>
                <span aria-hidden="true" className="text-border">·</span>
                <time dateTime={post.published_at}>{formatDate(post.published_at)}</time>
              </>
            )}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" aria-hidden="true" />
            <span>{post.read_time_minutes} min</span>
          </div>
        </div>
      </div>
    </article>
  );
}
