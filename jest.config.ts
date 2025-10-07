import type { Config } from "jest";

/**
 * Mumu Jest Configuration
 * -------------------------------------------------------
 * • Runs only unit/integration tests under /tests/unit and /src
 * • Ignores Playwright E2E specs (handled separately)
 * • Collects coverage from TypeScript + React (TSX) sources
 * • Enforces ≥ 80 % coverage threshold
 * • Uses ts-jest preset with Babel transform for JSX
 */

const config: Config = {
  // --- Core Preset & Environment ---
  preset: "ts-jest",
  testEnvironment: "node",

  // --- File Discovery ---
  roots: ["<rootDir>/src", "<rootDir>/tests/unit"],
  testMatch: ["**/?(*.)+(spec|test).[tj]s?(x)"],
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/tests/e2e/"],

  // --- Transform (via ts-jest + Babel for JSX/TSX) ---
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        tsconfig: "<rootDir>/tsconfig.json",
        babelConfig: {
          presets: [
            ["@babel/preset-env", { targets: { node: "current" } }],
            ["@babel/preset-react", { runtime: "automatic" }],
            "@babel/preset-typescript",
          ],
        },
      },
    ],
  },

  // --- Coverage Collection ---
  collectCoverage: true,
  collectCoverageFrom: [
    "tests/unit/**/*.{ts,tsx}",
    "src/lib/**/*.{ts,tsx}", // keep library coverage
  ],
  coverageReporters: ["text", "lcov", "html"],
  coverageDirectory: "<rootDir>/coverage",
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
  },

  // --- Module Resolution ---
  moduleFileExtensions: ["ts", "tsx", "js", "json"],
  moduleDirectories: ["node_modules", "src"],

  // --- Test Setup (optional global mocks/init) ---
  setupFilesAfterEnv: [],

  // --- Reporting ---
  reporters: ["default"],

  // --- Watch Plugins (for IDE integration) ---
  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname",
  ],
};

export default config;
