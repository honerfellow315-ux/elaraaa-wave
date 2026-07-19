# ELARAWAVE — Image & Asset Documentation

Complete inventory of every image used by the site. Filenames are
referenced from code — do **not** rename without updating the imports.

Two locations hold images:

- `public/images/` — served as-is under `/images/...` at runtime.
- `src/assets/` — bundled and hashed by Vite; imported from components.

---

## Root static files

| File | Location | Used on | Component | Purpose | Category |
| ---- | -------- | ------- | --------- | ------- | -------- |
| `favicon.ico` | `public/` | All pages | Browser tab | Browser favicon | Icon |
| `favicon.webp` | `public/` | All pages | `<link rel="icon">` in `__root.tsx` | High-res favicon | Icon |

---

## Bundled assets (`src/assets/`)

| File | Used on | Component | Purpose | Aspect ratio | Recommended resolution | Category |
| ---- | ------- | --------- | ------- | ------------ | ---------------------- | -------- |
| `elara-logo.webp` | Global (header, footer, hero watermark) | `Logo.tsx`, `HomeSections.tsx` (Hero) | Primary brand logo + cinematic hero watermark | 1:1 (square, transparent) | 1024×1024 | Logo |
| `hero-bottles.jpg.asset.json` | Home | `HomeSections.tsx` | Hero product still (bottle line-up) | 16:9 | 1920×1080 | Hero |
| `gallery-1.webp` … `gallery-10.webp` | Gallery, Home teaser | `routes/gallery.tsx`, `HomeSections.tsx` | Lifestyle & product gallery | 4:3 landscape | 1200×900 | Gallery |

---

## Public site images (`public/images/`)

### Hero / backgrounds

| File | Used on | Component | Purpose | Aspect ratio | Recommended resolution | Category |
| ---- | ------- | --------- | ------- | ------------ | ---------------------- | -------- |
| `hero-bg-image.webp` | Home | `HomeSections.tsx` (Hero) | Hero background composition | 16:9 | 1920×1080 | Hero / Background |
| `about-plant.webp` | About | `routes/about.tsx` | Bottling plant photo | 3:2 | 1200×800 | Background |
| `app-showcase.webp` | Home | `sections/AppSection.tsx` | Mobile app mockup | 3:4 portrait | 1200×1400 | Product / Showcase |

### Home product cards

| File | Component | Purpose | Aspect ratio | Recommended resolution | Category |
| ---- | --------- | ------- | ------------ | ---------------------- | -------- |
| `home-mineral-water.webp` | `HomeSections.tsx` → `ProductCards` | Mineral water card | 4:3 | 800×600 | Product |
| `alkaline-water.png` | `HomeSections.tsx` → `ProductCards` | Alkaline water card | 4:3 | 800×600 | Product |
| `primium-water.png` | `HomeSections.tsx` → `ProductCards` | Premium water card | 4:3 | 800×600 | Product |
| `bottle-real-1.png` | `HomeSections.tsx` → `ProductCards` | 19L + 5L bottles card | 4:3 | 800×600 | Product |

### Products page (`public/images/bottles/`)

Used by `routes/products.tsx`.

| File | Purpose | Aspect ratio | Recommended resolution | Category |
| ---- | ------- | ------------ | ---------------------- | -------- |
| `mineral-250ml.webp` | Mineral 250 ml SKU | 2:3 portrait | 800×1200 | Product |
| `mineral-330ml.webp` | Mineral 330 ml SKU | 2:3 | 800×1200 | Product |
| `mineral-500ml.webp` | Mineral 500 ml SKU | 2:3 | 800×1200 | Product |
| `mineral-1.5l.webp` | Mineral 1.5 L SKU | 2:3 | 800×1200 | Product |
| `mineral-5l.webp` | Mineral 5 L SKU | 2:3 | 800×1200 | Product |
| `mineral-19l.webp` | Mineral 19 L SKU | 2:3 | 800×1200 | Product |
| `alkaline-250ml.webp` | Alkaline 250 ml SKU | 2:3 | 800×1200 | Product |
| `alkaline-330ml.webp` | Alkaline 330 ml SKU | 2:3 | 800×1200 | Product |
| `alkaline-500ml.webp` | Alkaline 500 ml SKU | 2:3 | 800×1200 | Product |
| `alkaline-1.5l.webp` | Alkaline 1.5 L SKU | 2:3 | 800×1200 | Product |
| `alkaline-19l.webp` | Alkaline 19 L SKU | 2:3 | 800×1200 | Product |
| `premium-330ml.webp` | Premium 330 ml SKU | 2:3 | 800×1200 | Product |
| `premium-500ml.webp` | Premium 500 ml SKU | 2:3 | 800×1200 | Product |
| `premium-1l.webp` | Premium 1 L SKU | 2:3 | 800×1200 | Product |

### Custom Branding portfolio

Used on `routes/custom-branding.tsx` and the Home "Custom Branding" teaser.

| File | Component | Purpose | Aspect ratio | Recommended resolution | Category |
| ---- | --------- | ------- | ------------ | ---------------------- | -------- |
| `project-timmy-tiles.webp` | `CustomBrandingTeaser` | Client project — Timmy Tiles | 3:2 | 1200×800 | Custom Branding |
| `project-timmy-sanitary.webp` | `CustomBrandingTeaser` | Client project — Timmy Sanitary | 3:2 | 1200×800 | Custom Branding |
| `project-sapphire-sports.webp` | `CustomBrandingTeaser` | Client project — Sapphire Sports | 3:2 | 1200×800 | Custom Branding |
| `project-four.webp` | `CustomBrandingTeaser` | Portfolio slot 4 | 3:2 | 1200×800 | Custom Branding |
| `project-five.webp` | `CustomBrandingTeaser` | Portfolio slot 5 | 3:2 | 1200×800 | Custom Branding |

### Bottle configurator

Used by `sections/BottleConfigurator.tsx` on `/custom-branding`.

| File | Purpose | Aspect ratio | Recommended resolution | Category |
| ---- | ------- | ------------ | ---------------------- | -------- |
| `label-classic.webp` | Classic label option | 2:3 portrait | 600×900 | Custom Branding |
| `label-sport.webp` | Sport label option | 2:3 | 600×900 | Custom Branding |
| `label-luxury.webp` | Luxury label option | 2:3 | 600×900 | Custom Branding |
| `bottle-blank.webp` | Blank bottle preview base | 2:3 (transparent PNG best) | 800×1200 | Product / Base |

---

## Guidelines

- **Format:** WebP preferred for photos, PNG only where transparency is
  needed (labels overlaid on the blank bottle).
- **Weight:** keep each file under **300 KB**; compress with `cwebp -q 82`
  or an equivalent tool.
- **Naming:** kebab-case, no spaces, no capital letters, no version
  suffixes — filenames are referenced verbatim from the source code.
- **Do not delete or rename** any file listed above without updating every
  import/reference in `src/`.
- New images that need bundling and hashing should be added under
  `src/assets/` and imported (e.g. `import img from "@/assets/foo.webp"`).
  Files that must keep a stable URL (SEO, sharing, external references)
  belong in `public/images/`.
