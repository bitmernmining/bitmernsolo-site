"use client";

import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { FaqGroup } from "@/lib/schemas/faq";

function matchesQuery(q: string, question: string, answer: string): boolean {
  if (q.trim() === "") return true;
  const needle = q.toLowerCase();
  return question.toLowerCase().includes(needle) || answer.toLowerCase().includes(needle);
}

export function FaqList({ groups, query }: { groups: FaqGroup[]; query: string }) {
  const filtered = useMemo(
    () =>
      groups
        .map((g) => ({ ...g, faqs: g.faqs.filter((f) => matchesQuery(query, f.question, f.answer)) }))
        .filter((g) => g.faqs.length > 0),
    [groups, query],
  );

  if (filtered.length === 0) {
    return <p className="py-6 text-center text-sm text-muted-foreground">No matches — try the contact form below.</p>;
  }

  return (
    <div className="space-y-4">
      {filtered.map((g) => (
        <section key={g.category?.id ?? "uncategorized"}>
          {g.category && (
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{g.category.name}</h3>
          )}
          <ul className="divide-y divide-border/40">
            {g.faqs.map((faq) => (
              <FaqItem key={faq.id} question={faq.question} answerHtml={faq.answer_html} />
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

function FaqItem({ question, answerHtml }: { question: string; answerHtml: string }) {
  const [open, setOpen] = useState(false);
  // SECURITY: answerHtml is sanitized server-side in /api/faqs via renderFaqAnswer
  // (sanitize-html with a strict tag/attr allow-list). This is the ONLY HTML-injection
  // site in the project; the input is admin-authored Markdown.
  const htmlProp = useMemo(() => ({ __html: answerHtml }), [answerHtml]);
  return (
    <li>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between py-3 text-left text-sm font-medium hover:text-primary"
      >
        <span>{question}</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="prose prose-sm pb-3 text-sm text-muted-foreground" dangerouslySetInnerHTML={htmlProp} />}
    </li>
  );
}
