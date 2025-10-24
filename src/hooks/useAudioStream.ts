"use client";

import { useEffect, useRef, useState } from "react";

/**
 * useAudioStream
 * -----------------------
 * Manages microphone access and provides recorded audio chunks in real time.
 * Integrates with the MicDock component and future backend /api/listen endpoint.
 */

export function useAudioStream() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  async function startStream() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "audio/webm",
      });

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setAudioChunks((prev) => [...prev, event.data]);
        }
      };

      mediaRecorder.start(250); // send small chunks every 250ms
      mediaRecorderRef.current = mediaRecorder;
      setIsRecording(true);
    } catch (error) {
      console.error("🎙️ Error starting audio stream:", error);
    }
  }

  function stopStream() {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
    }
    streamRef.current?.getTracks().forEach((t) => t.stop());
    mediaRecorderRef.current = null;
    streamRef.current = null;
    setIsRecording(false);
  }

  useEffect(() => {
    return () => stopStream(); // cleanup when component unmounts
  }, []);

  return {
    isRecording,
    audioChunks,
    startStream,
    stopStream,
    resetChunks: () => setAudioChunks([]),
  };
}
