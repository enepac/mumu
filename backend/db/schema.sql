-- Core Schema Definitions for Mumu Task 2.3.2
create extension if not exists "uuid-ossp";
create schema if not exists public;

create table if not exists workspaces (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  type text,
  metadata jsonb,
  created_at timestamptz default now()
);

create table if not exists documents (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid references workspaces(id) on delete cascade,
  title text,
  content text,
  embedding vector(1536)
);

create table if not exists transcripts (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid references workspaces(id) on delete cascade,
  speaker text,
  timestamp timestamptz,
  text text
);

create table if not exists responses (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid references workspaces(id) on delete cascade,
  raw text,
  refined text,
  model text,
  created_at timestamptz default now()
);

create table if not exists voiceprints (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid references workspaces(id) on delete cascade,
  hash text not null,
  embedding vector(256)
);

create table if not exists eval_sets (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid references workspaces(id) on delete cascade,
  prompt text,
  expected text,
  score numeric
);

create table if not exists reflections (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid references workspaces(id) on delete cascade,
  content jsonb,
  created_at timestamptz default now()
);

-- Enable RLS on all tables
ALTER TABLE workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE transcripts ENABLE ROW LEVEL SECURITY;
ALTER TABLE responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE voiceprints ENABLE ROW LEVEL SECURITY;

-- Policy: Only members of workspace may access its rows
CREATE POLICY "workspace_read"
  ON workspaces
  FOR SELECT
  USING (auth.uid() = owner_id);

CREATE POLICY "workspace_documents"
  ON documents
  FOR ALL
  USING (EXISTS (
    SELECT 1 FROM workspaces
    WHERE id = documents.workspace_id AND owner_id = auth.uid()
  ));

CREATE POLICY "workspace_transcripts"
  ON transcripts
  FOR ALL
  USING (EXISTS (
    SELECT 1 FROM workspaces
    WHERE id = transcripts.workspace_id AND owner_id = auth.uid()
  ));
