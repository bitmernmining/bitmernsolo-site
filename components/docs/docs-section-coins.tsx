import { SectionHeading } from "@/components/docs/docs-ui";
import Image from "next/image";
import { COINS } from "@/lib/data";

export function DocsCoins() {
  return (
<section>
            <SectionHeading id="coins">Supported Coins</SectionHeading>
            <p className="mt-4 text-sm text-muted-foreground mb-6">
              Ten proof-of-work coins across multiple mining algorithms.
            </p>

            <div className="rounded-lg border border-border/40 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/40 bg-secondary/30">
                    <th className="px-4 py-2.5 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Coin</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Symbol</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Algorithm</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Block Time</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Block Reward</th>
                  </tr>
                </thead>
                <tbody>
                  {COINS.map((c) => (
                    <tr key={c.symbol} className="border-b border-border/40 last:border-0">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <Image src={c.icon} alt={c.name} width={18} height={18} />
                          <span className="font-medium text-sm">{c.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{c.symbol}</td>
                      <td className="px-4 py-3 text-sm">{c.algorithm}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{c.blockTime}</td>
                      <td className="px-4 py-3 font-mono text-sm text-primary">{c.blockReward}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
  );
}
