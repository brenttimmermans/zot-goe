# 21: Werk index (`/werk`)

| | |
| --- | --- |
| Wave | W2 (parallel with 20, 22–24) |
| Branch | `redesign/21-werk` |
| PR title | 💄 werk: project grid & filters |
| Design | frame `10b` |
| Dev port | 4342 |

## Goal

Every project in a 12-column grid of paired rows with free heights
(8/4 → 4/8 → 6/6, repeating), plus discipline filters that re-flow the
pattern without leaving holes.

## Owns

- `src/pages/werk/index.astro` (replaces the plan 11 stub)
- `src/components/Work/**` (new)
- `src/lib/workGrid.ts`, `src/lib/workGrid.test.ts` (new)

Use these, but treat them as frozen: `BaseLayout`, `ProjectCard`,
`lib/projects`, `constants/disciplines`, `config.ts`.

## Spec

### Slot pattern: `src/lib/workGrid.ts`

```ts
export interface WorkSlot {
	span: 4 | 6 | 8;
	height: 'tall' | 'short';
	centred?: boolean;
}
export function getWorkSlots(count: number): WorkSlot[];
```

- The pattern repeats every six cards: `8 tall`, `4 tall`, `4 tall`, `8 tall`,
  `6 short`, `6 short`.
- When `count` is odd, the last card becomes `{ span: 8, height: 'tall',
  centred: true }`, so a row is never half-empty.
- Tests: counts 0, 1, 2, 5, 6, 7 and 12.

### Header row

`px-gutter pt-section-S pb-11` is a flex row on `md` and up
(`justify-between items-baseline`) and a stacked column with a 16 px gap below
that.

- `<h1 class="text-heading font-medium">Werk</h1>`
- `Work/WorkFilter.astro`: a `<div role="group" aria-label="Filter op soort">`
  of `<button type="button" aria-pressed>`. The buttons are `Alles`, then each
  `DISCIPLINE_LABELS` entry **that has at least one project**, in enum order.
  Styling: `text-sm text-muted`, gaps of 22 px horizontally and 8 px between
  wrapped lines, pressed `text-ink`, hover `accent`. The group renders
  `hidden`, and the script reveals it, so without JS nobody sees a dead
  control.

### Grid: `Work/WorkGrid.astro`

- `<ul class="grid gap-x-media gap-y-section-S px-media pb-section-L
  md:grid-cols-12">`, with one `<li>` per project (newest first). Each item
  carries `data-discipline`, plus `data-span`, `data-height` and
  `data-centred` from `getWorkSlots(projects.length)`.
- A scoped `<style>` maps the data attributes at `md` and up:
  - `span` → `grid-column: span N`, and `centred` → `grid-column: 3 / span 8`
  - `tall` → `--row-h: clamp(20rem, 40.6vw, 32.5rem)` (520 px at 1280)
  - `short` → `--row-h: clamp(17.5rem, 34.4vw, 27.5rem)` (440 px)
- Use `ProjectCard` with `showYear` (caption `Walter Ego  Concert, 2026`),
  `frameClass="aspect-[4/3] md:aspect-auto md:h-(--row-h)"`, and `sizes` from
  the initial span (8 → `(min-width: 768px) 66vw, 100vw`, 6 → `50vw`,
  4 → `33vw`). The first two cards load eagerly.
- Below `md`, it's a single column, every frame is `aspect-[4/3]`, and the
  data attributes are ignored.

### Filtering

One module `<script>` (in `WorkGrid` or `WorkFilter`, no globals) that imports
`getWorkSlots` from `~/lib/workGrid`:

1. On click, update `aria-pressed`, set `hidden` on every `<li>` whose
   `data-discipline` doesn't match ("Alles" shows everything), and rewrite
   `data-span`, `data-height` and `data-centred` on the **visible** items using
   `getWorkSlots(visible.length)`.
2. Keep the URL shareable. Write `?soort=<discipline>` with
   `history.replaceState`, or remove it for "Alles". On load, apply a valid
   `?soort` and ignore unknown values.
3. Reveal the filter group.

### Page: `src/pages/werk/index.astro`

- `BaseLayout title="Werk"` with description "Concerten, events, motorsport en
  huwelijken: alle projecten van Brent Timmermans."
- JSON-LD `CollectionPage` with an `ItemList` of absolute project URLs.

## Commits

1. `✨ add the werk grid slot pattern`: `lib/workGrid.ts` and tests
2. `💄 render the werk grid in its row pattern`: `WorkGrid`, header row, page
3. `✨ filter projects by discipline`: `WorkFilter`, script, `?soort=`
4. `🔍 add werk meta and structured data`

## Verify

- At 1280 px, compare against `10b`: 520 px rows for 8/4 and 4/8, 440 px for
  6/6, 56 px row gaps, 24 px column gaps, and the filter row aligned on the
  title baseline.
- Each filter re-flows into clean pairs. A single odd card ends up centred.
  Reloading `/werk?soort=event` restores the filter. Back and forward never
  break.
- With JS disabled, all projects show and the filter is hidden.
- Check 390, 768 and 1600 px in both themes.
