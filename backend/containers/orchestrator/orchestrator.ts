// backend/containers/orchestrator/orchestrator.ts
import Fastify from "fastify";
import { runPipeline } from "./pipeline";
import { healthHandler } from "./health";
import { metricsHandler } from "./metrics";

// ✅ Correct Fastify logger configuration
const app = Fastify({
  logger: {
    level: process.env.LOG_LEVEL || "info",
    transport:
      process.env.NODE_ENV === "production"
        ? undefined
        : { target: "pino-pretty" },
  },
});

// Routes
app.get("/health", healthHandler);
app.get("/metrics", metricsHandler);

app.post("/orchestrate", async (req, reply) => {
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
    reply.code(500).send({ error: "Pipeline failed", details: error.message });
  }
});

const port = Number(process.env.PORT) || 8080;

// ✅ Fastify listens on all interfaces for Fly.io
app.listen({ port, host: "0.0.0.0" }).then(() => {
  app.log.info(`🚀 Orchestrator running on port ${port}`);
});
