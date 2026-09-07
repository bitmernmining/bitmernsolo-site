import { SectionHeading, CodeBlock } from "@/components/docs/docs-ui";
import { API_BASE, API_ENDPOINTS } from "@/lib/docs-api";
import { POOL_IDS } from "@/lib/docs-data";

export function DocsApi() {
  return (
<section>
            <SectionHeading id="api">Pool API</SectionHeading>
            <p className="mt-4 text-sm text-muted-foreground mb-2">
              Public REST API for reading pool and miner data. No authentication required — all endpoints are read-only.
            </p>
            <div className="mb-6">
              <CodeBlock label="Base URL">{API_BASE}</CodeBlock>
            </div>

            <h3 className="text-sm font-semibold mb-3">Pool IDs</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Use these IDs in the <code className="rounded bg-secondary/80 px-1.5 py-0.5 text-xs text-foreground">{"{id}"}</code> path parameter.
            </p>
            <div className="rounded-lg border border-border/40 overflow-hidden mb-8">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/40 bg-secondary/30">
                    <th className="px-4 py-2.5 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Coin</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Pool ID</th>
                  </tr>
                </thead>
                <tbody>
                  {POOL_IDS.map((p) => (
                    <tr key={p.id} className="border-b border-border/40 last:border-0">
                      <td className="px-4 py-2.5 text-sm">{p.coin}</td>
                      <td className="px-4 py-2.5 font-mono text-sm text-primary">{p.id}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 className="text-sm font-semibold mb-4">Endpoints</h3>
            <div className="space-y-6">
              {API_ENDPOINTS.map((ep) => (
                <div key={ep.path} className="rounded-lg border border-border/40 overflow-hidden">
                  <div className="flex items-center gap-3 border-b border-border/40 bg-secondary/20 px-4 py-2.5">
                    <span className="rounded bg-emerald-500/15 px-2 py-0.5 text-[11px] font-bold font-mono text-emerald-400">
                      {ep.method}
                    </span>
                    <code className="font-mono text-[13px] font-medium">{ep.path}</code>
                  </div>
                  <div className="p-4 space-y-4">
                    <p className="text-sm text-muted-foreground">{ep.description}</p>
                    <CodeBlock label="Request">{ep.example}</CodeBlock>
                    <CodeBlock label="Response">{ep.response}</CodeBlock>
                  </div>
                </div>
              ))}
            </div>
          </section>
  );
}
