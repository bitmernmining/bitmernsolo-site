import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  // Basic capture only — no user context, no breadcrumbs (locked decision)
  tracesSampleRate: 0,
});
