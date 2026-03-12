# Architecture

## Overview

**Zot Goe** is a photography portfolio website built with Astro, Tailwind CSS, and TypeScript. It showcases photography projects with a gallery view, project details, and a contact form for inquiries.

## Tech Stack

| Layer          | Technology                        |
| -------------- | --------------------------------- |
| **Framework**  | Astro 5.17.1                      |
| **Styling**    | Tailwind CSS 4.2.1 + custom theme |
| **Language**   | TypeScript (strict mode)          |
| **Content**    | Astro Content Collections (YAML)  |
| **Linting**    | Biome 2.x                          |
| **Formatting** | Biome 2.x                          |
| **Git Hooks**  | Husky 9.1.7 + lint-staged         |
| **Gallery**    | GLightbox 3.3.1                   |
| **SEO**        | Astro Sitemap 3.7.0               |

## Directory Structure

```
zot-goe/
├── src/
│   ├── pages/                    # Route-based pages (auto-generates routes)
│   │   ├── index.astro          # Home page with featured projects
│   │   ├── contact.astro        # Contact form page
│   │   └── projects/
│   │       ├── index.astro      # All projects listing
│   │       └── [slug].astro     # Dynamic project detail page
│   ├── components/              # Reusable Astro components
│   │   ├── BaseLayout.astro     # Root layout with SEO/meta
│   │   ├── Navbar.astro         # Navigation with active state
│   │   ├── Footer.astro         # Footer with copyright
│   │   ├── HeroSection.astro    # Homepage hero
│   │   ├── ProjectCard.astro    # Project preview card
│   │   └── ContactForm.astro    # Web3Forms contact form
│   ├── layouts/
│   │   └── BaseLayout.astro     # Main layout wrapper
│   ├── content/
│   │   ├── config.ts            # Content collection schema
│   │   └── projects/            # Project data (YAML)
│   │       ├── spa-24-001.yaml
│   │       └── spa-24-002.yaml
│   └── styles/
│       ├── global.css           # Tailwind + theme variables
│       ├── fonts.css            # Font imports
│       └── fonts/
│           └── montserrat-variable.ttf
├── public/                      # Static assets (images, favicon)
├── astro.config.mjs            # Astro configuration
├── tailwind.config.mjs          # Tailwind theme config
├── tsconfig.json               # TypeScript config (strict)
├── biome.json                  # Biome lint & format rules
├── .husky/                     # Git hooks
└── package.json                # Dependencies & scripts
```

## Core Components

### Pages

| File                              | Purpose                                                 |
| --------------------------------- | ------------------------------------------------------- |
| `src/pages/index.astro`           | Home page: hero + featured projects (4 latest) + CTA    |
| `src/pages/projects/index.astro`  | All projects listing, sorted by date (newest first)     |
| `src/pages/projects/[slug].astro` | Dynamic project detail with masonry gallery + GLightbox |
| `src/pages/contact.astro`         | Contact form with success state                         |

### Layouts

| File                           | Purpose                                                     |
| ------------------------------ | ----------------------------------------------------------- |
| `src/layouts/BaseLayout.astro` | Root layout: SEO meta, navbar, footer, skip-to-content link |

### Components

| File                | Purpose                                                       |
| ------------------- | ------------------------------------------------------------- |
| `Navbar.astro`      | Sticky navigation with active link detection                  |
| `Footer.astro`      | Footer with copyright year                                    |
| `HeroSection.astro` | Large hero with title + image                                 |
| `ProjectCard.astro` | Project preview: title, description, date, 3 highlight images |
| `ContactForm.astro` | Form with Web3Forms integration (requires API key)            |

### Content

| File                          | Purpose                                                 |
| ----------------------------- | ------------------------------------------------------- |
| `src/content/config.ts`       | Zod schema for projects collection                      |
| `src/content/projects/*.yaml` | Project data: title, description, date, images, gallery |

## Data Flow

```
User Request
    ↓
Astro Router (file-based routing)
    ↓
Page Component (e.g., [slug].astro)
    ↓
getCollection("projects") → Content Collection
    ↓
Render with BaseLayout + Components
    ↓
Tailwind CSS + Global Styles
    ↓
HTML + Structured Data (JSON-LD)
    ↓
Browser (with GLightbox script for galleries)
```

### Project Data Schema

```typescript
{
  title: string              // Project name
  description: string        // Short description
  date: Date                 // Project date (YYYY-MM-DD)
  cover: string              // OG image path
  imageFolder: string        // Folder containing images
  highlights: string[]       // 3 highlight image paths
  gallery: string[]          // All gallery image paths (1+)
}
```

## External Integrations

| Service           | Purpose                    | Config                                                 |
| ----------------- | -------------------------- | ------------------------------------------------------ |
| **Web3Forms**     | Contact form submission    | `ContactForm.astro` (requires API key in `access_key`) |
| **GLightbox**     | Image gallery lightbox     | `src/pages/projects/[slug].astro`                      |
| **Astro Sitemap** | Auto-generated sitemap.xml | `astro.config.mjs`                                     |

## Configuration

### Environment

- **Site URL**: `https://zotgoe.be` (in `astro.config.mjs`)
- **Language**: English (`lang="en"` in BaseLayout)

### Styling

Custom Tailwind theme in `src/styles/global.css`:

```css
--color-bg: #f5f4f0 /* Background */ --color-surface: #eceae4 /* Card/surface */
  --color-muted: #b0ada6 /* Secondary text */ --color-body: #4a4845 /* Body text */
  --color-heading: #2c2a27 /* Headings */ --color-accent: #6b6863 /* Links/hover */;
```

### Linting & Formatting

- **Biome**: Config in `biome.json` (lint + format)
- **Husky**: Pre-commit hook runs lint + format on staged files

## Build & Deploy

| Command           | Action                            |
| ----------------- | --------------------------------- |
| `npm install`     | Install dependencies              |
| `npm run dev`     | Start dev server (localhost:4321) |
| `npm run build`   | Build to `./dist/`                |
| `npm run preview` | Preview production build locally  |
| `npm run lint`    | Run Biome lint                    |
| `npm run format`  | Run Biome format                  |
| `npm run check`   | Run Biome check (lint + format)   |
| `npm run astro`   | Run Astro CLI commands            |

### Pre-commit Hooks

Husky + lint-staged automatically:

1. Run `biome check --write` on staged `*.astro`, `*.ts`, `*.json`, `*.css`, `*.md`, `*.yaml`, `*.yml` files

## SEO & Metadata

All pages include:

- Meta description
- Open Graph tags (title, description, image, URL)
- Twitter Card tags
- Canonical URL
- Structured data (JSON-LD) for schema.org

Examples:

- Home: `WebSite` + `Person` schema
- Projects: `CollectionPage` schema
- Project detail: `ImageGallery` schema
- Contact: `ContactPage` schema
