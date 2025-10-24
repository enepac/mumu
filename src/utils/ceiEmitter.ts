"use client";

/**
 * CEI Telemetry Emitter
 * -----------------------
 * Lightweight utility for recording cognitive and behavioral events.
 * All emissions flow into the Reflection Analytics layer (VS-03).
 */

export type CEIEvent =
  | "ASR_STREAM_INIT"
  | "ASR_STREAM_STOP"
  | "TRANSCRIPT_RECEIVED"
  | "LLM_RESPONSE_RENDERED"
  | "UI_INTERACTION"
  | "ERROR_EVENT";

interface CEIPayload {
  event: CEIEvent;
  timestamp?: string;
  metadata?: Record<string, unknown>;
}

/**
 * Emits telemetry to the CEI learning log endpoint.
 * Future extension: buffer events locally for offline replay.
 */
export async function emitCEI(payload: CEIPayload): Promise<void> {
  const body = {
    ...payload,
    timestamp: payload.timestamp ?? new Date().toISOString(),
  };

  try {
    await fetch("/api/cei/log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (process.env.NODE_ENV === "development") {
      console.debug("🧠 CEI event emitted:", body);
    }
  } catch (error) {
    console.warn("⚠️ Failed to emit CEI event:", error);
  }
}

/**
 * Hook-style helper for React components.
 * Returns a function that wraps emitCEI with auto-timestamp.
 */
export function useCEIEmitter() {
  return (event: CEIEvent, metadata?: Record<string, unknown>) =>
    emitCEI({ event, metadata });
}
