-- =====================================================================
-- Row Level Security
-- Runs after 01_schema.sql. Safe to rerun.
--
-- Role matrix:
--   anon         — public, unauthenticated visitors
--   authenticated — any logged-in user (roles: readonly, readwrite, admin)
--
-- Rules enforced by checking public.profiles.role for the current auth.uid().
-- =====================================================================

-- Helper: current user's role, NULL if not authenticated / not provisioned
create or replace function public.current_user_role()
returns text
language sql
security definer
set search_path = public
stable
as $$
  select role from public.profiles where id = auth.uid();
$$;

revoke all on function public.current_user_role() from public;
grant execute on function public.current_user_role() to authenticated;

-- Enable RLS on every table
alter table public.profiles              enable row level security;
alter table public.form_submissions      enable row level security;
alter table public.submission_notes      enable row level security;
alter table public.submission_rate_limit enable row level security;
alter table public.app_settings          enable row level security;

-- ---------------------------------------------------------------------
-- profiles
-- SELECT: any authenticated user (needed to render note authors, etc.)
-- INSERT/UPDATE/DELETE: only via server-side service role (admin flows).
--                       No client policy grants write; service role bypasses RLS.
-- ---------------------------------------------------------------------
drop policy if exists profiles_select on public.profiles;
create policy profiles_select
  on public.profiles
  for select
  to authenticated
  using (true);

-- ---------------------------------------------------------------------
-- form_submissions
-- INSERT: anon + authenticated (public forms submit with anon key)
-- SELECT: authenticated (any role)
-- UPDATE: readwrite + admin (status + payload.internal fields; see note)
-- DELETE: admin only
--
-- Note on UPDATE scope: RLS can't easily restrict *which columns* get
-- updated. We enforce "status only" at the server-function layer. If a
-- readwrite user bypassed the SDK and called update() directly, they
-- could technically edit name/email. Acceptable for an internal panel;
-- revisit if we ever expose write access to untrusted clients.
-- ---------------------------------------------------------------------
drop policy if exists form_submissions_insert_public on public.form_submissions;
create policy form_submissions_insert_public
  on public.form_submissions
  for insert
  to anon, authenticated
  with check (true);

drop policy if exists form_submissions_select on public.form_submissions;
create policy form_submissions_select
  on public.form_submissions
  for select
  to authenticated
  using (true);

drop policy if exists form_submissions_update on public.form_submissions;
create policy form_submissions_update
  on public.form_submissions
  for update
  to authenticated
  using (public.current_user_role() in ('readwrite', 'admin'))
  with check (public.current_user_role() in ('readwrite', 'admin'));

drop policy if exists form_submissions_delete on public.form_submissions;
create policy form_submissions_delete
  on public.form_submissions
  for delete
  to authenticated
  using (public.current_user_role() = 'admin');

-- ---------------------------------------------------------------------
-- submission_notes
-- SELECT: authenticated
-- INSERT: readwrite + admin (author_id must equal auth.uid())
-- UPDATE: author of the note or admin
-- DELETE: author of the note or admin
-- ---------------------------------------------------------------------
drop policy if exists submission_notes_select on public.submission_notes;
create policy submission_notes_select
  on public.submission_notes
  for select
  to authenticated
  using (true);

drop policy if exists submission_notes_insert on public.submission_notes;
create policy submission_notes_insert
  on public.submission_notes
  for insert
  to authenticated
  with check (
    public.current_user_role() in ('readwrite', 'admin')
    and author_id = auth.uid()
  );

drop policy if exists submission_notes_update on public.submission_notes;
create policy submission_notes_update
  on public.submission_notes
  for update
  to authenticated
  using (author_id = auth.uid() or public.current_user_role() = 'admin')
  with check (author_id = auth.uid() or public.current_user_role() = 'admin');

drop policy if exists submission_notes_delete on public.submission_notes;
create policy submission_notes_delete
  on public.submission_notes
  for delete
  to authenticated
  using (author_id = auth.uid() or public.current_user_role() = 'admin');

-- ---------------------------------------------------------------------
-- submission_rate_limit
-- No client access. Service role only.
-- ---------------------------------------------------------------------
-- (RLS is on; absence of policies = deny-all for non-service roles.)

-- ---------------------------------------------------------------------
-- app_settings
-- SELECT/UPDATE: admin only (and always via server function; service role
--                 bypasses RLS anyway)
-- Values like SMTP credentials must never be sent to the browser.
-- ---------------------------------------------------------------------
drop policy if exists app_settings_select on public.app_settings;
create policy app_settings_select
  on public.app_settings
  for select
  to authenticated
  using (public.current_user_role() = 'admin');

drop policy if exists app_settings_update on public.app_settings;
create policy app_settings_update
  on public.app_settings
  for update
  to authenticated
  using (public.current_user_role() = 'admin')
  with check (public.current_user_role() = 'admin');
