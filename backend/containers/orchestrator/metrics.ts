// backend/containers/orchestrator/metrics.ts
import { FastifyReply, FastifyRequest } from "fastify";
import client from "prom-client";

// ✅ Collect default system metrics (no 'timeout' option in v15+)
client.collectDefaultMetrics({ prefix: "mumu_orchestrator_" });

// Custom metric: orchestration pipeline duration histogram
export const orchestrationDuration = new client.Histogram({
  name: "mumu_pipeline_duration_seconds",
  help: "Duration of LLM orchestration pipeline steps in seconds",
  buckets: [0.5, 1, 2, 5, 10],
});

// ✅ Fastify handler for /metrics
export async function metricsHandler(
  _req: FastifyRequest,
  reply: FastifyReply,
) {
  const metrics = await client.register.metrics();
  reply.header("Content-Type", client.register.contentType).send(metrics);
}
