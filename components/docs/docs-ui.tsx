import type { ReactNode } from "react";

/* ── Helpers ── */

export function SectionHeading({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2 id={id} className="scroll-mt-24 text-xl font-bold tracking-tight pb-3 border-b border-border/40">
      {children}
    </h2>
  );
}

export function CodeBlock({ children, label }: { children: string; label?: string }) {
  return (
    <div className="rounded-lg border border-border/40 overflow-hidden">
      {label && (
        <div className="bg-secondary/50 border-b border-border/40 px-4 py-1.5">
          <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">{label}</span>
        </div>
      )}
      <div className="bg-[hsl(0_0%_6%)] px-4 py-3 overflow-x-auto">
        <pre className="font-mono text-[13px] leading-relaxed text-[hsl(0_0%_75%)]">{children}</pre>
      </div>
    </div>
  );
}
