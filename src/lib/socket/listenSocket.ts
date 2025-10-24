"use client";

/**
 * listenSocket
 * -----------------------
 * WebSocket client for /api/listen.
 * Streams audio Blobs and receives live transcript messages.
 */

/* eslint-disable no-unused-vars */

export type TranscriptCallback = (value: string) => void;

interface ListenSocketOptions {
  onTranscript?: TranscriptCallback;
  onOpen?: () => void;
  onClose?: () => void;
  onError?: (event: Event) => void;
}

export function createListenSocket(options: ListenSocketOptions = {}) {
  const { onTranscript, onOpen, onClose, onError } = options;

  const socket = new WebSocket(
    `${
      process.env.NEXT_PUBLIC_WS_URL ??
      window.location.origin.replace(/^http/, "ws")
    }/api/listen`,
  );

  socket.addEventListener("open", () => onOpen?.());
  socket.addEventListener("close", () => onClose?.());
  socket.addEventListener("error", (event) => onError?.(event));

  socket.addEventListener("message", (e) => {
    try {
      const data = JSON.parse(e.data);
      if (typeof data.transcript === "string") {
        onTranscript?.(data.transcript);
      }
    } catch (err) {
      console.warn("WS message parse error:", err);
    }
  });

  async function sendAudioChunk(blob: Blob) {
    if (socket.readyState === WebSocket.OPEN) {
      const arrayBuffer = await blob.arrayBuffer();
      const base64Data = btoa(
        String.fromCharCode(...new Uint8Array(arrayBuffer)),
      );
      socket.send(JSON.stringify({ audio: base64Data }));
    }
  }

  function close() {
    if (
      socket.readyState === WebSocket.OPEN ||
      socket.readyState === WebSocket.CONNECTING
    ) {
      socket.close();
    }
  }

  return {
    socket,
    sendAudioChunk,
    close,
  };
}
