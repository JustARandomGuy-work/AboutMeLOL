# About Me

A modern link-in-bio platform for creators — one link, every platform. Free tier + $9 lifetime premium.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm --filter @workspace/link-in-bio run dev` — run the frontend (port from env)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React 19 + Vite + Tailwind CSS v4 + Wouter
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Auth: Supabase (Discord OAuth + Google OAuth + email/password)
- Media: Cloudflare R2 (presigned URLs for avatar uploads)
- Payments: PayPal ($9 one-time lifetime premium)
- Validation: Zod (zod/v4), drizzle-zod
- API codegen: Orval (from OpenAPI spec)

## Where things live

- `artifacts/link-in-bio/` — React frontend (landing page, auth, dashboard, public profiles)
- `artifacts/api-server/` — Express API server
- `lib/db/` — Drizzle ORM schema + migrations
- `lib/api-spec/` — OpenAPI spec + Orval codegen config
- `lib/api-client-react/` — Generated React Query hooks + Zod schemas

## Architecture decisions

- Supabase handles auth (JWT verification via `jose`); the API validates tokens in middleware
- File uploads go directly from browser to Cloudflare R2 via presigned URLs — the API never proxies binary data
- PayPal one-time payment flow: frontend creates order → user approves → frontend captures → API marks user as premium
- Public profile pages are served at `/:username` on the frontend and read from the API at `/api/profiles/:username`
- Reserved usernames: admin, api, dashboard, login, register, upgrade, settings, help, support, about, terms, privacy, blog

## Product

- **Landing page** — hero, bento features grid, profile showcase, pricing, CTA
- **Auth** — login, register, forgot password (Supabase)
- **Public profile** — `/:username` shows links, social icons, themed page
- **Dashboard** — links (drag-and-drop), appearance (themes, gradients), analytics (Recharts), settings
- **Upgrade** — PayPal $9 lifetime premium flow

## Deploying to Vercel

The project deploys as **two separate Vercel projects**: one for the frontend and one for the API.

### 1 — Push to GitHub

Push this entire repo to GitHub. Then create two Vercel projects from it.

### 2 — Frontend (link-in-bio)

In the Vercel dashboard → New Project → import your repo:

| Setting | Value |
|---|---|
| Root Directory | `artifacts/link-in-bio` |
| Framework Preset | Other |
| Build Command | `cd ../.. && pnpm install --frozen-lockfile && pnpm exec vite build --config vite.vercel.config.ts` |
| Output Directory | `dist` |
| Install Command | *(leave blank — handled by build command)* |

**Environment variables to set in Vercel:**
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_PAYPAL_CLIENT_ID=your-paypal-client-id
VITE_API_URL=https://your-api-project.vercel.app
```

### 3 — API server

In the Vercel dashboard → New Project → same repo, second project:

| Setting | Value |
|---|---|
| Root Directory | `artifacts/api-server` |
| Framework Preset | Other |
| Build Command | `cd ../.. && pnpm install --frozen-lockfile` |
| Output Directory | *(leave blank)* |

**Environment variables to set in Vercel:**
```
DATABASE_URL=postgresql://...
SUPABASE_JWT_SECRET=your-supabase-jwt-secret
PAYPAL_CLIENT_ID=your-paypal-client-id
PAYPAL_CLIENT_SECRET=your-paypal-client-secret
R2_ACCOUNT_ID=your-cloudflare-account-id
R2_ACCESS_KEY_ID=your-r2-access-key-id
R2_SECRET_ACCESS_KEY=your-r2-secret-access-key
R2_BUCKET_NAME=your-bucket-name
R2_PUBLIC_URL=https://pub-xxx.r2.dev
APP_DOMAIN=https://about-me.lol
SESSION_SECRET=a-long-random-string
```

### 4 — After both are deployed

1. Copy the API deployment URL (e.g. `https://about-me-api.vercel.app`) and set it as `VITE_API_URL` in the **frontend** Vercel project, then redeploy
2. In your Supabase dashboard → Authentication → URL Configuration, add your Vercel frontend URL as a redirect URL
3. Run `pnpm --filter @workspace/db run push` once with your production `DATABASE_URL` to migrate the schema

## Environment variables reference

See `.env.example` for a full list with descriptions.

## User preferences

- Site name: **About Me**
- Brand color: purple (--primary: 280 100% 65%)
- Background: very dark purple (264 60% 5%)
- Pricing: $0 free forever, $9 one-time lifetime premium

## Gotchas

- `vite.config.ts` requires `PORT` and `BASE_PATH` env vars — Replit sets these via workflow config. For Vercel use `vite.vercel.config.ts` instead.
- After DB schema changes run `pnpm run typecheck:libs` before leaf artifact checks.
- The `pnpm-workspace.yaml` has `esbuild` overrides that pin to linux-x64 only — this is fine for Vercel (also linux) but won't work on Windows/Mac dev machines locally without removing those overrides.
- When adding new reserved usernames, update both the API validation and the frontend router.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
