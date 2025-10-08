// ────────────────────────────────────────────────
// LogRocket Initialization Module
// Task 1.5 → Subtask 1.2 — Sentry + LogRocket Integration
// ────────────────────────────────────────────────

import LogRocket from "logrocket";

export const initLogRocket = (): void => {
  const id = process.env.NEXT_PUBLIC_LOGROCKET_ID || process.env.LOGROCKET_ID;
  if (!id) {
    console.warn("⚠️  LogRocket ID not set in environment. Skipping init.");
    return;
  }
  LogRocket.init(id);
  console.log("✅ LogRocket initialized:", id);
};
