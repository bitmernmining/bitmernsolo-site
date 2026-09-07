import { SectionHeading } from "@/components/docs/docs-ui";
import { CONFIRMATIONS, PAYOUT_EXAMPLES } from "@/lib/docs-data";

export function DocsPayouts() {
  return (
<section>
            <SectionHeading id="payouts">Fees &amp; Payouts</SectionHeading>

            <div className="mt-4 rounded-lg border border-primary/20 bg-primary/5 p-5 mb-6">
              <p className="text-sm leading-relaxed">
                <strong className="text-foreground">1% flat fee</strong>{" "}
                <span className="text-muted-foreground">
                  — deducted only when you find a block. No block, no fee.
                  No hidden charges, no subscription, no withdrawal fees.
                </span>
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 mb-6">
              <div className="rounded-lg border border-border/40 p-5">
                <h3 className="text-sm font-semibold mb-2">When is the fee deducted?</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  When your miner finds a block, the pool deducts 1% from the block reward before sending the remaining 99% to your wallet.
                </p>
              </div>
              <div className="rounded-lg border border-border/40 p-5">
                <h3 className="text-sm font-semibold mb-2">Payout flow</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Block found → confirmations accumulate → coinbase matures → 99% sent to your wallet automatically. No manual action needed.
                </p>
              </div>
            </div>

            <h3 className="text-sm font-semibold mb-3">Payout examples</h3>
            <div className="rounded-lg border border-border/40 overflow-hidden mb-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/40 bg-secondary/30">
                    <th className="px-4 py-2.5 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Coin</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Block Reward</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">1% Fee</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium uppercase tracking-wider text-primary">You Receive</th>
                  </tr>
                </thead>
                <tbody>
                  {PAYOUT_EXAMPLES.map((row) => (
                    <tr key={row.coin} className="border-b border-border/40 last:border-0">
                      <td className="px-4 py-3 font-mono font-medium">{row.coin}</td>
                      <td className="px-4 py-3 font-mono text-muted-foreground">{row.reward}</td>
                      <td className="px-4 py-3 font-mono text-muted-foreground">{row.fee}</td>
                      <td className="px-4 py-3 font-mono font-medium text-primary">{row.receive}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 className="text-sm font-semibold mb-3">Confirmation requirements</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Blocks must reach these confirmation counts before the coinbase reward matures and payout is sent.
            </p>
            <div className="rounded-lg border border-border/40 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/40 bg-secondary/30">
                    <th className="px-4 py-2.5 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Coin</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Confirmations</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Approx. time</th>
                  </tr>
                </thead>
                <tbody>
                  {CONFIRMATIONS.map((row) => (
                    <tr key={row.coin} className="border-b border-border/40 last:border-0">
                      <td className="px-4 py-3">
                        <span className="font-mono text-sm font-medium">{row.coin}</span>
                        <span className="ml-2 text-sm text-muted-foreground">{row.name}</span>
                      </td>
                      <td className="px-4 py-3 font-mono text-sm">{row.confirmations}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{row.approxTime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
  );
}
