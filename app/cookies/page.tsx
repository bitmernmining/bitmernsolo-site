import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy — Bitmern Solo",
};

export default function CookiesPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Cookie Policy
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Last updated: February 17, 2026
      </p>

      <div className="mt-10 space-y-8 text-sm leading-relaxed text-muted-foreground [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-foreground [&_h2]:mb-3 [&_h3]:text-sm [&_h3]:font-semibold [&_h3]:text-foreground [&_h3]:mb-1 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1">
        <section>
          <h2>1. What are cookies</h2>
          <p>
            Cookies are small text files stored on your device by your web
            browser. They are widely used to make websites work and to provide
            information to site operators.
          </p>
        </section>

        <section>
          <h2>2. Cookies we use</h2>
          <p>
            Bitmern Solo uses only <span className="text-foreground font-medium">essential cookies</span> required
            for the Service to function. We do not use advertising, analytics,
            or tracking cookies.
          </p>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm border border-border/40 rounded-lg">
              <thead>
                <tr className="border-b border-border/40 bg-card">
                  <th className="px-3 py-2 text-left font-medium text-foreground">Cookie</th>
                  <th className="px-3 py-2 text-left font-medium text-foreground">Purpose</th>
                  <th className="px-3 py-2 text-left font-medium text-foreground">Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/40">
                  <td className="px-3 py-2 font-mono text-xs">sb-*-auth-token</td>
                  <td className="px-3 py-2">
                    Authentication session. Keeps you logged in to your account.
                  </td>
                  <td className="px-3 py-2">Session / 1 year</td>
                </tr>
                <tr className="border-b border-border/40">
                  <td className="px-3 py-2 font-mono text-xs">sb-*-auth-token-code-verifier</td>
                  <td className="px-3 py-2">
                    PKCE code verifier for secure OAuth authentication flow.
                  </td>
                  <td className="px-3 py-2">Session</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-mono text-xs">_vercel_jwt</td>
                  <td className="px-3 py-2">
                    Vercel deployment protection (preview environments only).
                  </td>
                  <td className="px-3 py-2">Session</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2>3. Third-party cookies</h2>
          <p>
            We do not set any third-party cookies. Our authentication provider
            (Supabase) sets cookies under our own domain for session management.
            No third-party advertising or analytics cookies are used.
          </p>
        </section>

        <section>
          <h2>4. Managing cookies</h2>
          <p>
            You can control cookies through your browser settings. However, if
            you disable or delete the authentication cookies listed above, you
            will be logged out and will need to sign in again.
          </p>
          <p className="mt-2">
            Most browsers allow you to:
          </p>
          <ul>
            <li>View what cookies are stored and delete them individually</li>
            <li>Block third-party cookies (this will not affect our Service)</li>
            <li>Block all cookies (this will prevent you from logging in)</li>
            <li>Clear all cookies when you close the browser</li>
          </ul>
        </section>

        <section>
          <h2>5. Changes to this policy</h2>
          <p>
            If we introduce new cookies beyond essential authentication, we will
            update this policy and notify users as appropriate.
          </p>
        </section>

        <section>
          <h2>6. Contact</h2>
          <p>
            Questions about cookies? Email us at{" "}
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
