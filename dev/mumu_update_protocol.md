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

End of file.

