import type { NextApiRequest, NextApiResponse } from "next";

/**
 * /api/listen
 * -----------------------
 * Handles POST requests containing base64-encoded audio chunks
 * and returns partial or complete transcript text.
 * Future subtasks will connect this to the Whisper worker queue.
 */

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { audio } = req.body as { audio?: string };
    if (!audio) {
      return res.status(400).json({ error: "Missing audio payload" });
    }

    // Decode base64 audio chunk
    const audioBuffer = Buffer.from(audio, "base64");

    // TODO: Forward this buffer to the ASR worker (Subtask 2.2)
    // For now, respond with placeholder transcript
    const mockTranscript =
      "Transcription processing stub — backend orchestration online.";

    return res.status(200).json({
      transcript: mockTranscript,
      bytesReceived: audioBuffer.length,
      status: "OK",
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("Error in /api/listen:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
