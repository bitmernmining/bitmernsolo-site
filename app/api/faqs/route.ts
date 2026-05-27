import { NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";
import { createClient } from "@/lib/supabase/server";
import { FaqCategorySchema, FaqSchema, type FaqGroup, type FaqListResponse, type FaqWithHtml } from "@/lib/schemas/faq";
import { renderFaqAnswer } from "@/lib/markdown";

export const dynamic = "force-dynamic";

export async function GET(): Promise<NextResponse<FaqListResponse | { error: string }>> {
  try {
    const supabase = await createClient();
    const { data: catRows, error: catErr } = await supabase
      .from("faq_categories").select("*").order("display_order", { ascending: true });
    if (catErr) throw catErr;

    const { data: faqRows, error: faqErr } = await supabase
      .from("faqs").select("*").eq("is_published", true).order("display_order", { ascending: true });
    if (faqErr) throw faqErr;

    const categories = (catRows ?? []).map((r) => FaqCategorySchema.safeParse(r)).filter((p) => p.success).map((p) => p.data);
    const faqs: FaqWithHtml[] = (faqRows ?? [])
      .map((r) => FaqSchema.safeParse(r))
      .filter((p) => p.success)
      .map((p) => ({ ...p.data, answer_html: renderFaqAnswer(p.data.answer) }));

    const groups: FaqGroup[] = [];
    for (const cat of categories) {
      const inCat = faqs.filter((f) => f.category_id === cat.id);
      if (inCat.length > 0) groups.push({ category: cat, faqs: inCat });
    }
    const orphans = faqs.filter((f) => f.category_id === null);
    if (orphans.length > 0) groups.push({ category: null, faqs: orphans });

    return NextResponse.json({ groups });
  } catch (err) {
    Sentry.captureException(err);
    console.error("[api/faqs] failed", err);
    return NextResponse.json({ error: "Failed to load FAQs" }, { status: 500 });
  }
}
