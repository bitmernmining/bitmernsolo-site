"use client";

import { Search } from "lucide-react";

export function FaqSearch({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <label className="relative block">
      <span className="sr-only">Search FAQs</span>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
      <input
        type="search"
        role="textbox"
        aria-label="Search FAQs"
        placeholder="Search for an answer…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-border bg-background pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </label>
  );
}
