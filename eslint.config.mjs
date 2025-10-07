// ────────────────────────────────────────────────
// ESLint Flat Config — Mumu Covenant Final v0.1.9
// Task 1.5 → Subtask 1.2 (Sentry + LogRocket Integration)
// ────────────────────────────────────────────────

import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import prettierConfig from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";

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
        // ✅ Node globals
        process: "readonly",
        console: "readonly",
        module: "readonly",
        require: "readonly",
        __dirname: "readonly",
        exports: "readonly",

        // ✅ Browser & React
        window: "readonly",
        document: "readonly",
        React: "readonly",

        // ✅ Jest globals
        describe: "readonly",
        it: "readonly",
        test: "readonly",
        expect: "readonly",
        beforeAll: "readonly",
        afterAll: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
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
      "jest.config.ts",
      "next.config.ts",
      "next.config.mjs",
      "sentry.*.config.ts",
      "playwright.config.ts",
    ],
    languageOptions: {
      globals: {
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
