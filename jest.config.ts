import type { Config } from "jest";

/**
 * Mumu Jest Configuration
 * -------------------------------------------------------
 * • Supports both unit + integration tests across frontend and backend
 * • Includes /src, /tests/unit, and /backend/tests directories
 * • Collects coverage from both lib and backend logic
 * • Enforces Covenant 0-error compliance and reproducible reporting
 * • Uses ts-jest with Babel transforms for TSX + Node targets
 */

const config: Config = {
  // --- Core Preset & Environment ---
  preset: "ts-jest",
  testEnvironment: "node",

  // --- File Discovery ---
  roots: [
    "<rootDir>/src",
    "<rootDir>/tests/unit",
    "<rootDir>/backend/tests", // ✅ Added: include backend integration tests
  ],
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
    "backend/tests/**/*.{ts,tsx}", // ✅ Added: collect coverage from backend tests
    "src/lib/**/*.{ts,tsx}", // keep library coverage
    "backend/lib/**/*.{ts,tsx}", // ✅ Added: backend orchestration libraries
    "backend/workers/**/*.{ts,tsx}",
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
  moduleDirectories: ["node_modules", "src", "backend"],

  // --- Test Setup (optional global mocks/init) ---
  setupFilesAfterEnv: [],

  // --- Reporting ---
  reporters: ["default"],

  // --- Watch Plugins (for IDE integration) ---
  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname",
  ],
  // --- Handle cleanup ---
  detectOpenHandles: false,
  forceExit: true,
};

export default config;
