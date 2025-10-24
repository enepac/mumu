/**
 * ceiTelemetry.ts
 * --------------------------------------------------------
 * Covenant CEI Telemetry Emitter
 * Emits structured telemetry events from Whisper job analytics.
 *
 * CEI Layer Roles:
 *   - Capture performance + metadata metrics from ASR jobs
 *   - Record duration, buffer size, and result summary
 *   - Forward event data to CEI logging or Supabase telemetry sink
 */

import { Job } from "bullmq";
import { performance } from "perf_hooks";

/**
 * Structure for telemetry payloads.
 */
export interface CEITelemetryEvent {
  jobId: string;
  eventType: "completed" | "failed";
  receivedAt: number;
  completedAt: number;
  durationMs: number;
  bufferBytes?: number;
  transcriptLength?: number;
  resultSnippet?: string;
  errorMessage?: string;
}

/**
 * Low-level telemetry emitter.
 * In production this can push to Supabase, LogRocket, or CEI analytics.
 */
export class CEITelemetryEmitter {
  private events: CEITelemetryEvent[] = [];

  /**
   * Record successful job completion.
   */
  emitJobCompleted(job: Job, result: string): CEITelemetryEvent {
    const now = Date.now();
    const start = (job.data?.receivedAt as number) ?? now;
    const duration = now - start;

    const event: CEITelemetryEvent = {
      jobId: job.id ?? "unknown",
      eventType: "completed",
      receivedAt: start,
      completedAt: now,
      durationMs: duration,
      bufferBytes: job.data?.buffer?.length ?? 0,
      transcriptLength: result?.length ?? 0,
      resultSnippet: result.slice(0, 80),
    };

    this.log(event);
    this.events.push(event);
    return event;
  }

  /**
   * Record failed job event.
   */
  emitJobFailed(job: Job | undefined, error: Error): CEITelemetryEvent {
    const now = Date.now();
    const event: CEITelemetryEvent = {
      jobId: job?.id ?? "unknown",
      eventType: "failed",
      receivedAt: job?.data?.receivedAt ?? now,
      completedAt: now,
      durationMs: now - (job?.data?.receivedAt ?? now),
      bufferBytes: job?.data?.buffer?.length ?? 0,
      transcriptLength: 0,
      errorMessage: error.message,
    };

    this.log(event);
    this.events.push(event);
    return event;
  }

  /**
   * Centralized logger (future hook: Supabase insert / CEI API post)
   */
  private log(event: CEITelemetryEvent) {
    const symbol = event.eventType === "completed" ? "📊" : "⚠️";
    console.log(
      `${symbol} [CEI] ${event.eventType.toUpperCase()} – Job: ${
        event.jobId
      } | Duration: ${event.durationMs} ms | Buffer: ${
        event.bufferBytes
      } bytes | Transcript: ${event.transcriptLength ?? 0}`,
    );
  }

  /**
   * Retrieve recorded events (useful for local testing).
   */
  getAll(): CEITelemetryEvent[] {
    return this.events;
  }
}

// ✅ Export singleton for worker-wide use
export const ceiTelemetry = new CEITelemetryEmitter();
