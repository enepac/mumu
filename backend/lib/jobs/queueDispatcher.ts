/**
 * queueDispatcher.ts
 * -----------------------
 * Sends buffered audio data to the ASR worker queue via BullMQ.
 */

import { Queue } from "bullmq";
import IORedis from "ioredis";

export interface DispatchJob {
  id: string;
  buffer: Buffer;
  receivedAt: number;
}

function createQueue(): Queue<DispatchJob> {
  const connectionOpts = process.env.REDIS_URL ?? {
    host: process.env.REDIS_HOST ?? "127.0.0.1",
    port: Number(process.env.REDIS_PORT ?? 6379),
    password: process.env.REDIS_PASSWORD ?? undefined,
    maxRetriesPerRequest: null, // ✅ Required by BullMQ ≥5
  };

  return new Queue<DispatchJob>("asr_queue", {
    connection:
      typeof connectionOpts === "string"
        ? new IORedis(connectionOpts, { maxRetriesPerRequest: null })
        : new IORedis(connectionOpts),
  });
}

export async function dispatchToQueue(job: DispatchJob): Promise<string> {
  const queue = createQueue();
  const jobId = job.id ?? `job-${Date.now()}`;

  await queue.add("asr_task", job, {
    jobId,
    attempts: 3,
    removeOnComplete: true,
    removeOnFail: false,
  });

  if (process.env.NODE_ENV === "development") {
    console.debug(
      `📦  ASR job dispatched → ${jobId} (${job.buffer.length} bytes)`,
    );
  }

  return jobId;
}
