/**
 * createBuffer.ts
 * -----------------------
 * Lightweight in-memory buffer for streamed audio chunks.
 */

export interface AudioChunk {
  id: string;
  data: Buffer;
  receivedAt: number;
}

export interface ChunkBuffer {
  push(chunk: AudioChunk): void;
  flush(): Buffer;
  reset(): void;
  size(): number;
  count(): number;
}

/**
 * Factory function that creates a bounded buffer.
 */
export function createBuffer(maxBytes = 2_000_000): ChunkBuffer {
  let chunks: AudioChunk[] = [];
  let totalBytes = 0;

  function push(chunk: AudioChunk) {
    chunks.push(chunk);
    totalBytes += chunk.data.length;
  }

  function flush(): Buffer {
    const combined = Buffer.concat(chunks.map((c) => c.data));
    reset();
    return combined;
  }

  function reset() {
    chunks = [];
    totalBytes = 0;
  }

  function size() {
    return totalBytes;
  }

  function count() {
    return chunks.length;
  }

  return { push, flush, reset, size, count };
}
