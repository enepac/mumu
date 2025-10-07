// ────────────────────────────────────────────────
// Next.js Config with Sentry Integration (ESM Safe)
// Task 1.5 → Subtask 1.2 — Observability Integration
// ────────────────────────────────────────────────

import { withSentryConfig } from "@sentry/nextjs";

const moduleExports = {
  reactStrictMode: true,
  sentry: { hideSourceMaps: true },
};

const sentryWebpackPluginOptions = {
  silent: true,
  org: process.env.SENTRY_ORG || "enepac",
  project: process.env.SENTRY_PROJECT || "mumu",
};

export default withSentryConfig(moduleExports, sentryWebpackPluginOptions);
