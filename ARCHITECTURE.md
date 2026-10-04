# Architecture

## Overview

**Zot Goe** is the portfolio of Brent Timmermans, an event, concert,
motorsport and wedding photographer in Gent. The site is in Dutch
(`lang="nl"`, `og:locale` `nl_BE`) and fully static: Astro renders every page
at build time into `dist/`, with no server and no adapter. Projects live as
YAML plus photos in a content collection. The only client JavaScript is the
theme toggle, the hero collage drift, the work filter and the lightbox.

## Stack

| Layer | Technology | Version |
| --- | --- | --- |
| Runtime | Node | 24 (`.node-version`) |
| Framework | Astro (static output, content collections, `astro:assets`, `astro:env`) | 7.3.5 |
| Styling | Tailwind CSS via `@tailwindcss/vite`, CSS-first `@theme` | 4.3.3 |
| Language | TypeScript, `astro/tsconfigs/strict` | 6.0.3 |
| Type check | `@astrojs/check` | 0.9.10 |
| Fonts | `@fontsource-variable/archivo`, `@fontsource-variable/newsreader` | 5.3.0 |
| Lightbox | GLightbox | 3.3.1 |
| Sitemap | `@astrojs/sitemap` | 3.7.4 |
| Contact form | Web3Forms (plain HTML POST) | — |
| Lint & format | Biome | 2.5.6 |
| Tests | Vitest | 5.0.3 |
| Git hooks | Husky + lint-staged | 9.1.7 / 17.3.0 |

## Directory structure

```
zot-goe/
├── src/
│   ├── assets/
│   │   ├── icons/              sun.svg, moon.svg (inlined with ?raw)
│   │   ├── site/               portrait.png (stand-in)
│   │   └── stand-in/           01–12.jpg, placeholder photos for seeded projects
│   ├── components/
│   │   ├── Common/             Photo, TextLink, Button
│   │   ├── Site/               Header, Footer, ThemeToggle, ThemeScript
│   │   ├── Project/            ProjectCard, Gallery, LightboxLink, Lightbox, NextProject
│   │   ├── Home/               HeroCollage, FeaturedProjects, AboutTeaser
│   │   ├── Work/               WorkGrid, WorkFilter
│   │   ├── About/              ProcessSteps
│   │   └── Contact/            ContactForm, Field
│   ├── constants/              categories.ts (Category, CATEGORY_LABELS), site.ts
│   ├── content/projects/<slug>/index.yaml (+ that project's own photos)
│   ├── layouts/BaseLayout.astro
│   ├── lib/                    projects, format, siteImages, collage, workGrid,
│   │                           gallery (+ co-located *.test.ts)
│   ├── pages/                  index, werk/index, werk/[slug], over, contact,
│   │                           contact/bedankt, 404
│   ├── styles/                 global.css, tokens.css, fonts.css
│   ├── types/site.ts           NavLink, Social, ProcessStep
│   ├── config.ts               site facts: SITE_URL, SITE_NAME, OWNER, EMAIL, …
│   ├── content.config.ts       projects collection schema
│   └── env.ts                  astro:env schema (PUBLIC_WEB3FORMS_KEY)
├── public/                     favicon.svg, robots.txt
├── docs/plans/                 the redesign plans (history)
├── .github/workflows/ci.yml
├── .husky/                     pre-commit, pre-push
├── astro.config.mjs
├── biome.json
├── tsconfig.json               strict, `~/*` → `src/*`
└── vitest.config.ts
```

Folders under `components/` are PascalCase and grouped by domain. A component
moves to `Common/` only once a second domain needs it. Imports use `~/` across
directories and relative paths within a folder or one level up.

## Routes

| Route | File | Content |
| --- | --- | --- |
| `/` | `pages/index.astro` | Hero collage, featured projects, about teaser |
| `/werk` | `pages/werk/index.astro` | All projects, newest first, with category filter |
| `/werk/[slug]` | `pages/werk/[slug].astro` | Cover, meta line, story, gallery with lightbox, next project |
| `/over` | `pages/over.astro` | Portrait, bio, the four "how it works" steps |
| `/contact` | `pages/contact.astro` | Photo and contact form |
| `/contact/bedankt` | `pages/contact/bedankt.astro` | Thank-you page after the form posts (`noindex`) |
| `/404` | `pages/404.astro` | Not found (`noindex`) |

`[slug]` is the project folder name. `getStaticPaths` builds one page per
project.

## Components

| Folder | Component | Role |
| --- | --- | --- |
| `Common` | `Photo` | The only way to render an image (see [Image pipeline](#image-pipeline)) |
| | `TextLink` | Link with `underline` or `plain` variant and optional `→` arrow |
| | `Button` | Pill button with slot content |
| `Site` | `Header` | `Zot Goe` brand, main nav with `aria-current`, theme toggle |
| | `Footer` | Hairline footer: email, socials, `Gent · © {year}` |
| | `ThemeScript` | Inline head script that sets `data-theme` before first paint |
| | `ThemeToggle` | Sun/moon button that flips and stores the theme |
| `Project` | `ProjectCard` | Cover in a frame plus title and `kind` (optionally with year) |
| | `Gallery` | Detail-page photo rows from `buildGalleryRows` |
| | `LightboxLink` | Wraps a photo in a link to its full-size WebP for GLightbox |
| | `Lightbox` | Loads GLightbox, Dutch button labels, focus handling, themed chrome |
| | `NextProject` | "Volgend project" link at the bottom of a detail page |
| `Home` | `HeroCollage` | Floating photo collage with the tagline |
| | `FeaturedProjects` | Five featured projects in three staggered rows |
| | `AboutTeaser` | Serif intro with a link to `/over` |
| `Work` | `WorkGrid` | 12-column project grid from `getWorkSlots` |
| | `WorkFilter` | Category buttons that filter and re-flow the grid |
| `About` | `ProcessSteps` | `PROCESS_STEPS` as numbered steps, each under a rule |
| `Contact` | `ContactForm` | Web3Forms form: name, email, message, honeypot |
| | `Field` | Label plus underlined input or textarea |

`BaseLayout` wraps every page: `<head>` meta, skip link (`#inhoud`), header,
`<main>`, footer. Props: `title`, `description` (defaults to `TAGLINE`),
`image` (`ImageMetadata` for `og:image`), `structuredData` and `noindex`.

Site-wide facts live in `src/config.ts`. Repeated copy (nav, socials, process
steps) lives in `src/constants/site.ts`. One-off prose stays in its page.

## Data model

One collection, `projects`, defined in `src/content.config.ts`. A `glob`
loader reads `src/content/projects/*/index.yaml`; the entry id is the folder
name, which is also the URL slug.

| Field | Type | Used for |
| --- | --- | --- |
| `title` | string | Card, detail `<h1>`, collage label, page title |
| `category` | `Category` enum | `/werk` filter |
| `kind` | string | Display label on cards and the detail meta line |
| `date` | date (`YYYY-MM-DD`) | Sort order (newest first), "april 2025" / "2025" |
| `location` | string | Detail meta line, JSON-LD |
| `summary` | string | Meta description, JSON-LD |
| `featured` | positive integer, optional | Rank on the home page (1 comes first) |
| `story` | 1–3 strings | Serif paragraphs on the detail page |
| `cover` | `{ src, alt }` | Card, detail hero, `og:image`, lightbox photo 1 |
| `photos` | 1+ `{ src, alt? }` | Detail gallery, in order |

- Image `src` paths are relative to the YAML file and validated by `image()`,
  so a typo fails the build. A project may point at photos in another folder
  (the stand-ins do).
- `Category` (`src/constants/categories.ts`) is a string enum: `concert`,
  `event`, `motorsport`, `huwelijk`. `CATEGORY_LABELS` holds the plural filter
  labels. The filter only shows categories that have projects.
- `featured`: `getFeaturedProjects()` keeps projects with a rank and sorts by
  it. `FeaturedProjects` has five slots, so ranks beyond the fifth project are
  ignored.
- A photo without `alt` gets `"<title>, foto <n>"` in the gallery and the
  project title in the collage.

`src/lib/projects.ts` is the only reader of the collection: `getProjects()`
(newest first), `getFeaturedProjects()` and `getNextProject()` (the next
older project, wrapping around).

## Image pipeline

Every photo is an imported `ImageMetadata` (from the content tree,
`src/assets/` or `src/lib/siteImages.ts`), never a file in `public/`.

- **`Common/Photo`** renders Astro's `<Picture>` with `formats={['avif',
  'webp']}` and widths 480, 800, 1200, 1600, 2000, 2400, capped at the source
  width. Each caller passes a real `sizes` for its layout. `fit="cover"` fills
  the frame; `fit="natural"` keeps the photo's own ratio. The wrapper has a
  `bg-frame` background while the image loads.
- **Loading**: lazy by default. Above-the-fold images use `loading="eager"`
  and one image per page gets `priority` (`fetchpriority="high"`): the largest
  collage tile, the project cover, the portrait.
- **Lightbox**: `LightboxLink` points at a single WebP up to 2400 px wide,
  made with `getImage`.
- **Social**: `BaseLayout` turns `image` into a 1200×630 JPEG for
  `og:image` and `twitter:image`. The project page lists 1600 px versions of
  every photo in its JSON-LD.
- **Site images** (`src/lib/siteImages.ts`): `PORTRAIT`, `CONTACT_IMAGE` and
  `DEFAULT_OG_IMAGE`.

Identical transforms are cached, so stand-ins shared between projects are
only processed once.

## Theming

- **Tokens** live in `src/styles/tokens.css` inside Tailwind's `@theme`, so
  each one becomes utilities (`bg-bg`, `text-ink`, `border-hairline`,
  `px-gutter`, `text-prose`, `max-w-copy`, …). Colours are `hsl()` and
  components never use raw colours. Colour roles: `bg`, `ink`, `body`,
  `subtle`, `muted`, `hint`, `rule`, `hairline`, `field`, `frame`,
  `frame-hover`, `accent` (coral) and `on-accent`.
- **Type**: Archivo for UI and headings, Newsreader for prose (`font-serif`).
  Each `--text-*` token carries its line height and letter spacing, so
  `text-heading` or `text-prose` is the whole style. Fluid sizes use `clamp()`
  up to a 1280 px viewport.
- **Space**: `gutter` (text, 40 px at 1280), `media` (photos and grid gaps,
  24 px), `section-S`…`section-XL`, `header`. Pages cap at `max-w-page`
  (100rem).
- **Dark palette**: a warm dark paper, not black. `[data-theme="dark"]` in
  `tokens.css` overrides every colour variable and sets `color-scheme: dark`.
  `global.css` defines the `dark:` variant on the same attribute.
- **No-flash script**: `Site/ThemeScript` is an inline script at the top of
  `<head>`. It sets `<html data-theme>` from `localStorage.theme`, falling
  back to `prefers-color-scheme`.
- **Toggle**: `Site/ThemeToggle` flips `data-theme`, stores the choice in
  `localStorage.theme` and keeps `aria-pressed` in sync. Until the visitor
  picks a theme, it follows system changes. The sun and moon icons swap with
  `dark:`.
- **Global rules** (`global.css`): links turn `accent` on hover, every
  interactive element gets a 2 px accent `focus-visible` outline, and the
  selection is accent on `on-accent`.

## Layout logic

Layout decisions that can be tested live in `src/lib/` as pure functions.
Components only map their output to classes.

- **`collage.ts`**: `COLLAGE_SLOTS` holds eight tiles (x, y, w, h, depth) in
  design pixels inside a 1280×888 box. `pickCollageTiles()` takes covers
  first, then each project's next photo, round-robin over the newest-first
  projects, so every project appears before any repeats. From `lg` (1024 px)
  `HeroCollage` positions tiles absolutely inside a size container and scales
  them by the tighter axis. Below `lg` it shows the first six tiles in a two-
  or three-column flow. On fine pointers, a hovered tile drifts toward the
  cursor by its `depth`. All motion stops under `prefers-reduced-motion`.
- **`workGrid.ts`**: `getWorkSlots(count)` repeats a six-card pattern on a
  12-column grid (8+4, 4+8, 6+6; tall rows, then a short row). An odd last
  card is centred at 8 columns. `WorkFilter` runs the same function in the
  browser to re-flow the visible cards after filtering, and keeps the filter
  in `?categorie=`. The filter stays hidden until its script runs.
- **`gallery.ts`**: `buildGalleryRows(photos)` groups photos by orientation.
  A landscape photo gets a full-width `wide` row, or a `pair` with the next
  landscape when the previous row was already wide. A portrait pairs with the
  next portrait (`pair`) or landscape (`offset`, 5:7 columns). A last lone
  portrait is a centred `single`.
- **`format.ts`**: `formatMonthYear()` ("april 2025", `nl-BE`, UTC) and
  `formatYear()`.

## Contact form

`ContactForm` is a plain `<form method="POST">` to
`https://api.web3forms.com/submit`, with no client JavaScript. Hidden fields
carry the access key, the subject and an absolute `redirect` to
`/contact/bedankt`; `botcheck` is a honeypot. The key comes from
`PUBLIC_WEB3FORMS_KEY`, declared in `src/env.ts` as an optional public
`astro:env` variable and read from `.env` at build time.

## SEO

`BaseLayout` writes the title (`<title> — Zot Goe`, or `Zot Goe — fotograaf
in Gent` on the home page), description, canonical URL, Open Graph and
Twitter tags, and `robots: noindex` when asked. `@astrojs/sitemap` generates
`sitemap-index.xml` from `site: 'https://zotgoe.be'`, and `public/robots.txt`
points at it.

| Page | JSON-LD | `og:image` |
| --- | --- | --- |
| `/` | `@graph` of `WebSite` and `Person` (address, email, `sameAs` socials) | `DEFAULT_OG_IMAGE` |
| `/werk` | `CollectionPage` with an `ItemList` of project URLs | — |
| `/werk/[slug]` | `ImageGallery`: name, summary, date, place, creator, image URLs | cover |
| `/over` | `AboutPage` with `Person` | portrait |
| `/contact` | `ContactPage` with `Person` | — |
| `/contact/bedankt`, `/404` | none, `noindex` | — |

## Quality gates

- **Tests**: Vitest, configured through Astro's `getViteConfig` so `astro:*`
  modules resolve. Tests sit next to their source in `src/lib/*.test.ts` and
  cover the pure layout and data functions.
- **Lint & format**: Biome (`biome.json`): tabs, single quotes, 80 columns,
  recommended rules, organised imports. It lints `.astro` frontmatter but
  doesn't format the template markup.
- **Types**: `npm run check:types` runs `astro check`.
- **Hooks**: `pre-commit` runs lint-staged (`biome check --write` on staged
  files). `pre-push` runs `npx biome ci . && npm run check:types && npm test
  && npm run build`.
- **CI**: `.github/workflows/ci.yml` runs the same four steps after `npm ci`
  on every push to `main` and every pull request, with Node from
  `.node-version`.
