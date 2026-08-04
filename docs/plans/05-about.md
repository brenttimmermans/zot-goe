# Stage 5 — Over Brent (`/over`, design `2d`)

> Depends on Stage 1. Independent of Stages 2–4, 6. Read [`00-overview.md`](./00-overview.md)
> and [`01-foundation.md`](./01-foundation.md). **New route** — create
> `src/pages/over.astro`. May add page-local `ProcessSteps.astro`.

## Design intent (`2d`)

A personal bio spread and a "how it works" section. Big `Dag, ik ben Brent` heading,
running serif prose, a tall portrait, then a numbered `Hoe het werkt` steps grid.
**No stats** (the design explicitly dropped them — do not add metrics/counters).

## Structure

1. **Bio block** — grid `md:grid-cols-[1fr_460px]`, `items-start`, gap 70px, pad
   `50px 0 70px`.
   - Left (`max-w-[640px]`, `flex flex-col gap-6`):
     - H1 `Dag, ik ben Brent` — `text-about font-semibold` (token).
     - Serif lead (20px, `leading-[1.65]`): first paragraph from design `2d`.
     - Two serif body paragraphs (17px, `leading-[1.75]`, `text-body-soft`): the
       remaining design `2d` copy.
     - `<EditorialLink href="/contact" variant="underline">Zin om samen te werken?</EditorialLink>`.
   - Right: portrait `<Photo heightClass="h-[420px] md:h-[620px]" ratio="4/5"
     caption="portret van brent, met camera"/>` (real portrait if present in
     `public/images/`, else placeholder).

2. **"Hoe het werkt"** (`ProcessSteps.astro`) — top hairline, grid
   `md:grid-cols-[220px_1fr]`, gap 60px, pad 60.
   - Left: `<MonoLabel>Hoe het werkt</MonoLabel>`.
   - Right: `md:grid-cols-2 gap-x-[60px] gap-y-10`, one cell per `PROCESS_STEPS`
     entry (from `constants/site.ts`): each cell has a top hairline + `pt-4`, mono
     accent `no`, Archivo `title` (20px weight 600), serif `body` (16px,
     `leading-[1.65]`, `text-body-soft`).

3. **Footer** — global.

## Data / copy

- Bio prose: design `2d` verbatim (Dutch).
- Steps: from `PROCESS_STEPS` in `src/constants/site.ts` (Stage 1) — do not inline.

## SEO

`ProfilePage` (or `AboutPage`) + `Person` JSON-LD: `name = OWNER`, `jobTitle
"Fotograaf"`, `address` Gent, `sameAs` = socials. Dutch. `title="Over"`.

## Navigation wiring

- Ensure the global `Navbar`'s `Over` link (`/over`) shows active here.
- Home's about-teaser "Lees verder" and detail/contact cross-links point to `/over`.
  (Home is Stage 2; if the teaser link was stubbed, this route makes it resolve.)

## Responsive

- Bio grid → single column on mobile; portrait stacks **below** the text (or above —
  pick what reads better; design puts it right/desktop). Reduce portrait height.
- Steps → single column on mobile.

## Done when

`/over` renders the bio spread with portrait and the `Hoe het werkt` steps from
`PROCESS_STEPS`; no stats; matches `2d`; stacks on mobile; both themes; `Over` nav
link active; `check:types` + `lint` pass.
