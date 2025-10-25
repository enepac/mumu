import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
export const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Persists incoming transcript segments into Supabase with RLS enforced.
 * Each record links to the current session via session_id.
 */
export async function storeTranscriptSegment(sessionId: string, text: string, speaker: string, timestamp: number) {
  const { data, error } = await supabase
    .from("session_logs")
    .insert([{ session_id: sessionId, content: text, speaker, timestamp }]);
  if (error) throw new Error(`Supabase insert failed: ${error.message}`);
  return data;
}

/**
 * Retrieves historical transcript records for a given session,
 * ordered chronologically for replay or analysis.
 */
export async function fetchTranscriptHistory(sessionId: string) {
  const { data, error } = await supabase
    .from("session_logs")
    .select("*")
    .eq("session_id", sessionId)
    .order("timestamp", { ascending: true });
  if (error) throw new Error(`Supabase fetch failed: ${error.message}`);
  return data;
}
