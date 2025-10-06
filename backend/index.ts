import "dotenv/config"; // loads .env automatically
import express from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";

const app = express();
const PORT = Number(process.env.PORT) || 8080;

// Connect to Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

app.use(cors({ origin: "*" }));

app.get("/api/check", async (_req, res) => {
  try {
    const { data, error } = await supabase.from("test").select("*").limit(1);
    if (error) throw error;
    res.json({ ok: true, data });
  } catch (err) {
    console.error("Supabase Error:", err);
    res
      .status(500)
      .json({ ok: false, error: err instanceof Error ? err.message : err });
  }
});

app.get("/api/messages", async (_req, res) => {
  const { data, error } = await supabase.from("test").select("*");
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running on http://0.0.0.0:${PORT}`);
});
