import { NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/logger";

export async function POST(req: NextRequest) {
  const start = Date.now();

  try {
    const { query, sessionId } = await req.json();

    logger.info(
      { route: "/api/ask", sessionId, query },
      "Ask endpoint invoked",
    );

    // TODO: push query into Redis/BullMQ job (Task 2.4)
    const result = { answer: null, status: "queued" };

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
