# ELARAWAVE — Premium Alkaline & Mineral Water

Marketing and commerce site for **ELARAWAVE** — premium bottled water, custom
branding, and delivery across Lahore. Built with **TanStack Start (React 19 +
Vite 7)**, **Tailwind CSS v4** and **Framer Motion**.

## Tech stack

- **Framework:** TanStack Start v1 (file-based routing, SSR-ready)
- **UI:** React 19, Tailwind CSS v4, shadcn-style components, Framer Motion
- **Icons:** lucide-react
- **Language:** TypeScript (strict)
- **Runtime:** Node ≥ 20

## Setup

```bash
npm install
```

## Development

```bash
npm run dev
```

Open http://localhost:5173

## Build

```bash
npm run build
```

Client output: `dist/client` — Server bundle: `dist/server/server.js`

## Deploying to Vercel

The repo ships with a `vercel.json` and a serverless handler at
`api/index.mjs` that wraps the TanStack Start server bundle. Just import
the project into Vercel and deploy — no extra configuration required.

- Framework preset: **Other**
- Build command: `npm run build` (default)
- Output directory: `dist/client` (default from `vercel.json`)

## Project structure

```
src/
  routes/         file-based TanStack routes
  components/     shared UI + section components
  lib/            small utilities
  styles.css      Tailwind v4 entry
public/           static assets
api/index.mjs     Vercel serverless SSR handler
```
