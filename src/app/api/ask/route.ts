import { NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/logger";
import { encryptField } from "@/../backend/utils/encryption";

/**
 * POST /api/ask
 * Handles user "ask" requests — currently queues job for processing.
 * Encryption stub added for Task 2.3.4 (AES-256 at-rest protection)
 */
export async function POST(req: NextRequest) {
  const start = Date.now();

  try {
    const { query, sessionId } = await req.json();

    logger.info(
      { route: "/api/ask", sessionId, query },
      "Ask endpoint invoked",
    );

    // TODO (Task 2.4): push query into Redis/BullMQ job
    const result = { answer: null, status: "queued" };

    // === AES-256 Encryption Test Stub (will secure LLM outputs later) ===
    const secret = process.env.DATA_ENCRYPTION_KEY!;
    const encrypted = encryptField("test-data", secret);
    logger.info({ encrypted }, "AES-256 encryption test successful");

    // ================================================================
    const latency = Date.now() - start;
    logger.info(
      { route: "/api/ask", sessionId, latency, status: result.status },
      "Ask request logged",
    );

    return NextResponse.json(result, { status: 202 });
  } catch (err) {
    logger.error({ route: "/api/ask", err }, "Ask endpoint error");
    return NextResponse.json(
      { ok: false, error: "Malformed request" },
      { status: 400 },
    );
  }
}
