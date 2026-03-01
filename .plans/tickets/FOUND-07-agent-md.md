# FOUND-07: AGENT.md Development Guide

**Status:** `todo`
**Priority:** Medium
**Track:** Foundation
**Dependencies:** None
**Blocked by:** None

---

## Description

Create the `AGENT.md` file at the project root. This file provides AI coding agents (Claude Code, Cursor, Copilot, etc.) with essential context to work in this codebase effectively. It is read automatically by most agent tools.

## Acceptance Criteria

- [ ] `AGENT.md` exists at the project root
- [ ] Documents: project overview, tech stack, commands, project structure
- [ ] Documents: content model (YAML structure, image paths)
- [ ] Documents: design rules (color palette, no pure black/white, image handling)
- [ ] Documents: key component patterns (ProjectCard, Gallery, ContactForm, Navbar)
- [ ] Documents: SEO approach

## Implementation Details

Write the following content to `AGENT.md`:

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

## Files to Create/Modify

- `AGENT.md` — create at project root
