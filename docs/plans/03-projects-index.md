# Stage 3 — Werk / Projects index (`/projects`, design `2b`)

> Depends on Stage 1. Independent of Stages 2, 4–6. Read [`00-overview.md`](./00-overview.md)
> and [`01-foundation.md`](./01-foundation.md). File: `src/pages/projects/index.astro`.
> May add page-local `FilterBar.astro`.

## Design intent (`2b`)

The full catalogue as an editorial spread: a big `WERK` title with a serif subtitle,
a row of category filters, then the same organic staggered rhythm as the home — but a
**different pattern** — using the `stacked` card variant (title + serif line + mono
meta under each image). Ends with a "Meer laden" affordance.

## Structure

1. **Header row** — `flex justify-between items-end`, `pt-10`.
   - Left: `WERK` with `text-display font-extrabold uppercase` (token); serif
     subtitle under it:
     `Veertien projecten, van een uitverkochte zaal tot vierentwintig uur regen op
     Spa.` (make the count dynamic from the collection).
   - Right: `<FilterBar/>` — `filters` chips (`.meta-row`) derived from unique
     `category` values, prefixed with `Alles`. See Filtering below.

2. **Project grid** — `flex flex-col gap-[76px]`, composed of alternating blocks that
   recreate the design's varied rhythm (offsets `md:`-only):
   - Block 1: `md:grid-cols-[5fr_7fr]` — card A `h-[430px] md:mt-[70px]`, card B
     `h-[540px]`.
   - Block 2 (wide + caption aside): `md:grid-cols-[1fr_300px] items-end` — one large
     image `h-[460px]` with the stacked meta in the narrow right column.
   - Block 3: `md:grid-cols-3` — three cards, heights `360 / 300 (md:mt-[54px]) /
     400 (md:mt-[18px])`.
   - Use `<ProjectCard metaStyle="stacked" heightClass=… offsetClass=…/>`.
   - **Generalize, don't hard-code 6 cards.** Map over the sorted collection and
     assign heights/offsets from a small rotating pattern array so any project count
     renders with the organic look:
     ```ts
     const HEIGHTS = ['h-[430px]','h-[540px]','h-[360px]','h-[300px]','h-[400px]','h-[460px]'];
     const OFFSETS = ['md:mt-[70px]','','md:mt-[54px]','md:mt-[18px]','',''];
     ```
   - Chunk into rows of ~2–3 to reproduce the spread, or simpler: one
     `md:grid-cols-2 lg:grid-cols-3` grid with per-card height/offset from the pattern
     (acceptable, still organic). Pick the simpler that reads well.

3. **"Meer laden"** — centered `boxed` affordance. With a small real dataset this is
   decorative; wire real load-more only if pagination is added later. Render it as a
   static boxed label (or hide when all projects already shown).

4. **Footer** — global.

## Filtering (`FilterBar.astro`)

- Chips: `['Alles', ...uniqueCategories]`. Active chip = accent + bottom border.
- Progressive enhancement: render all cards server-side; add a small inline
  `<script>` that toggles `hidden` on cards by `data-category` when a chip is
  clicked. Give each `ProjectCard` root a `data-category` attribute (add an optional
  pass-through) — or wrap cards and set it on the wrapper. No framework, no router.
- Keyboard accessible: chips are `<button>`s, `aria-pressed`.

## Data

```ts
const projects = await getSortedProjects();
const categories = [...new Set(projects.map(p => p.data.category))];
```

## SEO

`CollectionPage` JSON-LD (Dutch name/description). `title="Werk"`.

## Responsive

- Header stacks: title above, filter row below (`flex-col gap-6 md:flex-row`).
- Grid → single column on mobile; all `md:mt-*` offsets drop.
- Filter chips wrap (`flex-wrap`).

## Done when

`/projects` shows the big `WERK` header, working category filters, and the staggered
stacked-card grid from real data; count is dynamic; matches `2b` at desktop; stacks on
mobile; both themes; `check:types` + `lint` pass.
