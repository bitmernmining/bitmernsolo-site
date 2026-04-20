const REQUIRED_ENV_VARS = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "MININGCORE_API_URL",
  "CART_SESSION_SECRET",
  "SENTRY_DSN",
  "NEXT_PUBLIC_SENTRY_DSN",
] as const;

/**
 * Validates that all required environment variables are set.
 * Throws an Error naming the first missing variable.
 * Called from next.config.ts at build time and dev server startup.
 */
export function validateEnv(): void {
  for (const name of REQUIRED_ENV_VARS) {
    if (!process.env[name]) {
      throw new Error(`Missing required environment variable: ${name}`);
    }
  }
}
