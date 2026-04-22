-- =====================================================================
-- Seed data
-- Runs after 03_functions.sql. Safe to rerun.
--
-- This file seeds:
--   1. The default app_settings.smtp row (empty; admins fill it in the UI)
--
-- The default ADMIN USER is NOT created by this SQL. Supabase Auth
-- users must be created via the Dashboard or Admin API so passwords
-- are hashed correctly. See supabase/README.md for the 3 manual steps.
-- =====================================================================

-- ---------------------------------------------------------------------
-- app_settings.smtp — default disabled row
-- Admins edit this at /admin/settings once signed in.
-- ---------------------------------------------------------------------
insert into public.app_settings (key, value)
values (
  'smtp',
  jsonb_build_object(
    'host', '',
    'port', 587,
    'secure', false,
    'user', '',
    'pass', '',
    'from', 'notifications@skyfreightsquad.com',
    'notification_to', 'hello@skyfreightsquad.com',
    'enabled', false
  )
)
on conflict (key) do nothing;
