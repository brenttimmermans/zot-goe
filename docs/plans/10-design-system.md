# 10: Design system & site shell

| | |
| --- | --- |
| Wave | W1 (parallel with [11](./11-content.md)) |
| Branch | `redesign/10-design-system` |
| PR title | 🎨 design system & site shell |
| Design | header and footer of every frame (`10a`–`10e`), plus the `<style>` in `<helmet>` |
| Dev port | 4331 |

## Goal

Replace the newsprint tokens and chrome with the Final design system: the
palette (light and dark), type and spacing scales, base styles, header, footer,
theme toggle, `TextLink`, `Button` and a rebuilt `BaseLayout`. After this PR,
every route shows the new header and footer, even while the page bodies are
still old or stubbed.

## Owns

- `tsconfig.json` (identical content to plan 11; see commit 1)
- `src/styles/**`
- `src/layouts/BaseLayout.astro`
- `src/components/Site/**` (new)
- `src/components/Common/TextLink.astro`, `src/components/Common/Button.astro` (new)
- `src/components/Navbar.astro`, `src/components/Footer.astro`,
  `src/components/Theme/**` (delete)
- `src/assets/icons/**`
- `src/config.ts`, `src/constants/site.ts`, `src/types/site.ts`

Do **not** touch pages, `components/ui/*`, `ProjectCard`, `AboutTeaser` or
`ContactForm`. Plan 11 is rewriting or deleting them in parallel.

## Commits

### 1. `🔧 add ~/ import alias`

Write `tsconfig.json` with **exactly** this content. Plan 11 writes the same
bytes, so the two PRs merge cleanly:

```json
{
	"extends": "astro/tsconfigs/strict",
	"include": [".astro/types.d.ts", "**/*"],
	"exclude": ["dist"],
	"compilerOptions": {
		"paths": {
			"~/*": ["./src/*"]
		}
	}
}
```

### 2. `🎨 replace the editorial tokens with the Final scales`

- `git mv src/styles/variables.css src/styles/tokens.css`. Rewrite it with the
  **light** tokens from [00 §2](./00-overview.md#2-design-language): colours,
  `--text-*` (each with `--line-height` and `--letter-spacing` companions),
  `--spacing-*`, `--container-*`, `--aspect-*`, `--ease-drift` and the fonts:
  - `--font-sans: 'Archivo Variable', 'Helvetica Neue', Arial, sans-serif`
  - `--font-serif: 'Newsreader Variable', Georgia, serif`
- Check that the uppercase T-shirt keys (`--spacing-section-S`) produce working
  utilities (`pt-section-S`). If Tailwind refuses them, use lowercase and
  update 00 §2.3 in this PR.
- `fonts.css`: keep only `@fontsource-variable/archivo` and
  `@fontsource-variable/newsreader` (roman). Drop the Newsreader italic and both
  Plex Mono imports. The package stays installed; plan 30 uninstalls it.
- `global.css`: import `tailwindcss`, `fonts.css` and `tokens.css`. Its base
  layer:
  - `html`: `bg-bg text-ink font-sans antialiased`, `color-scheme: light`
  - `a`: `transition-colors`; `a:hover`: `color: var(--color-accent)`
  - `:where(a, button, input, textarea, select, summary):focus-visible`:
    a 2 px `accent` outline with a 2 px offset
  - `::selection`: `accent` background, `on-accent` text
- Delete the old utilities (`.photo-placeholder`, `.meta-row`, `.px-page`) and
  the `.goverlay` override. Plan 22 re-adds a themed one.

### 3. `💄 add the warm dark palette`

- Under `[data-theme='dark']` in `tokens.css`, override every colour token with
  the **dark** column of 00 §2.1, and set `color-scheme: dark`.
- In `global.css`, add
  `@custom-variant dark (&:where([data-theme='dark'], [data-theme='dark'] *));`
  so `dark:` follows the toggle rather than the OS. Components rarely need
  `dark:`, because the tokens already flip.
- Check contrast on the dark background: `muted` and `body` need ≥ 4.5:1, and
  `accent` used as text needs ≥ 3:1. Nudge the lightness if needed, and record
  any change in the PR.

### 4. `✨ add TextLink and Button primitives`

`Common/TextLink.astro`, with props
`{ href: string; variant?: 'underline' | 'plain'; arrow?: boolean; class?: string }`:

- `underline` (the default): `text-sm text-ink border-b border-ink pb-[3px]`;
  on hover, the border turns `accent`. Used for "Alle projecten", "Stuur een
  bericht →" and "Zoiets nodig? …".
- `plain`: `text-sm text-subtle`. Used for "Meer over mij →".
- `arrow` appends ` →` inside an `aria-hidden` span.
- Slot content is the label.

`Common/Button.astro`, with props `{ type?: 'submit' | 'button'; class?: string }`:
a pill (`rounded-full`) styled `bg-ink text-bg px-6 py-[13px] text-sm
font-medium` that changes on hover to `bg-accent text-on-accent` with
`transition-colors`. Slot content is the label. `type` defaults to `button`.

### 5. `✨ add the site header, footer and theme toggle`

Build these as new files. Nothing uses them until commit 6.

- `Site/Header.astro`: follow [00 §2.5](./00-overview.md#25-shared-chrome-built-in-plan-10).
  Use `<header>`, with the brand link and then `<nav aria-label="Hoofdmenu"><ul>`
  built from `NAV_LINKS`, followed by `ThemeToggle`. A small helper
  `isActive(href, pathname): boolean` handles the active state: `/` matches
  exactly, everything else matches by prefix.
- `Site/Footer.astro`: follow 00 §2.5. The year comes from
  `new Date().getFullYear()` at build time. The links are `mailto:` for
  `EMAIL` and the Instagram entry of `SOCIALS`.
- `Site/ThemeScript.astro`: an `is:inline` script in `<head>`. It sets
  `data-theme` on `<html>` from `localStorage.theme`, or falls back to
  `prefers-color-scheme`. It runs before first paint, so the theme never
  flashes.
- `Site/ThemeToggle.astro`: a `<button type="button" aria-pressed>` labelled
  "Donkere modus", holding the sun and moon icons (`?raw`). Show and hide them
  with `dark:hidden` / `hidden dark:block` rather than JS class juggling. A
  module `<script>` flips `data-theme`, persists it, syncs `aria-pressed`,
  and follows OS changes until the user picks a theme.
- `assets/icons/*.svg`: remove the hard-coded `class` attribute and use
  `stroke-width="1.5"`. They render at 16 px.

### 6. `♻️ rebuild BaseLayout on the new shell`

Props, from 00 §3.2:

```ts
interface Props {
	title?: string;
	description?: string;
	image?: ImageMetadata;
	structuredData?: Record<string, unknown>;
	noindex?: boolean;
	/** @deprecated legacy callers only; removed in plan 30 */
	ogImage?: string;
	/** @deprecated legacy callers only; removed in plan 30 */
	canonicalUrl?: string;
}
```

- `<html lang="nl">`. The title is `` `${title} — ${SITE_NAME}` ``, or
  `` `${SITE_NAME} — fotograaf in Gent` `` when there's no title. The
  description defaults to `TAGLINE`.
- Canonical is `new URL(Astro.url.pathname, Astro.site)`. Set
  `og:locale=nl_BE`, `og:type`, `og:title`, `og:description` and `og:url`, plus
  the Twitter `summary_large_image` tags.
- OG image: when `image` is set, use `getImage({ src: image, width: 1200,
  height: 630, fit: 'cover', format: 'jpeg' })` and make the URL absolute.
  Otherwise fall back to the legacy `ogImage` string, made absolute.
- When `noindex` is set, add `<meta name="robots" content="noindex">`. JSON-LD
  stays as it is today.
- Body: one centred column, `mx-auto flex min-h-svh w-full max-w-page
  flex-col`, holding a skip link ("Naar de inhoud" → `#inhoud`),
  `Site/Header`, `<main id="inhoud" class="flex-1">` and `Site/Footer`.
- Delete `Navbar.astro`, `Footer.astro`, `Theme/Init.astro` and
  `Theme/Toggle.astro`.

### 7. `🔧 point navigation to the Dutch routes`

- `constants/site.ts`: change `NAV_LINKS` to `/werk`, `/over` and `/contact`.
  Change `SOCIALS` to just `{ label: 'Instagram', href:
  'https://instagram.com/zotgoe' }`. Leave `PROCESS_STEPS` (it matches the
  design verbatim) and `CONTACT_HINT` (plan 30 removes it).
- `config.ts`: add `export const SINCE = 2017;`. Keep every existing export.
  Old files still import them.

## Verify

- Every existing route renders with the new header and footer in both themes.
  The page bodies can look broken. Reloading in dark mode doesn't flash.
- The toggle works by keyboard, and `aria-pressed` reflects the theme.
- At 1280 px the header measures 72 px tall with a 40 px gutter, and the nav
  is 14 px with 28 px gaps. At 390 px the header fits on one line without
  wrapping.
- `npx biome ci . && npm run check:types && npm run build` pass. `npm test`
  arrives with plan 11.
