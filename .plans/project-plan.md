# Zot Goe — Photography Portfolio Website

## Project Plan & Technical Overview

---

## 1. Project Summary

**Zot Goe** is a minimalist photography portfolio website built with **Astro**, styled with **Tailwind CSS**, and deployed on **Cloudflare Pages**. The site showcases photography projects through a clean, image-forward design with three core pages: Home, Projects, and Contact.

**Design direction:** Neutral palette with an off-white background. All text and UI elements use shades of grey between white and black — no pure white (`#fff`) and no pure black (`#000`). The photography should be the only source of colour on the page.

---

## 2. Technology Stack

| Layer      | Technology                        | Rationale                                                                                      |
| ---------- | --------------------------------- | ---------------------------------------------------------------------------------------------- |
| Framework  | Astro (v5.x)                      | Static-first, content collections for YAML-driven data, zero JS by default                     |
| Styling    | Tailwind CSS (v4.x)               | Utility-first, rapid prototyping, small production bundle                                      |
| Deployment | Cloudflare Pages                  | Global CDN, automatic builds from Git, free tier generous for portfolios                       |
| Forms      | Web3Forms                         | No backend needed, free tier, simple API integration                                           |
| Lightbox   | GLightbox                         | Lightweight (~11 KB), no dependencies, touch-friendly, accessible                              |
| Content    | YAML + static images in `public/` | Each project is a YAML file referencing a folder of pre-optimized images — no CMS, no database |
| Node.js    | v22.x                             | Runtime for development and Cloudflare Pages builds                                            |

---

## 3. Project Structure

```
zot-goe/
├── astro.config.mjs
├── tailwind.config.mjs
├── package.json
├── tsconfig.json
├── AGENT.md                          # Agent/LLM development guide
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   ├── images/
│   │   ├── hero.jpg                  # Hero section photo
│   │   └── projects/
│   │       ├── urban-decay/
│   │       │   ├── highlight-1.jpg
│   │       │   ├── highlight-2.jpg
│   │       │   ├── highlight-3.jpg
│   │       │   ├── gallery-01.jpg
│   │       │   ├── gallery-02.jpg
│   │       │   └── ...
│   │       └── coastal-light/
│   │           ├── highlight-1.jpg
│   │           ├── highlight-2.jpg
│   │           ├── highlight-3.jpg
│   │           ├── gallery-01.jpg
│   │           └── ...
├── src/
│   ├── layouts/
│   │   └── BaseLayout.astro          # HTML shell, <head>, meta, footer
│   ├── components/
│   │   ├── Navbar.astro              # Simple nav: Home | Projects | Contact
│   │   ├── Footer.astro              # Copyright + minimal links
│   │   ├── ProjectCard.astro         # 4-column card (title+desc | 3 photos)
│   │   ├── HeroSection.astro         # Full-height welcome screen
│   │   └── ContactForm.astro         # Web3Forms integration
│   ├── pages/
│   │   ├── index.astro               # Home
│   │   ├── projects/
│   │   │   ├── index.astro           # Projects listing
│   │   │   └── [slug].astro          # Dynamic project detail page
│   │   └── contact.astro             # Contact form
│   ├── content/
│   │   ├── config.ts                 # Content collection schema
│   │   └── projects/
│   │       ├── urban-decay.yaml
│   │       └── coastal-light.yaml
│   └── styles/
│       └── global.css                # Tailwind directives + custom fonts
```

Key structural decisions:

- All images live in `public/images/` so they are served as-is without any Astro processing. Images are pre-optimized by the owner before being added to the project.
- Project YAML files remain in `src/content/projects/` to leverage Astro's content collections for type-safe querying and schema validation.
- The `AGENT.md` file sits at the project root as a development guide for AI coding agents.

---

## 4. Content Model — Project YAML

Each project is represented by a single YAML file inside `src/content/projects/`. The filename becomes the URL slug.

```yaml
# src/content/projects/urban-decay.yaml
title: "Urban Decay"
description: "Abandoned industrial spaces reclaimed by nature across Northern Europe."
date: 2025-06-15
cover: "/images/projects/urban-decay/highlight-1.jpg" # Absolute path from public/
imageFolder: "urban-decay" # Folder name inside public/images/projects/
highlights: # Exactly 3 images for the ProjectCard
  - "/images/projects/urban-decay/highlight-1.jpg"
  - "/images/projects/urban-decay/highlight-2.jpg"
  - "/images/projects/urban-decay/highlight-3.jpg"
gallery: # All gallery images (explicit list)
  - "/images/projects/urban-decay/gallery-01.jpg"
  - "/images/projects/urban-decay/gallery-02.jpg"
  - "/images/projects/urban-decay/gallery-03.jpg"
  - "/images/projects/urban-decay/gallery-04.jpg"
  - "/images/projects/urban-decay/gallery-05.jpg"
tags:
  - urban
  - architecture
  - europe
```

Since images are in `public/` and not processed by Astro, paths are absolute URLs from the site root (e.g., `/images/projects/urban-decay/highlight-1.jpg`). The `gallery` array explicitly lists all images for the detail page — this gives full control over ordering and which images appear.

**Astro Content Collection Schema** (`src/content/config.ts`):

```typescript
import { defineCollection, z } from "astro:content";

const projects = defineCollection({
  type: "data",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    cover: z.string(),
    imageFolder: z.string(),
    highlights: z.array(z.string()).length(3),
    gallery: z.array(z.string()).min(1),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = { projects };
```

---

## 5. Colour Palette

The design uses a strictly neutral palette. Define these as Tailwind theme tokens in `tailwind.config.mjs`:

```javascript
// tailwind.config.mjs
export default {
  theme: {
    extend: {
      colors: {
        bg: "#F5F4F0", // Off-white background
        surface: "#ECEAE4", // Slightly darker for cards, sections
        muted: "#B0ADA6", // Muted text, borders, dividers
        body: "#4A4845", // Body text
        heading: "#2C2A27", // Headings, strong text
        accent: "#6B6863", // Hover states, secondary elements
      },
    },
  },
};
```

Usage: `bg-bg`, `text-heading`, `text-body`, `border-muted`, `bg-surface`. No `text-black`, no `text-white`, no `bg-white`, no `bg-black` anywhere in the codebase.

---

## 6. Page-by-Page Design Specification

### 6.1 Home Page (`index.astro`)

The homepage has three distinct vertical sections:

**Section A — Hero (full viewport height)**

```
┌──────────────────────────────────────────────────┐
│  [Navbar]  Home  ·  Projects  ·  Contact         │
│                                                  │
│   ZOT GOE              ┌──────────────────┐      │
│   ─────────             │                  │      │
│   Photography that      │   [Hero Photo]   │      │
│   captures the          │                  │      │
│   unseen.               │                  │      │
│                         └──────────────────┘      │
│                                                  │
└──────────────────────────────────────────────────┘
```

- Full `h-screen` section with a CSS grid or flex layout: text left, image right
- The heading text is large and bold (e.g., `text-5xl md:text-7xl font-bold text-heading`)
- A subtle tagline or one-liner sits below the heading in `text-body`
- The hero photo uses a plain `<img>` tag pointing to `/images/hero.jpg` with `loading="eager"`
- Navbar is minimal: wordmark on the left, three links on the right, no background — it floats over the hero

**Section B — Featured Projects**

```
┌──────────────────────────────────────────────────┐
│  SELECTED WORK                                   │
│                                                  │
│  ┌─────────┬────────┬────────┬────────┐          │
│  │  Title  │ Photo  │ Photo  │ Photo  │          │
│  │  Desc   │   1    │   2    │   3    │  ← Card  │
│  └─────────┴────────┴────────┴────────┘          │
│           ↕ gap-4 between cards                  │
│  ┌─────────┬────────┬────────┬────────┐          │
│  │  Title  │ Photo  │ Photo  │ Photo  │          │
│  │  Desc   │   1    │   2    │   3    │  ← Card  │
│  └─────────┴────────┴────────┴────────┘          │
│                                                  │
│            [ View All Projects → ]               │
└──────────────────────────────────────────────────┘
```

- Section heading: "Selected Work" or similar
- Displays 2–4 `ProjectCard` components (latest or hand-picked via a `featured: true` YAML field)
- Cards are stacked vertically with `gap-4` (or `gap-6`) spacing between them
- A "View All Projects" link below the cards navigates to `/projects`

**Section C — Call-to-Action + Footer**

```
┌──────────────────────────────────────────────────┐
│                                                  │
│          Let's work together.                    │
│          [ Get in Touch → ]                      │
│                                                  │
├──────────────────────────────────────────────────┤
│  © 2026 Zot Goe. All rights reserved.            │
└──────────────────────────────────────────────────┘
```

- A simple centered CTA block with a link/button to `/contact`
- Footer is minimal: copyright line, optionally social links

---

### 6.2 Projects Page (`projects/index.astro`)

```
┌──────────────────────────────────────────────────┐
│  [Navbar]                                        │
│                                                  │
│  PROJECTS                                        │
│                                                  │
│  ┌─────────┬────────┬────────┬────────┐          │
│  │  Title  │ Photo  │ Photo  │ Photo  │  → link  │
│  │  Desc   │   1    │   2    │   3    │          │
│  └─────────┴────────┴────────┴────────┘          │
│           ↕ gap-4                                │
│  ┌─────────┬────────┬────────┬────────┐          │
│  │  Title  │ Photo  │ Photo  │ Photo  │  → link  │
│  │  Desc   │   1    │   2    │   3    │          │
│  └─────────┴────────┴────────┴────────┘          │
│           ↕ gap-4                                │
│  ┌─────────┬────────┬────────┬────────┐          │
│  │  Title  │ Photo  │ Photo  │ Photo  │  → link  │
│  │  Desc   │   1    │   2    │   3    │          │
│  └─────────┴────────┴────────┴────────┘          │
│                                                  │
│  [Footer]                                        │
└──────────────────────────────────────────────────┘
```

- Reuses the same `ProjectCard` component from the homepage
- Lists all projects, sorted by date (newest first)
- Each card is an `<a>` link wrapping the entire card, navigating to `/projects/{slug}`
- Vertical gap between cards for breathing room

---

### 6.3 Project Detail Page (`projects/[slug].astro`)

```
┌──────────────────────────────────────────────────┐
│  [Navbar]                                        │
│                                                  │
│  Urban Decay                                     │
│  Abandoned industrial spaces reclaimed by...     │
│  June 2025                                       │
│                                                  │
│  ┌──────────┬──────────┬──────────┐              │
│  │          │          │          │              │
│  │  img 01  │  img 02  │  img 03  │              │
│  │          │          │          │              │
│  ├──────────┤          ├──────────┤              │
│  │          │──────────│          │              │
│  │  img 04  │          │  img 06  │              │
│  │          │  img 05  │          │              │
│  │──────────│          │──────────│              │
│  │          │──────────│          │              │
│  │  img 07  │  img 08  │  img 09  │              │
│  │          │          │          │              │
│  └──────────┴──────────┴──────────┘              │
│                                                  │
│  [Footer]                                        │
└──────────────────────────────────────────────────┘
```

- Project title, description, and formatted date at the top
- Three-column masonry-style grid using CSS `columns-3` or CSS Grid with `grid-auto-rows`
- Images grow as wide as their column allows; height is determined by aspect ratio
- Each image uses a plain `<img>` tag with `loading="lazy"` and `decoding="async"`
- Images are clickable — clicking opens the **GLightbox** lightbox (see Section 8)
- A "← Back to Projects" link at the top or bottom

**CSS approach for the gallery (Tailwind):**

```html
<div class="columns-1 sm:columns-2 lg:columns-3 gap-4">
  {entry.data.gallery.map((src) => (
  <a
    href="{src}"
    class="glightbox mb-4 block break-inside-avoid"
    data-gallery="project"
  >
    <img
      src="{src}"
      alt=""
      loading="lazy"
      decoding="async"
      class="w-full rounded"
    />
  </a>
  ))}
</div>
```

This uses CSS multi-column layout, which naturally fills columns and respects varying image heights. Each image links to itself for the lightbox.

---

### 6.4 Contact Page (`contact.astro`)

```
┌──────────────────────────────────────────────────┐
│  [Navbar]                                        │
│                                                  │
│  GET IN TOUCH                                    │
│                                                  │
│  ┌──────────────────────────────────┐            │
│  │  Name       [_______________]   │            │
│  │  Email      [_______________]   │            │
│  │  Message    [_______________]   │            │
│  │             [_______________]   │            │
│  │                                 │            │
│  │           [ Send Message ]      │            │
│  └──────────────────────────────────┘            │
│                                                  │
│  [Footer]                                        │
└──────────────────────────────────────────────────┘
```

- Uses Web3Forms for form handling (no server-side code needed)
- Hidden `access_key` input with your Web3Forms API key
- Fields: Name, Email, Subject (optional), Message
- Client-side validation with HTML5 `required` attributes
- Success/error state handled via fetch to `https://api.web3forms.com/submit`
- Optional: add a honeypot field for spam protection (Web3Forms supports this natively)

**Implementation snippet:**

```astro
<form action="https://api.web3forms.com/submit" method="POST">
  <input type="hidden" name="access_key" value="YOUR_KEY_HERE" />
  <input type="hidden" name="redirect" value="https://zotgoe.be/contact?success=true" />
  <input type="checkbox" name="botcheck" class="hidden" />

  <input type="text" name="name" required placeholder="Your name" />
  <input type="email" name="email" required placeholder="Your email" />
  <textarea name="message" required placeholder="Your message" rows="5"></textarea>

  <button type="submit">Send Message</button>
</form>
```

---

## 7. Shared Components

### 7.1 Navbar (`Navbar.astro`)

- Fixed or sticky at the top
- Left: "Zot Goe" wordmark (links to `/`)
- Right: Home | Projects | Contact
- Transparent on the hero section, with a subtle background on scroll or on inner pages
- Mobile: hamburger menu or collapsed links
- Active link highlighting based on current path via `Astro.url.pathname`
- Uses `text-heading` for active links, `text-muted` for inactive

### 7.2 ProjectCard (`ProjectCard.astro`)

A horizontal 4-column grid card with a gap between each block:

```
┌─────────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐
│             │ │           │ │           │ │           │
│  Title      │ │  Highlight│ │  Highlight│ │  Highlight│
│  ─────      │ │  Photo 1  │ │  Photo 2  │ │  Photo 3  │
│  Short      │ │           │ │           │ │           │
│  Description│ │           │ │           │ │           │
│             │ │           │ │           │ │           │
│  Date       │ │           │ │           │ │           │
│             │ │           │ │           │ │           │
└─────────────┘ └───────────┘ └───────────┘ └───────────┘
                 ↔ gap-2 between all four blocks
```

**Props:**

```typescript
interface Props {
  title: string;
  description: string;
  date: Date;
  slug: string;
  highlights: string[]; // Array of 3 absolute image paths (e.g., "/images/projects/...")
}
```

**Implementation notes:**

- `grid grid-cols-4 gap-2` for the 4-column layout with visible spacing between all blocks
- The first column uses a `bg-surface` background with text content, vertically centered
- The three image columns use plain `<img>` tags with `object-cover` and `aspect-square` or a fixed height
- All images use `loading="lazy"` and `decoding="async"`
- The entire card is wrapped in an `<a>` tag linking to `/projects/{slug}`
- Hover effect: subtle scale on images or an overlay transition
- On mobile: stack to `grid-cols-1` or `grid-cols-2` (text block full width, images below)

### 7.3 Footer (`Footer.astro`)

- Simple centered text: `© {currentYear} Zot Goe. All rights reserved.`
- Optional row of social icons (Instagram, Behance, etc.)
- Minimal padding, `text-muted` colour

---

## 8. Lightbox — GLightbox

The project detail gallery uses **GLightbox** to allow full-screen image viewing on click.

### Why GLightbox

- ~11 KB minified, no dependencies
- Touch/swipe support for mobile
- Keyboard navigation (arrow keys, Escape)
- Accessible (focus management, ARIA)
- Works with plain `<a>` tags — progressive enhancement (gallery works without JS)

### Integration

Install via npm:

```bash
npm install glightbox
```

Add to the project detail page (`[slug].astro`):

```astro
---
// ... project data loading
---

<BaseLayout>
  <!-- Gallery markup -->
  <div class="columns-1 sm:columns-2 lg:columns-3 gap-4">
    {entry.data.gallery.map((src, i) => (
      <a
        href={src}
        class="glightbox mb-4 block break-inside-avoid"
        data-gallery="project-gallery"
        data-description={`Image ${i + 1}`}
      >
        <img
          src={src}
          alt=""
          loading="lazy"
          decoding="async"
          class="w-full rounded hover:opacity-90 transition-opacity"
        />
      </a>
    ))}
  </div>
</BaseLayout>

<!-- Lightbox init (client-side only) -->
<script>
  import GLightbox from "glightbox";
  import "glightbox/dist/css/glightbox.min.css";

  const lightbox = GLightbox({
    selector: ".glightbox",
    touchNavigation: true,
    loop: true,
    autoplayVideos: false,
  });
</script>
```

### Styling overrides

GLightbox ships with its own CSS. Override the background to match the neutral palette:

```css
/* In global.css or a scoped style block */
.goverlay {
  background: rgba(44, 42, 39, 0.95); /* heading colour at 95% opacity */
}
```

---

## 9. Image Handling

Images are **pre-optimized by the owner** before being added to the project. Astro does not process, resize, or transform any images.

### Approach

| Concern      | Approach                                                                 |
| ------------ | ------------------------------------------------------------------------ |
| Storage      | All images in `public/images/` — served as-is by Cloudflare CDN          |
| Format       | Owner pre-optimizes to WebP or JPEG before adding to repo                |
| Resizing     | Owner provides final sizes; no build-time generation                     |
| Lazy loading | `loading="lazy"` on all images except the hero (`loading="eager"`)       |
| Decoding     | `decoding="async"` on all images                                         |
| Layout shift | Set explicit `width` + `height` attributes where possible to prevent CLS |
| Alt text     | Meaningful alt text on every image for accessibility and SEO             |

### Image tags throughout the project

Since images are in `public/`, use plain `<img>` tags everywhere — **not** Astro's `<Image>` component:

```html
<!-- Hero (eager load) -->
<img
  src="/images/hero.jpg"
  alt="..."
  loading="eager"
  decoding="async"
  class="..."
/>

<!-- ProjectCard highlights (lazy) -->
<img
  src="{highlight}"
  alt="..."
  loading="lazy"
  decoding="async"
  class="object-cover w-full h-full"
/>

<!-- Gallery images (lazy, wrapped in lightbox link) -->
<a href="{src}" class="glightbox">
  <img src="{src}" alt="..." loading="lazy" decoding="async" class="w-full" />
</a>
```

---

## 10. SEO & Discoverability

### 10.1 Technical SEO Foundations

**Meta tags** (in `BaseLayout.astro`):

```html
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>{title} | Zot Goe Photography</title>
  <meta name="description" content="{description}" />
  <link rel="canonical" href="{canonicalUrl}" />

  <!-- Open Graph -->
  <meta property="og:title" content="{title}" />
  <meta property="og:description" content="{description}" />
  <meta property="og:image" content="{ogImage}" />
  <meta property="og:url" content="{canonicalUrl}" />
  <meta property="og:type" content="website" />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="{title}" />
  <meta name="twitter:description" content="{description}" />
  <meta name="twitter:image" content="{ogImage}" />

  <!-- JSON-LD Structured Data -->
  <script
    type="application/ld+json"
    set:html="{JSON.stringify(structuredData)}"
  />
</head>
```

**JSON-LD structured data** — use different schemas per page:

- **Home**: `WebSite` + `Person` (or `Organization`) schema
- **Projects listing**: `CollectionPage` schema
- **Project detail**: `ImageGallery` or `CreativeWork` schema with individual `ImageObject` entries
- **Contact**: `ContactPage` schema

Example for a project detail page:

```json
{
  "@context": "https://schema.org",
  "@type": "ImageGallery",
  "name": "Urban Decay",
  "description": "Abandoned industrial spaces reclaimed by nature.",
  "dateCreated": "2025-06-15",
  "author": {
    "@type": "Person",
    "name": "Zot Goe"
  },
  "image": [
    {
      "@type": "ImageObject",
      "contentUrl": "https://zotgoe.be/images/projects/urban-decay/gallery-01.jpg"
    },
    {
      "@type": "ImageObject",
      "contentUrl": "https://zotgoe.be/images/projects/urban-decay/gallery-02.jpg"
    }
  ]
}
```

### 10.2 Sitemap & Robots

Install `@astrojs/sitemap` in `astro.config.mjs`:

```javascript
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://zotgoe.be",
  integrations: [sitemap(), tailwind()],
});
```

This auto-generates `sitemap-index.xml` at build time.

**`robots.txt`:**

```
User-agent: *
Allow: /

Sitemap: https://zotgoe.be/sitemap-index.xml

# AI Crawlers (allowed for portfolio visibility)
User-agent: GPTBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: CCBot
Allow: /
```

### 10.3 Performance SEO Signals

- Aim for 90+ Lighthouse score across all categories
- Preload hero image with `<link rel="preload" as="image" href="/images/hero.jpg">`
- Use `font-display: swap` for any custom fonts
- Minimize JS — Astro ships zero JS by default; only add client-side JS for the lightbox and mobile menu
- Enable Cloudflare's auto-minify and Brotli compression

### 10.4 AI & Agent Discoverability

Rather than maintaining a separate `llms.txt` file, the site relies on strong foundational SEO practices that are equally effective for AI crawlers and LLMs:

- **Semantic HTML everywhere**: `<main>`, `<article>`, `<nav>`, `<header>`, `<footer>`, `<section>` — AI agents parse these structures to understand page hierarchy
- **Descriptive alt text on every image**: This is the primary way AI agents "see" and index visual content
- **Comprehensive JSON-LD structured data**: LLMs parse schema.org markup heavily; the `ImageGallery`, `Person`, and `CreativeWork` schemas give agents rich, machine-readable metadata
- **Clean, accessible text content**: Avoid hiding important info in images or JS-rendered content — all project titles, descriptions, and dates should be in the HTML
- **robots.txt allows major AI crawlers** (GPTBot, Google-Extended, anthropic-ai, CCBot) so the portfolio is indexed
- **The auto-generated sitemap** gives crawlers a complete list of all pages and project URLs

These practices are maintainable and don't require manual upkeep — they benefit traditional search engines and AI agents equally.

---

## 11. Cloudflare Pages Deployment

### 11.1 Build Configuration

| Setting                | Value                        |
| ---------------------- | ---------------------------- |
| Build command          | `npm run build`              |
| Build output directory | `dist`                       |
| Node.js version        | 22.x                         |
| Environment variable   | `SITE_URL=https://zotgoe.be` |

### 11.2 Setup Steps

1. Push the repository to GitHub
2. Connect the repo in Cloudflare Pages dashboard
3. Set the build configuration above
4. Set Node.js version: add `NODE_VERSION=22` as an environment variable in Cloudflare Pages, or add a `.node-version` file with `22` to the project root
5. Add a custom domain (`zotgoe.be`) in the Cloudflare dashboard
6. Cloudflare auto-provisions SSL and handles DNS

### 11.3 Cloudflare-Specific Optimizations

- Enable **Auto Minify** (HTML, CSS, JS)
- Enable **Brotli** compression
- Set **Browser Cache TTL** to 1 year for static assets (images, fonts)
- Use **Cache Rules** to cache HTML pages at the edge (safe for a static site)

---

## 12. AGENT.md — Agent Development Guide

An `AGENT.md` file at the project root provides AI coding agents (Claude Code, Cursor, Copilot, Windsurf, etc.) with the essential context to work effectively in this codebase. This file is read automatically by most agent tools.

**Contents of `AGENT.md`:**

```markdown
# AGENT.md — Zot Goe Development Guide

## Project Overview

Photography portfolio website built with Astro 5, Tailwind CSS 4, deployed on Cloudflare Pages.

## Tech Stack

- **Framework**: Astro 5.x (static output)
- **Styling**: Tailwind CSS 4.x (utility-first)
- **Lightbox**: GLightbox
- **Forms**: Web3Forms (https://web3forms.com/)
- **Node.js**: v22.x
- **Deploy**: Cloudflare Pages

## Commands

- `npm run dev` — Start dev server (http://localhost:4321)
- `npm run build` — Production build to `dist/`
- `npm run preview` — Preview production build locally

## Project Structure

- `src/pages/` — Astro page routes (index, projects, contact)
- `src/components/` — Reusable Astro components (Navbar, Footer, ProjectCard, HeroSection, ContactForm)
- `src/layouts/` — BaseLayout with <head>, meta tags, structured data
- `src/content/projects/` — YAML files defining projects (content collections)
- `src/styles/global.css` — Tailwind directives and custom styles
- `public/images/` — All images (pre-optimized, served as-is, NOT processed by Astro)

## Content Model

Projects are defined as YAML files in `src/content/projects/`. Each file has:

- `title`, `description`, `date`, `cover`, `imageFolder`
- `highlights`: array of 3 image paths for ProjectCard
- `gallery`: array of image paths for the detail page
- `tags`: optional array of strings

Image paths are absolute from site root (e.g., `/images/projects/urban-decay/gallery-01.jpg`).

## Design Rules

- **Colour palette**: Off-white background (#F5F4F0). All UI in shades of grey.
  NO pure white (#fff) and NO pure black (#000).
- **Tailwind tokens**: bg-bg, bg-surface, text-heading, text-body, text-muted,
  text-accent, border-muted
- **Images**: Always use plain `<img>` tags, NOT Astro's `<Image>` component.
  Images are pre-optimized and live in `public/images/`.
- **Lazy loading**: `loading="lazy"` and `decoding="async"` on all images except
  the hero (use `loading="eager"` there).
- **Typography**: Clean sans-serif. Large bold headings. Minimal, let photography dominate.

## Key Patterns

- ProjectCard: 4-column grid (`grid-cols-4 gap-2`). First column = title +
  description + date. Next 3 = highlight photos.
- Gallery: CSS multi-column (`columns-3 gap-4`) with GLightbox for full-screen viewing.
- Contact: Web3Forms POST to https://api.web3forms.com/submit with hidden access_key.
- Navbar: Sticky, transparent on hero, active link via Astro.url.pathname.

## SEO

- Each page has unique `<title>`, `<meta description>`, Open Graph, and Twitter Card tags.
- JSON-LD structured data per page type (WebSite, CollectionPage, ImageGallery, ContactPage).
- Auto-generated sitemap via @astrojs/sitemap.
- Semantic HTML throughout (<main>, <article>, <nav>, <section>).
- Descriptive alt text on all images.
```

---

## 13. Development Workflow

### 13.1 Getting Started

```bash
npm create astro@latest zot-goe
cd zot-goe
npx astro add tailwind
npm install glightbox
npm run dev
```

Ensure Node.js 22.x is active (use `nvm use 22` or similar).

### 13.2 Adding a New Project

1. Create a new folder in `public/images/projects/{project-name}/`
2. Drop all pre-optimized images into that folder (name 3 of them as highlights)
3. Create `src/content/projects/{project-name}.yaml` with the project metadata, listing all image paths
4. The site auto-generates the project listing and detail pages — no code changes needed

### 13.3 Recommended Dependencies

```json
{
  "dependencies": {
    "glightbox": "^3.x"
  },
  "devDependencies": {
    "@astrojs/sitemap": "^3.x",
    "@astrojs/tailwind": "^5.x",
    "astro": "^5.x",
    "prettier": "^3.x",
    "prettier-plugin-astro": "^0.x"
  }
}
```

---

## 14. Suggestions & Remaining Open Questions

**Design decisions to finalize:**

- Typography: A display font for "Zot Goe" and headings? Or keep everything in a clean sans-serif like Inter or system fonts?
- Do you want any animation (fade-in on scroll, image hover effects)?

**Feature ideas to consider:**

- Image EXIF data display on hover or in the lightbox (camera, lens, settings)
- A blog/journal section for behind-the-scenes content (great for SEO)
- Print shop integration if you sell prints
- Password-protected client galleries for private project delivery

**Technical considerations:**

- Web3Forms free tier allows 250 submissions/month — sufficient for a portfolio, but check if you need more
- Consider adding a `_redirects` file for any URL changes during development
- Since images are in `public/` and served as-is, keep an eye on total repo size if the portfolio grows large — at some point a Git LFS or external storage strategy may make sense

---

## 15. Milestone Plan

| Phase                 | Tasks                                                                                                             | Est. Time |
| --------------------- | ----------------------------------------------------------------------------------------------------------------- | --------- |
| **1. Scaffold**       | Init Astro project, configure Tailwind with colour tokens, set up content collections, folder structure, AGENT.md | 1–2 hours |
| **2. Layout & Nav**   | BaseLayout, Navbar (desktop + mobile), Footer                                                                     | 2–3 hours |
| **3. Home Page**      | HeroSection, featured projects section, CTA block                                                                 | 3–4 hours |
| **4. ProjectCard**    | Build the 4-column card component with gap-2, responsive breakpoints                                              | 2–3 hours |
| **5. Projects Page**  | Listing page with all ProjectCards, sorted by date, vertical spacing                                              | 1–2 hours |
| **6. Project Detail** | Dynamic route, 3-column gallery, GLightbox integration                                                            | 2–3 hours |
| **7. Contact**        | Web3Forms integration, form styling, success/error states                                                         | 1–2 hours |
| **8. SEO & Meta**     | Structured data, OG tags, sitemap, robots.txt, semantic HTML audit                                                | 2–3 hours |
| **9. Polish**         | Animations, responsive testing, accessibility audit, cross-browser check                                          | 3–4 hours |
| **10. Deploy**        | Cloudflare Pages setup, Node 22 config, custom domain, caching rules, final QA                                    | 1–2 hours |

**Estimated total: 18–28 hours**
