// backend/containers/orchestrator/health.ts
import { FastifyReply, FastifyRequest } from "fastify";
import os from "os";

export async function healthHandler(_req: FastifyRequest, reply: FastifyReply) {
  reply.send({
    status: "ok",
    version: process.env.APP_VERSION || "dev",
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    hostname: os.hostname(),
  });
}
