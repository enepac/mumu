/**
 * whisperWorker.ts
 * --------------------------------------------------------
 * Background worker that consumes jobs from "asr_queue"
 * and performs mock Whisper transcription.
 *
 * Integrated with CEI Telemetry Emitter for analytics.
 */

import { Worker, Job } from "bullmq";
import IORedis from "ioredis";
import { ceiTelemetry } from "../../lib/telemetry/ceiTelemetry";

export interface ASRJob {
  id: string;
  buffer: Buffer;
  receivedAt: number;
}

/**
 * Simulated Whisper transcription task.
 * Emits metrics through CEI Telemetry after completion.
 */
async function transcribeAudio(job: Job<ASRJob>): Promise<string> {
  const sizeKb = (job.data.buffer.length / 1024).toFixed(2);
  console.log(`🎧  Processing job ${job.id} (${sizeKb} KB)`);

  const start = performance.now();
  // Simulated latency for Whisper
  await new Promise((r) => setTimeout(r, 1500));

  const transcript = `Transcribed text for job ${job.id} at ${new Date().toISOString()}`;
  const end = performance.now();

  console.log(`✅  Job ${job.id} completed in ${(end - start).toFixed(1)} ms`);

  return transcript;
}

/**
 * Create Redis connection and register worker.
 */
const redisOpts = process.env.REDIS_URL ?? {
  host: process.env.REDIS_HOST ?? "127.0.0.1",
  port: Number(process.env.REDIS_PORT ?? 6379),
  password: process.env.REDIS_PASSWORD ?? undefined,
  maxRetriesPerRequest: null, // ✅ mandatory for BullMQ v5
};

const connection =
  typeof redisOpts === "string"
    ? new IORedis(redisOpts, { maxRetriesPerRequest: null })
    : new IORedis(redisOpts);

/**
 * Worker definition with CEI telemetry hooks.
 */
export const worker = new Worker<ASRJob>(
  "asr_queue",
  async (job) => await transcribeAudio(job),
  { connection, concurrency: 2 },
);

/**
 * Event listeners for lifecycle + telemetry.
 */
worker.on("completed", (job, result) => {
  console.log(`📝  ASR result for ${job.id}:`, result);
  // ✅ Emit CEI telemetry for successful completion
  ceiTelemetry.emitJobCompleted(job, result as string);
});

worker.on("failed", (job, err) => {
  console.error(`❌  ASR job ${job?.id ?? "unknown"} failed:`, err);
  // ⚠️ Emit CEI telemetry for failed job
  ceiTelemetry.emitJobFailed(job ?? undefined, err as Error);
});

console.log("🚀  Whisper Worker listening on 'asr_queue' for ASR jobs");
