import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 60000,
  reporter: [["list"], ["html", { open: "never" }]],
  use: { trace: "on-first-retry", video: "retain-on-failure" },
  projects: [{ name: "chromium", use: devices["Desktop Chrome"] }],
});
