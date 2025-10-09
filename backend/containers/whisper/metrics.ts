// backend/containers/whisper/metrics.ts
import { FastifyReply, FastifyRequest } from "fastify";
import client from "prom-client";

// Collect default system metrics with Whisper prefix
client.collectDefaultMetrics({ prefix: "mumu_whisper_" });

// Custom metric for audio transcription duration
export const transcriptionDuration = new client.Histogram({
  name: "mumu_whisper_transcription_duration_seconds",
  help: "Duration of Whisper transcription jobs in seconds",
  buckets: [0.5, 1, 2, 5, 10, 20],
});

// Fastify handler for /metrics
export async function metricsHandler(
  _req: FastifyRequest,
  reply: FastifyReply,
) {
  const metrics = await client.register.metrics();
  reply.header("Content-Type", client.register.contentType).send(metrics);
}
