-- Seed Workspaces
insert into workspaces (name) values 
  ('First Workspace 🚀'),
  ('Demo Classroom 📚'),
  ('Interview Prep 🎤');

-- Seed Documents linked to First Workspace
insert into documents (workspace_id, title, content)
  select id, 'Sample Doc', 'This is a seeded document'
  from workspaces
  where name = 'First Workspace 🚀'
  limit 1;

-- Seed Transcript
insert into transcripts (workspace_id, speaker, utterance, timestamp_ms)
  select id, 'teacher', 'Welcome to the demo classroom', 0
  from workspaces
  where name = 'Demo Classroom 📚'
  limit 1;

-- Seed Response
insert into responses (workspace_id, draft, refined, model_used, confidence, provenance)
  select id, 'draft answer', 'refined answer', 'gpt-4o', 0.98, '{"source":"seed"}'
  from workspaces
  where name = 'Interview Prep 🎤'
  limit 1;
