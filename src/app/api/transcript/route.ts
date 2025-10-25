import { NextResponse, type NextRequest } from "next/server";
import {
  storeTranscriptSegment,
  fetchTranscriptHistory,
} from "../../../../backend/lib/supabase/transcriptSync";

/**
 * API Route: /api/transcript
 * Handles transcript storage (POST) and retrieval (GET)
 * Validated under Covenant Strict Mode — PSC Active
 */

export async function POST(req: NextRequest) {
  try {
    const { sessionId, text, speaker, timestamp } = await req.json();
    const data = await storeTranscriptSegment(
      sessionId,
      text,
      speaker,
      timestamp,
    );
    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    console.error("Transcript API POST Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("sessionId");
    if (!sessionId)
      return NextResponse.json({ error: "Missing sessionId" }, { status: 400 });
    const data = await fetchTranscriptHistory(sessionId);
    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    console.error("Transcript API GET Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
