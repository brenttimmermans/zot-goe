# Stage 7 — Integration & polish

> Runs **after** all page stages, single agent. Read [`00-overview.md`](./00-overview.md).
> Purpose: make the five pages feel like one system, verify quality gates, remove dead
> code. No new features — reconcile and polish only.

## 1. Reconcile shared surfaces

- **Navbar / Footer / BaseLayout** consistent across all five routes; active nav state
  correct on each (`/`, `/projects`, `/about`, `/contact`; detail highlights `Werk`).
- **Cross-links resolve:** home→`/about`, home→`/projects`, home→`/contact`;
  detail→`/projects`, detail→next slug, detail→`/contact`; about→`/contact`. No `#`
  placeholder hrefs left except real external socials.
- **Wordmark, EditorialLink, MonoLabel, Photo, Dateline** used consistently — no page
  re-implementing a primitive inline. Fold any accidental duplication back into `ui/`.

## 2. Remove dead files

- `src/components/HeroSection.astro` (unused after home rewrite).
- `src/components/Image.astro` (superseded by `ui/Photo.astro`) — confirm no imports.
- `src/constants/project.ts`, `src/types/project.ts` (old card machinery) — confirm no
  imports remain.
- `src/styles/fonts/montserrat-variable.ttf` + any leftover `@font-face`.
- Stale asset refs (`/images/hero.jpg` vs `hero.png`) in `BaseLayout`/pages.
- Update `ARCHITECTURE.md` component/route tables to match the new structure
  (routes, `/about`, `ui/` folder, dropped files).

## 3. Dark-mode pass

- Walk every page in dark theme (palette from screen `3a`). Check: coral accent
  (`#F4776B`) contrast on the warm-ink bg, hairline visibility (`--color-line`), photo
  placeholder gradient, form input borders, solid button (uses `--color-accent` +
  `--color-accent-contrast` text — inverts correctly), success panel. Nudge dark
  tokens in `global.css` if any element disappears or fails AA for real text.

## 4. Responsive audit

- Test at ~375px, ~768px, ~1280px. Confirm: no horizontal scroll; every `md:mt-*`
  stagger offset drops on mobile; display type never overflows (all use `clamp`);
  asymmetric grids collapse to single column; contact split stacks; galleries stack.

## 5. Accessibility

- One `<h1>` per page; heading order sane. All `<img>` have meaningful `alt` (not just
  the folder filename). Form labels associated. Skip-link works. Focus-visible rings
  present. Decorative mono/muted text not used for essential info.

## 6. Filtering & lightbox

- `/projects` category filter toggles cards correctly, `Alles` resets, chips are
  keyboard-operable (`aria-pressed`).
- Detail gallery: GLightbox opens, groups the project's images, loops; only one init
  runs (no double-binding across `Photo` instances).

## 7. Quality gates (must pass)

```
npm run check       # biome lint + format (tabs, single quotes, width 80)
npm run check:types # astro check — 0 errors
npm run build       # clean production build
```

Then run the `verify` skill / `npm run preview` and click through all five routes in
both themes. Fix anything that regressed.

## 8. Done when

All quality gates pass; five routes match their design screens in both themes at
mobile + desktop; dead files gone; `ARCHITECTURE.md` updated; no console errors in
preview.
