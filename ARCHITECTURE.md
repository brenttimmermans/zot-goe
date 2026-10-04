# Architecture

Photography portfolio of Brent Timmermans. Dutch (`lang="nl"`), fully static:
Astro builds every page into `dist/`. No server, no adapter.

## Stack

| | |
| --- | --- |
| Runtime | Node 24 |
| Framework | Astro 7.3.5 |
| Styling | Tailwind CSS 4.3.3 (CSS-first `@theme`, no config file) |
| Language | TypeScript 6.0.3, strict |
| Fonts | Archivo (UI), Newsreader (prose), via Fontsource |
| Lightbox | GLightbox 3.3.1 |
| Contact form | Web3Forms |
| Lint & format | Biome 2.5.6 |
| Tests | Vitest 5.0.3 |
| Hooks | Husky + lint-staged |

## Structure

```
src/
  assets/            icons/, site/portrait.png, stand-in/ (placeholder photos)
  components/        Common, Site, Project, Home, Work, About, Contact
  constants/         categories.ts, site.ts (nav, socials, process steps)
  content/projects/  <slug>/index.yaml + photos
  layouts/           BaseLayout.astro
  lib/               pure logic + co-located *.test.ts
  pages/             routes
  styles/            global.css, tokens.css, fonts.css
  types/site.ts
  config.ts          site facts (URL, name, owner, email, tagline)
  content.config.ts  project schema
  env.ts             PUBLIC_WEB3FORMS_KEY schema
public/              favicon.svg, robots.txt
docs/plans/          redesign history
```

Imports use `~/` (→ `src/`) across folders, relative paths within one.

## Routes

| Route | Shows |
| --- | --- |
| `/` | Hero collage, featured projects, about teaser |
| `/werk` | All projects, newest first, category filter |
| `/werk/[slug]` | Cover, story, gallery + lightbox, next project |
| `/over` | Portrait, bio, "Hoe het werkt" steps |
| `/contact` | Contact form |
| `/contact/bedankt` | Thank-you page (`noindex`) |
| `/404` | Not found (`noindex`) |

## Components

| Folder | Components |
| --- | --- |
| `Common` | `Photo` (all images), `TextLink`, `Button` |
| `Site` | `Header`, `Footer`, `ThemeToggle`, `ThemeScript` |
| `Project` | `ProjectCard`, `Gallery`, `LightboxLink`, `Lightbox`, `NextProject` |
| `Home` | `HeroCollage`, `FeaturedProjects`, `AboutTeaser` |
| `Work` | `WorkGrid`, `WorkFilter` |
| `About` | `ProcessSteps` |
| `Contact` | `ContactForm`, `Field` |

`BaseLayout` props: `title`, `description`, `image`, `structuredData`,
`noindex`.

## Data model

`src/content/projects/<slug>/index.yaml`. The folder name is the slug. Field
reference: [README → Adding a project](./README.md#adding-a-project).

- Image paths are relative to the YAML and checked by `image()`: a bad path
  fails the build.
- `category` is the `Category` enum (`constants/categories.ts`): `concert`,
  `event`, `motorsport`, `huwelijk`.
- `featured` is a home-page rank. Five slots; extra ranks are ignored.
- Read only through `lib/projects.ts`: `getProjects()` (newest first),
  `getFeaturedProjects()`, `getNextProject()`.

## Images

| Where | Output |
| --- | --- |
| `Common/Photo` | `<Picture>`, AVIF + WebP, 480–2400 px, caller passes `sizes` |
| `Project/LightboxLink` | One WebP, max 2400 px |
| `BaseLayout` `image` | 1200×630 JPEG for `og:image` |

- Lazy by default; one `priority` image per page.
- Never serve photos from `public/`.
- Site images (`PORTRAIT`, `CONTACT_IMAGE`, `DEFAULT_OG_IMAGE`) live in
  `lib/siteImages.ts`.

## Theming

- **Tokens**: `styles/tokens.css` `@theme`. All colours are `hsl()` roles
  (`bg`, `ink`, `body`, `muted`, `accent`, …). Never use raw colours.
- **Dark**: `[data-theme="dark"]` overrides the colour tokens; `dark:`
  variant keys off the same attribute.
- **No flash**: `ThemeScript` (inline in `<head>`) sets `data-theme` from
  `localStorage.theme`, falling back to the system setting.
- **Toggle**: `ThemeToggle` flips and stores the theme.

## Layout logic (`src/lib/`)

| File | Does |
| --- | --- |
| `collage.ts` | 8 hero slots in a 1280×888 box; picks covers first, round-robin over projects |
| `workGrid.ts` | `/werk` 12-col pattern (8+4, 4+8, 6+6); odd last card centred. Reused by the filter in the browser |
| `gallery.ts` | Groups photos by orientation into `wide`, `pair`, `offset`, `single` rows |
| `format.ts` | `formatMonthYear()` → "april 2025", `formatYear()` |

## SEO

`BaseLayout` writes title, description, canonical, Open Graph and Twitter
tags. `@astrojs/sitemap` builds `sitemap-index.xml`.

| Page | JSON-LD | `og:image` |
| --- | --- | --- |
| `/` | `WebSite` + `Person` | `DEFAULT_OG_IMAGE` |
| `/werk` | `CollectionPage` | `DEFAULT_OG_IMAGE` |
| `/werk/[slug]` | `ImageGallery` | cover |
| `/over` | `AboutPage` | portrait |
| `/contact` | `ContactPage` | `DEFAULT_OG_IMAGE` |

## Quality gates

| When | Runs |
| --- | --- |
| Commit | `biome check --write` on staged files |
| Push and CI (`.github/workflows/ci.yml`) | `npx biome ci .`, `npm run check:types`, `npm test`, `npm run build` |

Tests: `src/lib/*.test.ts`, Vitest through Astro's `getViteConfig`.
