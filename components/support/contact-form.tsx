"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { SupportTicketInputSchema, type SupportTicketInput } from "@/lib/schemas/support-ticket";

type FieldErrors = Partial<Record<keyof SupportTicketInput, string>>;

export function ContactForm({ onBack, onSuccess }: { onBack: () => void; onSuccess: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [hp, setHp] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [topError, setTopError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTopError(null);
    setErrors({});

    const parsed = SupportTicketInputSchema.safeParse({ name, email, subject, message });
    if (!parsed.success) {
      const fe: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const k = issue.path[0] as keyof SupportTicketInput;
        if (k && !fe[k]) fe[k] = issue.message;
      }
      setErrors(fe);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/support-tickets", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...parsed.data, _honeypot: hp }),
      });
      if (res.status === 200) {
        setDone(true);
        setTimeout(onSuccess, 2000);
        return;
      }
      if (res.status === 429) {
        setTopError("Too many submissions — please try again later.");
        return;
      }
      if (res.status >= 500) {
        setTopError("Something went wrong — please try again.");
        return;
      }
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      setTopError(json.error ?? "Submission failed.");
    } catch (err) {
      console.error("[contact-form] submit failed", err);
      setTopError("Network error — please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="space-y-2 py-6 text-center">
        <p className="text-sm font-medium">Got it — we&apos;ll reply by email.</p>
        <p className="text-xs text-muted-foreground">Most tickets are answered within 24 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <button type="button" onClick={onBack} className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-3 w-3" /> Back to FAQs
      </button>

      {topError && <p className="rounded-md bg-destructive/10 px-3 py-2 text-xs text-destructive">{topError}</p>}

      <Field id="name" label="Name" value={name} onChange={setName} error={errors.name} required />
      <Field id="email" label="Email" type="email" value={email} onChange={setEmail} error={errors.email} required />
      <Field id="subject" label="Subject" value={subject} onChange={setSubject} error={errors.subject} required />
      <FieldArea id="message" label="Message" value={message} onChange={setMessage} error={errors.message} required />

      <input
        type="text"
        name="_honeypot"
        value={hp}
        onChange={(e) => setHp(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      <button type="submit" disabled={submitting} className="w-full rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50">
        {submitting ? "Sending…" : "Send"}
      </button>
    </form>
  );
}

function Field({ id, label, value, onChange, error, type = "text", required }: { id: string; label: string; value: string; onChange: (v: string) => void; error?: string; type?: string; required?: boolean }) {
  return (
    <label htmlFor={id} className="block">
      <span className="block text-xs font-medium">{label}{required && " *"}</span>
      <input id={id} type={type} value={value} onChange={(e) => onChange(e.target.value)} className="mt-1 w-full rounded-md border border-border bg-background px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
      {error && <span className="text-xs text-destructive">{error}</span>}
    </label>
  );
}

function FieldArea({ id, label, value, onChange, error, required }: { id: string; label: string; value: string; onChange: (v: string) => void; error?: string; required?: boolean }) {
  return (
    <label htmlFor={id} className="block">
      <span className="block text-xs font-medium">{label}{required && " *"}</span>
      <textarea id={id} value={value} onChange={(e) => onChange(e.target.value)} rows={5} className="mt-1 w-full rounded-md border border-border bg-background px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
      {error && <span className="text-xs text-destructive">{error}</span>}
    </label>
  );
}
