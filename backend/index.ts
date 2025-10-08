import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import * as Sentry from "@sentry/node";
import { nodeProfilingIntegration } from "@sentry/profiling-node";
import pino from "pino";
import { createClient } from "@supabase/supabase-js";

// ────────────────────────────────────────────────
//  Observability (Sentry + Pino)
// ────────────────────────────────────────────────
Sentry.init({
  dsn: process.env.SENTRY_DSN || "",
  integrations: [Sentry.httpIntegration(), nodeProfilingIntegration()],
  tracesSampleRate: 1.0,
  profilesSampleRate: 1.0,
  environment: process.env.NODE_ENV || "development",
});

const logger = pino({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      translateTime: "SYS:standard",
      ignore: "pid,hostname",
    },
  },
});

// ────────────────────────────────────────────────
//  Express App
// ────────────────────────────────────────────────
const app = express();
const PORT = Number(process.env.PORT) || 8080;

app.use(cors({ origin: "*" }));

// ✅ Request handler for tracing and breadcrumbs
app.use((req, _res, next) => {
  Sentry.startSpan({ name: `${req.method} ${req.path}` }, () => {
    logger.info({ path: req.path, method: req.method }, "Incoming request");
    next();
  });
});

// ────────────────────────────────────────────────
//  Supabase Connection
// ────────────────────────────────────────────────
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

// ────────────────────────────────────────────────
//  Routes
// ────────────────────────────────────────────────
app.get("/api/check", async (_req: Request, res: Response) => {
  try {
    const { data, error } = await supabase.from("test").select("*").limit(1);
    if (error) throw error;
    res.json({ ok: true, data });
  } catch (err) {
    Sentry.captureException(err);
    logger.error({ err }, "Supabase Error in /api/check");
    res.status(500).json({
      ok: false,
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
});

app.get("/api/messages", async (_req: Request, res: Response) => {
  try {
    const { data, error } = await supabase.from("test").select("*");
    if (error) throw error;
    res.json(data);
  } catch (err) {
    Sentry.captureException(err);
    logger.error({ err }, "Supabase Error in /api/messages");
    res.status(500).json({
      ok: false,
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
});

// ────────────────────────────────────────────────
//  Global Error Middleware (Sentry-safe)
// ────────────────────────────────────────────────

app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  Sentry.captureException(err);
  logger.error({ err }, "Unhandled error");
  res.status(500).json({ ok: false, error: "Internal Server Error" });
});

// ────────────────────────────────────────────────
//  Server Start
// ────────────────────────────────────────────────
app.listen(PORT, "0.0.0.0", () => {
  logger.info(`✅ Server running on http://0.0.0.0:${PORT}`);
});
