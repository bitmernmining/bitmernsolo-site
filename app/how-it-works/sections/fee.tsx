export function HiwFee() {
  return (
    <div className="space-y-6 mb-16">
      <h2 className="text-2xl font-bold tracking-tight">The 1% fee explained</h2>
      <p className="text-sm text-muted-foreground leading-relaxed">
        Bitmern Solo charges a flat 1% fee on block rewards. Here is exactly
        how it works.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-border/40 bg-card p-5">
          <h3 className="text-sm font-semibold mb-2">When is the fee charged?</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Only when you find a block. If you mine for a week without finding
            one, you pay nothing. The fee is deducted from the block reward
            before it is sent to your wallet.
          </p>
        </div>
        <div className="rounded-xl border border-border/40 bg-card p-5">
          <h3 className="text-sm font-semibold mb-2">What does the fee cover?</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Infrastructure costs — servers, bandwidth, monitoring, stratum
            protocol handling, VarDiff computation, block broadcasting, and the
            real-time dashboard. No hidden charges or additional fees.
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-border/40 bg-card p-5">
        <h3 className="text-sm font-semibold mb-3">Payout examples</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/40">
                <th className="px-3 py-2 text-left font-medium">Coin</th>
                <th className="px-3 py-2 text-left font-medium">Block Reward</th>
                <th className="px-3 py-2 text-left font-medium">1% Fee</th>
                <th className="px-3 py-2 text-left font-medium text-primary">You Receive</th>
              </tr>
            </thead>
            <tbody>
              {[
                { coin: "BTC", reward: "3.125 BTC", fee: "0.03125 BTC", receive: "3.09375 BTC" },
                { coin: "LTC", reward: "6.25 LTC", fee: "0.0625 LTC", receive: "6.1875 LTC" },
                { coin: "DOGE", reward: "10,000 DOGE", fee: "100 DOGE", receive: "9,900 DOGE" },
                { coin: "BCH", reward: "3.125 BCH", fee: "0.03125 BCH", receive: "3.09375 BCH" },
                { coin: "DGB", reward: "665 DGB", fee: "6.65 DGB", receive: "658.35 DGB" },
              ].map((row) => (
                <tr key={row.coin} className="border-b border-border/40 last:border-0">
                  <td className="px-3 py-2 font-mono font-medium">{row.coin}</td>
                  <td className="px-3 py-2 font-mono text-muted-foreground">{row.reward}</td>
                  <td className="px-3 py-2 font-mono text-muted-foreground">{row.fee}</td>
                  <td className="px-3 py-2 font-mono font-medium text-primary">{row.receive}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
