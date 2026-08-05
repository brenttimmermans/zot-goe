# Retrofit — "The Quiet Grid" editorial redesign

> Master plan. Read this first, then the stage plan you're assigned.
> Source design: Claude Design project `Zot Goe.dc.html`.
> - **Layouts / structure:** Turn 02 (screens `2a`–`2d`) + Contact `1g`.
> - **Color & dark mode:** Turn 04 "Rood uitgediept" (`4a`/`4b`) sets the coral
>   accent; Turn 03 "Dark mode + accentkleuren" (`3a` dark home, `3b` accent
>   application) defines the dark palette.
> Turn 01 (`1a`–`1g`) is earlier exploration — ignore except `1g` (Contact).

## 1. What we're building

An editorial "newsprint" portfolio for **Brent Timmermans**, an event / concert /
motorsport photographer based in Gent (Ghent), Belgium. The look: warm paper
background, near-black ink, a single coral accent, generous whitespace,
big display type, and an **asymmetric, organically-staggered** photo grid. Photos
lead; text is quiet.

Five pages:

| Route            | Design | Page                                    |
| ---------------- | ------ | --------------------------------------- |
| `/`              | `2a`   | Home — masthead + featured work + about teaser |
| `/projects`      | `2b`   | Werk — all projects, editorial grid + filters  |
| `/projects/[slug]` | `2c` | Project detail — brief, credits, gallery, next |
| `/about`          | `2d`   | Over Brent — bio + "Hoe het werkt" steps       |
| `/contact`       | `1g`   | Contact — editorial copy + form                |

## 2. Decisions (confirmed with the user)

1. **Language: Dutch.** Nav is `Werk` / `Over` / `Contact`. All copy in Dutch,
   matching the design verbatim. `<html lang="nl">`.
2. **Keep the light/dark toggle — both themes are now designed.** The design ships a
   concrete dark variant (screen `3a`, "warm dark paper, not black"), so we no longer
   invent one — we transcribe it into tokens ([`01-foundation.md`](./01-foundation.md)).
   All new components read from tokens so both themes work — **never** hard-code a hex
   value (see the tokens-first rule below).
3. **Extend the content schema.** Add `category`, `location`, `credits`, `brief`,
   and optional ordering fields so detail/index pages match the design. Schema and
   updated sample YAML are part of Stage 1.

## 3. Tech (unchanged — build on what's here)

Astro 7 · Tailwind CSS 4 (CSS-first `@theme` in `global.css`, no JS config) ·
TypeScript strict · Biome (tabs, single quotes, width 80) · Astro content
collections (YAML) · GLightbox (galleries) · Web3Forms (contact) · Astro Sitemap.
No new runtime frameworks. Fonts move to self-hosted `@fontsource` packages (see
Stage 1). Follow `CODE_STYLE.md` and `ARCHITECTURE.md`; repo conventions win.

## 4. Design language (summary — full tokens in Stage 1)

- **Type:** three families.
  - **Archivo** (sans) — display wordmark, headings, nav; weights 400–800.
  - **Newsreader** (serif) — leads, body prose, captions of substance.
  - **IBM Plex Mono** — eyebrows, labels, meta, dates, small nav; UPPERCASE,
    letter-spacing ~0.1em.
- **Color (light):** paper `#FBFAF8` / `#F7F6F3`, ink `#14130F`, body `#3B382F`,
  muted `#6E6A61`, faint `#8A857A`, hairlines `#DAD7CF` / `#E4E1DA`, accent **coral
  `#E8574A`**. Image placeholders: `repeating-linear-gradient(135deg,#EDEAE3,#E5E1D8)`.
- **Color (dark, screen `3a`):** warm ink `#16150F`, paper text `#F2F0E9`, body-soft
  `#B6B1A4`, muted `#8F8A7D`, hairlines `#2C2A22` / `#332F27`, accent **coral
  `#F4776B`**, placeholder gradient `#24221B` / `#1D1C15`.
- **Tokens-first:** all of the above are CSS variables; components use token-backed
  utilities only — no raw hex, no scattered arbitrary values. See
  [`01-foundation.md`](./01-foundation.md) §2.
- **Layout motifs:** hairline rules between sections; mono meta rows justified
  edge-to-edge; project cards with **varying image heights and `margin-top`
  offsets** to create an organic column rhythm; `→` affordances on links; a
  boxed/outlined secondary button and a solid ink primary button.
- **Voice:** calm, reportage, first person, Flemish. Short serif sentences.

## 5. Component architecture

New folder `src/components/ui/` for brand primitives; domain components stay in
`src/components/`. One component per file, `ComponentName.astro`, props destructured
with an explicit `Props` interface.

### Shared primitives (Stage 1 — `src/components/ui/`)
| Component            | Role |
| -------------------- | ---- |
| `Wordmark.astro`     | "ZOT GOE" logo text; `size` prop (`sm`/`nav`/`hero`). |
| `MonoLabel.astro`    | IBM Plex Mono uppercase eyebrow/label; `accent`, `as` props. |
| `EditorialLink.astro`| `→` link; `variant`: `underline` \| `boxed` \| `solid`. |
| `Photo.astro`        | `<img>` with paper-placeholder bg, optional `caption`, optional `lightbox` + `gallery` for GLightbox. Supersedes `Image.astro`. |
| `Dateline.astro`     | Edge-to-edge mono meta row (location · edition · availability). |
| `SectionRule.astro`  | Hairline `<hr>` token wrapper (or a documented utility class). |

### Shared domain (Stage 1)
| Component          | Used by | Role |
| ------------------ | ------- | ---- |
| `ProjectCard.astro`| Home, Werk | Editorial card: lead image (variable ratio), Archivo title, serif line, mono meta. Props allow height + top-offset for staggering. **Rewrite** of the current card. |
| `Navbar.astro`     | all | Wordmark left · mono uppercase links right · theme toggle; active state; Dutch labels. **Rewrite.** |
| `Footer.astro`     | all | Top rule + 3 mono columns: email · Gent · © year. **Rewrite.** |
| `BaseLayout.astro` | all | Paper bg, `lang="nl"`, SEO/OG/JSON-LD, both themes. **Update.** |
| `ContactForm.astro`| Contact | Editorial underline inputs, Dutch, Web3Forms. **Rewrite** (lives in Stage 1 as a shared primitive; only Contact consumes it — may be built in Stage 6 if preferred). |

### Page-local components (built inside the relevant page stage)
`ProcessSteps.astro` (About) · `CreditsList.astro` + `ProjectNav.astro` (Detail) ·
`FilterBar.astro` (Werk) · `AboutTeaser.astro` (Home) · `ContactAside.astro` (Contact).
Keep these next to / imported by their page; promote to `ui/` only if a second page
needs them.

## 6. Data model

- Extend the `projects` collection (see [`01-foundation.md`](./01-foundation.md) §
  schema): add `category`, `location`, optional `credits[]`, optional `brief[]`,
  optional `featured`/`order`. Relax `highlights` to optional. Update the two
  existing YAML files (`spa-24-001`, `spa-24-002`) with real Dutch values.
- Site-wide copy (nav links, footer, contact hints, "Hoe het werkt" steps,
  availability line, socials, email, city) lives in `src/config.ts` /
  `src/constants/site.ts` — not hard-coded in components.
- **Filters** on `/projects` derive from the unique set of `category` values.
- **Next project** on detail = the next entry in the date-sorted list (cyclic).

## 7. Stages & parallelization

```
Stage 1  Foundation ──────────────────────────────  (blocking; do first, alone)
             │  tokens+dark · fonts · global.css · config/constants ·
             │  schema + YAML · BaseLayout · Navbar · Footer · ui/* · ProjectCard
             ▼
Stage 2  ┌── Home (2a) ────────┐
Stage 3  ├── Werk index (2b) ──┤   run in PARALLEL — each depends only on
Stage 4  ├── Project detail (2c)┤   Stage 1 contracts; no cross-dependencies
Stage 5  ├── Over (2d) ────────┤
Stage 6  └── Contact (1g) ─────┘
             ▼
Stage 7  Integration & polish ──────────────────────  (single agent, after pages)
             responsive audit · per-page SEO/JSON-LD · lightbox · filter JS ·
             dark-mode pass · remove dead files · build + lint + types + verify
```

Stage 1 defines the **contracts** (prop interfaces, token names, config shape) that
every page plan references. Do not start Stages 2–6 until Stage 1's components exist
and typecheck. Stages 2–6 are independent and safe to assign to different agents
simultaneously; each touches its own page file plus its own page-local components.

## 8. Files removed / replaced

- `HeroSection.astro` → replaced by the home masthead (Stage 2).
- `Image.astro` → superseded by `ui/Photo.astro` (Stage 1); update detail page.
- `constants/project.ts` + `types/project.ts` (the `CardTextPosition` machinery) →
  retired; the new `ProjectCard` uses explicit layout props instead.
- Self-hosted Montserrat (`fonts.css`, the `.ttf`) → replaced by the three new
  self-hosted families.

## 9. Risks / watch-list

- **Real photos vs. placeholders:** the design uses gradient rectangles. Wire real
  `imageFolder` images; keep `Photo.astro`'s placeholder as the loading/empty state.
- **Asymmetric grid on mobile:** the `margin-top` offsets and multi-column grids
  must collapse to a single stacked column (offsets → 0) below `md`. Specify per page.
- **Dark mode of an editorial paper design:** the dark palette is transcribed from
  screen `3a`; still verify the coral accent (`#F4776B`) and hairlines (`#2C2A22`)
  keep contrast on the warm-ink bg, and nudge the token lightness if anything fades.
- **Contrast/a11y:** muted mono text on paper is intentionally low-contrast; keep it
  for decorative labels only, never for essential body copy — check AA.
- **Biome format:** tabs, single quotes, width 80. Run `npm run check` before done.

## 10. Definition of done (whole project)

`npm run build`, `npm run check:types`, and `npm run lint` all pass; every page
renders in both themes at mobile + desktop widths; content comes from the collection
/ config (no hard-coded copy in components); the five routes match their design
screens; dead files removed.
