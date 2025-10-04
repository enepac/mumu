-- Enable pgvector
create extension if not exists vector;

-- Workspaces
create table if not exists workspaces (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Documents
create table if not exists documents (
  id uuid default gen_random_uuid() primary key,
  workspace_id uuid references workspaces(id) on delete cascade,
  title text not null,
  content text,
  embedding vector(1536),
  created_at timestamp with time zone default now()
);

-- Transcripts
create table if not exists transcripts (
  id uuid default gen_random_uuid() primary key,
  workspace_id uuid references workspaces(id) on delete cascade,
  speaker text not null,
  utterance text not null,
  timestamp_ms bigint,
  created_at timestamp with time zone default now()
);

-- Responses
create table if not exists responses (
  id uuid default gen_random_uuid() primary key,
  workspace_id uuid references workspaces(id) on delete cascade,
  draft text,
  refined text,
  model_used text,
  confidence float,
  provenance jsonb,
  created_at timestamp with time zone default now()
);
