"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export default function Page() {
  const [messages, setMessages] = useState<{ id: number; message: string }[]>(
    [],
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMessages = async () => {
      const { data, error } = await supabase
        .from("test")
        .select("*")
        .order("id", { ascending: true });
      if (error) console.error("Error fetching data:", error);
      else setMessages(data || []);
      setLoading(false);
    };

    loadMessages();

    // Optional: live updates (real-time subscription)
    const channel = supabase
      .channel("realtime:public:test")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "test" },
        (payload) => {
          console.log("Change received!", payload);
          loadMessages();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <main style={{ padding: 40, fontFamily: "sans-serif" }}>
      <h1>🚀 Mumu + Supabase Connection</h1>
      <p>
        Live data from your <code>test</code> table:
      </p>

      {loading ? (
        <p>Loading...</p>
      ) : messages.length === 0 ? (
        <p>No messages found.</p>
      ) : (
        <ul style={{ marginTop: 20 }}>
          {messages.map((msg) => (
            <li key={msg.id}>🟢 {msg.message}</li>
          ))}
        </ul>
      )}
    </main>
  );
}
