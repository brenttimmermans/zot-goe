# Zot Goe — Tickets Overview

> Index of all implementation tickets. See individual files in `.plans/tickets/` for full details.

---

## Execution Order

```
Phase 1: Foundation (sequential)
  FOUND-01 → FOUND-02 → FOUND-04 → FOUND-05 → FOUND-06 → FOUND-03 → FOUND-07

Phase 2: Pages (three parallel tracks — can start once Foundation is done)
  Track A (Home):     HOME-01 → HOME-02 → HOME-03 → HOME-04
  Track B (Projects): PROJ-01 → PROJ-02 → PROJ-03 → PROJ-04 → PROJ-05
  Track C (Contact):  CONT-01 → CONT-02 → CONT-03

Phase 3: Polish & Deploy (after all pages)
  CROSS-01 → CROSS-02 → CROSS-03 → CROSS-04
```

---

## Foundation (7 tickets)

| ID | Title | Status | Priority | File |
|---|---|---|---|---|
| FOUND-01 | Tailwind Color Palette & Global CSS | `todo` | High | [FOUND-01](tickets/FOUND-01-tailwind-color-palette.md) |
| FOUND-02 | Content Collection Schema & Sample Data | `todo` | High | [FOUND-02](tickets/FOUND-02-content-collection-schema.md) |
| FOUND-03 | BaseLayout Component | `todo` | High | [FOUND-03](tickets/FOUND-03-base-layout.md) |
| FOUND-04 | Navbar Component | `todo` | High | [FOUND-04](tickets/FOUND-04-navbar.md) |
| FOUND-05 | Footer Component | `todo` | High | [FOUND-05](tickets/FOUND-05-footer.md) |
| FOUND-06 | ProjectCard Component | `todo` | High | [FOUND-06](tickets/FOUND-06-project-card.md) |
| FOUND-07 | AGENT.md Development Guide | `todo` | Medium | [FOUND-07](tickets/FOUND-07-agent-md.md) |

---

## Home Page — Track A (4 tickets)

| ID | Title | Status | Priority | File |
|---|---|---|---|---|
| HOME-01 | HeroSection Component | `todo` | High | [HOME-01](tickets/HOME-01-hero-section.md) |
| HOME-02 | Featured Projects Section | `todo` | High | [HOME-02](tickets/HOME-02-featured-projects-section.md) |
| HOME-03 | CTA Section | `todo` | Medium | [HOME-03](tickets/HOME-03-cta-section.md) |
| HOME-04 | Home Page Assembly & SEO | `todo` | High | [HOME-04](tickets/HOME-04-home-page-assembly-seo.md) |

---

## Projects — Track B (5 tickets)

| ID | Title | Status | Priority | File |
|---|---|---|---|---|
| PROJ-01 | Projects Listing Page | `todo` | High | [PROJ-01](tickets/PROJ-01-projects-listing-page.md) |
| PROJ-02 | Project Detail Page — Layout & Header | `todo` | High | [PROJ-02](tickets/PROJ-02-project-detail-layout.md) |
| PROJ-03 | Project Detail Page — Masonry Gallery | `todo` | High | [PROJ-03](tickets/PROJ-03-masonry-gallery.md) |
| PROJ-04 | GLightbox Integration | `todo` | High | [PROJ-04](tickets/PROJ-04-glightbox-integration.md) |
| PROJ-05 | Projects SEO & Structured Data | `todo` | Medium | [PROJ-05](tickets/PROJ-05-projects-seo.md) |

---

## Contact — Track C (3 tickets)

| ID | Title | Status | Priority | File |
|---|---|---|---|---|
| CONT-01 | ContactForm Component (Web3Forms) | `todo` | High | [CONT-01](tickets/CONT-01-contact-form-component.md) |
| CONT-02 | Contact Page Layout | `todo` | High | [CONT-02](tickets/CONT-02-contact-page-layout.md) |
| CONT-03 | Contact Page SEO & Structured Data | `todo` | Medium | [CONT-03](tickets/CONT-03-contact-seo.md) |

---

## Cross-cutting / Polish (4 tickets)

| ID | Title | Status | Priority | File |
|---|---|---|---|---|
| CROSS-01 | Sitemap & robots.txt Setup | `todo` | Medium | [CROSS-01](tickets/CROSS-01-sitemap-robots.md) |
| CROSS-02 | Responsive Design Pass | `todo` | Medium | [CROSS-02](tickets/CROSS-02-responsive-design.md) |
| CROSS-03 | Accessibility Audit | `todo` | Medium | [CROSS-03](tickets/CROSS-03-accessibility-audit.md) |
| CROSS-04 | Cloudflare Pages Deployment | `todo` | Low | [CROSS-04](tickets/CROSS-04-cloudflare-deployment.md) |

---

## Summary

| Track | Tickets | Status |
|---|---|---|
| Foundation | 7 | 0/7 done |
| Home Page | 4 | 0/4 done |
| Projects | 5 | 0/5 done |
| Contact | 3 | 0/3 done |
| Cross-cutting | 4 | 0/4 done |
| **Total** | **23** | **0/23 done** |

---

## Dependency Graph

```
FOUND-01 (Tailwind colors)
├── FOUND-02 (content collections) — no dep on 01, can run parallel
├── FOUND-04 (Navbar) — needs 01
├── FOUND-05 (Footer) — needs 01
├── FOUND-06 (ProjectCard) — needs 01
├── FOUND-03 (BaseLayout) — needs 01, 04, 05
└── FOUND-07 (AGENT.md) — no deps, can run anytime

After Foundation:

Track A: Home Page
  HOME-01 (Hero) → HOME-02 (Featured) → HOME-03 (CTA) → HOME-04 (Assembly)

Track B: Projects
  PROJ-01 (Listing) ─┐
  PROJ-02 (Detail)  ─┤→ PROJ-03 (Gallery) → PROJ-04 (GLightbox)
                      └→ PROJ-05 (SEO)

Track C: Contact
  CONT-01 (Form) → CONT-02 (Page) → CONT-03 (SEO)

After all pages:
  CROSS-01 (Sitemap) → CROSS-02 (Responsive) → CROSS-03 (A11y) → CROSS-04 (Deploy)
```
