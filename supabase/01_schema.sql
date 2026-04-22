-- =====================================================================
-- Skylight Squad admin panel — schema
-- Run order: 01 → 02 → 03 → 04
-- Idempotent where safe; destructive changes require manual intervention.
-- =====================================================================

-- Extensions
create extension if not exists "pgcrypto";

-- =====================================================================
-- profiles
-- Extends auth.users with a username + role. One row per auth user.
-- Username is the only user-facing identifier. We store a synthetic
-- email on auth.users ({username}@internal.skyfreightsquad) for
-- Supabase Auth compatibility; end users never see it.
-- =====================================================================
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text not null unique,
  role text not null check (role in ('readonly', 'readwrite', 'admin')) default 'readonly',
  created_at timestamptz not null default now()
);

create index if not exists profiles_username_idx on public.profiles (username);
create index if not exists profiles_role_idx on public.profiles (role);

-- =====================================================================
-- form_submissions
-- Public form captures. INSERT is public; everything else is gated.
-- =====================================================================
create table if not exists public.form_submissions (
  id uuid primary key default gen_random_uuid(),
  source text not null check (source in ('contact', 'assessment')),
  name text,
  email text,
  phone text,
  message text,
  payload jsonb,
  status text not null check (status in ('new', 'in_progress', 'contacted', 'closed')) default 'new',
  ip_address text,
  user_agent text,
  created_at timestamptz not null default now()
);

create index if not exists form_submissions_created_at_idx on public.form_submissions (created_at desc);
create index if not exists form_submissions_status_idx on public.form_submissions (status);
create index if not exists form_submissions_source_idx on public.form_submissions (source);

-- =====================================================================
-- submission_notes
-- Free-form notes attached to a submission. Author is a profile row.
-- =====================================================================
create table if not exists public.submission_notes (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null references public.form_submissions(id) on delete cascade,
  author_id uuid not null references public.profiles(id) on delete restrict,
  body text not null check (length(trim(body)) > 0),
  created_at timestamptz not null default now()
);

create index if not exists submission_notes_submission_idx on public.submission_notes (submission_id, created_at desc);

-- =====================================================================
-- submission_rate_limit
-- Best-effort IP throttle for public form submissions.
-- Window is rolling 10 minutes; 10 submissions max per window per IP.
-- Enforced in server code; table exists so logic survives restarts.
-- =====================================================================
create table if not exists public.submission_rate_limit (
  ip_address text primary key,
  count int not null default 0,
  window_started_at timestamptz not null default now()
);

-- =====================================================================
-- app_settings
-- Key-value store for runtime-editable configuration (SMTP, etc).
-- Never read from client — always accessed via server function with
-- service-role credentials.
-- =====================================================================
create table if not exists public.app_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now(),
  updated_by uuid references public.profiles(id)
);
