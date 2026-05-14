import { NextResponse } from "next/server";
import { createHmac, createHash } from "crypto";
import * as Sentry from "@sentry/nextjs";
import { createClient } from "@/lib/supabase/server";
import { SupportTicketInputSchema } from "@/lib/schemas/support-ticket";
import { checkRateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

function clientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  return xff ? xff.split(",")[0].trim() : "0.0.0.0";
}

function sha256(s: string): string {
  return createHash("sha256").update(s).digest("hex");
}

function sign(body: string, secret: string): string {
  return createHmac("sha256", secret).update(body).digest("hex");
}

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const raw = await req.json();

    if (raw && typeof raw === "object" && "_honeypot" in raw && raw._honeypot) {
      return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
    }

    const parsed = SupportTicketInputSchema.safeParse(raw);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid submission", details: parsed.error.flatten() }, { status: 400 });
    }

    const ip = clientIp(req);
    const limit = checkRateLimit(ip);
    if (!limit.allowed) {
      return NextResponse.json(
        { error: "Too many requests" },
        { status: 429, headers: { "Retry-After": String(Math.ceil(limit.retryAfterMs / 1000)) } },
      );
    }

    const supabase = await createClient();
    const { data, error } = await supabase
      .from("public_contact_tickets")
      .insert({ ...parsed.data, ip_hash: sha256(ip) })
      .select("id")
      .single();
    if (error || !data) throw error ?? new Error("Insert returned no data");

    void (async () => {
      try {
        const body = JSON.stringify({ ticketId: data.id, ...parsed.data });
        const signature = sign(body, process.env.ADMIN_NOTIFY_SECRET!);
        await fetch(process.env.ADMIN_NOTIFY_URL!, {
          method: "POST",
          headers: { "content-type": "application/json", "x-signature": signature },
          body,
        });
      } catch (notifyErr) {
        Sentry.captureException(notifyErr);
        console.error("[api/support-tickets] admin notify failed", notifyErr);
      }
    })();

    return NextResponse.json({ id: data.id });
  } catch (err) {
    Sentry.captureException(err);
    console.error("[api/support-tickets] failed", err);
    return NextResponse.json({ error: "Failed to submit ticket" }, { status: 500 });
  }
}
