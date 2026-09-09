export function HiwLifecycle() {
  return (
    <div className="space-y-6 mb-16">
      <h2 className="text-2xl font-bold tracking-tight">
        What happens when you find a block
      </h2>
      <p className="text-sm text-muted-foreground leading-relaxed">
        Finding a block is the moment everything pays off. Here is the full
        lifecycle from discovery to your wallet.
      </p>

      <div className="rounded-xl border border-border/40 bg-card overflow-hidden">
        <div className="divide-y divide-border/40">
          {[
            {
              label: "Block discovered",
              time: "T+0",
              desc: "Your miner submits a share that meets the full network difficulty. The pool recognizes this as a valid block.",
            },
            {
              label: "Broadcast to network",
              time: "T+1s",
              desc: "The pool immediately broadcasts the block to the blockchain network. Other nodes begin verifying it.",
            },
            {
              label: "Confirmations begin",
              time: "T+10min",
              desc: "Each new block mined on top of yours adds a confirmation. The reward is locked until enough confirmations accumulate (typically 100 for BTC, fewer for other coins).",
            },
            {
              label: "Reward matures",
              time: "T+~16hr (BTC)",
              desc: "After reaching the required confirmation count, the coinbase reward matures and becomes spendable.",
            },
            {
              label: "Payout sent",
              time: "Shortly after maturity",
              desc: "The pool sends 99% of the block reward to your configured wallet address. The 1% fee is deducted automatically. No action needed on your part.",
            },
          ].map((item) => (
            <div key={item.label} className="flex gap-4 p-5">
              <div className="shrink-0">
                <span className="inline-block rounded bg-primary/10 px-2 py-0.5 font-mono text-[11px] font-medium text-primary">
                  {item.time}
                </span>
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-semibold">{item.label}</h3>
                <p className="mt-0.5 text-sm text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
