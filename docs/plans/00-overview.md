# 00: Overview, design spec & ground rules

> Read this before any wave plan. It is the single source of truth for tokens,
> shared contracts and the rules that keep parallel worktrees conflict-free.

## 1. Where we are and where we're going

`main` contains stages 1–2 of the old newsprint redesign: Plex Mono labels, a
giant `ZOT GOE` wordmark, `MonoLabel`/`Byline`/`EditorialLink`, a staggered
`ProjectCard`, and photos served raw from `public/`. The **Final** design
(`design/Zot Goe Final.dc.html`, frames `10a`–`10e`) drops nearly all of that:

| Old (on `main`) | Final |
| --- | --- |
| Plex Mono uppercase labels everywhere | No mono. Archivo for UI, Newsreader for prose |
| Giant wordmark masthead | Quiet `Zot Goe` brand in the header and a **floating photo collage** hero |
| Hairline rules, bylines, eyebrow labels | Whitespace. One footer hairline, plus rules above the "how it works" steps |
| Raw `<img>` from `public/images` | `astro:assets` `<Picture>` (AVIF/WebP, srcset) from the content tree |
| `/projects`, `/projects/[slug]` | `/werk`, `/werk/[slug]`, `/over`, `/contact` |
| Free-text `category` | `category` enum (filter) and `kind` label (display) |

Kill list (removed during W1–W3): `HeroSection`, `Image`, `ProjectCard` (old),
`AboutTeaser` (old), `ContactForm` (old), `Navbar`, `Footer` (old),
`Theme/Init`, `Theme/Toggle`, everything in `components/ui/`, the Plex Mono
font, `public/images/**`, and the editorial tokens (`text-wordmark`,
`meta-row`, `px-page`, …).

Kept: Astro 7, Tailwind 4 (CSS-first `@theme`), TypeScript strict, Biome,
Husky + lint-staged, GLightbox, `@astrojs/sitemap`, Web3Forms, and the
light/dark toggle (rebuilt).

## 2. Design language

### 2.1 Colour tokens

Every colour is a CSS variable in `@theme`, written as `hsl()` (CODE_STYLE).
Convert the hex values below. Tailwind generates `bg-*`, `text-*` and
`border-*` from them. **Never write a raw colour in a component.** Colour and
font-size tokens share the `text-*` namespace in Tailwind, so their names must
never overlap. That's why the paragraph colour is `body` and the paragraph
size is `prose`.

| Token (`--color-*`) | Role | Light | Dark |
| --- | --- | --- | --- |
| `bg` | page background | `#FBFAF8` | `#16150F` |
| `ink` | headings, primary text, button fill | `#14130F` | `#F2F0E9` |
| `body` | serif paragraphs | `#3B382F` | `#C9C4B8` |
| `subtle` | nav links, secondary links, step bodies | `#4A473F` | `#B6B1A4` |
| `muted` | captions, labels, meta, footer | `#77726A`¹ | `#8F8A7D` |
| `hint` | input placeholders | `#A9A498` | `#6E6A61` |
| `rule` | step dividers | `#DAD7CF` | `#34312A` |
| `hairline` | footer top border | `#ECE9E3` | `#26241D` |
| `field` | input underline | `#CFCBC2` | `#4A463C` |
| `frame` | image placeholder / loading bg | `#E8E5DF` | `#24221B` |
| `frame-hover` | frame hover | `#DEDAD2` | `#2C2A22` |
| `accent` | coral: dot, step numbers, hovers | `#E8574A` | `#F4776B` |
| `on-accent` | text on an accent fill | `#14130F` | `#16150F` |

¹ The design uses `#8A857A` (3.5:1 on `bg`), which fails WCAG AA for 13–14 px
text. `#77726A` (≈ `hsl(37, 6%, 44%)`, 4.6:1) keeps the look and passes.

The dark palette is a warm, dark paper, not black. Set `color-scheme: light`
and `color-scheme: dark` per theme so form controls and scrollbars follow.

### 2.2 Type

Fonts are self-hosted with `@fontsource-variable/archivo` (sans: UI, headings,
captions) and `@fontsource-variable/newsreader` (serif: prose only, roman
only). Weights in use are 400, 500 and 600. Mono and italics are gone.

| Token / utility | Size | Line height | Tracking | Use |
| --- | --- | --- | --- | --- |
| `text-micro` | 11px | 1.3 | 0 | collage tile labels |
| `text-caption` | 13px | 1.4 | 0 | form labels, footer, "Over", "Volgend project" |
| `text-sm` (Tailwind) | 14px | 1.45 | 0 | nav, captions, filters, links, button |
| `text-base` (Tailwind) | 16px | 1.5 | 0 | brand (600, −0.01em), inputs, step titles |
| `text-title` | 22px | 1.25 | −0.02em | next-project title |
| `text-statement` | 22→26px | 1.28 | −0.022em | home hero statement |
| `text-heading` | 24→28px | 1.15 | −0.02em | page and section headings (weight 500) |
| `text-prose` | 17px | 1.65 | 0 | serif paragraphs |
| `text-prose-lg` | 19→22px | 1.5 | 0 | home about teaser |

Each `--text-*` token carries its `--line-height` and `--letter-spacing`
companions, so a single utility gives the whole style. "a→b" means
`clamp(a, …, b)` with `b` reached at a 1280 px viewport. Paragraphs use
`text-pretty`.

### 2.3 Space, width, shape, motion

| Token | Value | Utility | Use |
| --- | --- | --- | --- |
| `--spacing-gutter` | `clamp(1.25rem, 3.125vw, 2.5rem)` | `px-gutter` | text gutter (40 px at 1280) |
| `--spacing-media` | `clamp(0.75rem, 1.875vw, 1.5rem)` | `px-media`, `gap-media` | photo gutter and grid gap (24 px) |
| `--spacing-section-S` | `clamp(2.5rem, 4.4vw, 3.5rem)` | `py-section-S` … | ≈ 56 px |
| `--spacing-section-M` | `clamp(3.5rem, 6.9vw, 5.5rem)` | | ≈ 80–90 px |
| `--spacing-section-L` | `clamp(4rem, 8.75vw, 7rem)` | | ≈ 100–120 px |
| `--spacing-section-XL` | `clamp(5rem, 11vw, 8.75rem)` | | ≈ 140 px |
| `--spacing-header` | `4.5rem` | `h-header` | header height (72 px) |
| `--container-page` | `100rem` | `max-w-page` | page cap (centred above 1600 px) |
| `--container-copy` | `35rem` | `max-w-copy` | text columns (520–560 px) |
| `--aspect-portrait` | `4 / 5` | `aspect-portrait` | about portrait |
| `--aspect-hero` | `77 / 45` | `aspect-hero` | project hero (1232×720) |
| `--ease-drift` | `cubic-bezier(0.2, 0.7, 0.2, 1)` | `ease-drift` | collage parallax |

The design is drawn at 1280 px wide. Text sits on a 40 px gutter and photos
on a 24 px gutter, so images run wider than text. Keep that relationship at
every width. Arbitrary one-off values (`md:mt-[…]`, `aspect-[8/7]`) are fine
for layout data that appears once. Anything used twice becomes a token.

### 2.4 Interaction

- Links: `a:hover` turns `accent` (a global base rule, as in the design).
  Transitions name their properties (`transition-colors`, never `all`).
- Image cards: the frame goes from `frame` to `frame-hover`, and the image
  drops to `opacity-90`.
- Focus: `focus-visible` gets a 2 px `accent` outline with a 2 px offset on
  every interactive element.
- Motion: only the home collage moves. All motion stops under
  `prefers-reduced-motion: reduce`.

### 2.5 Shared chrome (built in plan 10)

**Header**, 72 px tall, `px-gutter`, `justify-between`, not sticky:

- Brand: `Zot Goe`, `text-base font-semibold tracking-[-0.01em]`, links to `/`.
- Nav (`aria-label="Hoofdmenu"`): `Werk` · `Over` · `Contact`, `text-sm
  text-subtle`, gap 28 px (20 px under `md`). The active link is `text-ink
  font-medium` with `aria-current="page"`. `/werk/*` marks Werk active, and
  `/contact/*` marks Contact active.
- Theme toggle: a 16 px icon button after Contact, `text-subtle`, accent on
  hover. Sun and moon swap through CSS on `[data-theme]`.

**Footer**: `border-t border-hairline`, `px-gutter py-7`, `text-caption
text-muted`, three items `justify-between` that wrap on narrow screens:
`brent@zotgoe.be` (mailto) · `Instagram` (link) · `Gent · © {year}`.

## 3. Architecture (target)

```
src/
  assets/
    icons/                sun.svg, moon.svg
    site/                 portrait.png (stand-in), …
    stand-in/             01–12.jpg: placeholder photos for seeded projects
  components/
    Common/               Photo, TextLink, Button
    Site/                 Header, Footer, ThemeToggle, ThemeScript
    Project/              ProjectCard, Gallery, NextProject
    Home/                 HeroCollage, FeaturedProjects, AboutTeaser
    Work/                 WorkGrid, WorkFilter
    About/                ProcessSteps
    Contact/              ContactForm, Field
  constants/              site.ts, categories.ts
  content/projects/<slug>/index.yaml (+ that project's own photos)
  layouts/BaseLayout.astro
  lib/                    projects.ts, format.ts, siteImages.ts,
                          collage.ts, workGrid.ts, gallery.ts (+ *.test.ts)
  pages/                  index, werk/index, werk/[slug], over, contact,
                          contact/bedankt, 404
  styles/                 global.css, tokens.css, fonts.css
  config.ts
```

- Folders are PascalCase and grouped by domain (CODE_STYLE `components/Common/`).
  A component moves to `Common/` only once a second domain needs it.
- Imports use `~/` (→ `src/`) across directories, and relative paths within
  a folder or one level up.
- Pure logic (layout patterns, formatting, ordering) lives in `src/lib/` with
  co-located Vitest tests. Components stay thin.
- One-off page prose stays in the page. Structured or repeated copy (nav,
  process steps, socials, site facts) lives in `config.ts` / `constants/`.

### 3.1 Data model (plan 11)

`src/content/projects/<slug>/index.yaml`. The id is the folder name. Image
paths are relative to the YAML file and validated by `image()`.

```yaml
title: Lannoo × Pascal Naessens
category: event              # concert | event | motorsport | huwelijk
kind: Boekvoorstelling       # display label
date: 2025-04-10
location: Gent
summary: Boekvoorstelling voor pers en genodigden.   # meta description
featured: 2                  # optional: position on the home page
story:                       # 1–3 serif paragraphs on the detail page
  - Lannoo stelde het nieuwe kookboek van Pascal Naessens voor …
cover: { src: ./cover.jpg, alt: … }                  # landscape preferred
photos:
  - { src: ./01.jpg, alt: … }                        # alt optional
```

### 3.2 Contracts frozen after W1

W2 builds on these. Their names and signatures don't change in W2. If W2 needs
an addition, follow §4.3.

| Contract | Owner | Shape |
| --- | --- | --- |
| Tokens | 10 | §2 names, exactly |
| `BaseLayout` | 10 | `{ title?: string; description?: string; image?: ImageMetadata; structuredData?: Record<string, unknown>; noindex?: boolean }`, plus the deprecated `ogImage` and `canonicalUrl` until plan 30 |
| `Common/TextLink` | 10 | `{ href: string; variant?: 'underline' \| 'plain'; arrow?: boolean; class?: string }` |
| `Common/Button` | 10 | `{ type?: 'submit' \| 'button'; class?: string }`, a pill with slot content |
| `Common/Photo` | 11 | `{ src: ImageMetadata; alt: string; sizes: string; fit?: 'cover' \| 'natural'; loading?: 'lazy' \| 'eager'; priority?: boolean; class?: string }` |
| `Project/ProjectCard` | 11 | `{ project: Project; frameClass: string; sizes: string; showYear?: boolean; loading?: 'lazy' \| 'eager'; class?: string }` |
| `lib/projects.ts` | 11 | `type Project`; `getProjects()` (newest first); `getFeaturedProjects()`; `getNextProject(projects, id)` |
| `lib/format.ts` | 11 | `formatMonthYear(date)` → `'april 2025'`; `formatYear(date)` → `'2025'` |
| `constants/categories.ts` | 11 | `enum Category`; `CATEGORY_LABELS` (plural filter labels) |
| `lib/siteImages.ts` | 11 | `PORTRAIT`, `CONTACT_IMAGE` (`ImageMetadata`) |
| `config.ts` | 10 | `SITE_URL`, `SITE_NAME`, `OWNER`, `EMAIL`, `CITY`, `TAGLINE`, `SINCE` |
| `constants/site.ts` | 10 | `NAV_LINKS`, `SOCIALS`, `PROCESS_STEPS` |

## 4. Parallel-work rules

### 4.1 Ownership

Each plan has an **Owns** list. An agent edits only those paths. New files
inside an owned folder are fine. Two plans in the same wave never own the same
path. The one deliberate exception is `tsconfig.json` in W1: both plans write
the identical file, and git merges identical changes cleanly.

In W2, only the dependency lane (25, then 26) touches `package.json` and
`package-lock.json`. A page plan that thinks it needs a new dependency asks
the orchestrator first.

### 4.2 Keep `main` green between merges

PRs in a wave merge in any order, so every PR must build on its own against
the previous wave:

- **W1 changes to shared files are additive.** Don't rename or remove an
  export, prop or file that the other W1 plan's untouched files still import.
  Leftovers get deleted in plan 30.
- Old pages may look unstyled between W1 and W2. That's expected. Builds,
  type checks and lint must still pass.

### 4.3 When you need something you don't own

Prefer a component-scoped `<style>` or a local constant. If a shared change is
unavoidable, keep it minimal and additive, and list it under **Summary of
changes → Shared** in the PR so the orchestrator can sequence merges.

## 5. Conventions

- Follow `CODE_STYLE.md`. Repo tooling wins on formatting: Biome uses tabs,
  single quotes and an 80-column width. Biome doesn't format `.astro`
  templates, so indent template markup with tabs by hand.
- TypeScript: explicit parameter and return types; `interface` for shapes,
  `type` for unions; string enums for closed sets; `import type` for
  types; `Boolean()` over `!!`; `SCREAMING_SNAKE` module constants.
- Astro: destructure `Astro.props` against a `Props` interface. Client
  `<script>`s are TypeScript modules, so share logic by importing from `~/lib`.
  Use component-scoped `<style>` for keyframes and anything Tailwind can't
  express cleanly.
- Images always go through `Common/Photo` (`astro:assets`). Pass a real `sizes`
  for each usage. Load above-the-fold images eagerly or with priority, and
  everything else lazily.
- Comments explain *why*, never *what* (AGENTS.md).
- Commits follow gitmoji (`.agent/skills/git-workflow`). Keep them atomic, and
  every commit must type-check.

## 6. Verification & definition of done

Each PR, before pushing:

1. `npx biome ci .`, `npm run check:types`, `npm test`, `npm run build` pass.
2. Pages you touched render at 390, 768, 1280 and 1600 px wide, in light and
   dark, without overflow or layout breaks.
3. At 1280 px the page matches its design frame in proportions, spacing and
   type (within ~10 px).
4. Keyboard: everything interactive is reachable and has a visible focus ring.
5. The PR uses the template with every section filled in.

Project done means: all five routes match `10a`–`10e`; both themes are
polished; Lighthouse is ≥ 95 for Performance, Accessibility, Best Practices
and SEO on home and detail; there's no dead code or unused dependency; and
`ARCHITECTURE.md` and `README.md` describe reality.

## 7. Risks

- **Stand-in photos are all motorsport.** That's fine for layout work. Don't
  tune layouts to these specific crops.
- **Collage on small screens.** Absolute positioning only kicks in at `lg`.
  Below that, a flow layout takes over (plan 20).
- **Build time** grows with Picture variants (≈ 25 sources × widths ×
  2 formats). Identical transforms are cached and shared between stand-ins.
  If CI gets slow, trim `widths`.
- **`design/` is git-ignored**, so worktrees don't contain it. Agents read it
  via the absolute path in the brief. The plans transcribe what matters.
