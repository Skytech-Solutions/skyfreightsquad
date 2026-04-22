# Supabase setup

This folder contains everything needed to bring up the admin-panel backend on a fresh Supabase project.

## What you get

- **Tables:** `profiles`, `form_submissions`, `submission_notes`, `submission_rate_limit`, `app_settings`
- **Auth:** username + password login (usernames mapped to synthetic emails internally)
- **Roles:** `readonly`, `readwrite`, `admin` — enforced via RLS
- **Rate limiting:** 10 submissions per IP per 10-minute rolling window
- **Editable SMTP config** in the admin UI, stored in `app_settings`

## Files

| File | Purpose |
|---|---|
| `01_schema.sql` | Creates all 5 tables + indexes. Idempotent. |
| `02_policies.sql` | Enables RLS + all policies. Idempotent. |
| `03_functions.sql` | Helper SQL functions (rate-limit, triggers). Idempotent. |
| `04_seed.sql` | Inserts the default (empty) SMTP settings row. Idempotent. |
| `05_attach_admin_profile.sql` | Attaches a `profiles` row to your default admin. Run once. |

## Setup — 6 steps

### 1. Create a Supabase project

Go to [supabase.com/dashboard](https://supabase.com/dashboard) → **New project**. Pick a region close to your users. Note the project URL and two keys:

- **Project URL** (looks like `https://xxxxx.supabase.co`)
- **anon public key** — safe to ship to the browser
- **service_role key** — secret, server-only

### 2. Run the SQL files in order

In the dashboard: **SQL Editor** → **New query**. Paste and run each file in order:

1. `01_schema.sql`
2. `02_policies.sql`
3. `03_functions.sql`
4. `04_seed.sql`

Each run should complete without errors. If a statement reports "already exists", that's fine — they're idempotent.

### 3. Create the default admin user

**Dashboard** → **Authentication** → **Users** → **Add user** → **Create new user**.

| Field | Value |
|---|---|
| Email | `admin@internal.skyfreightsquad` |
| Password | *(pick a strong one — save it somewhere safe)* |
| Auto Confirm User | ✅ **Yes** (check this) |

> Why the `.skyfreightsquad` email? The admin panel logs users in by **username**, not email. Internally we append `@internal.skyfreightsquad` to each username before calling Supabase Auth. The suffix is an invalid-ish domain by design so no password-reset email can ever be delivered to it — passwords are managed by admins in the UI instead.

### 4. Attach the admin profile

Back in the SQL Editor, run `05_attach_admin_profile.sql`. If you changed the username in step 3, update the `v_username` and `v_email` variables at the top of the file first.

You should see `NOTICE: Admin profile attached: username=admin, role=admin, user_id=...`.

### 5. Copy credentials to `.env.local`

Create `.env.local` in the project root (copy from `.env.example`):

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...
```

### 6. Verify

Start the dev server:

```bash
pnpm dev
```

Once the admin-panel frontend is wired up (Phase B+), go to `/admin/login`, enter username `admin` and your password, and confirm you land on the dashboard.

---

## Configuring SMTP (after first login)

Go to `/admin/settings` in the admin panel. Fill in:

| Field | Notes |
|---|---|
| Host | e.g. `smtp.resend.com`, `smtp.sendgrid.net`, or your own |
| Port | `587` (STARTTLS) or `465` (SSL) |
| Secure | `true` for 465, `false` for 587 |
| User | SMTP username |
| Pass | SMTP password / API key |
| From | `notifications@yourdomain.com` — must be a domain you control |
| Notification To | Email address that receives new-submission alerts |
| Enabled | Toggle on once configured |

Click **Send test email** to verify before enabling.

---

## Troubleshooting

**"Permission denied for table X"** — RLS policies are wrong or missing. Rerun `02_policies.sql`.

**"Row-level security policy violation" on form submission** — `form_submissions` INSERT policy is missing. Rerun `02_policies.sql`.

**Admin can't see settings** — `profiles.role` isn't `admin` for your user. Check with:
```sql
select p.username, p.role from public.profiles p
  join auth.users u on u.id = p.id
  where u.email = 'admin@internal.skyfreightsquad';
```

**Rate limit blocking legitimate traffic** — bump the limits. Edit `03_functions.sql` default args or pass `p_max` / `p_window_minutes` from the server function.

---

## Ongoing admin tasks

| Task | Where |
|---|---|
| Add a user | `/admin/users` in the panel (admin only) |
| Change a user's role | `/admin/users` |
| Delete a user | `/admin/users` |
| Configure SMTP | `/admin/settings` |
| View submissions | `/admin` dashboard |
| Add notes | Submission detail page (readwrite + admin) |
