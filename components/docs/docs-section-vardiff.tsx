import { SectionHeading } from "@/components/docs/docs-ui";
import { DIFF_GUIDE } from "@/lib/docs-data";

export function DocsVarDiff() {
  return (
<section>
            <SectionHeading id="vardiff">VarDiff</SectionHeading>
            <p className="mt-4 text-sm text-muted-foreground mb-6">
              Variable Difficulty automatically adjusts the share difficulty sent to your miner based on how fast it&apos;s hashing.
            </p>

            <div className="grid gap-4 sm:grid-cols-2 mb-6">
              <div className="rounded-lg border border-border/40 p-5">
                <h3 className="text-sm font-semibold mb-2">How it works</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  VarDiff monitors how quickly your miner submits shares and adjusts difficulty up or down to maintain a steady submission rate.
                  This prevents flooding the pool with easy shares (wasting bandwidth) or struggling with shares that are too hard (making stats laggy).
                </p>
              </div>
              <div className="rounded-lg border border-border/40 p-5">
                <h3 className="text-sm font-semibold mb-2">Starting difficulty</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Each port has a different starting difficulty — this is just where VarDiff begins. It adjusts to your actual hashrate within minutes.
                  If unsure which port to use, pick the default (highest starting difficulty) port. It works for everyone.
                </p>
              </div>
            </div>

            <h3 className="text-sm font-semibold mb-3">Port selection guide</h3>
            <div className="rounded-lg border border-border/40 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/40 bg-secondary/30">
                    <th className="px-4 py-2.5 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Your hashrate</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Recommended port</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Examples</th>
                  </tr>
                </thead>
                <tbody>
                  {DIFF_GUIDE.map((row) => (
                    <tr key={row.hashrate} className="border-b border-border/40 last:border-0">
                      <td className="px-4 py-3 font-mono text-sm">{row.hashrate}</td>
                      <td className="px-4 py-3 text-sm">{row.recommendation}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
  );
}
