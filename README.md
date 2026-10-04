# Zot Goe

The portfolio of Brent Timmermans, an event, concert, motorsport and wedding
photographer in Gent: [zotgoe.be](https://zotgoe.be). A static, Dutch-language
Astro site. [`ARCHITECTURE.md`](./ARCHITECTURE.md) explains how it's built.

## Requirements

- Node 24 (see `.node-version`) and npm

## Setup

```sh
npm ci
cp .env.example .env    # then fill in PUBLIC_WEB3FORMS_KEY
npm run dev             # http://localhost:4321
```

`PUBLIC_WEB3FORMS_KEY` is the [Web3Forms](https://web3forms.com) access key
for the contact form. It's optional for local work: the site builds without
it, but the form can't send. Set it in the build environment for production.

## Scripts

| Command | Action |
| --- | --- |
| `npm run dev` | Dev server at `localhost:4321` |
| `npm run build` | Build the static site into `dist/` |
| `npm run preview` | Serve the built `dist/` locally |
| `npm run check:types` | Type-check with `astro check` |
| `npm test` | Run the Vitest suite once |
| `npm run test:watch` | Run Vitest in watch mode |
| `npm run lint` | Biome lint |
| `npm run format` | Biome format, writing changes |
| `npm run check` | Biome lint and format, writing fixes |
| `npm run astro -- …` | Any Astro CLI command |

Husky runs Biome on staged files before each commit. Before each push it
runs `npx biome ci . && npm run check:types && npm test && npm run build`, the
same checks as CI.

## Content

### Adding a project

1. **Create a folder** in `src/content/projects/`. Its name becomes the URL,
   so use lowercase and hyphens: `src/content/projects/lannoo-pascal-naessens/`
   is served at `/werk/lannoo-pascal-naessens`.
2. **Add the photos** to that folder as JPEGs. Export them at about 2400 px
   on the long edge; the build makes the smaller AVIF and WebP versions. Name
   them in the order you want: `cover.jpg`, `01.jpg`, `02.jpg`, …
3. **Write `index.yaml`** in the same folder:

   ```yaml
   title: Lannoo × Pascal Naessens
   category: event
   kind: Boekvoorstelling
   date: 2025-04-10
   location: Gent
   summary: Boekvoorstelling voor pers en genodigden.
   featured: 2
   story:
     - Lannoo stelde het nieuwe kookboek van Pascal Naessens voor aan pers en genodigden.
     - "Opgeleverd: 120 bewerkte beelden voor web, druk en socials, binnen vier dagen."
   cover:
     src: ./cover.jpg
     alt: Pascal Naessens signeert een kookboek aan een lange tafel.
   photos:
     - src: ./01.jpg
       alt: Genodigden met een glas in de hand luisteren naar de presentatie.
     - src: ./02.jpg
   ```

   | Field | Required | What it does |
   | --- | --- | --- |
   | `title` | yes | Project name on cards, the collage and the detail page |
   | `category` | yes | One of `concert`, `event`, `motorsport`, `huwelijk`. Drives the filter on `/werk` |
   | `kind` | yes | Free label shown under the title, e.g. `Boekvoorstelling`, `Trouw`, `Concert` |
   | `date` | yes | `YYYY-MM-DD`. Projects are listed newest first; pages show "april 2025" or "2025" |
   | `location` | yes | Shown next to the kind and date on the detail page |
   | `summary` | yes | One sentence for search engines and link previews |
   | `featured` | no | Rank on the home page: `1` comes first. Only the first five are shown. Leave it out to keep a project off the home page |
   | `story` | yes | One to three paragraphs on the detail page |
   | `cover` | yes | `src` and `alt`. The project's main photo on cards, the detail page and link previews |
   | `photos` | yes | At least one `src`, each with an optional `alt`. The gallery, in this order |

   Paths are relative to `index.yaml`, so photos in the same folder start with
   `./`. A wrong path fails the build. Wrap a line in quotes when it contains
   `: ` (a colon followed by a space), like the second `story` paragraph above.
4. **Write alt text** for the cover (required) and for every photo you can.
   Describe what's in the picture for someone who can't see it, in one Dutch
   sentence. A photo without `alt` falls back to "<title>, foto <n>", which
   tells a screen reader nothing.
5. **Pick a landscape cover.** The cover is cropped to many shapes: wide on
   the detail page, near-square on home page cards, 1200×630 for link
   previews. A landscape photo with the subject near the centre survives
   best.
6. **Mix orientations in `photos`.** The gallery puts landscapes full-width
   and pairs portraits side by side, so their order shapes the layout.
7. Run `npm run dev` and check `/werk`, the project page and, if it's
   featured, `/`.

To change the home page order, renumber `featured` across projects. Ranks
don't have to be consecutive; they're sorted.

### Replacing the stand-ins

Five of the six projects still show placeholder motorsport photos: files
from `src/assets/stand-in/` and photos borrowed from `spa-24h` (paths like
`../spa-24h/05.jpg`). Only `spa-24h` itself is real. Each placeholder YAML
starts with a `# Stand-in photos` comment.

- [ ] Find what's left:

  ```sh
  grep -r "stand-in" src/
  ```

  Matches in `*.test.ts` are test fixtures; ignore them.
- [ ] For each project YAML in the list: add the real photos to the project
  folder, point every `cover` and `photos` path at `./…` (no more
  `../../../assets/stand-in/` or `../spa-24h/`), write new alt text (the
  stand-in alt text describes race cars), and delete the
  `# Stand-in photos` comment at the top.
- [ ] Replace the contact page photo: `CONTACT_IMAGE` in
  `src/lib/siteImages.ts` imports `~/assets/stand-in/08.jpg`. Add a real
  photo under `src/assets/site/` and import that instead.
- [ ] Replace the portrait: swap `src/assets/site/portrait.png` for a real
  portrait, cropped 4:5. If the file name or format changes, update the
  import in `src/lib/siteImages.ts`.
- [ ] When `grep` finds nothing outside the tests, delete
  `src/assets/stand-in/`.
- [ ] Run `npm run build` to confirm every image path still resolves.

## Deploy

`npm run build` writes a fully static site to `dist/`: HTML, hashed CSS and
JS, optimised images, `sitemap-index.xml` and `robots.txt`. Upload that
folder to any static host, with `PUBLIC_WEB3FORMS_KEY` set in the build
environment. There is no server code.
