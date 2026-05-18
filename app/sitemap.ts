import type { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";

const SITE_URL = "https://www.bitmernsolo.com";

const STATIC_ROUTES: Array<{ path: string; priority: number }> = [
  { path: "/", priority: 1.0 },
  { path: "/about", priority: 0.7 },
  { path: "/shop", priority: 0.8 },
  { path: "/pool-stats", priority: 0.8 },
  { path: "/contact", priority: 0.5 },
  { path: "/getting-started", priority: 0.7 },
  { path: "/miners", priority: 0.7 },
  { path: "/coins", priority: 0.7 },
  { path: "/pricing", priority: 0.7 },
  { path: "/how-it-works", priority: 0.7 },
  { path: "/hosting", priority: 0.6 },
  { path: "/faq", priority: 0.6 },
  { path: "/privacy", priority: 0.3 },
  { path: "/terms", priority: 0.3 },
  { path: "/cookies", priority: 0.3 },
  { path: "/shipping-policy", priority: 0.4 },
  { path: "/blog", priority: 0.8 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = STATIC_ROUTES.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: r.priority,
  }));

  try {
    const supabase = await createClient();
    const nowIso = now.toISOString();

    const [postsRes, categoriesRes, tagsRes, authorsRes] = await Promise.all([
      supabase
        .from("blog_posts")
        .select("slug, updated_at")
        .eq("status", "published")
        .lte("published_at", nowIso),
      supabase.from("blog_categories").select("slug"),
      supabase.from("blog_tags").select("slug"),
      supabase.from("authors").select("slug"),
    ]);

    for (const post of postsRes.data ?? []) {
      entries.push({
        url: `${SITE_URL}/blog/${post.slug}`,
        lastModified: post.updated_at ? new Date(post.updated_at) : now,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
    for (const cat of categoriesRes.data ?? []) {
      entries.push({
        url: `${SITE_URL}/blog/category/${cat.slug}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.5,
      });
    }
    for (const tag of tagsRes.data ?? []) {
      entries.push({
        url: `${SITE_URL}/blog/tag/${tag.slug}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.5,
      });
    }
    for (const author of authorsRes.data ?? []) {
      entries.push({
        url: `${SITE_URL}/blog/author/${author.slug}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.5,
      });
    }
  } catch (err) {
    console.error("[sitemap] failed to load dynamic routes", err);
    // Fall through with static routes only
  }

  return entries;
}
