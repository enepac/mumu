// ────────────────────────────────────────────────
// ESLint Flat Config — Mumu Covenant Final v0.1.10
// Fix: Add Node + ES2022 globals (setTimeout, clearTimeout, etc.)
// Task 2.2 → Subtask 2.2.2b (LLM Orchestrator Container)
// ────────────────────────────────────────────────

import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import prettierConfig from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";
import globals from "globals"; // ✅ Added — brings in Node & browser built-ins

const compat = new FlatCompat({ baseDirectory: import.meta.dirname });

export default [
  // --- Global ignores (build + cache outputs)
  {
    ignores: [
      ".next/**",
      "coverage/**",
      "dist/**",
      "backend/dist/**",
      "node_modules/**",
    ],
  },

  // --- Base ESLint + Next.js recommended rules
  js.configs.recommended,
  ...compat.extends("plugin:@next/next/core-web-vitals"),

  // --- Core project context (TS + JSX + Universal env)
  {
    files: ["**/*.{js,jsx,ts,tsx}"],

    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "./tsconfig.eslint.json",
        ecmaFeatures: { jsx: true },
      },
      globals: {
        // ✅ Merge in Node + browser + ES2022 globals automatically
        ...globals.node,
        ...globals.browser,
        ...globals.es2022,

        // ✅ Jest testing globals
        ...globals.jest,
        React: "readonly",
      },
    },

    plugins: {
      "@typescript-eslint": tseslint,
      prettier: prettierPlugin,
    },

    rules: {
      "@typescript-eslint/no-require-imports": "error",
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "no-console": "off",
      "prettier/prettier": ["error"],
    },
  },

  // --- Node-based configs (Backend, Test Runners, Observability) ---
  {
    files: [
      "backend/**/*.{ts,js}",
      "backend/containers/**/*.{ts,js}", // ✅ Added to include orchestrator & whisper containers
      "jest.config.ts",
      "next.config.ts",
      "next.config.mjs",
      "next.config.cjs",
      "sentry.*.config.ts",
      "playwright.config.ts",
    ],
    languageOptions: {
      globals: {
        ...globals.node,
        process: "readonly",
        console: "readonly",
        module: "readonly",
        require: "readonly",
        __dirname: "readonly",
      },
    },
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",
    },
  },

  // --- Prettier compatibility last
  prettierConfig,
];
