// backend/containers/orchestrator/metrics.ts
import { FastifyReply, FastifyRequest } from "fastify";

let requestCount = 0;
let totalLatency = 0;

export async function metricsHandler(
  _req: FastifyRequest,
  reply: FastifyReply,
) {
  const avgLatency = requestCount ? totalLatency / requestCount : 0;
  reply.send({
    status: "ok",
    timestamp: new Date().toISOString(),
    requests: requestCount,
    average_latency_ms: avgLatency,
  });
}

// Optional: Export hooks to update metrics
export function recordMetrics(latency: number) {
  requestCount++;
  totalLatency += latency;
}
