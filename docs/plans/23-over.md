# 23: Over (`/over`)

| | |
| --- | --- |
| Wave | W2 (parallel with 20–22, 24) |
| Branch | `redesign/23-over` |
| PR title | 💄 over: bio & how it works |
| Design | frame `10d` |
| Dev port | 4344 |

## Goal

A personal intro beside a large portrait, followed by the four-step "Hoe het
werkt" that turns visitors into enquiries.

## Owns

- `src/pages/over.astro` (new route)
- `src/components/About/**` (new)

Use these, but treat them as frozen: `BaseLayout`, `Photo`, `TextLink`,
`lib/siteImages` (`PORTRAIT`), `constants/site` (`PROCESS_STEPS`),
`config.ts`.

## Spec

### Intro

`px-media`, as `grid gap-media md:grid-cols-2 items-start`:

- Left: `Photo` with `PORTRAIT`, `fit="cover"`, `class="aspect-portrait"`,
  `sizes="(min-width: 768px) 50vw, 100vw"`, `priority`, and alt text
  "Portret van Brent Timmermans".
- Right, a column with 18 px gaps. It sits at `px-gutter pt-8` on mobile and
  at `md:px-0 md:pt-10 md:pl-10 md:pr-4 max-w-[32.5rem]` from `md` up.
  - `<h1 class="text-heading font-medium">Dag, ik ben Brent</h1>`
  - Three paragraphs, verbatim from `10d`, in `font-serif text-prose
    leading-[1.7] text-body text-pretty` with 16 px gaps:
    1. "Ik fotografeer al zolang ik me kan herinneren, maar in 2017 werd het
       menens: van mijn eerste loon kocht ik een deftige camera. Alles wat ik
       ken, heb ik mezelf aangeleerd."
    2. "Sindsdien sta ik op concerten, boekvoorstellingen, expo's, huwelijken
       en aan de pitmuur op Spa. Wat me telkens trekt is het moment net vóór
       of net ná waar iedereen naar kijkt."
    3. "Ik werk discreet, meestal zonder flits, en ik heb altijd een camera
       bij."

The stand-in portrait is a transparent cut-out, so it sits on `bg-frame`.
That's acceptable until Brent supplies a real 4:5 portrait. Mention it in the
PR.

### How it works: `About/ProcessSteps.astro`

Section: `px-gutter pt-section-M pb-section-M`, as a column with 36 px gaps.

- Header row (`flex flex-wrap justify-between items-baseline gap-4`):
  - `<h2 class="text-heading font-medium">Hoe het werkt</h2>`
  - `<TextLink href="/contact" arrow>Stuur een bericht</TextLink>`
- `<ol class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">` from
  `PROCESS_STEPS`. Each `<li>` is `flex flex-col gap-2 border-t border-rule
  pt-[18px]`, containing:
  - `<span class="text-caption text-accent" aria-hidden="true">{no}</span>`
    (the `<ol>` already gives assistive tech the order)
  - `<h3 class="text-base font-medium">{title}</h3>`
  - `<p class="font-serif text-base leading-[1.6] text-subtle">{body}</p>`

### Page: `src/pages/over.astro`

- `BaseLayout title="Over"` with description "Brent Timmermans fotografeert
  sinds 2017 concerten, events, motorsport en huwelijken, in en rond Gent."
  and `image={PORTRAIT}`.
- JSON-LD `AboutPage` with `mainEntity` set to a `Person` (`OWNER`,
  `jobTitle`, `email`, `sameAs`).

## Commits

1. `💄 add the about intro with portrait`: page plus intro
2. `💄 add the how-it-works steps`
3. `🔍 add about meta and structured data`

## Verify

- At 1280 px, compare against `10d`. Check the 50/50 split, the portrait at
  ≈ 4:5, the text column inset 40 px with max width 520 px, the 80 px space
  before "Hoe het werkt", and four equal step columns with rules.
- At 768 px the steps form 2×2. At 390 px they're one column and the portrait
  sits on top.
- Check both themes. The step numbers stay legible as accent text.
