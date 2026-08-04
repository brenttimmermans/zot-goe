# Stage 6 — Contact (`/contact`, design `1g`)

> Depends on Stage 1. Independent of Stages 2–5. Read [`00-overview.md`](./00-overview.md)
> and [`01-foundation.md`](./01-foundation.md). File: `src/pages/contact.astro`.
> Rewrites `src/components/ContactForm.astro`; may add page-local `ContactAside.astro`.

## Design intent (`1g`)

A two-column split: **left** an editorial pitch (`VERTEL ME EROVER`, a serif
paragraph, a "handig om te vermelden" hint, contact details, a rate note); **right**
the form on a slightly lighter panel with **underline-style inputs**, a serif
textarea, a solid ink submit button, and a "Antwoord binnen 24u" note. A vertical
hairline divides the two columns.

## Structure

- Section: `grid md:grid-cols-2`, with the left column `border-r border-line` (divider)
  and the right column `bg-surface`.

### Left — `ContactAside.astro`
- H1 `Vertel me erover` — `text-contact font-extrabold uppercase` (token); two lines
  (`Vertel` / `me erover`).
- Serif intro (19px, `leading-[1.6]`): design `1g` copy about concert/opening/
  huwelijk/raceweekend + "Ik antwoord meestal binnen 24 uur."
- Hint block (top hairline): `<MonoLabel accent>Handig om te vermelden</MonoLabel>` +
  serif line = `CONTACT_HINT` (from `constants/site.ts`).
- Details block (top hairline): mono rows `EMAIL` · `Instagram · @zotgoe` ·
  `CITY` (from `config.ts` / `SOCIALS`).
- Rate note (pushed to bottom, `mt-auto`): mono `text-muted` — "Tarief op maat — laat
  me eerst weten wat je nodig hebt."

### Right — `ContactForm.astro` (rewrite)
- Keep Web3Forms integration: `action=https://api.web3forms.com/submit`, hidden
  `access_key` (leave the existing `YOUR_WEB3FORMS_KEY_HERE` placeholder), hidden
  `redirect` to `/contact?success=true`, honeypot `botcheck`.
- Fields styled as the design (Dutch labels, mono `.eyebrow` labels):
  - **Naam** — text input, underline style: `border-0 border-b border-heading
    bg-transparent py-2.5 text-lg` placeholder `Jouw naam` (`text-muted`), focus
    ring via base rule.
  - **E-mail** — same underline style, placeholder `jij@voorbeeld.be`.
  - **Bericht** — `<textarea>` with **boxed** style `border border-line p-3.5
    font-serif text-[17px] leading-relaxed min-h-[200px]`, placeholder = the design's
    example message (the long Dutch example).
- Footer row: `flex justify-between items-center` — solid submit
  `<button>` styled like `EditorialLink variant="solid"` → `Versturen →` (hover
  `bg-accent`); mono note `Antwoord binnen 24u`.
- Keep `required`, `autocomplete`, and semantic `<label for>`/`id` pairs
  (accessibility — CODE_STYLE §a11y).

## Success state

Keep the existing `?success=true` branch. Restyle the success panel to the paper
aesthetic: `bg-surface` card, Archivo heading `Bericht verzonden!`, serif body
`Bedankt voor je bericht. Ik antwoord meestal binnen 24 uur.` Replace the whole
split with the success panel (or show it above the form) — match current behavior.

## Data / copy

- All copy Dutch, from design `1g`. Brand facts (`EMAIL`, `CITY`, `SOCIALS`,
  `CONTACT_HINT`) from `config.ts` / `constants/site.ts` — not inlined.

## SEO

Keep `ContactPage` JSON-LD (Dutch). `title="Contact"`,
`canonicalUrl=${SITE_URL}/contact`.

## Responsive

- Split → single column on mobile: aside stacks above the form; drop the vertical
  `border-r` (use a top border on the form panel instead below `md`).
- Reduce the big `Vertel me erover` heading via `clamp`.

## Done when

`/contact` renders the two-column editorial split with underline inputs, solid submit,
details from config, and the styled success state; Web3Forms wiring intact; matches
`1g`; stacks on mobile; both themes; `check:types` + `lint` pass.
