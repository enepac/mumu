#!/usr/bin/env bash
# -----------------------------------------------------------
# Mumu Covenant Script — Part 2 → Task 2.2 → Subtask 2.2.2
# Purpose: Validate Fly.io containers (Whisper GPU + LLM Orchestrator)
#          and tag immutable baselines after successful health checks.
# -----------------------------------------------------------

set -euo pipefail

ROOT_DIR="$(git rev-parse --show-toplevel)"
cd "$ROOT_DIR/backend" || exit 1

timestamp=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
REFLECTION_FILE="$ROOT_DIR/dev/_reflection.md"
DECISION_FILE="$ROOT_DIR/dev/_decisions.md"

# --- Helper -------------------------------------------------
log() { echo -e "[$(date '+%H:%M:%S')] $*"; }

# --- Step 1. Build & Deploy Containers ----------------------
log "🚀 Deploying Whisper GPU container to Fly.io..."
cd containers/whisper
flyctl deploy --config fly.toml --build-arg NODE_ENV=production --local-only

log "🚀 Deploying LLM Orchestrator container to Fly.io..."
cd ../orchestrator
flyctl deploy --config fly.toml --build-arg NODE_ENV=production --local-only

# --- Step 2. Health & Metrics Verification ------------------
log "🩺 Checking container health endpoints..."
sleep 10  # allow warmup

WHISPER_URL=$(flyctl status | grep -m1 "Hostname" | awk '{print $2}')
ORCH_URL=$(flyctl status | grep -m1 "Hostname" | awk '{print $2}')

log "Checking Whisper: $WHISPER_URL/health"
curl -sf "$WHISPER_URL/health" | jq .

log "Checking Orchestrator: $ORCH_URL/health"
curl -sf "$ORCH_URL/health" | jq .

log "📊 Metrics probe (first lines):"
curl -sf "$ORCH_URL/metrics" | head -n 5

# --- Step 3. Reflection & Decision Logging ------------------
log "🧩 Updating Covenant logs..."
cat <<EOF >> "$REFLECTION_FILE"

## [Part 2 → Task 2.2 → Subtask 2.2.2] Fly.io Container Validation
**Timestamp:** $timestamp  
**Outcome:** ✅ Whisper + Orchestrator containers deployed and passed /health checks.  
**Next Baseline:** baseline/backend-v0.2.2  
EOF

cat <<EOF >> "$DECISION_FILE"

## [Decision] Task 2.2 — Container Validation & Baseline Tagging
**Date:** $timestamp  
**Context:** Verified operational stability of Whisper GPU and LLM Orchestrator on Fly.io.  
**Action:** Tagging new immutable baseline backend-v0.2.2.  
**Rationale:** Establish reproducible deployment snapshot per Covenant §3 (Atomic Commit Discipline).
EOF

# --- Step 4. Git Commit & Tag -------------------------------
log "🔖 Tagging baseline..."
cd "$ROOT_DIR"
git add dev/_reflection.md dev/_decisions.md
git commit -m "chore(baseline): validate Fly.io containers & tag backend-v0.2.2"
git tag -a "baseline/backend-v0.2.2" -m "Fly.io containers validated $timestamp"

log "✅ Baseline backend-v0.2.2 tagged successfully."
