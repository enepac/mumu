# MUMU UPDATE PROTOCOL
# Covenant Automatic Behavior Directive
# Version 1.0 — October 2025

---

## PURPOSE

This protocol defines the exact sequence of document and state updates that must occur
at the completion of every **task** or **subtask** within the Mumu development lifecycle.

It ensures that all reflections, decisions, and baselines are properly recorded,
maintaining full traceability and Covenant compliance across sessions.

This file is referenced by:
- Mumu_Covenant_Context_Manifest.md
- mumu_system_index.md

Any GPT session that loads these documents must automatically enforce this behavior.

---

## ACTIVATION

When Covenant Strict Mode is active, GPT must implicitly load and execute
the Mumu Update Protocol at every subtask validation checkpoint.

Invocation confirmation phrase:
**“Mumu Update Protocol engaged — Covenant documentation sync active.”**

---

## ENFORCEMENT SEQUENCE

At the end of **every validated task or subtask**, GPT must execute the following:

1. **Update Reflection Log**
   - Append a new entry in `dev/_reflection.md`.
   - Each entry must include:
     - Error(s) encountered
     - Root cause(s)
     - Fix(es) applied
     - Key lesson(s) learned
   - Format: plain text, structured by numbered reflection entries.

2. **Update Decision Log**
   - Append a new entry in `dev/_decisions.md`.
   - Each entry must summarize:
     - What was built or changed
     - Why this approach was selected
     - Impact on system behavior or architecture
   - Follow the existing decision entry style for consistency.

3. **Update State Registry**
   - Modify `dev/mumu_state_registry.json` to reflect the current checkpoint:
     - `current_part`
     - `current_task`
     - `current_subtask`
     - `current_baseline`
     - `last_validated_at`
     - `next_action`
     - `upcoming_baseline`
   - Ensure formatting and JSON integrity remain intact.

4. **Append Baseline Registry**
   - Add a new entry to `dev/baseline_registry.md`:
     - Baseline tag
     - Scope/description
     - Validation date
     - Confirmation line (e.g., “Validated and baselined under Covenant Strict Mode.”)

5. **Update Progress Narrative**
   - Add a short summary paragraph in `dev/mumu_progress_narrative.md`
     describing what was accomplished since the last baseline
     and how it connects to previous development progress.

6. **Update Repo Structure (if changed)**
   - Regenerate `dev/_repo_structure.txt` using:
     ```
     tree -I "node_modules|.next|dist|coverage" -L 3 > dev/_repo_structure.txt
     ```
   - Only required when new directories or files are introduced.

7. **Validation Declaration**
   - After all above updates are complete, GPT must declare:
     ```
     ✅ Subtask [X.Y.Z] validated — Covenant update protocol completed and baseline tagged.
     ```

---

## POST-UPDATE COMMIT INSTRUCTION

After verification, executor must perform:
git add dev/_reflection.md dev/_decisions.md dev/mumu_state_registry.json
dev/baseline_registry.md dev/mumu_progress_narrative.md
git commit -m "docs: record reflection, decisions, and baseline for Task X.Y.Z"
git tag -a baseline/backend-v0.X.Y -m "Validated baseline for Task X.Y.Z"


---

## BEHAVIORAL CLAUSES

- GPT must not skip or delay this protocol once a subtask is validated.
- If the executor forgets to request it, GPT shall still prompt:  
  **“Do you want me to run the Covenant update protocol for this subtask?”**
- No new subtask or enhancement may begin until this update is complete.
- The protocol applies equally to technical, documentation, and configuration subtasks.

---

## CONFIRMATION PHRASE

Upon completion, GPT shall always respond with:

**“Covenant documentation synchronized — baseline integrity maintained.”**

---
## 🧩 Covenant Update Protocol Entry — Integration Phase Initialization  
**Date:** 2025-10-23  
**Executor:** GPT-5 under Covenant Strict Mode  
**Authorized By:** GPT-5 Covenant Executor  
**Phase:** Integration & Implementation  
**Baseline Reference:** `baseline/artifact-sync-v0.3.7`  
**Linked Reflection:** `cei-reflection-20251023-preintegration-vs-08`  
**Linked Decision:** `cei-decision-20251023-integration-vs-08`  
**Linked Narrative:** `cei-narrative-20251023-integration-phase`  
**Lockpoint:** `covenant/lockpoint-v0.2.3-f.reproducible`  
**Governance Mode:** Covenant Strict Mode + PSC Active  
**PSC Layers Active:** CEI · APE · CES · DCSP  

---

### 🔹 Objective
To confirm synchronization of all Covenant governance artifacts and formally authorize entry into the **Integration & Implementation Phase**, following validation of Vertical Slices VS-01 → VS-08.  
This marks the transition from slice-level validation to system-wide integration under reproducible conditions.

---

### 🔹 Artifact Synchronization Summary
| Artifact | Status | Notes |
|--|--|--|
| `_reflection.md` | ✅ Synced | Pre-integration readiness recorded |
| `_decisions.md` | ✅ Synced | Integration phase authorized |
| `baseline_registry.md` | ✅ Synced | Lockpoint `artifact-sync-v0.3.7` recorded |
| `mumu_state_registry.json` | ✅ Synced | Phase set to “Integration and Implementation” |
| `mumu_progress_narrative.md` | ✅ Synced | Narrative entry logged for integration transition |
| `_repo_structure.txt` | ✅ Updated | Directory structure regenerated |
| `mumu_system_index.md` | ✅ Updated | Document index aligned |
| `mumu_update_protocol.md` | ✅ Updated | Covenant Update Protocol checkpoint established |

---

### 🔹 Validation & Automation
- **REOS State:** `Invoke → Execute`  
- **BRU Enforcement:** Active  
- **Automation Hooks:**  
  - Reflection logging: ✅ Enabled  
  - Baseline enforcement: ✅ Active  
  - Lockpoint verification: ✅ Required before deploy  
  - CEI telemetry sync: ✅ Live  

---

### 🔹 Covenant Integrity Statement
> “All artifacts validated and synchronized under Covenant Strict Mode.  
> PSC layers engaged. REOS and BRU cycles aligned.  
> Integration Phase entry authorized — development operations may proceed in VSCode.”

---

### 🔹 Next Protocol Trigger
| Trigger Event | Action | Responsible |
|--|--|--|
| Integration coding checkpoint | Append reflection entry | Developer |
| Validation checkpoint | Append decision record | GPT-5 Executor |
| Successful integration build | Run `mumu_update_protocol.md` sync command | CI/CD Pipeline |
| Post-merge baseline | Tag `integration-v0.3.8` | Covenant Engine |

---

**Protocol ID:** `cei-protocol-20251023-integration-init`  
**Status:** ✅ Closed — Integration Phase Authorized  
---
---

## 🧩 Covenant Update Protocol Entry — VS-01 → Task 1 (UI & Audio Input Layer)
**Date:** 2025-10-23  
**Executor:** GPT-5 Covenant Executor  
**Branch:** enhancement/v0.3.0-vs-01-voice-display  
**Baseline Reference:** frontend-v0.3.0-ui.preval  
**Governance:** Covenant Strict Mode + PSC Active  
**PSC Layers Active:** CEI · APE · CES · DCSP  

### 🔹 Objective
To confirm synchronization of all Covenant governance artifacts following completion and validation of VS-01 → Task 1 (UI & Audio Input Layer).  
This declaration finalizes the frontend baseline and authorizes transition to backend orchestration (Task 2).

---

### 🔹 Artifact Synchronization Summary
| Artifact | Status | Notes |
|--|--|--|
| `_reflection.md` | ✅ Synced | Reflection entry appended for VS-01 Task 1. |
| `_decisions.md` | ✅ Synced | Architecture decisions documented. |
| `baseline_registry.md` | ✅ Synced | Baseline `frontend-v0.3.0-ui.preval` recorded. |
| `mumu_progress_narrative.md` | ✅ Synced | Narrative updated with Task 1 storyline. |
| `mumu_state_registry.json` | ✅ Synced | Updated with current subtask 1.5. |
| `mumu_system_index.md` | ✅ Synced | Artifacts indexed and cross-linked. |
| `mumu_update_protocol.md` | ✅ Updated | Covenant validation declaration appended. |

---

### 🔹 Declaration
✅ **VS-01 → Task 1 validated — Covenant Update Protocol completed and baseline frontend-v0.3.0-ui.preval tagged.**

Baseline integrity maintained.  
Frontend pipeline sealed under immutable governance.  
Authorized next step: **VS-01 → Task 2 — Backend Stream Orchestration (/api/listen)**.
---

End of file.

