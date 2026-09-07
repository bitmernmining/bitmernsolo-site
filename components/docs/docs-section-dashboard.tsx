import { SectionHeading } from "@/components/docs/docs-ui";

export function DocsDashboard() {
  return (
<section>
            <SectionHeading id="dashboard">Dashboard Features</SectionHeading>
            <p className="mt-4 text-sm text-muted-foreground mb-6">
              Your Bitmern dashboard at{" "}
              <a href="https://app.bitmernsolo.com" className="text-primary hover:underline font-medium">app.bitmernsolo.com</a>{" "}
              gives you full visibility into your mining operation.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { title: "Real-time hashrate chart", desc: "Live hashrate graph with hourly samples. See your total mining power and per-worker breakdown over the last 24 hours." },
                { title: "Worker management", desc: "View all connected workers with individual hashrate, shares per second, and online/offline status. Click any worker for its 24h chart." },
                { title: "Earnings tracking", desc: "Daily earnings history with running totals. See exactly when blocks were found and how much you earned." },
                { title: "Payout history", desc: "Complete payout log with transaction IDs linked to block explorers. Track every payout from discovery to wallet." },
                { title: "Profitability calculator", desc: "Estimate your odds of finding a block based on your hashrate and current network difficulty. Uses live coin prices." },
                { title: "Email alerts", desc: "Get notified when a worker goes offline, hashrate drops, a payout is sent, or a block is found. Configurable thresholds." },
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
