// ────────────────────────────────────────────────
// Sentry Client Configuration
// Task 1.5 → Subtask 1.2 — Observability Integration
// ────────────────────────────────────────────────

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN || process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  integrations: [],
  environment: process.env.NODE_ENV || "development",
  enabled: !!process.env.SENTRY_DSN,
});
