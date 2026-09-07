import { SectionHeading } from "@/components/docs/docs-ui";

export function DocsAlerts() {
  return (
<section>
            <SectionHeading id="alerts">Alerts</SectionHeading>
            <p className="mt-4 text-sm text-muted-foreground mb-6">
              Bitmern monitors your mining operation and can notify you by email when something needs attention.
            </p>

            <div className="rounded-lg border border-border/40 overflow-hidden mb-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/40 bg-secondary/30">
                    <th className="px-4 py-2.5 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Alert type</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { type: "Worker offline", desc: "Triggered when a worker stops submitting shares. Configurable delay (default: 15 min)." },
                    { type: "Hashrate drop", desc: "Triggered when hashrate drops below a % of its recent average. Configurable threshold (default: 50%)." },
                    { type: "Payout sent", desc: "Notification when a block reward payout is sent to your wallet." },
                    { type: "Block found", desc: "Notification when one of your workers finds a valid block." },
                  ].map((a) => (
                    <tr key={a.type} className="border-b border-border/40 last:border-0">
                      <td className="px-4 py-3 font-medium text-sm whitespace-nowrap">{a.type}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{a.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="rounded-lg border border-border/40 bg-secondary/20 p-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Configure alerts</strong> at{" "}
                <a href="https://app.bitmernsolo.com/alerts" className="text-primary hover:underline">Dashboard → Alerts</a>.
                {" "}Customize thresholds for offline delay and hashrate drop percentage.
                Make sure email notifications are enabled in your profile settings.
              </p>
            </div>
          </section>
  );
}
