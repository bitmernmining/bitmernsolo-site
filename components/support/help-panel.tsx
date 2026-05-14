"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import type { FaqGroup } from "@/lib/schemas/faq";
import { FaqListResponseSchema } from "@/lib/schemas/faq";
import { FaqSearch } from "@/components/support/faq-search";
import { FaqList } from "@/components/support/faq-list";
import { ContactForm } from "@/components/support/contact-form";

type View = "faq" | "form";

export function HelpPanel({ onClose }: { onClose: () => void }) {
  const [view, setView] = useState<View>("faq");
  const [query, setQuery] = useState("");
  const [groups, setGroups] = useState<FaqGroup[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const ctrl = new AbortController();
    fetch("/api/faqs", { signal: ctrl.signal })
      .then(async (r) => {
        if (!r.ok) throw new Error("Failed to load FAQs");
        const json = (await r.json()) as unknown;
        const parsed = FaqListResponseSchema.safeParse(json);
        if (!parsed.success) throw new Error("Invalid FAQ response");
        setGroups(parsed.data.groups);
      })
      .catch((err) => {
        if (ctrl.signal.aborted) return;
        console.error("[help-panel] FAQ fetch failed", err);
        setError("We couldn't load the FAQs. Try the contact form below.");
      });
    return () => ctrl.abort();
  }, []);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Help"
      className="fixed bottom-20 right-4 z-50 flex h-[32rem] w-[22rem] max-w-[calc(100vw-2rem)] flex-col rounded-lg border border-border bg-background shadow-xl"
    >
      <header className="flex items-center justify-between border-b border-border/40 px-4 py-3">
        <h2 className="text-sm font-semibold">{view === "faq" ? "How can we help?" : "Contact us"}</h2>
        <button type="button" onClick={onClose} aria-label="Close support panel" className="rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground">
          <X className="h-4 w-4" />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-3">
        {view === "faq" ? (
          <>
            <FaqSearch value={query} onChange={setQuery} />
            <div className="mt-4">
              {error && <p className="text-sm text-destructive">{error}</p>}
              {!error && groups === null && <p className="text-sm text-muted-foreground">Loading…</p>}
              {!error && groups !== null && <FaqList groups={groups} query={query} />}
            </div>
          </>
        ) : (
          <ContactForm onBack={() => setView("faq")} onSuccess={() => setView("faq")} />
        )}
      </div>

      {view === "faq" && (
        <footer className="border-t border-border/40 p-3">
          <button type="button" onClick={() => setView("form")} className="w-full rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">
            Still need help? →
          </button>
        </footer>
      )}
    </div>
  );
}
