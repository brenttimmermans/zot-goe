# 20: Home (`/`)

| | |
| --- | --- |
| Wave | W2 (parallel with 21–24) |
| Branch | `redesign/20-home` |
| PR title | 💄 home: collage hero & featured work |
| Design | frame `10a` (markup and the `driftTiles` logic in the data script) |
| Dev port | 4341 |

## Goal

The signature page. A floating photo collage fills the first viewport, with a
quiet intro in the middle. Below it come five featured projects in asymmetric
rows, then a short about teaser.

## Owns

- `src/pages/index.astro`
- `src/components/Home/**` (new)
- `src/lib/collage.ts`, `src/lib/collage.test.ts` (new)

Use these, but treat them as frozen: `BaseLayout`, `TextLink`, `Photo`,
`ProjectCard`, `lib/projects`, `config.ts`, `constants/site.ts`.

## Spec

### Hero collage: `Home/HeroCollage.astro`

**Data.** `src/lib/collage.ts`:

```ts
export interface CollageSlot { x: number; y: number; w: number; h: number; depth: number }
export const COLLAGE_SLOTS: CollageSlot[]; // design px inside a 1280 × 888 box
export interface CollageTile { project: Project; photo: ProjectPhoto }
export function pickCollageTiles(projects: Project[], count: number): CollageTile[];
```

The slots below are transcribed from the design. Keep the raw design pixels in
the constant and convert them to percentages in a single place.

| # | x | y | w | h | depth |
| - | - | - | - | - | ----- |
| 1 | 40 | 32 | 220 | 290 | 18 |
| 2 | 340 | 96 | 180 | 124 | 34 |
| 3 | 720 | 24 | 320 | 212 | 12 |
| 4 | 1100 | 150 | 140 | 186 | 40 |
| 5 | 80 | 420 | 260 | 172 | 24 |
| 6 | 240 | 660 | 150 | 190 | 44 |
| 7 | 560 | 640 | 230 | 150 | 28 |
| 8 | 900 | 400 | 300 | 380 | 10 |

`pickCollageTiles` goes round-robin over the newest-first projects. Pass 1 takes
every cover, pass 2 every `photos[0]`, and so on, until it has `count` tiles. It
returns fewer when photos run out. Tests should cover the round-robin order,
stopping at `count`, and running out of photos.

**Desktop (`lg` and up).** The hero is `relative`, with height
`clamp(40rem, calc(100svh - var(--spacing-header)), 56rem)` and
`container-type: size`.

- Position each tile by percentage: `left: calc(x / 1280 * 100%)` and
  `top: calc(y / 888 * 100%)`.
- Scale tile **size** by whichever axis is tighter, so tiles keep the design's
  shapes and never overflow at wide-and-short or narrow-and-tall viewports:
  `--unit: min(100cqw / 1280, 100cqh / 888)`, `width: calc(w * var(--unit))`
  and `aspect-ratio: w / h`. Pass x, y, w, h and depth as inline custom
  properties.
- Each tile is an absolutely positioned `<a>` to its project. Under the frame
  sits the label, a `text-micro text-muted` span such as `01 Walter Ego`
  (slot number, then project title), with an 8 px gap.
- The intro block sits at `left: 33.6%; top: 37.2%; width: min(26.25rem,
  34vw)`, as a column with 18 px gaps:
  - `<p class="text-caption text-muted">{OWNER}, fotograaf in Gent</p>`
  - `<h1 class="text-statement font-medium text-pretty">{TAGLINE}</h1>`
  - Availability link to `/contact`: a 7 px `bg-accent` dot and then
    `Beschikbaar — plan een shoot →` (`text-sm`, 8 px gap)
- Corners, at `bottom: 28px` inside `px-gutter`, both `text-caption
  text-muted`: on the left, `Scroll voor projecten ↓` links to
  `#uitgelicht`; on the right, `{SINCE} — nu`.
- Check 1024×768, 1280×960, 1440×900 and 1600×900. No tile may overlap the
  intro block or the bottom edge.

**Motion.** Put this in a component `<style>`, plus one small module script.

- Float: `@keyframes` moves the **frame** with `translate: 0 -5px` at 50%.
  Duration is `6s + (i % 3) × 1.7s`, delay `-(i × 1.3)s`, `ease-in-out
  infinite`. Pass the values as inline CSS custom properties per tile.
- Pointer drift: the script sets `--mx` and `--my` (−1…1, relative to the hero's
  centre) on the hero during `pointermove`, throttled with
  `requestAnimationFrame`, and resets both to 0 on `pointerleave`. Each tile
  **anchor** gets `transform: translate(calc(var(--mx) * var(--depth) *
  -0.35px), calc(var(--my) * var(--depth) * -0.35px))` and `transition:
  transform 0.6s var(--ease-drift)`. `--depth` comes from the slot.
- Only attach the listener when `matchMedia('(pointer: fine)')` matches and
  reduced motion is off. Under `prefers-reduced-motion: reduce`, both the
  float and the drift stop.

**Below `lg`.** Use flow layout, with no absolute positioning.

- The intro block comes first (`px-gutter pt-section-S`), then a grid of the
  **first six** tiles: `grid-cols-2 md:grid-cols-3 gap-x-media gap-y-8
  px-media pt-section-S`. Every second tile is pushed down (`mt-12`) for a
  staggered rhythm. Frames keep their slot aspect, and the float stays on.
- Hide the corners.

**Images.** Use `fit="cover"` with `sizes="(min-width: 1024px) {round(w /
12.8)}vw, 50vw"`. All tiles load eagerly, and slot 8 (the largest) gets
`priority`. Alt text comes from the photo, falling back to the project title.

### Featured rows: `Home/FeaturedProjects.astro`

`<section id="uitgelicht">` with `px-media pt-section-M`. It holds
`getFeaturedProjects()` mapped onto five slots, and rows are separated by
`gap-y-section-M`. Use `ProjectCard` without `showYear`, so the caption reads
`Cedric & Anouk  Huwelijk`.

| Row | Desktop layout (`md` and up) | Slot frames |
| --- | --- | --- |
| 1 | `grid-cols-[7fr_5fr] items-end gap-media` | 1: `aspect-[8/7]` · 2: `aspect-[11/10]` |
| 2 | single card, `w-[77%] mx-auto` | 3: `aspect-[8/5]` |
| 3 | `grid-cols-[4fr_5fr] items-start gap-media` | 4: `aspect-[9/8]` plus `mt-[min(9.4vw,7.5rem)]` · 5: `aspect-[21/20]` |

- Keep the slot table as a constant in the component. Only render filled
  slots, and skip empty rows.
- `sizes` per slot: 58vw / 42vw / 77vw / 45vw / 55vw at `md` and up,
  otherwise `100vw`.
- Under `md`, everything stacks in one column with `gap-y-section-S`. Offsets
  and the 77% width drop away, and the aspect ratios stay.
- Close with a centred `<TextLink href="/werk">Alle projecten</TextLink>` and
  `pt-section-M`.

### About teaser: `Home/AboutTeaser.astro`

`px-gutter pt-section-XL pb-section-L`, as `grid md:grid-cols-[1fr_minmax(0,35rem)]
gap-8 md:gap-[60px]`:

- Left: `<h2 class="text-caption text-muted">Over</h2>`
- Right, a column with 18 px gaps:
  - `<p class="font-serif text-prose-lg text-ink text-pretty">`, holding the
    design copy verbatim: "Ik ben Brent. In 2017 kocht ik met mijn eerste loon
    een deftige camera, en sindsdien heb ik er altijd één bij. Zelf aangeleerd,
    en nog altijd even graag op een zaal, een pitmuur of een boekvoorstelling."
  - `<TextLink href="/over" variant="plain" arrow>Meer over mij</TextLink>`

### Page: `src/pages/index.astro`

- `BaseLayout` with no `title` (so it gets the home title), `description=
  {TAGLINE}`, `image={DEFAULT_OG_IMAGE}`.
- JSON-LD `@graph` with `WebSite` (`name`, `url`) and `Person` (`name: OWNER`,
  `jobTitle: 'Fotograaf'`, `address` Gent/BE, `email`, `sameAs` from
  `SOCIALS`).
- Order: `HeroCollage`, `FeaturedProjects`, `AboutTeaser`.

## Commits

1. `✨ add the collage tile picker`: `lib/collage.ts` and tests
2. `💄 add the collage hero layout`: desktop absolute layout, mobile flow,
   static
3. `✨ animate the collage with float and pointer drift`
4. `💄 add the featured project rows`
5. `💄 add the about teaser`
6. `💄 compose the home page`: page, meta, JSON-LD

## Verify

- At 1280 px, compare against `10a`. Tile positions, the intro block, corners,
  row proportions (the 7/5 and 4/5 grids, the 120 px drop on slot 4, the 90 px
  row gaps) and the about teaser should all match.
- Moving the pointer drifts the tiles at different depths. Leaving resets
  them smoothly. With reduced motion, nothing moves.
- Check 390, 768, 1024 and 1600 px in both themes. Nothing overlaps and
  there's no horizontal scroll.
- The LCP image is slot 8 with `fetchpriority=high`. No layout shift on load.
