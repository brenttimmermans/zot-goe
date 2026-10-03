# 30: Quality sweep

| | |
| --- | --- |
| Wave | W3 (parallel with [31](./31-docs.md)) |
| Branch | `redesign/30-quality` |
| PR title | ✅ quality sweep: a11y, responsive, dark, cleanup |
| Design | all frames |
| Dev port | 4351 |

## Goal

Make the five pages feel like one finished product, remove everything the
migration left behind, and hit the project definition of done in
[00 §6](./00-overview.md#6-verification--definition-of-done). This PR adds no
new features. The one exception is the 404 page.

## Owns

Everything under `src/`, `public/`, `package.json`, `package-lock.json`,
`astro.config.mjs`, `biome.json` and `.github/`. Plan 31 owns the docs, so
don't touch `*.md`.

## Commits

Each item is its own commit. Skip any item that turns out to need no
changes, and say so in the PR.

1. `🔥 remove migration leftovers`
   - Delete `components/ui/Wordmark.astro` (and the folder), `public/images/`
     (`hero.png` lives in `src/assets/site/` now), the legacy BaseLayout props
     `ogImage` and `canonicalUrl`, and unused exports such as `CONTACT_HINT`
     and `CITY`, if unused.
   - `npm uninstall @fontsource/ibm-plex-mono`.
   - Run `npx knip` once, without adding it as a dependency. Act on real
     findings.
2. `🔍 default OG image and prefetching`
   - `BaseLayout` falls back to `DEFAULT_OG_IMAGE`, so every page has an
     absolute `og:image`.
   - Add `prefetch: { prefetchAll: true, defaultStrategy: 'viewport' }` to
     `astro.config.mjs`.
   - Check that `robots.txt` points to the generated sitemap and that the
     sitemap lists the 5 routes and 6 projects, and not `/contact/bedankt`
     (filter it in the sitemap config).
3. `✨ add the 404 page`
   - Style it like the thank-you page: `<h1>` "Deze pagina bestaat niet
     (meer)", a serif line, then `TextLink`s to `/werk` and `/`.
   - `BaseLayout title="Niet gevonden" noindex`.
4. `💄 replace the favicon with the coral dot`
   - An SVG circle in the light accent colour, with a `prefers-color-scheme:
     dark` rule for the dark accent. Drop `favicon.ico` and make sure no file
     references it.
5. `♿️ accessibility fixes`. Audit every route in both themes:
   - one `<h1>` per page and a logical heading order
   - landmarks, the skip link, and `aria-current` in the nav
   - alt text on every image
   - focus visible everywhere, including the lightbox and the form
   - AA contrast for all text
   - nothing breaks at 200 % zoom
   - reduced motion respected
6. `📱 responsive fixes`. Audit 360, 390, 768, 1024, 1280, 1440, 1600 and
   1920 px: no horizontal scroll, no overlaps, consistent gutters
   (`px-gutter` for text, `px-media` for photos), and a sensible cap above
   1600 px.
7. `💄 dark theme fixes`. Audit every route in dark mode: frames, hairlines,
   rules, input underlines, placeholders, button hover, lightbox chrome and
   the selection colour.
8. `⚡️ performance fixes`. Run Lighthouse (mobile and desktop) on `/`,
   `/werk` and `/werk/spa-24h`, aiming for ≥ 95 in every category.
   - Check `sizes` accuracy, one priority image per page, zero CLS, and that
     no JS ships to pages that don't need it.
   - Paste the scores into the PR.
9. `💄 align spacing and type with the design`. Do a side-by-side pass at
   1280 px for each frame (`10a`–`10e`) and fix any deviation over ~10 px.

## Verify

The full definition of done in 00 §6: `npx biome ci .`, `npm run
check:types`, `npm test` and `npm run build` are green; Lighthouse scores are
in the PR; there is no dead code or unused dependency.
