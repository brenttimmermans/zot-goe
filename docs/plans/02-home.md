# Stage 2 — Home (`/`, design `2a`)

> Depends on Stage 1. Independent of Stages 3–6. Read [`00-overview.md`](./00-overview.md)
> and [`01-foundation.md`](./01-foundation.md) for tokens and component contracts.
> File: `src/pages/index.astro`. May add one page-local component: `AboutTeaser.astro`.

## Design intent (`2a`)

A masthead-led home: giant `ZOT GOE` wordmark, a dateline row, a big lead statement,
an **organic staggered** featured-work grid, an "Over" (about) teaser, and the footer.
Photos lead, text is quiet. Nav links top-right.

## Structure (top → bottom)

1. **Top nav row** — handled by global `Navbar` (wordmark + `Werk/Over/Contact`).
   > `2a` shows nav links only (no wordmark) above a huge wordmark; our global Navbar
   > carries the small wordmark + links. Render the giant wordmark as the hero below.

2. **Masthead block**
   - `<Wordmark size="hero">Zot Goe</Wordmark>` — uses the `text-wordmark` token
     utility (weight 800, uppercase; line-height/tracking baked into the token).
   - `<Dateline>` under it, top hairline: `Brent Timmermans — fotograaf` ·
     `Gent, België` · `Beschikbaar voor opdrachten` (last in accent).

3. **Lead statement** — 2-col grid `lg:grid-cols-[1fr_340px]`, `items-end`, big gap.
   - Left: `TAGLINE` with `text-lead font-semibold` (token), `max-w-[720px]`,
     `text-wrap: pretty`.
   - Right: serif line `Reportage, geen poses. Ik loop mee en fotografeer wat er echt
     gebeurt.` + `<EditorialLink href="/contact" variant="underline">Plan een shoot</EditorialLink>`.

4. **Featured work grid** — the signature asymmetric layout. Pull featured projects:
   ```ts
   const projects = await getSortedProjects();
   const featured = projects.filter(p => p.data.featured).slice(0, 4);
   // fall back to the 4 most recent if fewer than 4 are flagged featured
   ```
   Two rows, each a 2-col grid with a stagger offset (offsets are `md:`-only):
   - Row 1: `md:grid-cols-[7fr_5fr]` — card A `h-[520px]`; card B `h-[380px]
     md:mt-[90px]`.
   - Row 2: `md:grid-cols-[4fr_6fr]` — card C `h-[400px]`; card D `h-[340px]
     md:mt-[60px]`.
   - Each is `<ProjectCard metaStyle="inline" heightClass=… offsetClass=…/>` with the
     inline caption `NN / Title` · `Category · Year`.
   - If fewer than 4 projects exist, render what's available and keep the layout sane
     (drop empty slots; don't render blank staggered gaps).
   - Below the grid, centered: `<EditorialLink href="/projects" variant="boxed">Alle
     projecten ({count}) →</EditorialLink>`.

5. **About teaser** (`AboutTeaser.astro`, page-local) — top hairline, grid
   `md:grid-cols-[300px_1fr]`, gap 60px.
   - Left: portrait `<Photo heightClass="h-[340px]" caption="portret van brent"/>`
     (real portrait if available in `public/images/`, else placeholder).
   - Right: `<MonoLabel accent>Over</MonoLabel>`, serif lead (21px) + serif body
     (16px, `text-body-soft`), `<EditorialLink href="/about" variant="underline">Lees
     verder</EditorialLink>`. Copy from design `2a` about block.

6. **Footer** — global `Footer`.

## Data / copy

- Featured cards, dateline, lead, and about copy: use design `2a` verbatim (Dutch).
  Card titles/categories/years come from the collection; the two real projects fill
  the first slots, remaining slots use recent projects.
- Do **not** hard-code brand facts — pull `OWNER`, `CITY`, `AVAILABILITY`, `TAGLINE`
  from `config.ts`.

## SEO

Keep `WebSite` + `Person` JSON-LD (translate to Dutch name/jobTitle `Fotograaf`).
`title="Home"`, Dutch description, `ogImage` = a real hero/cover image.

## Responsive

- Masthead wordmark scales via `clamp`. Dateline wraps to stacked rows on mobile
  (`flex-col gap-2 md:flex-row md:justify-between`).
- Lead grid → single column on mobile (right block below left).
- Featured grid → single stacked column on mobile; **all `md:mt-*` offsets drop**
  (they're `md:`-prefixed) so cards sit flush.
- About teaser → portrait stacks above text on mobile.

## Done when

Home renders the masthead, lead, staggered featured grid (real project data), about
teaser, and footer; matches `2a` at desktop; stacks cleanly on mobile; works in both
themes; `check:types` + `lint` pass.
