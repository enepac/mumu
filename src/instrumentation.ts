// ────────────────────────────────────────────────
// Sentry Instrumentation — Next.js 15 (v10.18.0)
// Task 2.1 Observability Baseline — Validated Fix
// ────────────────────────────────────────────────

import * as Sentry from "@sentry/nextjs";

// Prevent duplicate initialization (hot reload safe)
export const register = (): void => {
  // Check if already initialized
  if (Sentry.isInitialized?.()) return;

  Sentry.init({
    dsn: process.env.SENTRY_DSN || "",
    environment: process.env.NODE_ENV || "development",
    tracesSampleRate: 1.0,
    integrations: (integrations) => [
      ...integrations,
      Sentry.captureConsoleIntegration({ levels: ["error", "warn"] }),
    ],
  });
};
