import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — Bitmern Solo",
};

export default function TermsPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Terms of Service
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Last updated: February 17, 2026
      </p>

      <div className="mt-10 space-y-8 text-sm leading-relaxed text-muted-foreground [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-foreground [&_h2]:mb-3 [&_h3]:text-sm [&_h3]:font-semibold [&_h3]:text-foreground [&_h3]:mb-1 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1">
        <section>
          <h2>1. Acceptance of terms</h2>
          <p>
            By creating an account or using the Bitmern Solo mining pool
            (&quot;Service&quot;), you agree to these Terms of Service. If you do
            not agree, do not use the Service.
          </p>
        </section>

        <section>
          <h2>2. Description of service</h2>
          <p>
            Bitmern Solo is a solo cryptocurrency mining pool. You connect your
            mining hardware to our stratum servers, and we relay your work to the
            respective blockchain networks. When your miner finds a valid block,
            you receive the full block reward minus a pool fee. This is not
            pooled or shared mining — each block reward belongs entirely to the
            miner who found it.
          </p>
        </section>

        <section>
          <h2>3. Pool fee</h2>
          <p>
            We charge a flat <span className="text-foreground font-medium">1% fee</span> on
            block rewards found through our pool. This fee is deducted
            automatically before the reward is credited to your pending balance.
            The fee may be updated with 30 days advance notice to registered
            users.
          </p>
        </section>

        <section>
          <h2>4. Supported coins</h2>
          <p>
            We currently support Bitcoin (BTC), Litecoin (LTC), Dogecoin (DOGE),
            Bitcoin Cash (BCH), and DigiByte (DGB). We may add or remove
            supported coins at our discretion with reasonable notice.
          </p>
        </section>

        <section>
          <h2>5. Account responsibilities</h2>
          <ul>
            <li>You must provide a valid email address for account creation</li>
            <li>You are responsible for keeping your login credentials secure</li>
            <li>
              You must provide a valid wallet address for the coin(s) you are mining.
              Payouts sent to an incorrect address cannot be recovered.
            </li>
            <li>You must not use the Service for any illegal purpose</li>
            <li>
              You must not attempt to interfere with, exploit, or disrupt the
              pool infrastructure
            </li>
          </ul>
        </section>

        <section>
          <h2>6. Payouts</h2>
          <ul>
            <li>
              Pending balances are paid out automatically once they meet the
              minimum payout threshold for each coin
            </li>
            <li>
              Payout thresholds and schedules may vary by coin and are displayed
              in your dashboard
            </li>
            <li>
              Blockchain transaction fees for payouts are deducted from the
              payout amount
            </li>
            <li>
              We are not responsible for delays caused by blockchain network
              congestion
            </li>
          </ul>
        </section>

        <section>
          <h2>7. No guarantees</h2>
          <p>
            Solo mining is inherently probabilistic. Connecting mining hardware
            to our pool does not guarantee that you will find a block or earn any
            rewards. Mining difficulty, your hashrate, and luck all affect
            outcomes. We make no guarantees about earnings, uptime, or
            performance.
          </p>
        </section>

        <section>
          <h2>8. Service availability</h2>
          <p>
            We aim to provide reliable pool infrastructure but do not guarantee
            100% uptime. The Service may be temporarily unavailable due to
            maintenance, upgrades, or circumstances beyond our control. We are
            not liable for lost mining time or potential rewards during outages.
          </p>
        </section>

        <section>
          <h2>9. Limitation of liability</h2>
          <p>
            The Service is provided &quot;as is&quot; without warranties of any
            kind. To the maximum extent permitted by law, Bitmern Solo shall not
            be liable for any indirect, incidental, special, or consequential
            damages arising from your use of the Service, including but not
            limited to lost profits, lost mining rewards, or wallet-related
            issues.
          </p>
        </section>

        <section>
          <h2>10. Termination</h2>
          <p>
            We may suspend or terminate your account if you violate these terms
            or engage in activity that harms the pool or other users. You may
            close your account at any time. Upon termination, any pending
            balance above the minimum payout threshold will be sent to your
            configured wallet address.
          </p>
        </section>

        <section>
          <h2>11. Changes to terms</h2>
          <p>
            We may update these terms from time to time. Material changes will be
            communicated to registered users by email at least 14 days before
            taking effect. Continued use of the Service after changes take effect
            constitutes acceptance of the updated terms.
          </p>
        </section>

        <section>
          <h2>12. Contact</h2>
          <p>
            Questions about these terms? Email us at{" "}
            <a
              href="mailto:support@bitmernsolo.com"
              className="text-primary hover:underline"
            >
              support@bitmernsolo.com
            </a>
            .
          </p>
        </section>
      </div>
    </article>
  );
}
