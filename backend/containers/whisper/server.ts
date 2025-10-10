import express from "express";
import cors from "cors";
import { collectDefaultMetrics, register } from "prom-client";

const app = express();
app.use(cors());
app.use(express.json());

// collect metrics for Prometheus
collectDefaultMetrics();

// --- Health check endpoint ---
app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "healthy",
    uptime: process.uptime(),
    version: "v0.2.2a",
  });
});

// --- Metrics endpoint ---
app.get("/metrics", async (_req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

const port = Number(process.env.PORT) || 8080;
const host = "0.0.0.0";

app.listen(port, host, () => {
  console.log(`Whisper container running on ${host}:${port}`);
});
