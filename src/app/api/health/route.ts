import { NextResponse } from "next/server";
import { logger } from "@/lib/logger";

export async function GET() {
  const payload = {
    ok: true,
    service: "mumu-backend",
    timestamp: new Date().toISOString(),
  };

  logger.info({ route: "/api/health", ...payload }, "Health check hit");
  return NextResponse.json(payload, { status: 200 });
}
