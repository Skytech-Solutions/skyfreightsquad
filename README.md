# Skylight Squad

Marketing site for **SkyFreightSquad** — 24/7 freight back-office (dispatch, track & trace, billing, customer support) for freight brokers and 3PL operators.

## Stack

- **Framework** — TanStack Start (SSR) + TanStack Router (file-based routing)
- **Build** — Vite, configured via [`@lovable.dev/vite-tanstack-config`](https://www.npmjs.com/package/@lovable.dev/vite-tanstack-config)
- **Deploy** — Cloudflare Workers (see `wrangler.jsonc`)
- **Styling** — Tailwind CSS v4 + a pruned shadcn/ui set
- **Motion** — Framer Motion

## Prerequisites

- Node 20+
- pnpm 10+ (`corepack enable` then `corepack use pnpm@10`)

## Scripts

```bash
pnpm install      # install deps
pnpm dev          # local dev server
pnpm build        # production build (outputs to dist/)
pnpm preview      # preview the production build
pnpm lint         # eslint
```

## Project layout

```
src/
  routes/              # file-based pages (TanStack Router)
    services/          # nested /services/* pages
  components/          # layout + section components
    ui/                # shadcn primitives (only the 7 in use)
    home/              # home page sections
  hooks/               # custom hooks
  lib/                 # utilities
  styles.css           # Tailwind + brand tokens
public/                # static assets, robots.txt, sitemap.xml
wrangler.jsonc         # Cloudflare Workers config
```

## Deploying

The production build is deployed as a Cloudflare Worker. Manual deploy:

```bash
pnpm build
npx wrangler deploy
```

## SEO

- Canonical URLs and per-route `<meta>` live in each `src/routes/*.tsx` `head()` export.
- `public/robots.txt` and `public/sitemap.xml` are served from the origin.
- Social preview expects `https://skyfreightsquad.com/og-image.png` (1200×630). Drop the image into `public/og-image.png`.
