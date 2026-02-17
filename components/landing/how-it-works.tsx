export function HowItWorks() {
  return (
    <section id="how-it-works">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          How it works
        </h2>
        <p className="mt-2 text-muted-foreground">
          From account creation to your first share in under 5 minutes.
        </p>

        <div className="mt-12 grid gap-12 lg:grid-cols-3 lg:gap-8">
          {/* Step 1 */}
          <div className="rounded-xl bg-card/30 p-6">
            <div className="mb-4 flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary font-mono text-xs font-semibold text-primary">
              1
            </div>
            <h3 className="text-base font-semibold">Create an account</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Sign up with your email and set your wallet address for each coin
              you want to mine. No KYC, no personal info beyond an email.
            </p>
          </div>

          {/* Step 2 */}
          <div className="rounded-xl bg-card/30 p-6">
            <div className="mb-4 flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary font-mono text-xs font-semibold text-primary">
              2
            </div>
            <h3 className="text-base font-semibold">Point your ASIC</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Configure your miner&apos;s stratum URL to the appropriate endpoint
              and port. Use your wallet address as the username. VarDiff
              handles the rest.
            </p>
            <div className="mt-4 rounded-md border border-border/40 bg-background/50 p-3 font-mono text-xs">
              <p className="text-muted-foreground">
                -o <span className="text-primary">stratum+tcp://btc.bitmernsolo.com:3102</span>
              </p>
              <p className="text-muted-foreground">
                -u <span className="text-foreground">your-wallet-address.worker1</span>
              </p>
              <p className="text-muted-foreground">
                -p <span className="text-foreground">x</span>
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="rounded-xl bg-card/30 p-6">
            <div className="mb-4 flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary font-mono text-xs font-semibold text-primary">
              3
            </div>
            <h3 className="text-base font-semibold">Mine and monitor</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Watch your hashrate, workers, and effort in real time on the
              dashboard. When you find a block, the reward (minus the 1% pool
              fee) goes directly to your wallet.
            </p>
            {/* Mini stat preview */}
            <div className="mt-4 grid grid-cols-3 gap-2">
              <div className="rounded-md border border-border/40 bg-background/50 px-2 py-1.5 text-center">
                <p className="text-[10px] text-muted-foreground">Hashrate</p>
                <p className="font-mono text-xs font-semibold">142.8 TH/s</p>
              </div>
              <div className="rounded-md border border-border/40 bg-background/50 px-2 py-1.5 text-center">
                <p className="text-[10px] text-muted-foreground">Workers</p>
                <p className="font-mono text-xs font-semibold">3</p>
              </div>
              <div className="rounded-md border border-border/40 bg-background/50 px-2 py-1.5 text-center">
                <p className="text-[10px] text-muted-foreground">Effort</p>
                <p className="font-mono text-xs font-semibold">67.3%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
