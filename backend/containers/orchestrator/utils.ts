// backend/containers/orchestrator/utils.ts
export async function callModel(model: string, prompt: string) {
  // Placeholder logic — replace with real API calls (OpenAI / Anthropic)
  const start = Date.now();
  await new Promise((r) => setTimeout(r, 200)); // simulate latency
  return {
    model,
    output: `[${model}] processed: ${prompt.slice(0, 80)}...`,
    confidence: 0.9,
    latency_ms: Date.now() - start,
  };
}
