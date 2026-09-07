import { SectionHeading } from "@/components/docs/docs-ui";

export function DocsInfrastructure() {
  return (
<section>
            <SectionHeading id="infrastructure">Infrastructure</SectionHeading>
            <p className="mt-4 text-sm text-muted-foreground mb-6">
              High-level overview of the technology powering Bitmern Solo.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { title: "Mining engine", desc: "Powered by Miningcore, a high-performance open-source pool framework. Handles stratum communication, share validation, block submission, and payouts." },
                { title: "Stratum protocol", desc: "Standard stratum protocol compatible with ASICs, GPUs, and CPUs across all supported algorithms. Multiple ports per coin with VarDiff on every connection." },
                { title: "Datacenter", desc: "Mining backend runs in a Dallas, TX datacenter with enterprise-grade networking. Additional regions planned based on demand." },
                { title: "Dashboard", desc: "Web dashboard is globally distributed via edge network for instant page loads. Real-time updates via server-sent events (SSE)." },
              ].map((item) => (
                <div key={item.title} className="rounded-lg border border-border/40 p-5">
                  <h3 className="text-sm font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>
  );
}
