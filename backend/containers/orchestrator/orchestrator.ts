// backend/containers/orchestrator/orchestrator.ts
import Fastify, {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import { runPipeline } from "./pipeline";
import { healthHandler } from "./health";
import { metricsHandler } from "./metrics";

// Create a Fastify instance with proper logger configuration
const app: FastifyInstance = Fastify({
  logger: {
    level: process.env.LOG_LEVEL || "info",
    transport:
      process.env.NODE_ENV === "production"
        ? undefined
        : { target: "pino-pretty" },
  },
});

// ─────────────────────────────────────────────
// ROUTES
// ─────────────────────────────────────────────

// Health and metrics endpoints
app.get("/health", healthHandler);
app.get("/metrics", metricsHandler);

// Main orchestration endpoint
app.post("/orchestrate", async (req: FastifyRequest, reply: FastifyReply) => {
  const { prompt, workspaceId, metadata } = (req.body as any) || {};

  if (!prompt) {
    reply.code(400).send({ error: "Missing prompt" });
    return;
  }

  try {
    const result = await runPipeline({ prompt, workspaceId, metadata });
    reply.code(200).send({ success: true, result });
  } catch (error: any) {
    req.log.error(error);
    reply.code(500).send({
      error: "Pipeline failed",
      details: error.message,
    });
  }
});

// ─────────────────────────────────────────────
// SERVER LAUNCH
// ─────────────────────────────────────────────
const port = Number(process.env.PORT) || 8080;

// Fly.io requires listening on all interfaces
app
  .listen({ port, host: "0.0.0.0" })
  .then(() => app.log.info(`🚀 Orchestrator running on port ${port}`))
  .catch((err) => {
    app.log.error(err);
    process.exit(1);
  });
