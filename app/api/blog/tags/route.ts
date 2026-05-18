import { NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";
import { createClient } from "@/lib/supabase/server";
import { BlogTagSchema, type BlogTag } from "@/lib/schemas/blog";

export const dynamic = "force-dynamic";

export async function GET(): Promise<NextResponse<{ tags: BlogTag[] } | { error: string }>> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("blog_tags")
      .select("*")
      .order("name", { ascending: true });
    if (error) throw error;
    const tags = (data ?? [])
      .map((r) => BlogTagSchema.safeParse(r))
      .filter((p) => p.success)
      .map((p) => p.data);
    return NextResponse.json({ tags });
  } catch (err) {
    Sentry.captureException(err);
    console.error("[api/blog/tags] failed", err);
    return NextResponse.json({ error: "Failed to load tags" }, { status: 500 });
  }
}
