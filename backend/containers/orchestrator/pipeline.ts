// backend/containers/orchestrator/pipeline.ts
// Covenant Orchestration Pipeline (Draft → Refine → Fallback)
import { callModel } from "./utils.js";

export interface PipelineContext {
  prompt: string;
  workspaceId?: string;
  metadata?: Record<string, any>;
}

export async function runPipeline({
  prompt,
  workspaceId,
  metadata,
}: PipelineContext) {
  const start = Date.now();
  const results: Record<string, any> = { prompt, workspaceId };

  try {
    // Stage 1: Draft
    const draft = await callModel("gpt-4o-mini", prompt);
    results.draft = draft;

    // Stage 2: Refine
    const refined = await callModel("gpt-4o", draft.output);
    results.refined = refined;

    // Stage 3: Fallback cascade (Claude 3 Opus)
    if (!refined.output || refined.confidence < 0.6) {
      const fallback = await callModel("claude-3-opus", prompt);
      results.fallback = fallback;
    }

    results.duration_ms = Date.now() - start;
    return results.fallback || results.refined || results.draft;
  } catch (error: any) {
    console.error("Pipeline error:", error);
    throw error;
  }
}
