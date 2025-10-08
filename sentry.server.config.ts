// ────────────────────────────────────────────────
// Sentry Server Configuration
// Task 1.5 → Subtask 1.2 — Observability Integration
// ────────────────────────────────────────────────

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV || "development",
  enabled: !!process.env.SENTRY_DSN,
});
