import * as Sentry from "@sentry/nextjs";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const SITE_URL = "https://www.bitmernsolo.com";

function escapeCdata(s: string): string {
  return s.split("]]>").join("]]]]><![CDATA[>");
}

function truncate(s: string, max: number): string {
  if (s.length <= max) return s;
  return s.slice(0, max - 1).trimEnd() + "…";
}

function stripHtml(s: string): string {
  return s.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

type Row = {
  slug: string;
  title: string;
  excerpt: string | null;
  body_html: string;
  published_at: string;
};

function renderItem(row: Row): string {
  const url = `${SITE_URL}/blog/${row.slug}`;
  const description = row.excerpt ?? truncate(stripHtml(row.body_html), 280);
  const pubDate = new Date(row.published_at).toUTCString();
  return [
    "    <item>",
    `      <title><![CDATA[${escapeCdata(row.title)}]]></title>`,
    `      <link>${url}</link>`,
    `      <guid isPermaLink="true">${url}</guid>`,
    `      <pubDate>${pubDate}</pubDate>`,
    `      <description><![CDATA[${escapeCdata(description)}]]></description>`,
    "    </item>",
  ].join("\n");
}

export async function GET(): Promise<Response> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("blog_posts")
      .select("slug, title, excerpt, body_html, published_at")
      .eq("status", "published")
      .lte("published_at", new Date().toISOString())
      .order("published_at", { ascending: false })
      .limit(20);

    if (error) throw error;

    const rows: Row[] = (data ?? []).filter((r): r is Row => !!r.published_at);
    const items = rows.map(renderItem).join("\n");

    const xml = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
      "  <channel>",
      "    <title>Bitmern Solo Blog</title>",
      `    <link>${SITE_URL}/blog</link>`,
      "    <description>Mining guides, hardware reviews, and pool updates from the Bitmern Solo team.</description>",
      "    <language>en-us</language>",
      `    <atom:link href="${SITE_URL}/blog/rss.xml" rel="self" type="application/rss+xml" />`,
      items,
      "  </channel>",
      "</rss>",
    ].filter(Boolean).join("\n");

    return new Response(xml, {
      status: 200,
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch (err) {
    Sentry.captureException(err);
    console.error("[blog/rss.xml] failed", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
