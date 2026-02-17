import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Bitmern Solo",
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Last updated: February 17, 2026
      </p>

      <div className="mt-10 space-y-8 text-sm leading-relaxed text-muted-foreground [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-foreground [&_h2]:mb-3 [&_h3]:text-sm [&_h3]:font-semibold [&_h3]:text-foreground [&_h3]:mb-1 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1">
        <section>
          <h2>1. Who we are</h2>
          <p>
            Bitmern Solo (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates a solo cryptocurrency mining pool at{" "}
            <span className="text-foreground">bitmernsolo.com</span> and{" "}
            <span className="text-foreground">app.bitmernsolo.com</span>. This
            policy explains how we collect, use, and protect your information
            when you use our services.
          </p>
        </section>

        <section>
          <h2>2. Information we collect</h2>

          <h3>Account information</h3>
          <ul>
            <li>Email address (for authentication and notifications)</li>
            <li>Display name (optional)</li>
            <li>Timezone preference</li>
          </ul>

          <h3 className="mt-3">Wallet addresses</h3>
          <p>
            You provide cryptocurrency wallet addresses to receive mining
            payouts. These are public blockchain addresses and are stored in
            your account profile.
          </p>

          <h3 className="mt-3">Mining data</h3>
          <ul>
            <li>Worker names and configurations</li>
            <li>Hashrate, shares submitted, and performance metrics</li>
            <li>Earnings and payout history</li>
            <li>Alert preferences and alert history</li>
          </ul>

          <h3 className="mt-3">Technical data</h3>
          <ul>
            <li>IP address and browser user agent (via server logs)</li>
            <li>Authentication session tokens</li>
          </ul>
        </section>

        <section>
          <h2>3. How we use your information</h2>
          <ul>
            <li>To operate the mining pool and process payouts to your wallet</li>
            <li>To display your mining statistics and performance data</li>
            <li>To send alert notifications (worker offline, hashrate drop, payouts) when enabled</li>
            <li>To authenticate your account and maintain session security</li>
            <li>To improve our infrastructure and debug issues</li>
          </ul>
        </section>

        <section>
          <h2>4. Third-party services</h2>
          <p>We use the following third-party services to operate:</p>
          <ul>
            <li>
              <span className="text-foreground">Supabase</span> — authentication, database, and serverless functions
            </li>
            <li>
              <span className="text-foreground">Vercel</span> — web application hosting
            </li>
            <li>
              <span className="text-foreground">Resend</span> — transactional email delivery (alert notifications)
            </li>
            <li>
              <span className="text-foreground">CoinGecko</span> — cryptocurrency price data (no user data is shared)
            </li>
          </ul>
          <p className="mt-2">
            Each service processes data according to their own privacy policies.
            We do not sell, rent, or trade your personal information to any third
            party.
          </p>
        </section>

        <section>
          <h2>5. Data retention</h2>
          <p>
            We retain your account data for as long as your account is active.
            Mining performance data (hashrate history, earnings) is retained
            indefinitely to provide historical statistics. If you delete your
            account, your profile and alert configurations are removed. On-chain
            data (payouts, transactions) is immutable and remains on the
            respective blockchains.
          </p>
        </section>

        <section>
          <h2>6. Security</h2>
          <p>
            All connections to our services are encrypted via TLS/HTTPS.
            Passwords are hashed and never stored in plaintext. Database access
            is protected by row-level security policies, ensuring users can only
            access their own data. We do not store private keys or seed phrases.
          </p>
        </section>

        <section>
          <h2>7. Cookies</h2>
          <p>
            We use essential cookies for authentication sessions. We do not use
            advertising or tracking cookies. See our{" "}
            <a href="/cookies" className="text-primary hover:underline">
              Cookie Policy
            </a>{" "}
            for details.
          </p>
        </section>

        <section>
          <h2>8. Your rights</h2>
          <p>You can:</p>
          <ul>
            <li>Access and update your profile information at any time through your account settings</li>
            <li>Enable or disable email notifications for each alert type</li>
            <li>Request deletion of your account by contacting us</li>
            <li>Export your mining data by contacting us</li>
          </ul>
        </section>

        <section>
          <h2>9. Changes to this policy</h2>
          <p>
            We may update this policy from time to time. If we make significant
            changes, we will notify registered users by email. Continued use of
            the service after changes constitutes acceptance of the updated
            policy.
          </p>
        </section>

        <section>
          <h2>10. Contact</h2>
          <p>
            For privacy-related questions or requests, email us at{" "}
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
