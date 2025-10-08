
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


