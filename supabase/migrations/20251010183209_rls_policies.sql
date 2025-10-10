-- ============================================
-- Mumu Subtask 2.3.3 — Row-Level Security (RLS) and Policies
-- ============================================

-- Enable RLS on all workspace-scoped tables
ALTER TABLE public.workspaces  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transcripts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.responses   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.voiceprints ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.eval_sets   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reflections ENABLE ROW LEVEL SECURITY;

-- Helper function: extract workspace_id from JWT claims
create or replace function public.request_workspace_id()
returns uuid
language sql stable
as $$
  select nullif(current_setting('request.jwt.claims', true)::jsonb ->> 'workspace_id','')::uuid
$$;

-- Policy: allow service_role to read/write everything
create policy "service_full_access"
  on public.workspaces
  for all
  using (auth.role() = 'service_role')
  with check (true);

-- Workspace-level access for linked tables
create policy "documents_access"
  on public.documents
  for all
  using (auth.role() = 'service_role' or workspace_id = public.request_workspace_id());

create policy "transcripts_access"
  on public.transcripts
  for all
  using (auth.role() = 'service_role' or workspace_id = public.request_workspace_id());

create policy "responses_access"
  on public.responses
  for all
  using (auth.role() = 'service_role' or workspace_id = public.request_workspace_id());

create policy "voiceprints_access"
  on public.voiceprints
  for all
  using (auth.role() = 'service_role' or workspace_id = public.request_workspace_id());

create policy "eval_sets_access"
  on public.eval_sets
  for all
  using (auth.role() = 'service_role' or workspace_id = public.request_workspace_id());

create policy "reflections_access"
  on public.reflections
  for all
  using (auth.role() = 'service_role' or workspace_id = public.request_workspace_id());
