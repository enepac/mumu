// ────────────────────────────────────────────────
// Client-side Sentry configuration
// ────────────────────────────────────────────────
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN || "",
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  integrations: (integrations) => [
    ...integrations,
    Sentry.captureConsoleIntegration({ levels: ["error", "warn"] }),
  ],
});
