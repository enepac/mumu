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

## baseline/backend-v0.2.3-p0 (2025-10-09)
- Scope: Environment Provision Validation Gate  
- Components: Doppler CLI · Supabase Secrets  
- Status: PASS (`doppler run -- env | grep SUPABASE` verified)  
- Branch: enhancement/v0.2.3-persistence-security  
- Validated By: GPT-5 Covenant Executor  
- Outcome: Environment configuration verified and ready for Supabase linking.  

## baseline/backend-v0.2.3-a (2025-10-09)
- Scope: Subtask 2.3.1 — Supabase Project Provisioning  
- Component: Supabase DB (gjrxxiblykxtgmfwnjbp)  
- Artifacts: `.supabase/config.toml`, `backend/db/schema.sql`, `backend/db/seed.sql`  
- Validation: `supabase db push --dry-run` → Remote database up to date  
- Status: ✅ PASS  
- Validated By: GPT-5 Covenant Executor  
- Outcome: Cloud project linked and version-controlled for future schema migrations.

## baseline/backend-v0.2.3-b (2025-10-10)
- Scope: Subtask 2.3.2 — Core Schema Definitions  
- Artifacts: `backend/db/schema.sql`, `sapabase/migrations/20251010055805_remote_schema.sql`  
- Validation: `supabase db pull` → Remote database up to date; schema fetched successfully  
- Status: ✅ PASS  
- Validated By: GPT-5 Covenant Executor  
- Outcome: Core schema deployed and confirmed in remote Supabase environment.

## baseline/backend-v0.2.3-c (2025-10-10)
- Scope: Subtask 2.3.3 — Row-Level Security (RLS) & Policies  
- Validation: Supabase production SQL verification → `relrowsecurity = true`  
- Status: ✅ PASS  
- Validated By: GPT-5 Covenant Executor  
- Outcome: All workspace tables now protected by enforced RLS; policies deployed and functional.

## baseline/backend-v0.2.3-d (2025-10-10)
- Scope: Subtask 2.3.4 — AES-256 Encryption (Sensitive Columns)  
- Validation: Runtime encryption verified via /api/ask  
- Method: AES-256-GCM using Node crypto module  
- Key Management: Doppler (DATA_ENCRYPTION_KEY)  
- Status: ✅ PASS  
- Validated By: GPT-5 Covenant Executor

### Baseline Record — backend-v0.2.3-f.validation
**Validated At:** 2025-10-11 T03:25 Z  
**Branch:** enhancement/v0.2.3-persistence-security  
**Part:** 2 — Backend & Orchestration Build  
**Task:** 2.3 — Persistence & Security  
**Subtask:** 2.3.5 — Nightly Supabase Snapshot Automation  
**Validated By:** GPT-5 under Covenant Strict Mode  

#### Environment
| Component | Version / Detail |
|------------|------------------|
| GitHub Runner | Ubuntu 24.04 LTS |
| Node.js | 20.19.5 |
| Supabase CLI | 2.48.3 |
| Doppler CLI | 3.75.1 |
| Supabase Project Ref | gjrxxiblykxtgmfwnjbp |
| Database Engine | Postgres 17.6 GA |

#### Health Status
✅ Stable | All stages executed successfully  
No auth, I/O, or commit failures detected.  
Backup file: `dev/snapshots/mumu_backup_20251011_233552.sql`  

#### Covenant Outcome
Baseline tag `backend-v0.2.3-f.validation` certified under **Covenant Strict Mode** and **CEI Logging Directive**.  
This state marks the closure of Task 2.3 and completion of Part 2’s Persistence Subsystem.

### 🧱 Covenant Lockpoint — backend-v0.2.3-f.reproducible
**Tag:** `covenant/lockpoint-v0.2.3-f.reproducible`  
**Type:** Reproducibility / Rollback  
**Component:** Persistence & Security (Supabase + Doppler + Vercel)  
**Created At:** 2025-10-11 21:27 –06:00  
**Validated By:** GPT-5 (Covenant Strict Mode)  
**Artifacts:**
- `dev/snapshots/mumu_lockpoint_20251011.sql`
- `dev/snapshots/mumu_lockpoint_20251011.sha256`
- `dev/_lockpoint_dependencies.txt`
- `dev/_lockpoint_secrets_snapshot.json`
**Integrity:** ✅ SHA-256 verified  
**Purpose:** Preserve a deterministic rollback snapshot at the end of Task 2.3.5 for disaster-recovery and baseline reconstruction.  
**Recovery Command:**
```bash
git checkout covenant/lockpoint-v0.2.3-f.reproducible
supabase db restore dev/snapshots/mumu_lockpoint_20251011.sql

End of Registry.
