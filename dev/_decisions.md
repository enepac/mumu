
---

## 📗 `dev/_decisions.md`

```markdown
# Decision Log

---

## Decision 1 — Establish Covenant & Atomic Commit Protocol
**Date:** 2025-09-28  
**Scope:** Repository governance  
**Outcome:** Covenant directives approved; GPT assumes lead architect/enforcer role.  
**Artifacts:** `MUMU_COVENANT_ENFORCEMENT_INSTRUCTION.pdf`

---

## Decision 2 — Initialize Tech Stack and Repository
**Date:** 2025-09-29  
**Scope:** Frontend / Backend stack  
**Decision:** Use Next.js 15 (Tailwind + shadcn/ui), Express + TypeScript backend, Supabase + Fly.io deployment.  
**Rationale:** Maintain big-tech-grade full-stack parity.  

---

## Decision 3 — Supabase Integration & Schema Setup
**Date:** 2025-10-02  
**Scope:** Database connectivity  
**Outcome:** Supabase schema and API key integration complete; test endpoint confirmed functional.

---

## Decision 4 — CI/CD Pipeline Establishment
**Date:** 2025-10-03  
**Scope:** Continuous Integration / Delivery  
**Outcome:** `.github/workflows/ci.yml` operational; enforced build-lint-typecheck-deploy sequence.

---

## Decision 5 — Backend Deployment to Fly.io
**Date:** 2025-10-04 AM  
**Scope:** Infrastructure Deployment  
**Outcome:** `mumu` backend running on Fly.io; verified with health checks and API responses.  
**Environment:** SJC region; 1 GB shared CPU instance.  

---

## Decision 6 — Observability & Guardrails Augmentation
**Date:** 2025-10-04 PM  
**Scope:** Monitoring, Logging, Error Handling  
**Decision:** Integrate `@sentry/node`, `@sentry/profiling-node`, `pino`, and `pino-pretty`.  
**Rationale:** Establish error visibility and maintain covenant-level traceability.  
**Outcome:** Baseline v0.1.4 created; verified stable on Fly.io; prepared for telemetry expansion.


## Decision: Immutable Baseline v0.1
- Baseline v0.1 tagged after completion of Task 1.1 (Tech Stack & Repo Initialization).
- Rollback drill executed and validated.
- Covenant: all future baselines must be rollback-tested before acceptance.
- Immutable principle adopted: no force-push or history rewrite allowed on baseline tags.

### [DL-0009] Immutable Baseline v0.2 — Backend + CI/CD Alignment
**Context:** Backend deployment validated on Fly.io, CI pipeline integrated.  
**Scope:** Tasks 1.1–2.6 complete.  
**Action:** Baseline sealed under Covenant Rule II (Immutable Baselines).  
**Rollback Point:** `git reset --hard baseline/v0.2`

## Decision: Establish v0.1.4 Augmentative Baseline (Observability + Guardrails)
**Date:** 2025-10-04  
**Type:** Baseline Augmentation  
**Scope:** Backend (Fly.io), Observability, Logging  
**Status:** ✅ Completed and merged into enhancement branch.

### Context
After completing Fly.io backend deployment and Supabase linkage, the next step was to introduce observability and operational visibility without destabilizing the current baseline.

### Decision
Integrate:
- `@sentry/node` + `@sentry/profiling-node` for structured error tracking.
- `pino` for runtime logging.
- Strengthened backend error boundaries via middleware.
- Maintained build and deployment parity across local → Fly.io pipeline.

### Rationale
To achieve **Part 1.5 covenant goal (observability & documentation)** and ensure production-grade visibility early in development.

### Outcome
- ✅ Successfully deployed and verified Sentry instrumentation.
- ✅ Logs confirmed on both local and Fly.io.
- ✅ Baseline documented and frozen under v0.1.4.

## [Decision v0.1.5] Jest + Playwright Testing Framework Adopted
**Context:**  
Part 1 → Task 1.4 required establishing automated testing guardrails before observability setup.  
Jest 30 and Playwright 1.56 were selected for stability and integration within Vercel + Codespaces.  

**Decision:**  
- Adopt Jest ( `ts-jest` preset ) for unit and integration tests.  
- Isolate E2E tests to Playwright, executed via `pnpm exec playwright test`.  
- Enable coverage reports (`text`, `lcov`, `html`) under `/coverage/`.  
- Configure Babel presets for React JSX and TypeScript support.  
- Relax coverage threshold (0 %) temporarily until QA Phase 6.  

**Rationale:**  
This configuration fulfills Covenant Guardrails by providing direct-to-production validation and observability foundation without blocking early baselines on coverage percentages.

**Approved By:** GPT Lead Engineer (Autonomous Brain)  
**Validated By:** Executor (suberu)

## [Decision v0.1.6] Supply-Chain Guardrails Activated
**Why:** To comply with Covenant directive for continuous vulnerability scanning and automated dependency hygiene.  
**Impact:** Dependabot handles upgrades; CodeQL runs weekly and on PRs to detect security issues.  
**Approved By:** GPT Lead Engineer | Validated By:** suberu**

## [Decision v0.1.8] Adopt Pino Structured Logger for Unified Telemetry
**Context:**  
To establish foundational structured logging before introducing error tracking and session telemetry.

**Decision:**  
- Use `pino` for JSON structured logs with `pino-pretty` in non-production environments.  
- Set `LOG_LEVEL` env variable to control verbosity.  
- Integrate this logger across API and client components for consistency.

**Rationale:**  
Pino provides high-throughput structured logging compatible with Sentry and LogRocket contexts.

**Approved By:** GPT Lead Engineer  
**Validated By:** suberu  
**Baseline:** v0.1.8

# 📘 Mumu — Decision Log

> Version 1.0 · Maintained under Covenant Strict Mode  
> Each decision entry is timestamped, scoped, and immutable once baselined.

---

## 🧭 Structure
| Field | Description |
|--------|--------------|
| **ID** | Sequential decision identifier (e.g., DL-001) |
| **Scope** | Task / Subtask context |
| **Rationale** | Why this decision was made |
| **Impact** | What system or process it affects |
| **Status** | `Accepted · Deferred · Superseded · Rejected` |

---

### DL-001 — Adopt Covenant Strict Mode
**Scope:** Foundational Governance  
**Rationale:** Guarantee deterministic AI-guided development and atomic baselines.  
**Impact:** All future sessions, tasks, and commits must follow the Covenant hierarchy.  
**Status:** ✅ Accepted  

---

### DL-002 — Adopt ESLint 9 Flat Config System  
**Scope:** Task 1.5 → Subtask 1.2  
**Rationale:** Modern Next.js 15 + TypeScript projects require flat configuration for performance and plugin isolation.  
**Impact:** Standardized linting across browser and Node contexts.  
**Status:** ✅ Accepted  

---

### DL-003 — Integrate Pino as Primary Structured Logger  
**Scope:** Task 1.5 → Subtask 1.1  
**Rationale:** Provide JSON-structured logs for observability pipelines and error replay.  
**Impact:** Improves telemetry fidelity for Sentry and LogRocket.  
**Status:** ✅ Accepted  

---

> *Further decisions will be appended sequentially under each validated baseline.*

## [Decision] Task 2.1 — Subtask 1 (API Orchestration Layer & Observability Baseline)
**Decision Date:** 2025-10-07  
**Tag:** baseline/backend-v0.2.1  
**Responsible:** GPT (Lead Engineer) / Suberu (Executor)

### Decision Summary
To maintain compatibility with Sentry v10.18 and Next.js 15, the `next.config.mjs` file was converted to CommonJS (`next.config.cjs`) using `withSentryConfig`.  
Instrumentation was restructured to rely on the stable public API (`@sentry/nextjs`) without direct `hub` or `core` imports.  
Warnings from OpenTelemetry were accepted as benign in observability contexts.

**Validated Outputs**
- Build success (no runtime or type errors)
- Observability trace confirmed
- Structured logging active via Pino + Sentry capture

## [Decision] Task 2.1 — API Orchestration Layer (Vercel)
**Date:** 2025-10-07  
**Branch:** enhancement/v0.2.0-backend-platform  
**Baseline Tag:** baseline/backend-v0.2.1  
**Status:** ✅ Decisions Ratified and Baselined  

---

### 🧩 Decision 1 — TypeScript Module System Alignment
**Context:**  
Node 22 + Next.js 15 ESM incompatibility caused multiple runtime and import errors.  

**Decision:**  
Adopt `ESNext` for build-time module resolution but compile generated outputs using CommonJS for runtime stability.  
All execution commands (`pnpm dev`, `pnpm build`) must rely on Next’s compiler rather than raw Node or ts-node.  

**Impact:**  
Resolved ESM import conflicts and stabilized TS execution environment.  
Codified in `tsconfig.json` (esModuleInterop + moduleResolution: "node").  

---

### ⚙️ Decision 2 — Pino Logger Interop Strategy
**Context:**  
`pino` package exports using CommonJS style (`export = pino`), breaking ES imports.

**Decision:**  
Retain `pino` as logger but enable `"esModuleInterop": true`.  
All logging modules to use TypeScript ES imports; compilation transpiles properly for CJS execution.

**Impact:**  
Standardized structured JSON logging across both frontend (LogRocket) and backend (Pino).

---

### 🧠 Decision 3 — ESLint v9 Migration Policy
**Context:**  
Upgrade to ESLint 9 required rewriting all lint configurations to flat config format.  

**Decision:**  
Adopt `eslint.config.mjs` with full object-based plugin registration.  
Use Prettier as last layer for conflict resolution and formatting normalization.  

**Impact:**  
Achieved full lint compliance under ESLint 9.37.0 and Next 15’s schema.  
All future lint rules must adhere to the flat-config model.

---

### ⚙️ Decision 4 — Sentry Integration Model
**Context:**  
Sentry integration repeatedly failed due to deprecated keys (`sentry:`) and invalid imports.  

**Decision:**  
- Migrate entirely to `@sentry/nextjs` v10.18.0.  
- Remove all references to `@sentry/browser` and `@sentry/tracing`.  
- Initialize via `instrumentation.ts` using `Sentry.init()` with captureConsoleIntegration.  
- Configure through `withSentryConfig()` wrapper in `next.config.cjs`.

**Impact:**  
Eliminated mixed integration layers; ensures parity between server and client instrumentation.

---

### 🧩 Decision 5 — Configuration Syntax Enforcement
**Context:**  
Next.js build failed due to ESM spread syntax conflict inside Sentry wrapper.

**Decision:**  
Convert Next.js configuration file to CommonJS (`next.config.cjs`).  
This standard is now mandated for all plugin integrations until ESM interop matures.

**Impact:**  
Stable build pipeline under both local and CI/CD environments.

---

### ⚙️ Decision 6 — Observability Warning Handling
**Context:**  
OpenTelemetry generated benign dynamic import warnings.

**Decision:**  
Warnings classified as “non-critical observability noise.”  
Documented and excluded from CI/CD fail criteria; only true build errors halt pipeline.

**Impact:**  
Reduced false alarms; improved CI/CD signal-to-noise ratio.

---

### 🪵 Decision 7 — Git Line Ending Normalization
**Context:**  
Windows CRLF → LF conversion warnings appeared on every commit.

**Decision:**  
Maintain repository-wide LF normalization.  
Document developer-side guidance to set `git config core.autocrlf true`.

**Impact:**  
Consistent cross-platform commit hygiene; no functional changes to build artifacts.

---

### ✅ Validation Summary
- All integrations (Sentry, Pino, LogRocket) verified functional under Next 15.5.4.  
- CI/CD pipeline clean (`lint`, `tsc`, `build`, `dev`).  
- Covenant §9 (Atomic Commit) executed successfully with tag `baseline/backend-v0.2.1`.  
- Logs and reflections updated per dual-record mandate.

---

### 📘 Permanent Directives (Carried Forward)
1. All **observability hooks** (Sentry, LogRocket, Pino) must remain centralized; no direct imports outside `src/lib` or `instrumentation.ts`.  
2. **Next config files** must remain in CommonJS until verified stable under Next 16.  
3. Each new integration must define both a reflection (what failed) and a decision (why it remains).  

---

**Result:**  
All engineering, configuration, and integration decisions for Task 2.1 ratified under Covenant enforcement.  
Baseline confirmed at `baseline/backend-v0.2.1`.

## [Decision] Whisper GPU Container Baseline
Context: Task 2.2 → Subtask 2.2.1
Action: Deploy Whisper fallback GPU service with Fly.io autoscaling.
Fixes: Compile TypeScript in-image, add @types dependencies, bind 0.0.0.0:8080.
Rationale: Ensures deterministic GPU container build and observable health.
Baseline Tag: backend-v0.2.2a

Decision Log — Part 2 → Task 2.2 → Subtask 2.2.1 (Whisper GPU Container Development)

1. Decision: Move Fly.io build context to backend-level
   Context: The Fly build repeatedly failed to find backend/shared and src directories because the build context was too narrow.
   Action: Moved fly.whisper.toml to /backend and set build_context = "." so Docker could access all backend files.
   Rationale: Ensures deterministic builds and prevents missing-file errors.
   Impact: Simplified deployment structure and made container builds reproducible across environments.

2. Decision: Bind Express server to 0.0.0.0
   Context: The Fly proxy reported that the app was not listening on the expected address.
   Action: Changed Express app.listen() to include host = "0.0.0.0".
   Rationale: Containers must listen on all interfaces to be accessible externally.
   Impact: Resolved Fly proxy connectivity and allowed /health endpoint access.

3. Decision: Add in-container TypeScript compilation
   Context: The container attempted to run server.js, which did not exist because only TypeScript source files were copied.
   Action: Added "pnpm exec tsc -p backend/tsconfig.json" to the Dockerfile build phase and ran the compiled dist output at runtime.
   Rationale: Containers must compile TS code before execution to avoid runtime module errors.
   Impact: Ensured consistent runtime behavior and reproducible builds.

4. Decision: Expand tsconfig include paths
   Context: The TypeScript compiler returned "No inputs were found" because it excluded the containers and shared folders.
   Action: Updated tsconfig.json includes to ["index.ts", "src/**/*.ts", "containers/**/*.ts", "shared/**/*.ts"].
   Rationale: Include all relevant directories to guarantee a complete backend build.
   Impact: Resolved compiler errors and produced a complete build output.

5. Decision: Install type declarations for build-time validation
   Context: The TypeScript compiler failed due to missing @types packages for Node, Express, and CORS.
   Action: Installed @types/node, @types/express, and @types/cors before running tsc in Docker.
   Rationale: Type declarations are required for successful compilation in TypeScript builds.
   Impact: Eliminated all type errors and enabled a successful in-container build.

6. Decision: Confirm baseline after successful /health response
   Context: After applying all fixes, the Whisper GPU container built and deployed correctly.
   Action: Validated external access via curl and confirmed JSON health response.
   Rationale: Covenant requires observable health before baseline tagging.
   Impact: Whisper GPU container validated as backend-v0.2.2a baseline.

Key Architectural Outcome:
The backend’s GPU container build pipeline is now fully deterministic, self-contained, and compliant with Covenant Atomic Commit and Direct-to-Production standards. The lessons learned here define the canonical pattern for future container deployments.

### Decision — Subtask 2.2.2b  
- **Issue:** Runtime crash due to ES module vs CommonJS mismatch and Fastify logger misconfiguration.  
- **Decision:** Standardize orchestrator runtime to CommonJS; use Fastify’s built-in logger configuration (no manual pino instance).  
- **Outcome:** Successful Fly.io deployment with healthy `/health` and `/metrics` routes.

### Decision — Subtask 2.2.2b (Fly.io LLM Orchestrator Container)

**Context**
Subtask executed under Part 2 → Task 2.2 (Heavy Processing Containers).  
Objective: deploy `mumu-orchestrator` Fly.io container for multi-step LLM pipeline orchestration (Draft → Refine → Fallback).

---

**Key Decisions & Outcomes**

1. **Docker Build Context Alignment**
   - Moved away from relative parent context (`../../`) to local project root copy.  
   - Outcome: prevented build cache checksum failures (`package.json not found`).

2. **TypeScript Compilation Discipline**
   - Added `tsconfig.json` within container directory to isolate build environment.  
   - Included `@types/node` installation in Dockerfile for build-time consistency.

3. **Runtime Module Strategy**
   - Reverted to CommonJS runtime for Fly.io compatibility.  
   - Eliminated `exports is not defined in ES module scope` error.

4. **Fastify Logger Configuration**
   - Replaced explicit Pino instance with inline logger configuration object.  
   - Resulted in clean startup: server bound to `0.0.0.0:8080`.

5. **Validation**
   - Health check returned `status: ok`.  
   - Machine ID `91850e41f77e38` verified stable.  
   - Response metrics confirm process memory telemetry within safe limits (< 70 MB RSS).

---

**Final Decision**
The Orchestrator container build is validated and baseline-tagged as:
`baseline/backend-v0.2.2b`.

All lessons integrated into Decision Log v3 for future Fly.io deployments.

Decision Entry — D-2.3-B001 (Branch Transition Approval)

Scope: Part 2 → Task 2.3 Persistence & Security (Supabase/Postgres)
Type: Governance / Workflow
Decision Date: 2025-10-09
Responsible: GPT-5 (Covenant Executor) + suberu (Executor)

Decision:
Create a dedicated branch enhancement/v0.2.3-persistence-security for Task 2.3 to preserve baseline isolation and uphold atomic-commit discipline.

Rationale:
Following Covenant Directives §2 – Trunk-Based Development + Immutable Baselines, every new validated task must start on a fresh short-lived branch.
This ensures rollback reproducibility and prevents cross-task contamination of state.

Impact:

Enables clear lineage: backend-v0.2.2.3 → backend-v0.2.3

Reinforces automatic branch-transition reminders in the Covenant Manifest.

Ensures that Task 2.3 commits, logs, and baselines are auditable and isolated.

Status: ✅ Approved · Implemented · Logged

@@ -999,6 +1000,33 @@
+## [Decision D-2.3-B001] Branch Transition — Task 2.3 Initialization  
+**Date:** 2025-10-09  
+**Scope:** Part 2 → Task 2.3 Persistence & Security (Supabase / Postgres)  
+**Responsible:** GPT-5 (Covenant Executor) + suberu (Executor)  
+
+**Decision:**  
+Create a dedicated enhancement branch `enhancement/v0.2.3-persistence-security` to host all Task 2.3 development activities (schema, RLS, AES-256, snapshots).  
+This preserves atomic isolation and ensures rollback safety between validated baselines.  
+
+**Rationale:**  
+Per *Covenant Directive §2 — Trunk-Based + Immutable Baselines*, every validated task requires a fresh enhancement branch for subsequent work.  
+This enables auditable progression (`backend-v0.2.2.3 → backend-v0.2.3`) and avoids cross-task state contamination.  
+
+**Impact:**  
+- Guarantees clear baseline lineage for backend evolution.  
+- Activates Automatic Branch Transition Reminder Protocol for future tasks.  
+- Improves traceability within Covenant Update Protocol flight records.  
+
+**Status:** ✅ Approved · Implemented · Logged  
+
+**Next Step:** Proceed to Phase 0 (Supabase Credential Validation & Project Provision).  

## Decision D-2.3-P0 — Environment Provision Validation Gate
**Date:** 2025-10-09  
**Scope:** Part 2 → Task 2.3 (Persistence & Security)  
**Context:** Verified Doppler integration and Supabase secret resolution pipeline.  
**Decision:** Accept Phase 0 as validated; environment variables are managed securely through Doppler with local fallback `.env.local`.  
**Impact:** Enables safe provisioning of Supabase schemas in Subtask 2.3.1.  
**Status:** ✅ Approved · Logged · Covenant Update Protocol executed.

## Decision D-2.3.1 — Supabase Project Linkage & Provisioning
**Date:** 2025-10-09  
**Scope:** Task 2.3 → Subtask 2.3.1  
**Decision:** Establish explicit local link to Supabase project (`gjrxxiblykxtgmfwnjbp`) using `.supabase/config.toml`. Confirmed remote database access and schema sync capability.  
**Rationale:** Ensures deterministic database management and reproducible migrations without reliance on global CLI state.  
**Impact:** Backend environment now has secure, versioned database connection for future RLS and encryption work.  
**Status:** ✅ Approved · Logged · Baseline backend-v0.2.3-a created.

## Decision D-2.3.2 — Core Schema Structure Approval
**Date:** 2025-10-10  
**Scope:** Part 2 → Task 2.3 → Subtask 2.3.2  

**Decision:**  
Finalize normalized workspace-centric schema with foreign key bindings and vector embedding fields for LLM and audio pipelines.  
Confirm remote Supabase schema synced and version-controlled via local `backend/db/schema.sql`.  

**Rationale:**  
Ensures secure, consistent, and reproducible data layer for orchestration and analysis tasks while maintaining workspace isolation.  

**Impact:**  
Schema validated against remote DB → baseline stability for upcoming RLS and encryption work.  

**Status:** ✅ Approved · Logged · Baseline `backend-v0.2.3-b` created.

## Decision D-2.3.3 — Row-Level Security Activation (Final)
**Date:** 2025-10-10  
**Scope:** Part 2 → Task 2.3 → Subtask 2.3.3  
**Decision:** Enforce Row-Level Security for all workspace-linked tables using direct SQL enforcement to guarantee active protection.  
**Rationale:** Ensures isolation and prevents data leakage between user workspaces.  
**Impact:** Backend persistence layer now compliant with Covenant data isolation standards.  
**Status:** ✅ Approved · Logged · Baseline backend-v0.2.3-c created.

## Decision D-2.3.4 — AES-256 Encryption Migration to Application Layer
**Date:** 2025-10-10  
**Scope:** Part 2 → Task 2.3 → Subtask 2.3.4  
**Decision:** Migrate AES-256 encryption from database-level pgcrypto to application-level (Node.js AES-256-GCM) due to Supabase role constraints.  
**Rationale:** Prevent migration-level function errors; ensure consistent encryption using controlled key rotation via Doppler.  
**Impact:** Secure data-at-rest model verified; Supabase schema simplified.  
**Status:** ✅ Approved and baselined under backend-v0.2.3-d.

### Decision D-2.3.4-R1 — AES-256 Encryption Integrity Re-Validation
**Date:** 2025-10-11 T06:42Z  
**Executor:** GPT-5 under Covenant Strict Mode  
**Scope:** Subtask 2.3.4 — AES-256 Encryption (Sensitive Columns)  

**Decision Summary:**  
Encryption system verified intact after repository recovery. No functional degradation detected.  
`backend/utils/encryption.ts` and related imports remain baseline-accurate.  
Decryption validation via `/api/encryption-test` confirms round-trip correctness.

**Directive:**  
- Maintain current AES-256-GCM implementation.  
- Mark `backend/utils/encryption.ts` as a protected cryptographic module (no modification without formal Covenant review).  
- Schedule telemetry-layer isolation audit under Task 2.6 (Observability & Logging).  
- Reinstate baseline tag `baseline/backend-v0.2.3-d.recovery` to record post-verification stability.

**Status:** ✅ Validated — Encryption layer integrity restored and baseline ready for continuation of Task 2.3.5.


