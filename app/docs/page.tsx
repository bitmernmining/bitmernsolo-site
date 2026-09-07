import type { Metadata } from "next";
import { DocsSidebar } from "@/components/docs/docs-sidebar";
import { DocsCoins } from "@/components/docs/docs-section-coins";
import { DocsStratum } from "@/components/docs/docs-section-stratum";
import { DocsWorkers } from "@/components/docs/docs-section-workers";
import { DocsVarDiff } from "@/components/docs/docs-section-vardiff";
import { DocsPayouts } from "@/components/docs/docs-section-payouts";
import { DocsApi } from "@/components/docs/docs-section-api";
import { DocsDashboard } from "@/components/docs/docs-section-dashboard";
import { DocsAlerts } from "@/components/docs/docs-section-alerts";
import { DocsInfrastructure } from "@/components/docs/docs-section-infrastructure";
import { DocsCta } from "@/components/docs/docs-section-cta";

export const metadata: Metadata = {
  title: "Documentation — Bitmern Solo",
  description:
    "Complete documentation for Bitmern Solo mining pool. Supported coins, stratum endpoints, worker configuration, public API reference, fee structure, and more.",
};

export default function DocsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="mb-12">
        <p className="text-sm font-medium text-primary mb-2">Documentation</p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Bitmern Solo Pool
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground leading-relaxed">
          Everything you need to connect your miners, understand the pool
          mechanics, and integrate with our public API.
        </p>
      </div>

      <div className="flex gap-12">
        <aside className="hidden lg:block w-56 shrink-0">
          <div className="sticky top-24">
            <DocsSidebar />
          </div>
        </aside>

        <article className="min-w-0 flex-1 space-y-16">
          <DocsCoins />
          <DocsStratum />
          <DocsWorkers />
          <DocsVarDiff />
          <DocsPayouts />
          <DocsApi />
          <DocsDashboard />
          <DocsAlerts />
          <DocsInfrastructure />
          <DocsCta />
        </article>
      </div>
    </div>
  );
}
