# ELARAWAVE

Marketing and commerce website for **ELARAWAVE** — premium alkaline & mineral
water, custom-branded bottles, and delivery across Lahore.

---

## Overview

ELARAWAVE is a full-stack marketing + light-commerce site featuring:

- Public marketing pages (Home, About, Products, Custom Branding, Gallery,
  Services, Coverage Areas, Blog, FAQs, Contact, Offers).
- Visitor account area (login, register, profile, orders, addresses,
  notifications, settings, wishlist).
- Local-storage-based **Admin Panel** for content management (products,
  homepage, media, customers, messages, newsletter, SEO, users, analytics,
  settings, custom branding).
- Cinematic hero, animated brand watermark, glass UI, motion-driven sections.

---

## Technology Stack

| Layer         | Technology                                    |
| ------------- | --------------------------------------------- |
| Framework     | TanStack Start v1 (React 19, SSR-ready)       |
| Build tool    | Vite 7                                        |
| Language      | TypeScript (strict)                           |
| Styling       | Tailwind CSS v4 (`src/styles.css`)            |
| UI primitives | shadcn-style components                       |
| Icons         | lucide-react                                  |
| Animation     | Framer Motion                                 |
| Routing       | TanStack Router (file-based, `src/routes/`)   |
| Runtime       | Node.js ≥ 20 / Cloudflare Workers / Vercel    |

---

## Folder Structure

```
elarawave/
├── api/
│   └── index.mjs                  # Vercel serverless SSR handler
├── public/
│   ├── favicon.ico
│   ├── favicon.webp
│   ├── robots.txt
│   ├── README.md                  # Asset documentation
│   └── images/                    # Public site images
├── src/
│   ├── assets/                    # Bundled images (logo, gallery)
│   ├── components/
│   │   ├── AdminAuthGate.tsx
│   │   ├── ChatbotWidget.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── Logo.tsx
│   │   ├── PageHero.tsx
│   │   ├── PanelShell.tsx
│   │   ├── PanelUI.tsx
│   │   ├── RequireAuth.tsx
│   │   ├── Reveal.tsx
│   │   ├── SiteLayout.tsx
│   │   ├── VisitorPopup.tsx
│   │   ├── WhatsappFloat.tsx
│   │   └── sections/
│   │       ├── AppSection.tsx
│   │       ├── BottleConfigurator.tsx
│   │       ├── GoogleReviews.tsx
│   │       ├── HomeSections.tsx
│   │       └── Newsletter.tsx
│   ├── hooks/
│   │   ├── use-mobile.tsx
│   │   └── use-wishlist.ts
│   ├── lib/
│   │   ├── admin-auth.ts          # Local-storage admin auth
│   │   ├── api.ts
│   │   ├── auth.tsx               # Visitor auth context
│   │   ├── error-*.ts
│   │   └── utils.ts
│   ├── routes/                    # File-based routes (TanStack)
│   │   ├── __root.tsx
│   │   ├── index.tsx              # /
│   │   ├── about.tsx
│   │   ├── products.tsx
│   │   ├── custom-branding.tsx
│   │   ├── gallery.tsx
│   │   ├── services.tsx
│   │   ├── coverage-areas.tsx
│   │   ├── offers.tsx
│   │   ├── blog.tsx
│   │   ├── faqs.tsx
│   │   ├── contact.tsx
│   │   ├── privacy-policy.tsx
│   │   ├── terms.tsx
│   │   ├── login.tsx
│   │   ├── register.tsx
│   │   ├── forgot-password.tsx
│   │   ├── reset-password.tsx
│   │   ├── account.tsx            # Visitor account layout
│   │   ├── account.*.tsx          # Profile, orders, wishlist, ...
│   │   ├── admin.tsx              # Admin layout (gated)
│   │   ├── admin.*.tsx            # Admin pages
│   │   └── sitemap[.]xml.ts
│   ├── router.tsx
│   ├── server.ts
│   ├── start.ts
│   ├── styles.css                 # Tailwind v4 entry
│   └── routeTree.gen.ts           # Auto-generated (do not edit)
├── package.json
├── tsconfig.json
├── vite.config.ts
├── vercel.json
├── eslint.config.js
├── components.json
└── README.md
```

---

## Installation

```bash
npm install
```

Requires Node.js 20 or newer.

---

## Environment Variables

The site runs with **no required environment variables**. Everything the
public pages need is bundled at build time; the admin panel stores its
session in `localStorage`.

If you later wire in third-party services (email, analytics, payments),
add them to a `.env` file at the project root and expose browser-safe
values with the `VITE_` prefix (e.g. `VITE_GA_ID=…`). Server-only values
should be read inside server functions via `process.env.*`.

---

## Build Commands

| Command           | Purpose                                    |
| ----------------- | ------------------------------------------ |
| `npm run dev`     | Start the dev server on http://localhost:5173 |
| `npm run build`   | Production build → `dist/client` + `dist/server/server.js` |
| `npm run preview` | Preview the production build locally       |
| `npm run lint`    | Run ESLint over the codebase               |

---

## Deployment

### Vercel

The repo ships with `vercel.json` and a serverless SSR handler at
`api/index.mjs`.

1. Import the project into Vercel.
2. Framework preset: **Other**.
3. Build command: `npm run build` (default).
4. Output directory: `dist/client` (already set by `vercel.json`).
5. Deploy.

### Any Node host

`npm run build` produces `dist/server/server.js` — a standard fetch handler
that runs on Node 20+, Cloudflare Workers, or any edge runtime that
supports the Web Fetch API.

---

## Features

- Cinematic animated hero with oversized ELARA watermark.
- Fully responsive marketing pages with Framer Motion transitions.
- Product catalog with per-user **Wishlist** (per-account, isolated).
- Custom-branding portfolio and bottle configurator.
- Coverage-area map, gallery, blog, FAQs, contact.
- Visitor authentication (register, login, forgot / reset password, account
  center with profile, orders, addresses, notifications, settings, wishlist).
- Admin panel with local-storage authentication and section pages for
  products, homepage, media, customers, messages, newsletter, SEO, users,
  analytics, settings, and custom branding.
- WhatsApp float, chatbot widget, newsletter capture, Google-reviews section.

---

## API Configuration

The site does not require any external API to run. Client code calls into
TanStack Start **server functions** (see `src/lib/api.ts` and `*.functions.ts`
modules) which execute in the SSR runtime.

To integrate a real backend later:

1. Add credentials to `.env` (server-only keys **without** the `VITE_` prefix).
2. Read them inside server-function `.handler()` bodies via `process.env.*`.
3. Keep browser-safe values behind `import.meta.env.VITE_*`.

---

## Admin Authentication

The Admin Panel at `/admin` uses **local-storage-only authentication** —
no backend, no API, no database.

- Route: `/admin`
- Username: `elarawave123`
- Password: `1234567890`
- Session TTL: **7 days**, then auto-expires and redirects back to sign in.
- Implementation: `src/lib/admin-auth.ts`, `src/components/AdminAuthGate.tsx`.

Change the credentials by editing the constants in `src/lib/admin-auth.ts`.

---

## Visitor Authentication

Visitors register and sign in from `/register` and `/login`. The auth
context lives in `src/lib/auth.tsx`. Sessions persist locally per user, and
each account gets an isolated **Wishlist** managed by `src/hooks/use-wishlist.ts`
(keyed by user id in `localStorage`).

The visitor auth flow is intentionally decoupled from the admin flow —
signing into `/login` does **not** grant access to `/admin`, and vice versa.

---

## Custom Branding Overview

The `/custom-branding` page showcases ELARAWAVE's private-label service:

- Bottle configurator (`src/components/sections/BottleConfigurator.tsx`) —
  choose bottle size and label style, preview live.
- Portfolio of past client projects (Timmy Tiles, Timmy Sanitary,
  Sapphire Sports, and more) sourced from `/public/images/`.
- CTA to the contact page for enquiries.

Admins can edit the portfolio entries and configurator options from
`/admin/custom-branding`.

---

## License

Proprietary — © ELARAWAVE. All rights reserved.
