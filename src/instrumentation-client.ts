// ───────────────────────────────────────────────
// Client-side Sentry / LogRocket Initialization
// (Replaces sentry.client.config.ts)
// ───────────────────────────────────────────────
"use client";

import * as Sentry from "@sentry/nextjs";
import LogRocket from "logrocket";

export async function register() {
  if (typeof window !== "undefined") {
    LogRocket.init(process.env.NEXT_PUBLIC_LOGROCKET_APP_ID || "");
    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      tracesSampleRate: 1.0,
      environment: process.env.NODE_ENV || "development",
    });
  }
}
