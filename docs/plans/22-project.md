# 22: Project detail (`/werk/[slug]`)

| | |
| --- | --- |
| Wave | W2 (parallel with 20, 21, 23, 24) |
| Branch | `redesign/22-project` |
| PR title | 💄 project detail & gallery |
| Design | frame `10c` ("beeld opent, context compact eronder") |
| Dev port | 4343 |

## Goal

The page opens on the image, keeps the context compact, and lets the photos
run in rows chosen by their orientation, never cropped. It ends with the next
project and a call to action.

## Owns

- `src/pages/werk/[slug].astro` (replaces the plan 11 stub)
- `src/components/Project/Gallery.astro`, `src/components/Project/NextProject.astro`
  (new). Any other new `Project/*` file is fine **except** `ProjectCard`.
- `src/lib/gallery.ts`, `src/lib/gallery.test.ts` (new)

Use these, but treat them as frozen: `BaseLayout`, `Photo`, `TextLink`,
`lib/projects`, `lib/format`.

## Spec

### Row builder: `src/lib/gallery.ts`

```ts
export enum GalleryRowKind {
	Wide = 'wide',
	Pair = 'pair',
	Offset = 'offset',
	Single = 'single',
}
export interface GalleryRow {
	kind: GalleryRowKind;
	photos: ProjectPhoto[];
}
export function isLandscape(photo: ProjectPhoto): boolean; // width >= height
export function buildGalleryRows(photos: ProjectPhoto[]): GalleryRow[];
```

Walk through the photos in order and apply the first rule that matches:

1. Landscape, the previous row was `wide`, and the next photo is landscape:
   `pair` (L + L). This avoids two wide rows in a row.
2. Landscape: `wide`.
3. Portrait, and the next photo is portrait: `pair`.
4. Portrait, and the next photo is landscape: `offset` (portrait in the 5fr
   column).
5. Portrait with nothing after it: `single`.

Tests cover each rule, an empty list, and one full mixed sequence (use the
`spa-24h` orientations from plan 11).

### Hero

`<div class="px-media">` holds `Photo` with the cover, `fit="cover"`,
`class="aspect-[4/5] md:aspect-hero"`, `sizes="100vw"` and `priority`. It's
also the first item of the lightbox set.

### Intro

`px-gutter pt-section-S pb-section-L`, as `grid gap-8 md:grid-cols-2
md:gap-[60px] items-start`:

- Left, a column with 10 px gaps:
  - `<h1 class="text-heading font-medium">{title}</h1>`
  - `<p class="text-sm text-muted">{kind} · {location} ·
    {formatMonthYear(date)}</p>`, for example "Boekvoorstelling · Gent · april
    2025"
- Right: `story` paragraphs, `font-serif text-prose text-body text-pretty`,
  with 16 px gaps.

### Gallery: `Project/Gallery.astro`

`px-media pb-media flex flex-col gap-media`, with one block per
`GalleryRow`. Every photo uses `fit="natural"` (never cropped) and lazy
loading.

| Kind | Layout (`md` and up) | `sizes` |
| --- | --- | --- |
| `wide` | full width | `100vw` |
| `pair` | `grid-cols-2 items-start gap-media` | `(min-width: 768px) 50vw, 100vw` |
| `offset` | `grid-cols-[5fr_7fr] items-end gap-media` | `42vw` / `58vw` |
| `single` | `w-7/12 mx-auto` | `(min-width: 768px) 58vw, 100vw` |

Below `md`, every row is one column with `gap-media`.

**Lightbox.** Wrap each photo (and the hero) in `<a class="glightbox"
data-gallery="project" href={full}>` with `aria-label="Foto {n} van {total}
vergroten"`. `full` comes from `getImage({ src, width: Math.min(2400,
src.width), format: 'webp' })`.

- Initialise GLightbox in the component script (`touchNavigation`, `loop`)
  and import its CSS there.
- Theme the overlay with a scoped `<style is:global>` that uses tokens only,
  for example `.goverlay { background: hsl(from var(--color-bg) h s l / 0.96); }`.
  Check the close and arrow buttons in both themes.

### Next project: `Project/NextProject.astro`

Props: `{ next: Project }`. Render nothing when `getNextProject` returns
`undefined`.

`px-gutter py-section-L`, as `flex flex-col gap-8 md:flex-row
md:justify-between md:items-baseline`:

- `<a href={`/werk/${next.id}`} class="flex flex-col gap-1.5">`, containing
  `<span class="text-caption text-muted">Volgend project</span>` and
  `<span class="text-title font-medium">{next.data.title} →</span>`
- `<TextLink href="/contact">Zoiets nodig? Stuur me een bericht</TextLink>`

### Page: `src/pages/werk/[slug].astro`

- `getStaticPaths` builds from `getProjects()`. Each path gets `project` and
  `next` props, with `next` from `getNextProject`.
- `BaseLayout` with `title={title}`, `description={summary}` and
  `image={cover.src}`.
- JSON-LD `ImageGallery` with `name`, `description`, `dateCreated`,
  `locationCreated` (a `Place`), `creator` (a `Person`, `OWNER`) and `image`
  (absolute URLs of 1600 px `getImage` variants).

## Commits

1. `✨ add the gallery row builder`: `lib/gallery.ts` and tests
2. `💄 add the project hero and intro`
3. `💄 add the photo gallery with lightbox`
4. `💄 add the next-project footer`
5. `🔍 add project meta and structured data`

## Verify

- At 1280 px, compare `lannoo-pascal-naessens` against `10c`. Check the hero
  ratio (≈ 1232×720), the two-column intro (56 px top, 100 px bottom,
  60 px gap), the 24 px gallery gaps, and the next-project row.
- `spa-24h` shows wide, pair, offset and single rows correctly, and no photo
  is cropped.
- The lightbox opens on click, Enter and arrow keys, and closes on Esc.
  Focus returns to the photo you opened. It works in both themes.
- The last project's "Volgend project" links to the first.
