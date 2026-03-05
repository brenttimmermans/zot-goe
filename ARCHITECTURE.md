# Architecture

## Overview

- Static photography portfolio site built with Astro and Tailwind, deployed as pre-rendered HTML.
- Content is stored as Astro content collections in YAML and rendered into pages at build time.

## Tech Stack

- Framework: Astro 5 (`package.json`)
- Styling: Tailwind CSS 4 via Vite plugin (`tailwind.config.mjs`, `astro.config.mjs`)
- Content: Astro Content Collections (`src/content/config.ts`)
- Lightbox: GLightbox (`src/pages/projects/[slug].astro`)
- Forms: Web3Forms POST (`src/components/ContactForm.astro`)
- Deploy target: Cloudflare Pages (from `AGENTS.md`)

## Directory Structure

```
.
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
├── public/
│   └── images/                  # Pre-optimized assets served as-is
└── src/
    ├── components/              # Reusable UI pieces
    ├── content/
    │   ├── config.ts             # Content collection schema
    │   └── projects/             # YAML project entries
    ├── layouts/                  # Base layout + document head
    ├── pages/                    # Route entry points
    └── styles/                   # Tailwind + font setup
```

## Core Components

- Layout shell: `src/layouts/BaseLayout.astro` sets meta tags, JSON-LD, and page chrome.
- Navigation: `src/components/Navbar.astro` renders sticky nav and active-link state.
- Hero: `src/components/HeroSection.astro` renders the home hero copy + image.
- Project card: `src/components/ProjectCard.astro` renders card + highlight images.
- Footer: `src/components/Footer.astro` renders copyright year.
- Contact form: `src/components/ContactForm.astro` posts to Web3Forms.

## Pages / Entry Points

- Home: `src/pages/index.astro`
  - Loads `projects` collection, sorts by date, slices 4 featured items.
- Projects index: `src/pages/projects/index.astro`
  - Loads all projects, sorts by date, lists cards.
- Project detail: `src/pages/projects/[slug].astro`
  - `getStaticPaths` builds static routes from project IDs.
  - Renders gallery with GLightbox for full-screen viewing.
- Contact: `src/pages/contact.astro`
  - Renders success state based on `?success=true` query param.

## Data Flow

- Content source: YAML files in `src/content/projects/*.yaml`.
- Schema: `src/content/config.ts` validates fields (title, description, date, cover, imageFolder, highlights, gallery).
- Build-time load: Pages call `getCollection("projects")` to access entries.
- Render: pages map collection entries into components, with structured data JSON-LD injected by `BaseLayout`.

## External Integrations

- Web3Forms endpoint: `https://api.web3forms.com/submit` (`src/components/ContactForm.astro`).
- GLightbox: client-side lightbox initialized in `src/pages/projects/[slug].astro`.
- Sitemap: `@astrojs/sitemap` integration (`astro.config.mjs`).

## Configuration

- Site URL: `site: "https://zotgoe.be"` in `astro.config.mjs`.
- Tailwind theme colors: `tailwind.config.mjs` and CSS tokens in `src/styles/global.css`.
- Fonts: `src/styles/fonts.css` loads Montserrat variable font.
- Node version: `.node-version` uses Node 22.

## Build & Deploy

- Local dev: `npm run dev` (`package.json`).
- Build: `npm run build` outputs static site to `dist/`.
- Preview: `npm run preview`.
- Deploy: Cloudflare Pages (documented in `AGENTS.md`).
