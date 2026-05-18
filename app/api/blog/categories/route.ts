import { NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";
import { createClient } from "@/lib/supabase/server";
import { BlogCategorySchema, type BlogCategory } from "@/lib/schemas/blog";

export const dynamic = "force-dynamic";

export async function GET(): Promise<NextResponse<{ categories: BlogCategory[] } | { error: string }>> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("blog_categories")
      .select("*")
      .order("display_order", { ascending: true })
      .order("name", { ascending: true });
    if (error) throw error;
    const categories = (data ?? [])
      .map((r) => BlogCategorySchema.safeParse(r))
      .filter((p) => p.success)
      .map((p) => p.data);
    return NextResponse.json({ categories });
  } catch (err) {
    Sentry.captureException(err);
    console.error("[api/blog/categories] failed", err);
    return NextResponse.json({ error: "Failed to load categories" }, { status: 500 });
  }
}
