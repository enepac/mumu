# 🧠 Mumu — Stealth-Mode AI Development Framework

**Version:** v0.1.10   |  **Branch:** `enhancement/v0.1.5-observability-docs`  
**Baseline:** `baseline/v0.1.9`   |  **License:** Proprietary / Private R&D  

---

## ⚙️ Overview
Mumu is an experimental AI-driven engineering platform designed around the **Covenant Strict Mode** principle — a governed framework that enforces accuracy, immutability, and atomic commits at every subtask.  
It integrates **Next.js 15**, **TypeScript**, **Supabase**, **Sentry**, **LogRocket**, **Pino**, and **Playwright E2E** into a unified development lifecycle with reproducible baselines.

---

## 🏗️ System Architecture

| Layer | Key Technologies | Description |
|-------|------------------|-------------|
| **Frontend (UX + Stealth UI)** | Next.js 15 + React 19 | User-facing stealth interface & session replay hooks |
| **Backend (API + Observability)** | Supabase SDK v2 · Pino · Sentry · LogRocket | Secure API layer with structured logs and telemetry |
| **Testing & Quality** | Jest · Playwright | Unit + E2E validation with coverage thresholds |
| **Dev Guardrails** | ESLint 9 · Prettier · Husky · lint-staged · CodeQL · Dependabot | Automated static analysis & supply-chain security |
| **Covenant Execution Layer** | GPT-5 (Lead Architect) + Executor | Atomic commit enforcement and baseline tagging |

---

## 🧩 Environment Setup

### **1️⃣ Prerequisites**
| Tool | Version | Notes |
|------|----------|-------|
| **Node.js** | ≥ 22.17 LTS | Native ESM support required |
| **pnpm** | ≥ 9.5 | Preferred package manager |
| **Git** | ≥ 2.44 | Covenant Atomic Commit discipline |
| **VS Code** | Latest | Recommended editor with ESLint + Prettier plugins |

### **2️⃣ Clone and Install**
```bash
git clone https://github.com/enepac/mumu.git
cd mumu
pnpm install
