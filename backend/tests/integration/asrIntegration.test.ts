/**
 * @jest-environment node
 * @jest-environment-options {"detectOpenHandles": false, "forceExit": true}
 */

/**
 * asrIntegration.test.ts
 * --------------------------------------------------------
 * End-to-End verification:
 * /api/listen → createBuffer → queueDispatcher → whisperWorker
 * Ensures all async Redis + BullMQ handles close cleanly.
 */

import { createBuffer } from "../../lib/buffer/createBuffer";
import { dispatchToQueue } from "../../lib/jobs/queueDispatcher";
import { worker } from "../../workers/asr/whisperWorker";
import { Queue } from "bullmq";
import IORedis from "ioredis";

jest.setTimeout(20_000);

describe("🧠  End-to-End ASR Orchestration", () => {
  const mockAudio = Buffer.from("MockAudioData");
  const buffer = createBuffer(50_000);
  let queue: Queue;

  beforeAll(async () => {
    // --- Establish queue connection ---
    queue = new Queue("asr_queue", {
      connection: new IORedis({
        host: process.env.REDIS_HOST ?? "127.0.0.1",
        port: Number(process.env.REDIS_PORT ?? 6379),
        maxRetriesPerRequest: null,
      }),
    });

    // Wait for worker to subscribe before enqueue
    await new Promise((r) => setTimeout(r, 500));
  });

  afterAll(async () => {
    // --- Graceful shutdown of all Redis connections ---
    try {
      await queue.drain(true);
      await queue.close();
    } catch (err) {
      console.warn("⚠️ Queue close warning:", err);
    }

    try {
      await worker.close();
    } catch (err) {
      console.warn("⚠️ Worker close warning:", err);
    }

    // ✅ Explicitly disconnect all underlying ioredis clients
    const workerConn = (worker as any).connection;
    if (workerConn && typeof workerConn.disconnect === "function") {
      await workerConn.disconnect();
    }

    const queueConn = (queue as any).client;
    if (queueConn && typeof queueConn.disconnect === "function") {
      await queueConn.disconnect();
    }

    // Small delay for BullMQ event cleanup before Jest exit
    await new Promise((r) => setTimeout(r, 300));
  });

  it("should push, flush, dispatch, and process an audio job", async () => {
    // Step 1 – simulate chunk reception
    buffer.push({ id: "chunk-1", data: mockAudio, receivedAt: Date.now() });
    expect(buffer.count()).toBe(1);

    // Step 2 – flush buffer contents
    const flushed = buffer.flush();
    expect(Buffer.isBuffer(flushed)).toBe(true);

    // Step 3 – dispatch buffer to queue
    const jobId = await dispatchToQueue({
      id: "integration-job-1",
      buffer: flushed,
      receivedAt: Date.now(),
    });
    expect(typeof jobId).toBe("string");

    // Step 4 – wait for worker to emit completion
    const result: string = await new Promise((resolve, reject) => {
      const timeout = setTimeout(
        () => reject(new Error("Timeout waiting for job completion")),
        15_000,
      );

      worker.on("completed", (job, value) => {
        if (job.id === jobId) {
          clearTimeout(timeout);
          resolve(value as string);
        }
      });
    });

    // Step 5 – verify ASR transcription content
    expect(result).toContain("Transcribed text for job");
  });
});
