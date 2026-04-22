-- =====================================================================
-- Attach a profile row to an existing auth.users entry.
-- Run this AFTER creating your default admin user in the Supabase
-- Dashboard (Authentication → Users → Add user).
--
-- Replace the placeholder values below, then run the whole block.
-- =====================================================================

do $$
declare
  v_username text := 'admin';                                   -- change if you want
  v_email    text := 'admin@internal.skyfreightsquad';          -- must match the email
                                                                -- you used when adding
                                                                -- the user in the dashboard
  v_user_id  uuid;
begin
  select id into v_user_id from auth.users where email = v_email;

  if v_user_id is null then
    raise exception 'No auth.users row found for email %. Create the user in the Supabase Dashboard first.', v_email;
  end if;

  insert into public.profiles (id, username, role)
    values (v_user_id, v_username, 'admin')
    on conflict (id) do update set username = excluded.username, role = excluded.role;

  raise notice 'Admin profile attached: username=%, role=admin, user_id=%', v_username, v_user_id;
end
$$;
