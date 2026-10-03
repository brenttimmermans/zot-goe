# 24: Contact (`/contact`, `/contact/bedankt`)

| | |
| --- | --- |
| Wave | W2 (parallel with 20–23) |
| Branch | `redesign/24-contact` |
| PR title | 💄 contact form & thank-you page |
| Design | frame `10e` |
| Dev port | 4345 |

## Goal

A calm enquiry page with an image on the left and an underline form on the
right, wired to Web3Forms through `astro:env`, plus a real thank-you page. The
current `?success=true` check never worked: the page is static, so it was only
evaluated at build time.

## Owns

- `src/pages/contact.astro`, `src/pages/contact/bedankt.astro` (new)
- `src/components/Contact/**` (new)
- `src/components/ContactForm.astro` (delete)
- `astro.config.mjs` (the `env` schema only), `.env.example` (new)

Use these, but treat them as frozen: `BaseLayout`, `Photo`, `Button`,
`TextLink`, `lib/siteImages` (`CONTACT_IMAGE`), `config.ts`.

## Spec

### Configuration

- In `astro.config.mjs`, add
  `env: { schema: { PUBLIC_WEB3FORMS_KEY: envField.string({ context: 'client',
  access: 'public', optional: true }) } }`. It's optional so that CI and local
  builds work without a key.
- `.env.example` contains `PUBLIC_WEB3FORMS_KEY=` and a one-line comment
  pointing to web3forms.com.

### Layout: `src/pages/contact.astro`

`px-media pb-section-L`, as `grid gap-media md:grid-cols-[5fr_7fr]
items-start`:

- Left: `Photo` with `CONTACT_IMAGE`, `fit="cover"`, `class="hidden md:block
  aspect-[3/4]"` and `sizes="42vw"`. It's decorative, so `alt=""`.
- Right, a column with 36 px gaps at `px-gutter pt-8 md:px-10 md:pt-10
  max-w-copy`:
  - A heading block with 14 px gaps:
    - `<h1 class="text-heading font-medium">Vertel me erover</h1>`
    - `<p class="font-serif text-prose text-body text-pretty">`, verbatim:
      "Een concert, een opening, een huwelijk of een raceweekend. Vermeld zeker
      de datum, het soort shoot en de locatie. Ik antwoord meestal binnen 24
      uur."
  - `Contact/ContactForm`

### Form: `Contact/ContactForm.astro` (+ `Contact/Field.astro`)

- `<form method="POST" action="https://api.web3forms.com/submit"
  class="flex flex-col gap-[22px]">`
- Hidden fields: `access_key` (from `astro:env/client`), `redirect`
  (`new URL('/contact/bedankt', SITE_URL)`), `subject` "Nieuw bericht via
  zotgoe.be" and `from_name` "zotgoe.be".
- Honeypot: `<input type="checkbox" name="botcheck" class="hidden"
  tabindex="-1" autocomplete="off">`.
- `Field` props: `{ id: string; label: string; type?: 'text' | 'email';
  multiline?: boolean; autocomplete?: string; placeholder: string }`. It
  renders a column with 6 px gaps: `<label class="text-caption text-muted">`,
  then an input or textarea styled `w-full border-b border-field bg-transparent
  py-2 text-base text-ink placeholder:text-hint`. All fields are `required`.
  - Focus: an underline focus style replaces the box outline, a 2 px accent
    underline drawn with `box-shadow: inset 0 -1px` or similar so nothing
    shifts. It must still be clearly visible.
  - The textarea has `rows="4"`, `min-h-[7.5rem]` and `resize-y`.
- Fields, with design placeholders:

  | Label | Name | Placeholder |
  | --- | --- | --- |
  | Naam | `name` (autocomplete `name`) | "Jouw naam" |
  | E-mail | `email` (type `email`, autocomplete `email`) | "jij@voorbeeld.be" |
  | Bericht | `message` (multiline) | "Bv. boekvoorstelling op 12 oktober in Gent, 19u–22u, sfeerbeelden voor pers en socials." |

- Submit row (`flex flex-wrap items-center gap-5 mt-1.5`):
  `<Button type="submit">Versturen</Button>` followed by `<p
  class="text-caption text-muted">of mail naar <a
  href="mailto:{EMAIL}">{EMAIL}</a></p>`.
- When the key is missing and `import.meta.env.DEV` is true, show a small
  `text-caption text-accent` note: "PUBLIC_WEB3FORMS_KEY ontbreekt: formulier
  verstuurt niet."

### Thank-you page: `src/pages/contact/bedankt.astro`

`BaseLayout title="Bedankt" noindex`. Use `px-gutter py-section-L max-w-copy`
as a column with 18 px gaps:

- `<h1 class="text-heading font-medium">Bedankt, je bericht is onderweg</h1>`
- Serif paragraph: "Ik antwoord meestal binnen 24 uur. Tot snel."
- `<TextLink href="/werk" variant="plain" arrow>Bekijk ondertussen mijn
  werk</TextLink>`

The header keeps "Contact" active here.

### Meta

- `/contact`: description "Vertel me over je concert, event, huwelijk of
  raceweekend. Ik antwoord meestal binnen 24 uur."
- JSON-LD `ContactPage` that references the `Person` (`email`, `address`).

## Commits

1. `🔧 read the Web3Forms key from astro:env`: config and `.env.example`
2. `✨ rebuild the contact form with underline fields`: `Contact/ContactForm`
   and `Contact/Field`
3. `💄 rebuild the contact page layout`: page, and delete the old
   `ContactForm.astro`
4. `✨ add the thank-you page`: `/contact/bedankt`, replacing the static
   `?success` check
5. `🔍 add contact meta and structured data`

## Verify

- At 1280 px, compare against `10e`. Check the 5/7 split, the 3:4 image, the
  form column inset 40 px with max width 560 px, 22 px field gaps, the pill
  button, and the 120 px space before the footer.
- Required fields block empty submits, and the email field validates.
  Keyboard order runs name → email → message → submit → mail link, with a
  visible focus ring on every one.
- With a real key in `.env`, a test submission lands on `/contact/bedankt`.
  Note in the PR whether you tested this.
- Check 390 px (no image, form full width) and both themes, including
  placeholder contrast and the button hover.
