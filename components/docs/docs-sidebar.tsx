"use client";

import { useState, useEffect } from "react";

const SECTIONS = [
  { id: "coins", label: "Supported Coins" },
  { id: "stratum", label: "Stratum Endpoints" },
  { id: "workers", label: "Worker Configuration" },
  { id: "vardiff", label: "VarDiff" },
  { id: "payouts", label: "Fees & Payouts" },
  { id: "api", label: "Pool API" },
  { id: "dashboard", label: "Dashboard Features" },
  { id: "alerts", label: "Alerts" },
  { id: "infrastructure", label: "Infrastructure" },
];

export function DocsSidebar() {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      Boolean
    ) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px" }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <nav aria-label="Documentation navigation" className="space-y-1">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        On this page
      </p>
      {SECTIONS.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className={`block rounded-md px-3 py-1.5 text-sm transition-colors ${
            activeId === s.id
              ? "bg-primary/10 text-primary font-medium"
              : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
          }`}
        >
          {s.label}
        </a>
      ))}
    </nav>
  );
}
