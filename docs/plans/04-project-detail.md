# Stage 4 — Project detail (`/projects/[slug]`, design `2c`)

> Depends on Stage 1. Independent of Stages 2, 3, 5, 6. Read [`00-overview.md`](./00-overview.md)
> and [`01-foundation.md`](./01-foundation.md). File: `src/pages/projects/[slug].astro`.
> May add page-local `CreditsList.astro` and `ProjectNav.astro`.

## Design intent (`2c`)

Calm, editorial project story: eyebrow category, a moderate title, a serif lead, a
credits sidebar, a full-width hero image with caption, a "De opdracht" running-text
section, an **asymmetric image gallery** (not a uniform grid), and a "Volgend project"
footer. No heavy rules; smaller headline than the index; context reads as prose.

## `getStaticPaths`

Keep the existing pattern; pass `project` plus its position for next-project lookup:

```ts
export async function getStaticPaths() {
	const projects = await getSortedProjects();
	return projects.map((project, i) => ({
		params: { slug: project.id },
		props: { project, next: projects[(i + 1) % projects.length] },
	}));
}
```

## Structure

1. **Sub-nav row** — wordmark left, `← Terug naar werk` (mono) right linking
   `/projects`. (Global `Navbar` still renders above; this is the design's in-card
   back row — render as a slim row under the hero header or rely on Navbar + a single
   back link. Prefer: keep global Navbar, add one `← Terug naar werk` link at top of
   `<main>`.)

2. **Title header** — grid `md:grid-cols-[1fr_300px]`, `items-start`, gap 60px.
   - Left (`max-w-[700px]`): `<MonoLabel accent>{category}</MonoLabel>`; H1 `title`
     with `text-title font-semibold` (token); serif lead = `description` (20px,
     `leading-relaxed`, `text-body`).
   - Right: `<CreditsList credits={project.data.credits}/>`.

3. **Hero image** — full-width `<Photo src={cover} heightClass="h-[520px] lg:h-[660px]"
   caption=… lightbox gallery="project"/>`. Caption from first gallery item context or
   a generic Dutch caption.

4. **"De opdracht"** — grid `md:grid-cols-[220px_1fr]`, gap 60px, `max-w-[1100px]`.
   - Left: `<MonoLabel>De opdracht</MonoLabel>`.
   - Right: `project.data.brief` paragraphs as serif prose (18px, `leading-[1.7]`,
     `text-wrap: pretty`). If `brief` is empty, fall back to `description` alone.

5. **Gallery** — asymmetric, `flex flex-col gap-[60px]`, reproducing `2c`'s rhythm
   from `project.data.gallery`. Instead of hard-coding 5 fixed frames, drive it from a
   repeating layout pattern so any gallery length renders editorially:
   ```ts
   // pattern of row shapes; cycle through gallery images
   // e.g. [duo 6/4], [full], [duo 4/6], repeat
   ```
   - Row shapes to cycle: `md:grid-cols-[6fr_4fr]` (2nd img `md:mt-[60px]`), then a
     single full-bleed image, then `md:grid-cols-[4fr_6fr]` (1st img `md:mt-[40px]`).
   - Every image is a `<Photo lightbox gallery="project">` so GLightbox groups them.
   - Keep the current masonry fallback acceptable if the pattern is hard to make
     robust, but prefer the asymmetric pattern to match the design.

6. **Next-project footer** — top hairline, `flex justify-between items-center`, pad 60.
   - Left (`ProjectNav.astro`): `<MonoLabel>Volgend project</MonoLabel>` +
     `{next.title} — {next.category} →` (30px weight 600) linking
     `/projects/{next.id}`.
   - Right: `<EditorialLink href="/contact" variant="boxed">Zoiets nodig? Mail me</EditorialLink>`.

## `CreditsList.astro`
```ts
interface Props { credits?: { label: string; value: string }[]; }
```
- Column of items: mono `label` (muted, uppercase) over Archivo `value` (14px, ink).
- Renders nothing if `credits` is empty. Design `2c` example labels: Klant, Waar,
  Wanneer, Opdracht, Oplevering.

## `ProjectNav.astro`
```ts
interface Props { title: string; category: string; slug: string; }
```

## Lightbox

Move/keep GLightbox init in `ui/Photo.astro` (Stage 1). Ensure a single init runs and
all gallery `<Photo>`s share `data-gallery="project"`. Keep the `.goverlay` token
override.

## SEO

Keep `ImageGallery` JSON-LD; add `contentLocation` (location), `keywords` (category),
`author` = `OWNER`. Dutch. `ogImage = cover`.

## Responsive

- Title/credits → single column on mobile (credits below lead).
- Hero height reduces on mobile (`h-[300px] md:h-[520px] lg:h-[660px]`).
- Gallery rows → single column; offsets drop.
- Next-project footer → stacks (`flex-col gap-6 md:flex-row`).

## Done when

A project page renders eyebrow/title/lead, credits, hero, "De opdracht" prose,
asymmetric lightbox gallery from real images, and a working next-project link;
matches `2c`; stacks on mobile; both themes; `check:types` + `lint` pass.
