// ────────────────────────────────────────────────
// Server-side Sentry configuration
// ────────────────────────────────────────────────
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN || "",
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV || "development",
  integrations: (integrations) => [
    ...integrations,
    Sentry.captureConsoleIntegration({ levels: ["error", "warn"] }),
  ],
});
