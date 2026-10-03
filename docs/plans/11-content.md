# 11: Content model & image pipeline

| | |
| --- | --- |
| Wave | W1 (parallel with [10](./10-design-system.md)) |
| Branch | `redesign/11-content` |
| PR title | 🍱 content model & image pipeline |
| Design | data script at the bottom of the design file, plus captions in every frame |
| Dev port | 4332 |

## Goal

Move every photo into the content tree behind `astro:assets`, remodel the
`projects` collection around the Final design (`discipline` + `kind`, `story`,
`featured` rank), seed the six design projects, and ship the shared `Photo` and
`ProjectCard` components plus project queries that every W2 page builds on.
This PR also retires the legacy pages and components that depend on the old
schema, and adds Vitest.

## Owns

- `tsconfig.json` (identical content to plan 10)
- `package.json`, `package-lock.json`, `vitest.config.ts`,
  `.github/workflows/ci.yml`, `.husky/pre-push`, `astro.config.mjs`
- `src/content.config.ts`, `src/content/**`
- `public/images/projects/**` (moved out). `public/images/hero.png` is **copied,
  not moved**, because the legacy `ogImage` default still points at it until
  plan 30.
- `src/assets/stand-in/**`, `src/assets/site/**` (new)
- `src/constants/disciplines.ts`, `src/lib/**`
- `src/components/Common/Photo.astro`, `src/components/Project/ProjectCard.astro` (new)
- `src/pages/index.astro`, `src/pages/projects/**` (delete), `src/pages/werk/**` (new stubs)
- Delete `src/components/{HeroSection,Image,ProjectCard,AboutTeaser}.astro` and
  `src/components/ui/{Byline,EditorialLink,Lightbox,MonoLabel,Photo}.astro`

Do **not** delete `components/ui/Wordmark.astro`: the old `Navbar` (owned by
plan 10) still imports it on this branch, and plan 30 removes the orphan. Don't
touch `BaseLayout`, `styles/`, `config.ts`, `constants/site.ts`,
`contact.astro` or `ContactForm.astro`.

## Commits

### 1. `🔧 add ~/ import alias`

Use the identical `tsconfig.json` from [plan 10](./10-design-system.md), commit 1,
byte for byte.

### 2. `✅ add Vitest and the date formatting helpers`

- `npm i -D vitest`. Use `vitest.config.ts` with `getViteConfig()` from
  `astro/config`, so `~/` and `astro:*` imports resolve in tests.
- Scripts: `"test": "vitest run"` and `"test:watch": "vitest"`.
- CI: add a `Test` step (`npm test`) after `Type check`. `.husky/pre-push`
  becomes `npx biome ci . && npm run check:types && npm test && npm run build`.
- `src/lib/format.ts` with co-located `format.test.ts`:
  - `formatMonthYear(date: Date): string` returns `'april 2025'`
    (`nl-BE`, long month, `timeZone: 'UTC'`, because YAML dates are UTC
    midnight)
  - `formatYear(date: Date): string` returns `'2025'` (UTC)

### 3. `🔥 retire the legacy project pages and editorial components`

- `src/pages/index.astro` becomes a stub:
  `<BaseLayout title="Home"><h1 class="sr-only">Zot Goe</h1></BaseLayout>`.
  `title` is still required by the old layout on this branch.
- Delete `src/pages/projects/`. Add `src/pages/werk/index.astro` and
  `src/pages/werk/[slug].astro` as stubs (`getStaticPaths` over
  `getCollection('projects')`, rendering only the title). They mustn't depend
  on fields that change in commit 5.
- Delete the components listed under **Owns**. The build has to pass without
  them.

### 4. `🚚 move the photos into the content tree`

- `git mv public/images/projects/spa-24-001/test-image_00NN.jpg
  src/content/projects/spa-24h/NN.jpg` (01–13, keeping the order).
- `git mv public/images/projects/spa-24-002/test-image_00NN.jpg
  src/assets/stand-in/NN.jpg`, renumbered 01–12 (0014 becomes 01, …, 0025
  becomes 12).
- `cp public/images/hero.png src/assets/site/portrait.png`. This is a stand-in
  portrait: a transparent cut-out of Brent.

Orientation reference (P = portrait 1707×2560, L = landscape 2560×1707):

| Set | 01 | 02 | 03 | 04 | 05 | 06 | 07 | 08 | 09 | 10 | 11 | 12 | 13 |
| --- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- |
| `spa-24h/` | P | L | L | L | P | P | P | L | L | P | L | L | P |
| `stand-in/` | L | L | P | P | L | L | P | P | L | L | P | L | |

### 5. `🗃️ remodel the projects collection`

- `src/constants/disciplines.ts`:
  ```ts
  export enum Discipline {
  	Concert = 'concert',
  	Event = 'event',
  	Motorsport = 'motorsport',
  	Wedding = 'huwelijk',
  }
  export const DISCIPLINE_LABELS: Record<Discipline, string> = { … };
  ```
  The labels are `Concerten`, `Events`, `Motorsport` and `Huwelijken`. The enum
  order is the filter order.
- `src/content.config.ts`: `glob({ pattern: '*/index.yaml', base:
  './src/content/projects' })`, so the folder name becomes the id. The schema
  takes the form `({ image }) => z.object({ … })` with these fields:
  - `title`, `kind`, `location`, `summary`: `z.string()`
  - `discipline`: `z.enum(Discipline)`
  - `date`: `z.coerce.date()`
  - `featured`: `z.number().int().positive().optional()`
  - `story`: `z.array(z.string()).min(1).max(3)`
  - `cover`: `z.object({ src: image(), alt: z.string() })`
  - `photos`: `z.array(z.object({ src: image(), alt: z.string().optional() })).min(1)`
- Replace both old YAML files with `src/content/projects/spa-24h/index.yaml`.
  Title `Spa 24h`, `motorsport`, kind `Motorsport`, date `2025-06-15`, location
  `Spa-Francorchamps`, `featured: 3`. The summary and story are the existing
  `description` and `brief` text. The cover is `./02.jpg`, and the photos are
  the other 12 in order. Write real alt text for the cover after looking at the
  image. "Paddock Club" is dropped; its photos are now stand-ins.

### 6. `🌱 seed the five stand-in projects`

One folder per project. The copy comes from the design (see
`indexRows`/`projects` in its data script, and the `10c` text for Lannoo). Keep
it Flemish, first person and short. Mark each file with a top comment
`# Stand-in photos: replace with real images.`

| Slug | Title | discipline / kind | Date | Location | featured |
| --- | --- | --- | --- | --- | --- |
| `walter-ego` | Walter Ego | concert / Concert | 2026-03-14 | Gent | — |
| `cedric-anouk` | Cedric & Anouk | huwelijk / Huwelijk | 2025-08-23 | Oost-Vlaanderen | 1 |
| `beidehand` | Beidehand | event / Expo | 2025-06-07 | Gent | 4 |
| `lannoo-pascal-naessens` | Lannoo × Pascal Naessens | event / Boekvoorstelling | 2025-04-10 | Gent | 2 |
| `slim-besturen` | Slim Besturen | event / Boekvoorstelling | 2025-03-20 | Gent | 5 |

- Lannoo's `story` is exactly the two `10c` paragraphs. The others get two
  sentences each, expanded from the design's one-liners.
- Images reference existing files relatively (for example
  `../../../assets/stand-in/05.jpg` or `../spa-24h/09.jpg`). Don't duplicate
  binaries.
- Give every project a **distinct landscape cover** and 5–7 photos. Order them
  so that across all projects every gallery row type appears: P+P, a lone L,
  P+L, and a trailing P (see [plan 22](./22-project.md)).
- Cover alt text describes what the stand-in image actually shows.

### 7. `✨ add project queries and site images`

- `src/lib/projects.ts`, with co-located tests for the pure parts:
  - `export type Project = CollectionEntry<'projects'>;`
  - `export type ProjectPhoto = Project['data']['photos'][number];`
  - `getProjects(): Promise<Project[]>` returns newest first.
  - `getFeaturedProjects(): Promise<Project[]>` returns only projects with a
    `featured` rank, in ascending order.
  - `getNextProject(projects: Project[], id: string): Project | undefined`
    wraps around, and returns `undefined` when there are fewer than two
    projects.
  - Keep the ordering logic in pure, exported functions (for example
    `sortByNewest` and `sortByFeatured`) so tests don't need `getCollection`.
- `src/lib/siteImages.ts` exports `PORTRAIT` (`assets/site/portrait.png`),
  `CONTACT_IMAGE` (a **portrait** stand-in, for example `stand-in/08.jpg`) and
  `DEFAULT_OG_IMAGE` (the Spa 24h cover).

### 8. `✨ add the Photo primitive on astro:assets`

`Common/Photo.astro`, with the contract from 00 §3.2:

```ts
interface Props {
	src: ImageMetadata;
	alt: string;
	sizes: string;
	fit?: 'cover' | 'natural';
	loading?: 'lazy' | 'eager';
	priority?: boolean;
	class?: string;
}
```

- Render a frame (`<div>` with `bg-frame overflow-hidden` plus `class`) holding
  `<Picture>` with `formats={['avif', 'webp']}`, widths `[480, 800, 1200, 1600,
  2000, 2400]` capped at the source width, and the caller's `sizes`.
- `fit="cover"` (the default): the caller sizes the frame with an aspect or
  height class, and the image fills it with `size-full object-cover`.
- `fit="natural"`: the image is `w-full h-auto` at its intrinsic ratio, and
  the `width`/`height` attributes prevent layout shift.
- `priority` means eager loading plus `fetchpriority="high"`. Use Astro's
  `priority` prop if it's available.

### 9. `✨ add the shared ProjectCard`

`Project/ProjectCard.astro`, with the contract from 00 §3.2:

```ts
interface Props {
	project: Project;
	frameClass: string;
	sizes: string;
	showYear?: boolean;
	loading?: 'lazy' | 'eager';
	class?: string;
}
```

- Markup: `<a href={`/werk/${id}`} class="group flex flex-col gap-3">`, then
  `Photo` (the cover, with `frameClass`), then the caption `<span class="flex
  gap-2.5 text-sm">`, containing the title (`font-medium`) and
  `<span class="text-muted">` with `kind`, or `` `${kind}, ${year}` `` when
  `showYear` is set.
- Hover: the frame goes to `bg-frame-hover` and the image to `opacity-90`
  (`transition-opacity`). The title turns accent through the global link hover.

### 10. `🚧 preview real content on the werk stubs`

Temporary pages that prove the pipeline works. Plans 21 and 22 replace them
completely.

- `/werk`: a plain `md:grid-cols-3` grid of `ProjectCard` with
  `frameClass="aspect-[4/3]"` and `showYear`.
- `/werk/[slug]`: the title, the cover (`fit="cover"`, `aspect-hero`) and every
  photo at `fit="natural"` in a single column.

## Verify

Tokens such as `bg-frame` and `px-media` come from plan 10, so they're no-ops
on this branch until both PRs merge. Judge structure and images here, not
styling.

- `npm run build` emits AVIF and WebP variants. `dist/` has no
  `/images/projects`.
- `/werk` lists 6 projects, newest first (Walter Ego first). Each
  `/werk/<slug>` renders all its photos.
- A wrong image path in any YAML fails the build. Try it once, then revert.
- `npm test` passes, covering format, ordering, featured and next-project
  wrap-around.
- `npx biome ci . && npm run check:types` pass.
