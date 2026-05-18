import Link from "next/link";

export function PostPager({
  current,
  total,
  basePath,
}: {
  current: number;
  total: number;
  basePath: string;
}) {
  if (total <= 1) return null;
  const prevHref = current > 1 ? `${basePath}?page=${current - 1}` : null;
  const nextHref = current < total ? `${basePath}?page=${current + 1}` : null;

  const pages: number[] = [];
  for (let p = Math.max(1, current - 2); p <= Math.min(total, current + 2); p++) {
    pages.push(p);
  }

  return (
    <nav className="mt-10 flex items-center justify-center gap-2" aria-label="Pagination">
      {prevHref ? (
        <Link
          href={prevHref}
          className="rounded-md border border-border px-3 py-1.5 text-sm hover:bg-muted"
        >
          ← Previous
        </Link>
      ) : (
        <span className="rounded-md border border-border/40 px-3 py-1.5 text-sm text-muted-foreground/50">← Previous</span>
      )}
      {pages.map((p) =>
        p === current ? (
          <span key={p} className="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground">
            {p}
          </span>
        ) : (
          <Link
            key={p}
            href={`${basePath}?page=${p}`}
            className="rounded-md border border-border px-3 py-1.5 text-sm hover:bg-muted"
          >
            {p}
          </Link>
        ),
      )}
      {nextHref ? (
        <Link
          href={nextHref}
          className="rounded-md border border-border px-3 py-1.5 text-sm hover:bg-muted"
        >
          Next →
        </Link>
      ) : (
        <span className="rounded-md border border-border/40 px-3 py-1.5 text-sm text-muted-foreground/50">Next →</span>
      )}
    </nav>
  );
}
