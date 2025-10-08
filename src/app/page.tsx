"use client";

import { logger } from "@/lib/logger";

export default function HomePage() {
  const triggerError = () => {
    try {
      throw new Error("Sentry test error");
    } catch (err) {
      const error = err as Error;
      logger.error({ err: error }, "Sentry captured error");
      throw error; // Will be sent to Sentry
    }
  };

  return (
    <main style={{ padding: 40 }}>
      <h1>🚀 Mumu Observability Stack</h1>
      <p>Testing unified telemetry: Pino + Sentry + LogRocket</p>
      <button onClick={triggerError}>Trigger Sentry Test</button>
    </main>
  );
}
