-- =====================================================================
-- Helper SQL functions
-- Runs after 02_policies.sql. Safe to rerun.
-- =====================================================================

-- ---------------------------------------------------------------------
-- check_and_bump_rate_limit(ip, max_per_window, window_minutes)
-- Atomically checks whether `ip` has exceeded `max_per_window` within
-- a rolling `window_minutes` window and bumps the counter.
--
-- Returns:
--   true  — caller is within the limit (proceed)
--   false — caller is over the limit (reject)
--
-- Behaviour:
--   - If no row exists or the window has expired, the counter resets.
--   - If the current count (before this call) is >= max, returns false
--     without bumping (so clients can't game the counter with retries).
--   - If within limit, increments count and returns true.
--
-- SECURITY DEFINER so unauthenticated server code can call it via RPC
-- without needing UPDATE grants on the rate_limit table.
-- ---------------------------------------------------------------------
create or replace function public.check_and_bump_rate_limit(
  p_ip text,
  p_max int default 10,
  p_window_minutes int default 10
)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_row public.submission_rate_limit%rowtype;
  v_window_cutoff timestamptz := now() - make_interval(mins => p_window_minutes);
begin
  if p_ip is null or length(p_ip) = 0 then
    return true;
  end if;

  select * into v_row from public.submission_rate_limit where ip_address = p_ip for update;

  if not found then
    insert into public.submission_rate_limit (ip_address, count, window_started_at)
      values (p_ip, 1, now());
    return true;
  end if;

  if v_row.window_started_at < v_window_cutoff then
    update public.submission_rate_limit
      set count = 1, window_started_at = now()
      where ip_address = p_ip;
    return true;
  end if;

  if v_row.count >= p_max then
    return false;
  end if;

  update public.submission_rate_limit
    set count = count + 1
    where ip_address = p_ip;

  return true;
end;
$$;

revoke all on function public.check_and_bump_rate_limit(text, int, int) from public;
grant execute on function public.check_and_bump_rate_limit(text, int, int) to anon, authenticated, service_role;

-- ---------------------------------------------------------------------
-- prune_rate_limit()
-- Removes rows whose window has expired. Call periodically from the
-- server (or ignore — the table stays small because bumping resets it).
-- ---------------------------------------------------------------------
create or replace function public.prune_rate_limit(p_window_minutes int default 10)
returns int
language plpgsql
security definer
set search_path = public
as $$
declare
  v_deleted int;
begin
  delete from public.submission_rate_limit
    where window_started_at < now() - make_interval(mins => p_window_minutes);
  get diagnostics v_deleted = row_count;
  return v_deleted;
end;
$$;

revoke all on function public.prune_rate_limit(int) from public;
grant execute on function public.prune_rate_limit(int) to service_role;

-- ---------------------------------------------------------------------
-- touch_app_settings_updated_at
-- Trigger helper to maintain app_settings.updated_at.
-- ---------------------------------------------------------------------
create or replace function public.touch_app_settings_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists app_settings_touch_updated_at on public.app_settings;
create trigger app_settings_touch_updated_at
  before update on public.app_settings
  for each row execute function public.touch_app_settings_updated_at();
