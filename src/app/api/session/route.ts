// src/app/api/session/route.ts
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { logger } from "@/lib/logger";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const sessionId = crypto.randomUUID();

    logger.info(
      { route: "/api/session", sessionId, data },
      "Session orchestration received",
    );

    // TODO: enqueue to Redis queue (Task 2.4)
    return NextResponse.json(
      { ok: true, sessionId, received: true },
      { status: 202 },
    );
  } catch (err) {
    logger.error(
      { route: "/api/session", err },
      "Session orchestration failed",
    );
    return NextResponse.json(
      { ok: false, error: "Invalid session payload" },
      { status: 400 },
    );
  }
}
