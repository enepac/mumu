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

## NEXT SCHEDULED BASELINES
- backend-v0.2.2b — LLM Orchestrator Container (Fly.io)
- backend-v0.2.3 — Supabase RLS + AES-256 Enforcement
- backend-v0.2.4 — Redis Queues + BullMQ Worker Validation
- backend-v0.3.0 — Backend Platform Consolidation Baseline

---

## REGISTRY MANAGEMENT
This registry is immutable once a baseline is tagged.  
Edits are allowed only for new baseline entries, each appended with:
- Date of validation  
- Scope description  
- Validation confirmation line from Covenant logs.

---

End of Registry.
