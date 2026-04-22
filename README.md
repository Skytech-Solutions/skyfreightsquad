# Skylight Squad

Marketing site for **SkyFreightSquad** — 24/7 freight back-office (dispatch, track & trace, billing, customer support) for freight brokers and 3PL operators. Includes a built-in admin panel at `/admin` for managing form submissions and users.

## Stack

- **Framework** — TanStack Start (SSR) + TanStack Router (file-based routing)
- **Build** — Vite + Nitro (deploy target auto-detected)
- **Deploy** — Vercel (primary). Nitro also supports Cloudflare, Netlify, Node, etc.
- **Styling** — Tailwind CSS v4 + a pruned shadcn/ui set
- **Motion** — Framer Motion
- **Backend** — Supabase (Postgres + Auth + RLS)
- **Email** — Nodemailer (SMTP configured at runtime via `/admin/settings`)

## Prerequisites

- Node 20+
- pnpm 10+ (`corepack enable` then `corepack use pnpm@10`)
- A Supabase project (see `supabase/README.md`)

## Environment

Copy `.env.example` to `.env.local` and fill in:

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

SMTP credentials are **not** env vars — admins configure them in-app at `/admin/settings`.

## Scripts

```bash
pnpm install      # install deps
pnpm dev          # local dev server
pnpm build        # production build (.output/ for Node; .vercel/output/ when VERCEL=1)
pnpm preview      # preview the production build
pnpm lint         # eslint
```

## Project layout

```
src/
  routes/                # file-based pages (TanStack Router)
    services/            # /services/* pages
    admin/               # /admin/* admin panel
  components/            # layout + section components
    admin/               # admin shell
    ui/                  # shadcn primitives (only the 7 in use)
    home/                # home page sections
  supabase/              # browser + server Supabase clients + types + auth helpers
  server/                # server functions (submissions, admin, email)
  hooks/                 # custom hooks
  lib/                   # utilities
  styles.css             # Tailwind + brand tokens
supabase/                # SQL schema, policies, functions, setup README
public/                  # static assets, robots.txt, sitemap.xml
```

## Admin panel

- `/admin/login` — username + password (admin-invite only; no public signup)
- `/admin` — dashboard
- `/admin/submissions` — filterable list; `/admin/submissions/:id` for detail + notes + status
- `/admin/users` — create/delete users, change roles (admin only)
- `/admin/settings` — SMTP configuration + test email (admin only)

### Roles

| Role        | Capabilities                                               |
|-------------|------------------------------------------------------------|
| `readonly`  | View submissions and notes                                 |
| `readwrite` | View + add notes + change submission status                |
| `admin`     | All of the above + manage users + SMTP settings + delete   |

Default admin is created during Supabase setup — see [`supabase/README.md`](supabase/README.md).

## Public forms

Two public forms record to `form_submissions`:

- **Contact** (`/contact`) — name, email, message, challenge category
- **Assessment** (`/assessment`) — 5-question quiz; answers, score, recommended service stored in `payload`. Also still submits to GoHighLevel via the existing hidden-iframe path.

Rate limit: 10 submissions per IP per 10-minute rolling window.

## Deploying to Vercel

Connect the repo in the Vercel dashboard and add the three env vars. Vercel's build automatically sets `VERCEL=1`, which Nitro detects and emits `.vercel/output/` in the [Build Output API v3](https://vercel.com/docs/build-output-api/v3) format. No `vercel.json` needed.

Other targets: Nitro supports Cloudflare, Netlify, Node, etc. — pass `preset:` to the `nitro()` plugin in `vite.config.ts` or set the corresponding env var.

## SEO

- Canonical URLs and per-route `<meta>` live in each `src/routes/*.tsx` `head()` export.
- `public/robots.txt` and `public/sitemap.xml` are served from the origin.
- Social preview expects `https://skyfreightsquad.com/og-image.png` (1200×630). Drop the image into `public/og-image.png`.
