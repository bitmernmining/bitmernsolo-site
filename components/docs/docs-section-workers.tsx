import { SectionHeading, CodeBlock } from "@/components/docs/docs-ui";

export function DocsWorkers() {
  return (
<section>
            <SectionHeading id="workers">Worker Configuration</SectionHeading>
            <p className="mt-4 text-sm text-muted-foreground mb-6">
              Workers are identified by the label after the dot in your stratum username.
            </p>

            <div className="space-y-4">
              <div className="rounded-lg border border-border/40 p-5">
                <h3 className="text-sm font-semibold mb-3">Naming format</h3>
                <CodeBlock>{`WALLET_ADDRESS.workerName`}</CodeBlock>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  Use letters, numbers, and hyphens. Keep names short and descriptive — they appear in your dashboard exactly as entered.
                </p>
              </div>

              <div className="rounded-lg border border-border/40 p-5">
                <h3 className="text-sm font-semibold mb-3">Multiple workers</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  Run as many workers as you want under the same wallet address. Each gets its own hashrate chart and status. Use a different name for each machine.
                </p>
                <CodeBlock>{`bc1q...abc.s21-pro
bc1q...abc.s19k-garage
bc1q...abc.bitaxe`}</CodeBlock>
              </div>

              <div className="rounded-lg border border-border/40 p-5">
                <h3 className="text-sm font-semibold mb-2">Dashboard visibility</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                  Each worker appears as a separate row in your Miners page with its own hashrate, shares per second, and online/offline status.
                  Click into any worker to see its 24-hour hashrate chart and connection details.
                  Workers are automatically detected when they connect — no manual registration required.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">Open the Miners page in the dashboard for the live worker table and per-worker 24-hour charts.</p>
              </div>
            </div>
          </section>
  );
}
