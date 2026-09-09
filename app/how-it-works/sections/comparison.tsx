const comparison = [
  {
    feature: "Block reward",
    solo: "100% goes to the finder (minus 1% fee)",
    shared: "Split proportionally among all participants",
  },
  {
    feature: "Payout frequency",
    solo: "Only when you find a block",
    shared: "Regular, predictable payouts",
  },
  {
    feature: "Income variance",
    solo: "High — long gaps between large payouts",
    shared: "Low — steady, smaller payouts",
  },
  {
    feature: "Best for",
    solo: "Large miners who can absorb variance",
    shared: "Smaller miners who need consistent income",
  },
  {
    feature: "Minimum hashrate",
    solo: "Any hashrate works — lower = longer wait",
    shared: "Any hashrate works — lower = smaller share",
  },
  {
    feature: "Fee structure",
    solo: "1% of block reward only when found",
    shared: "1–3% of every payout, always charged",
  },
  {
    feature: "Privacy",
    solo: "Your blocks, your wallet, no shared data",
    shared: "Pool sees all miners' contributions",
  },
];

export function HiwComparison() {
  return (
    <div className="space-y-6 mb-16">
      <h2 className="text-2xl font-bold tracking-tight">Solo vs shared pool</h2>
      <p className="text-sm text-muted-foreground leading-relaxed">
        The key difference: in a shared pool, rewards are split among all
        participants. In a solo pool, the entire reward goes to whoever finds
        the block.
      </p>

      <div className="rounded-xl border border-border/40 bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/40 bg-secondary/30">
                <th className="px-4 py-3 text-left font-medium w-[30%]">Feature</th>
                <th className="px-4 py-3 text-left font-medium text-primary w-[35%]">Solo Pool</th>
                <th className="px-4 py-3 text-left font-medium w-[35%]">Shared Pool</th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((row) => (
                <tr
                  key={row.feature}
                  className="border-b border-border/40 last:border-0"
                >
                  <td className="px-4 py-3 font-medium">{row.feature}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.solo}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.shared}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
        <p className="text-sm text-muted-foreground leading-relaxed">
          <span className="font-medium text-foreground">Bottom line:</span>{" "}
          Solo mining is higher risk, higher reward. If you have significant
          hashrate and can afford to wait for blocks, solo mining maximizes
          your earnings per block. If you need steady daily income, a shared
          pool may be more suitable.
        </p>
      </div>
    </div>
  );
}
