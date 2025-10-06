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

