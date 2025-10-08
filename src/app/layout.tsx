import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { useEffect } from "react";

// ─── Observability Imports ──────────────────────
import { initLogRocket } from "@/lib/logrocket";
import "@/sentry.client.config";
import { logger } from "@/lib/logger";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mumu Observability Stack",
  description: "Next.js + Pino + Sentry + LogRocket integration baseline.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  useEffect(() => {
    initLogRocket();
    logger.info("🌐 LogRocket initialized within RootLayout");
  }, []);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
