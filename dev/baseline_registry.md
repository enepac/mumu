# MUMU BASELINE REGISTRY
# Chronological Ledger of Validated States

---

## PART 1 — FOUNDATIONS
- baseline/v0.1.1 — Foundations — 2025-09-28  
  Established Covenant Strict Mode, initial Next.js + Supabase integration.

## PART 1.1 — GUARDRAILS & OBSERVABILITY
- baseline/v0.1.4 — Environment Guardrails — 2025-10-03  
  Added CI/CD, Sentry, and structured logging.

## PART 1.2 — SECURITY & DOCUMENTATION
- baseline/v0.1.12 — Security and Documentation — 2025-10-05  
  Integrated CodeQL, Dependabot, and finalized Covenant docs.

## PART 2 — BACKEND PLATFORM
- baseline/backend-v0.2.1 — API Orchestration Layer — 2025-10-07  
  Vercel API endpoints (`/api/session`, `/api/ask`, `/api/health`) validated.

- baseline/backend-v0.2.2a — Whisper GPU Container — 2025-10-09  
  Fly.io deployment with CUDA 12.1.1, TypeScript build, and health endpoint verified.

---

## REGISTRY MANAGEMENT
This registry is immutable once a baseline is tagged.  
Edits are allowed only for new baseline entries, each appended with:
- Date of validation  
- Scope description  
- Validation confirmation line from Covenant logs.

---
#### Baseline v0.2.2b — Backend Orchestrator (Fly.io)
- **Container:** mumu-orchestrator  
- **Platform:** Fly.io GPU (A10)  
- **Build Image:** Node 22-slim  
- **Image Size:** 84 MB  
- **Environment:** production (bound to 0.0.0.0:8080)  
- **Endpoints:** `/health`, `/metrics`, `/orchestrate`  
- **Health Status:** OK  
- **Uptime:** 0.615 s (initial response)  
- **Hostname:** `91850e41f77e38`  
- **Validation Date:** October 9 2025  
- **Resolved Issues:**  
  1. Docker path and build context corrections  
  2. TypeScript and Node type missing definitions  
  3. ESM/CommonJS runtime conflict  
  4. Fastify logger configuration error  
- **Outcome:** Successful deployment and runtime validation  
- **Next Step:** Subtask 2.2.3 — Autoscaling & Metrics Integration

## baseline/backend-v0.2.2.3 (2025-10-09)
- Component: Orchestrator (Fastify + Prometheus)
- Platform: Fly.io (Machines)
- Region: sjc
- Image: registry.fly.io/mumu-orchestrator:deployment-01K75PDX45AG57WEFENRM41K31
- Image Size: 77 MB
- Runtime: Node v22.20.0 (remote)
- Machines: 2 × shared-cpu-1x, 256MB (autoscaling; autostop enabled)
- Health: PASS (`/health` 200 OK)
- Metrics: PASS (`/metrics` Prometheus compatible; nodejs/process/custom histograms)
- Build Method: Multi-stage Docker (builder with dev deps, runtime omit dev + ignore scripts)
- Context Isolation: `.mumu-dockerignore` limiting to orchestrator subtree
- Encoding: UTF-8 + LF enforced on infra files
- Validation URLs: `/health`, `/metrics`
- Notes: Fixed Fastify logger config, husky in runtime, tsc availability, Windows tar mode error, and Fly.toml Dockerfile path
- Validated By: GPT-5 Covenant Executor


End of Registry.
