// ────────────────────────────────────────────────
// src/app/layout.tsx
// Mumu — RootLayout (Next.js 15 / App Router)
// Task 2.1 — API Orchestration Layer (Observability Ready)
// ────────────────────────────────────────────────

// This file is a Server Component by default.
// Do NOT import useEffect or any client-only APIs here.

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// ─── Metadata ─────────────────────────────────────
export const metadata: Metadata = {
  title: "Mumu",
  description: "Audio Intelligence Platform",
};

// ─── Fonts ────────────────────────────────────────
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ─── Layout ───────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* 
          Client-side observability (LogRocket, etc.)
          is initialized via src/app/observability-provider.tsx 
          to keep this component server-safe.
        */}
        {children}
      </body>
    </html>
  );
}
