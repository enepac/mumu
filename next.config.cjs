/* eslint-env node */
/* eslint-disable no-undef */

// ────────────────────────────────────────────────
// Next.js Config (CommonJS Bridge for Sentry)
// Compatible with Next.js 15 & Sentry 10.x
// ────────────────────────────────────────────────

const { withSentryConfig } = require("@sentry/nextjs");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    clientTraceMetadata: true,
  },
};

// ✅ Sentry Webpack Plugin Options
const sentryOptions = {
  silent: true,
  org: process.env.SENTRY_ORG || "enepac",
  project: process.env.SENTRY_PROJECT || "mumu",
};

module.exports = withSentryConfig(nextConfig, sentryOptions);
