import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { createHmac, timingSafeEqual } from "crypto";
import * as Sentry from "@sentry/nextjs";
import { z } from "zod";

const BodySchema = z.object({ tags: z.array(z.string().min(1)).min(1).max(20) });

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const raw = await req.text();
    const sig = req.headers.get("x-signature") ?? "";
    if (!sig) return NextResponse.json({ error: "Missing signature" }, { status: 401 });

    const expected = createHmac("sha256", process.env.REVALIDATE_SECRET!).update(raw).digest("hex");
    const a = Buffer.from(sig, "hex");
    const b = Buffer.from(expected, "hex");
    if (a.length !== b.length || !timingSafeEqual(a, b)) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const parsed = BodySchema.safeParse(JSON.parse(raw));
    if (!parsed.success) return NextResponse.json({ error: "Invalid body" }, { status: 400 });

    for (const tag of parsed.data.tags) revalidateTag(tag);
    return NextResponse.json({ revalidated: parsed.data.tags });
  } catch (err) {
    Sentry.captureException(err);
    console.error("[api/revalidate] failed", err);
    return NextResponse.json({ error: "Revalidation failed" }, { status: 500 });
  }
}
