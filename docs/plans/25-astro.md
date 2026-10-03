# 25: Astro 7.3.5

| | |
| --- | --- |
| Wave | W2 dependency lane (alongside 20–24, before [26](./26-typescript-7.md)) |
| Branch | `redesign/25-astro` |
| PR title | ⬆️ bump Astro to 7.3.5 |
| Design | none |
| Dev port | 4346 |

## Goal

Move from Astro `7.1.6` to `7.3.5` (`latest` on npm as of 2026-10-03), with
the official integrations, without changing any behaviour. The page plans in
W2 keep working on their branches, and they land on `7.3.5` when they merge.

## Owns

- `package.json`, `package-lock.json`

No W2 page plan touches these two files. If the upgrade forces a code change:

- In a file that no W2 plan owns (`BaseLayout`, `Common/*`, `Site/*`,
  `lib/projects`, `content.config.ts`, …), keep it minimal, don't change any
  contract from [00 §3.2](./00-overview.md#32-contracts-frozen-after-w1), and
  list it under **Summary of changes → Shared**.
- In a file a W2 plan owns (pages, `Home/*`, `Work/*`, `Project/*` except
  `ProjectCard`, `About/*`, `Contact/*`, `astro.config.mjs`), stop and report
  it to the orchestrator instead of editing.

## Commits

1. `⬆️ bump astro to 7.3.5`
   - `npm install astro@^7.3.5`, then bring `@astrojs/sitemap` and
     `@astrojs/check` to their latest versions that support it. Keep
     `typescript` on `^6`, because plan 26 handles TypeScript.
   - Read `node_modules/astro/CHANGELOG.md` from 7.1.7 up to 7.3.5. List every
     breaking change, deprecation and new feature that touches what we use
     (content layer and `glob`, `image()`, `astro:assets` `<Picture>` and
     `priority`, `getImage`, `astro:env`, sitemap, the dev toolbar).
2. `🩹 adapt to Astro 7.3` *(only if needed)*. Fix any deprecation warnings
   or type errors from the bump, within the ownership rules above.

## Verification

- `npx biome ci . && npm run check:types && npm test && npm run build` pass.
- Compare `main` with this branch:
  - wall-clock time of `npm run build`
  - the number of generated images in `dist/_astro`
  - the total size of `dist/`
  - Large differences go in the PR.
- In the dev server, `/werk` and two project pages render with images in
  both themes, and the console is free of new warnings.
- The PR description includes a short **Changelog highlights** list: the
  items from commit 1 that matter here, plus anything worth adopting later.
