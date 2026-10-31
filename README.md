# Zot Goe

Portfolio site for [zotgoe.be](https://zotgoe.be). Static Astro, in Dutch.
How it's built: [`ARCHITECTURE.md`](./ARCHITECTURE.md).

## Setup

Requires Node 24.

```sh
npm ci
cp .env.example .env   # add PUBLIC_WEB3FORMS_KEY
npm run dev            # http://localhost:4321
```

`PUBLIC_WEB3FORMS_KEY` is the [Web3Forms](https://web3forms.com) key for the
contact form. Without it the site builds, but the form can't send.

## Scripts

| Command | Does |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Build to `dist/` |
| `npm run preview` | Serve `dist/` |
| `npm run check:types` | Type check |
| `npm test` / `npm run test:watch` | Vitest |
| `npm run check` | Biome lint + format, with fixes |
| `npm run lint` / `npm run format` | Biome lint / format only |

## Content

### Adding a project

1. Create `src/content/projects/<slug>/`. The slug is the URL: `/werk/<slug>`.
2. Add JPEGs (~2400 px long edge) to that folder.
3. Write `index.yaml`:

```yaml
title: iPhone Duo reveal
category: event
kind: Productlancering
date: 2025-06-14
location: Brussel
summary: Lancering van de iPhone Duo voor pers en genodigden.
featured: 2
story:
  - Apple stelde de iPhone Duo voor aan pers en genodigden.
  - "Opgeleverd: 80 bewerkte beelden, binnen drie dagen."
cover:
  src: ./cover.jpg
  alt: De iPhone Duo wordt op het podium onthuld.
photos:
  - src: ./01.jpg
    alt: Genodigden testen de iPhone Duo aan de demotafels.
  - src: ./02.jpg
```

| Field | | |
| --- | --- | --- |
| `title` | required | Project name |
| `category` | required | `concert`, `event`, `motorsport` or `huwelijk` (the `/werk` filter) |
| `kind` | required | Display label, e.g. `Productlancering` |
| `date` | required | `YYYY-MM-DD`; sets the order |
| `location` | required | Shown on the project page |
| `summary` | required | One sentence for search and link previews |
| `featured` | optional | Home-page rank, `1` first. Use an odd count so the rows fill |
| `story` | required | 1–3 paragraphs |
| `cover` | required | `src` + `alt`. Use a landscape photo, subject centred |
| `photos` | required | Gallery, in order. `alt` optional but recommended |

Tips:

- Paths are relative to `index.yaml` (`./01.jpg`). A wrong path fails the
  build.
- Quote lines that contain `: `.
- Alt text: one Dutch sentence describing the photo.
- Mix landscapes and portraits: landscapes go full width, portraits pair up.

### Replacing the stand-ins

Five projects use placeholder photos. Only `spa-24h` is real.

- [ ] `grep -r "stand-in" src/` lists what's left (ignore `*.test.ts`).
- [ ] Per project: add real photos, point every path at `./…` (also the
      borrowed `../spa-24h/…` ones), rewrite alt text, delete the
      `# Stand-in photos` comment.
- [ ] Contact photo: `CONTACT_IMAGE` in `src/lib/siteImages.ts`.
- [ ] Portrait: replace `src/assets/site/portrait.png` (4:5).
- [ ] Delete `src/assets/stand-in/`.
- [ ] `npm run build` passes.

## Deploy

Cloudflare Workers hosts the site as static assets: `npm run build`, output
is the static `dist/`. CI deploys every push to `main`.
