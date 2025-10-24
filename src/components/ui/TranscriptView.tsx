"use client";

import { useEffect, useRef } from "react";

interface TranscriptViewProps {
  transcript: string[];
}

/**
 * TranscriptView
 * -----------------------
 * Displays the running transcription in real time.
 * Smoothly scrolls to the latest entry and maintains
 * a minimal, distraction-free interface for stealth use.
 */

export default function TranscriptView({ transcript }: TranscriptViewProps) {
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [transcript]);

  return (
    <div className="w-full h-64 overflow-y-auto rounded-xl border border-gray-200 bg-white/60 backdrop-blur-md p-4 shadow-sm text-gray-900 text-sm leading-relaxed">
      {transcript.length === 0 && (
        <p className="text-gray-400 italic">Waiting for speech input...</p>
      )}
      {transcript.map((line, index) => (
        <p key={index} className="whitespace-pre-wrap">
          {line}
        </p>
      ))}
      <div ref={endRef} />
    </div>
  );
}
