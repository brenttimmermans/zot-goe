# Stage 1 — Foundation (blocking)

> Do this **first and alone**. Stages 2–6 build against the contracts defined here.
> Read [`00-overview.md`](./00-overview.md) first. Follow `CODE_STYLE.md`: explicit
> types, `interface` for props, `import type`, tabs, single quotes, width 80, colors
> as `hsl()` tokens.

Deliverables: design tokens (light + dark), fonts, `global.css` utilities,
site config/constants, extended content schema + updated YAML, and the shared
components (`BaseLayout`, `Navbar`, `Footer`, `ui/*`, `ProjectCard`). At the end,
`npm run check:types` and `npm run build` must pass with placeholder pages still
rendering.

---

## 1. Fonts

Replace self-hosted Montserrat with the three design families, self-hosted via
`@fontsource` (npm — no runtime CDN, matches privacy/perf of current setup).

```
npm i @fontsource-variable/archivo @fontsource-variable/newsreader @fontsource/ibm-plex-mono
```

Rewrite `src/styles/fonts.css` to import the needed axes/weights:

```css
@import '@fontsource-variable/archivo';                 /* 100–900 wght */
@import '@fontsource-variable/newsreader';              /* optical + wght */
@import '@fontsource-variable/newsreader/wght-italic.css';
@import '@fontsource/ibm-plex-mono/400.css';
@import '@fontsource/ibm-plex-mono/500.css';
```

Delete `src/styles/fonts/montserrat-variable.ttf` and its `@font-face`. Register the
families as Tailwind theme tokens (below) so utilities `font-sans`, `font-serif`,
`font-mono` resolve correctly.

> Fallback if `@fontsource` is undesired: download the woff2 files into
> `src/styles/fonts/` and hand-write `@font-face` as the repo does today.

---

## 2. Design tokens — `src/styles/global.css`

> **Tokens-first (hard rule).** Every color, the display type scale, and reused
> rhythm values live as CSS variables in `@theme`. Components and pages reference
> them only through token-backed Tailwind utilities (`bg-bg`, `text-heading`,
> `text-accent`, `border-line`, `font-serif`, `text-wordmark`, …) or `var(--…)` in
> `@layer components`. **Never** write a raw hex/rgb value in a component, and don't
> scatter arbitrary `text-[clamp(…)]` / one-off color values — if a value is used
> more than once, it must be a token. This keeps the CSS clean and makes the
> light/dark switch a single-source change. (This was an explicit request.)

Keep the CSS-first Tailwind 4 approach (`@theme`). Colors **must** be `hsl()`
(CODE_STYLE §CSS). Map the design hex to tokens; add a dark theme under
`[data-theme="dark"]`. Light values are the design's palette (unchanged from Turn 02
except the accent); dark values come from screen `3a`. HSL is approximate — fine to
nudge for contrast.

```css
@import 'tailwindcss';
@import './fonts.css';

@theme {
	/* fonts */
	--font-sans: 'Archivo Variable', 'Helvetica Neue', Arial, sans-serif;
	--font-serif: 'Newsreader Variable', Georgia, serif;
	--font-mono: 'IBM Plex Mono', ui-monospace, monospace;

	/* light "paper" palette */
	--color-bg: hsl(40, 30%, 98%);        /* #FBFAF8 page paper       */
	--color-surface: hsl(45, 25%, 96%);   /* #F7F6F3 top bars / panels */
	--color-heading: hsl(48, 14%, 7%);    /* #14130F ink              */
	--color-body: hsl(45, 11%, 21%);      /* #3B382F serif body       */
	--color-body-soft: hsl(44, 8%, 27%);  /* #4A473F secondary body   */
	--color-muted: hsl(42, 6%, 41%);      /* #6E6A61 mono meta        */
	--color-faint: hsl(41, 6%, 51%);      /* #8A857A captions on img  */
	--color-line: hsl(44, 13%, 83%);      /* #DAD7CF strong hairline  */
	--color-line-soft: hsl(42, 15%, 87%); /* #E4E1DA soft hairline    */
	--color-accent: hsl(5, 77%, 60%);        /* #E8574A koraal (Turn 04) */
	--color-accent-hover: hsl(5, 70%, 54%);  /* slightly deeper on hover  */
	--color-accent-contrast: hsl(51, 19%, 7%); /* #16150F — ink text on accent fills (chips/solid button) */

	/* image placeholder gradient stops */
	--placeholder-a: hsl(42, 20%, 91%);   /* #EDEAE3 */
	--placeholder-b: hsl(42, 17%, 87%);   /* #E5E1D8 */

	/* display type scale — Tailwind 4 turns --text-* into text-* utilities, so
	   pages write `text-wordmark` instead of inlining clamp() everywhere.
	   Paired --line-height / --letter-spacing keep the utility self-contained. */
	--text-wordmark: clamp(3.5rem, 14vw, 10.5rem);
	--text-wordmark--line-height: 0.8;
	--text-wordmark--letter-spacing: -0.055em;
	--text-display: clamp(3rem, 9vw, 5.75rem);   /* Werk title            */
	--text-display--line-height: 0.86;
	--text-display--letter-spacing: -0.045em;
	--text-about: clamp(2.25rem, 5vw, 3.875rem); /* About H1              */
	--text-about--line-height: 1;
	--text-about--letter-spacing: -0.04em;
	--text-lead: clamp(2rem, 4.5vw, 3.25rem);    /* home lead statement   */
	--text-lead--line-height: 1.1;
	--text-lead--letter-spacing: -0.035em;
	--text-title: clamp(2rem, 4vw, 2.875rem);    /* detail H1             */
	--text-title--line-height: 1.05;
	--text-title--letter-spacing: -0.035em;
	--text-contact: clamp(2.5rem, 5vw, 3.75rem); /* contact H1            */
	--text-contact--line-height: 0.92;
	--text-contact--letter-spacing: -0.04em;

	/* editorial rhythm — reused spacing, tokenized so it's changed in one place */
	--gap-section: 4.375rem;   /* 70px between major page sections */
	--gap-grid: 2.75rem;       /* 44px column gap in photo grids   */

	--navbar-height: 72px;
	--transition-duration: 0.3s;
}

/* Dark "warm paper" palette — taken directly from the design's dark screen `3a`
   (Turn 03/04), NOT invented. "Warm donker papier i.p.v. zwart." */
[data-theme='dark'] {
	--color-bg: hsl(51, 19%, 7%);         /* #16150F warm near-black ink   */
	--color-surface: hsl(47, 12%, 11%);   /* #201F19 raised panel          */
	--color-heading: hsl(47, 26%, 93%);   /* #F2F0E9 warm paper text       */
	--color-body: hsl(47, 26%, 93%);      /* #F2F0E9                        */
	--color-body-soft: hsl(43, 12%, 68%); /* #B6B1A4 serif body            */
	--color-muted: hsl(43, 8%, 53%);      /* #8F8A7D mono meta             */
	--color-faint: hsl(41, 6%, 51%);      /* #8A857A                        */
	--color-line: hsl(47, 12%, 15%);      /* #2C2A22 hairline              */
	--color-line-soft: hsl(40, 13%, 18%); /* #332F27 soft hairline         */
	--color-nav-link: hsl(42, 9%, 62%);   /* #A7A296 dark-mode nav links   */
	--color-accent: hsl(5, 86%, 69%);     /* #F4776B lighter coral on dark */
	--color-accent-hover: hsl(5, 90%, 75%);
	--color-accent-contrast: hsl(51, 19%, 7%);  /* ink text still reads on coral */
	--placeholder-a: hsl(46, 14%, 12%);   /* #24221B */
	--placeholder-b: hsl(51, 14%, 10%);   /* #1D1C15 */
}
```

> **Accent history:** the original Turn 02 rust `#B4451F` is replaced everywhere by
> the Turn 04 coral — `#E8574A` in light, `#F4776B` in dark. It appears (measured,
> per screens `3b`/`4b`) on: eyebrow labels, the `availability` line, link hover, the
> underline "Plan een shoot / Lees verder →" links, and accent fills (chips, the
> solid submit button uses `--color-accent` on hover). Text on an accent fill uses
> `--color-accent-contrast`.

Base layer + reusable utilities (so pages/components don't repeat long class
strings). Keep the focus-visible rule and GLightbox override from the current file.

```css
@layer base {
	body {
		@apply bg-bg text-body;
		font-family: var(--font-sans);
		-webkit-font-smoothing: antialiased;
		transition:
			background-color var(--transition-duration) ease,
			color var(--transition-duration) ease;
	}
	:where(a, button, input, textarea, select, summary) {
		@apply focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent;
	}
	a:hover { color: var(--color-accent); }
}

@layer components {
	/* paper placeholder for images while/if they have no source */
	.photo-placeholder {
		background: repeating-linear-gradient(
			135deg,
			var(--placeholder-a) 0 6px,
			var(--placeholder-b) 6px 12px
		);
	}
	/* IBM Plex Mono eyebrow/label */
	.eyebrow {
		font-family: var(--font-mono);
		font-size: 0.6875rem;      /* 11px */
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--color-muted);
	}
	/* justified mono meta row */
	.meta-row {
		font-family: var(--font-mono);
		font-size: 0.6875rem;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--color-muted);
	}
}

	/* repeated page horizontal padding — one utility instead of arbitrary values */
	.px-page { @apply px-6 md:px-10 lg:px-[3.75rem]; } /* 60px at lg */

summary::-webkit-details-marker { display: none; }
.goverlay { background: hsla(51, 19%, 7%, 0.95); }
```

**Type scale — use the named tokens** (defined in `@theme` above; each carries its
own line-height + letter-spacing, so the utility is all you need). Do **not** re-inline
`clamp()` in pages.

| Role              | Design px | Utility (token-backed)                        |
| ----------------- | --------- | --------------------------------------------- |
| Home wordmark     | 168       | `text-wordmark font-extrabold uppercase`      |
| Page title (Werk) | 92        | `text-display font-extrabold uppercase`       |
| About H1          | 62        | `text-about font-semibold`                    |
| Lead statement    | 52–54     | `text-lead font-semibold`                     |
| Detail H1         | 46        | `text-title font-semibold`                    |
| Contact H1        | 60        | `text-contact font-extrabold uppercase`       |
| Card title        | 19        | `text-lg font-bold tracking-[-0.01em]`        |
| Serif lead/body   | 16–21     | `font-serif text-base/text-lg leading-relaxed`|
| Eyebrow / meta    | 10–12     | `.eyebrow` / `.meta-row` (or `<MonoLabel>`)   |

For repeated rhythm use `gap-(--gap-section)` / `gap-(--gap-grid)` and `.px-page`
rather than arbitrary spacing. One-off editorial photo heights/offsets (e.g.
`h-[520px]`, `md:mt-[90px]`) are layout *data* — keep them in the documented pattern
arrays in each page plan; they don't need to be global tokens.

---

## 3. Site config & constants

`src/config.ts` — extend with brand facts (currently only `SITE_URL`):

```ts
export const SITE_URL = 'https://zotgoe.be';
export const SITE_NAME = 'Zot Goe';
export const OWNER = 'Brent Timmermans';
export const EMAIL = 'brent@zotgoe.be';
export const CITY = 'Gent, België';
export const AVAILABILITY = 'Beschikbaar voor opdrachten';
export const TAGLINE =
	'Event-, concert- en motorsportfotografie voor Gentse merken, organisatoren en mensen.';
```

`src/constants/site.ts` — nav, socials, process steps, contact hints. Use string
enums / typed arrays per CODE_STYLE.

```ts
export interface NavLink {
	label: string;
	href: string;
}
export const NAV_LINKS: NavLink[] = [
	{ label: 'Werk', href: '/projects' },
	{ label: 'Over', href: '/about' },
	{ label: 'Contact', href: '/contact' },
];

export interface Social { label: string; href: string; }
export const SOCIALS: Social[] = [
	{ label: 'Instagram', href: 'https://instagram.com/zotgoe' },
	{ label: 'LinkedIn', href: '#' },
];

export interface ProcessStep { no: string; title: string; body: string; }
export const PROCESS_STEPS: ProcessStep[] = [
	{ no: '01', title: 'Je stuurt een bericht', body: 'Datum, soort shoot, locatie. Ik antwoord binnen 24 uur, meestal sneller.' },
	{ no: '02', title: 'We bellen kort', body: 'Vijftien minuten om te weten wat je nodig hebt en waarvoor je de beelden gebruikt.' },
	{ no: '03', title: 'Ik kom fotograferen', body: 'Discreet, meestal zonder flits. Ik loop mee, ik regisseer niet.' },
	{ no: '04', title: 'Je krijgt je beelden', body: 'Bewerkte selectie in web- en drukformaat, binnen een week. Sneller kan, in overleg.' },
];

export const CONTACT_HINT = 'Datum · Soort shoot · Locatie · Waarvoor je de beelden gaat gebruiken';
```

Delete `src/constants/project.ts` and `src/types/project.ts` (old card machinery).

---

## 4. Content schema — `src/content.config.ts`

Extend the `projects` collection. Keep existing fields; add the new ones. Relax
`highlights` to optional (the new card uses a single lead image = `cover`).

```ts
schema: z.object({
	title: z.string(),
	description: z.string(),          // short serif one-liner for cards
	date: z.coerce.date(),
	category: z.string(),             // "Concert" | "Huwelijk" | "Motorsport" | ...
	location: z.string(),             // "Gent" | "Spa" | "O-Vl"
	cover: z.string(),                // lead image (card + detail hero + OG)
	imageFolder: z.string(),
	highlights: z.array(z.string()).optional(),
	gallery: z.array(z.string()).min(1),
	credits: z.array(z.object({ label: z.string(), value: z.string() })).optional(),
	brief: z.array(z.string()).optional(),   // "De opdracht" running paragraphs
	featured: z.boolean().default(false),
	order: z.number().optional(),
}),
```

Update **both** existing YAML files to the new shape with Dutch values. Example
(`spa-24-002.yaml` → keep the folder/images, add fields):

```yaml
title: 'Spa 24h'
description: 'Endurance van zonsondergang tot de ochtendmist boven Eau Rouge.'
date: 2025-06-15
category: 'Motorsport'
location: 'Spa'
cover: '/images/projects/spa-24-002/test-image_0014.jpg'
imageFolder: 'spa-24-002'
gallery:
  - '/images/projects/spa-24-002/test-image_0014.jpg'
  # …existing images…
credits:
  - { label: 'Waar', value: 'Circuit de Spa-Francorchamps' }
  - { label: 'Wanneer', value: 'Juni 2025, 24 uur' }
  - { label: 'Opdracht', value: 'Reportage · pers & socials' }
brief:
  - 'Vierentwintig uur endurance, van de start in volle zon tot de ochtendmist boven Eau Rouge.'
  - 'Ik fotografeerde discreet aan de pitmuur en in de paddock…'
featured: true
```

> The design's fuller sample set (Walter Ego, Cedric & Anouk, Beidehand, Lannoo,
> Slim Besturen) is in the design's data script — Stage 2/3 agents may reference it
> for realistic copy, but only the two folders with real images exist. Don't invent
> YAML for images that aren't in `public/images/projects/`.

Helper (add to a small `src/lib/projects.ts`) for sorted list + next-project lookup,
so pages don't duplicate sort logic:

```ts
import { getCollection, type CollectionEntry } from 'astro:content';

export async function getSortedProjects(): Promise<CollectionEntry<'projects'>[]> {
	const all = await getCollection('projects');
	return all.sort(
		(a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime(),
	);
}
```

---

## 5. Component contracts (build these; pages import them)

### `src/layouts/BaseLayout.astro` (update)
- `lang="nl"`; keep SEO/OG/Twitter/JSON-LD props and skip-link.
- Keep `<ThemeInit />` and the toggle. Default `description` → Dutch.
- Body: `bg-bg text-body min-h-screen flex flex-col`, `<Navbar/> <main> <Footer/>`.
- Fix the stale `ogImage` default (`/images/hero.jpg` — file is `hero.png`).

### `src/components/Navbar.astro` (rewrite)
- Layout: `<Wordmark size="nav"/>` left; `NAV_LINKS` as `.meta-row` links + active
  state (accent color when active); `<ThemeToggle/>` right.
- Sticky, `h-[var(--navbar-height)]`, `bg-bg/80 backdrop-blur-sm`, max-w container.
- Active detection: `/` exact; others `startsWith`.

### `src/components/Footer.astro` (rewrite)
- Top border `border-t border-line-soft`, padding `~40px 60px`.
- Three `.meta-row` items justified: `EMAIL` · `Gent` · `© {year} {SITE_NAME}`.

### `src/components/ui/Wordmark.astro`
```ts
interface Props { size?: 'sm' | 'nav' | 'hero'; as?: 'a' | 'span'; href?: string; }
```
- `hero`: the giant uppercase 800-weight display (`text-wordmark` token utility).
- `nav`/`sm`: compact uppercase bold, `tracking-[0.14em]`.

### `src/components/ui/MonoLabel.astro`
```ts
interface Props { accent?: boolean; as?: keyof HTMLElementTagNameMap; class?: string; }
```
- Renders `.eyebrow`; `accent` → `text-accent`. Slot for text.

### `src/components/ui/EditorialLink.astro`
```ts
interface Props { href: string; variant?: 'underline' | 'boxed' | 'solid'; }
```
- `underline`: mono uppercase + bottom border, trailing `→`.
- `boxed`: `border border-line px-6 py-3.5` hover `border-heading`.
- `solid`: `bg-heading text-bg px-7 py-4` hover `bg-accent`. Slot for label.

### `src/components/ui/Photo.astro` (supersedes `Image.astro`)
```ts
interface Props {
	src?: string; alt: string; caption?: string;
	ratio?: string;           // e.g. '3/2', '4/5'; else natural
	heightClass?: string;     // e.g. 'h-[520px]' for fixed editorial heights
	lightbox?: boolean; gallery?: string; loading?: 'eager' | 'lazy';
}
```
- Wrapper gets `.photo-placeholder`; `<img object-cover>` on top; if no `src`, show
  placeholder only. `caption` → mono `text-faint` line under image.
- `lightbox` → wrap in `<a class="glightbox" data-gallery>` + include the GLightbox
  init script (move current `Image.astro` script here). Keep GLightbox import.

### `src/components/ui/Dateline.astro`
- Edge-to-edge `.meta-row` (justify-between): `CITY` · edition/label slot ·
  `AVAILABILITY` (availability in accent). Props for the middle text.

### `src/components/ProjectCard.astro` (rewrite — shared by Home & Werk)
```ts
interface Props {
	title: string; description: string; slug: string;
	category: string; location?: string; date: Date;
	cover?: string;
	heightClass?: string;   // editorial variable height, default 'h-[420px]'
	offsetClass?: string;   // md:mt-* stagger; '' on mobile
	metaStyle?: 'inline' | 'stacked';  // home = inline caption; werk = stacked block
}
```
- `<a href="/projects/{slug}">` → `<Photo>` (cover) + caption block.
- `inline`: single justified mono row `NN / Title` · `Category · Year` (home).
- `stacked`: Archivo bold title, serif `description`, mono `Category · Location ·
  Year` (werk index).
- Hover: image slight opacity/scale is optional; keep subtle.
- **Retire** the `textPositionIndex` / `ORDER_CLASSES` / `CardTextPosition` logic.

---

## 6. Responsive baseline (applies to every page)

- Container: `max-w-7xl mx-auto`, page padding `px-6 md:px-10 lg:px-[60px]`.
- The design is drawn at 1280px. **Mobile-first**: default single column; introduce
  the multi-column asymmetric grids at `md:`/`lg:`. All `margin-top` stagger offsets
  are `md:`-prefixed so cards stack flush on mobile.
- Huge display type uses `clamp()` (see scale table) — never a fixed 168px on phones.

---

## 7. Stage 1 done when

- `npm i` of the three fontsource packages succeeds; Montserrat removed.
- `global.css` compiles; `bg-bg`, `text-heading`, `font-serif`, `font-mono`,
  `text-accent`, `.eyebrow`, `.photo-placeholder` all resolve.
- Schema + both YAML files updated; `npm run check:types` passes.
- `BaseLayout`, `Navbar`, `Footer`, all `ui/*`, and `ProjectCard` exist, typecheck,
  and render in both themes (verify with the still-existing placeholder pages).
- `npm run build` succeeds. Commit before page stages fan out.
