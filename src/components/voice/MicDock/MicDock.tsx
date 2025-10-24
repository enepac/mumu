"use client";

import { useState, useEffect, useRef } from "react";

interface MicDockProps {
  onStreamStart?: () => void;
  onStreamStop?: () => void;
}

export default function MicDock({ onStreamStart, onStreamStop }: MicDockProps) {
  const [isListening, setIsListening] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  async function handleToggle() {
    if (!isListening) {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start(250); // small chunks
      setIsListening(true);
      onStreamStart?.();
    } else {
      mediaRecorderRef.current?.stop();
      mediaRecorderRef.current = null;
      setIsListening(false);
      onStreamStop?.();
    }
  }

  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current && isListening) {
        mediaRecorderRef.current.stop();
      }
    };
  }, [isListening]);

  return (
    <div className="flex items-center justify-center p-4">
      <button
        onClick={handleToggle}
        className={`rounded-full px-6 py-3 text-white font-medium shadow-md transition ${
          isListening
            ? "bg-red-500 animate-pulse"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {isListening ? "Stop Listening" : "Start Listening"}
      </button>
    </div>
  );
}
