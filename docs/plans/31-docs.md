# 31: Docs

| | |
| --- | --- |
| Wave | W3 (parallel with [30](./30-quality.md)) |
| Branch | `redesign/31-docs` |
| PR title | 📝 architecture, readme & content guide |

## Goal

Make the repository's docs describe the site that actually exists, so future
agents and future Brent can work on it without reading the plans.

## Owns

`ARCHITECTURE.md`, `README.md`, `AGENTS.md` and `docs/**`. Don't touch code.
If you spot a code issue, list it in the PR for plan 30.

Plan 30 runs at the same time and may delete leftovers. Document the target
structure from [00 §3](./00-overview.md#3-architecture-target), then check it
against `main` once 30 is merged. The orchestrator handles that check.

## Commits

1. `📝 rewrite ARCHITECTURE.md`. It's currently stale (Astro 5, Montserrat,
   `tailwind.config`, `/projects`). Cover:
   - **Overview**: what the site is, and that it's Dutch and static.
   - **Stack table**: actual versions from `package.json`.
   - **Directory tree**.
   - **Routes table**: `/`, `/werk`, `/werk/[slug]`, `/over`, `/contact`,
     `/contact/bedankt`, `/404`.
   - **Components by folder**: Common, Site, Project, Home, Work, About,
     Contact.
   - **Data model**: the YAML fields, `image()` paths, the `Category` enum,
     and the `featured` rank.
   - **Image pipeline**: `Photo` → `<Picture>`, AVIF/WebP, `sizes`.
   - **Theming**: tokens, the dark palette, `data-theme`, the toggle and the
     no-flash script.
   - **Layout logic** in `lib/`: collage, work grid, gallery rows.
   - **Testing, CI, hooks, and SEO/JSON-LD** per page.
2. `📝 replace the starter README`. Cover:
   - what Zot Goe is, and its requirements (Node 24)
   - setup, scripts, and `PUBLIC_WEB3FORMS_KEY`
   - **adding a project**: create the folder, write `index.yaml` (each field
     explained, with an example), add photos, write alt text, set
     `featured`, and use landscape covers
   - **replacing stand-ins**: a checklist with `grep -r "stand-in" src/` to
     find the remaining ones, and swapping `src/assets/site/portrait.png`
   - deploy: the static `dist/`
3. `📝 point AGENTS.md at the plans and the content guide`. Keep the existing
   required reading. Add one line saying `docs/plans/` is the redesign
   history, and one line pointing at the README's content section.
4. `📝 mark the redesign plans as complete`. Add a status line at the top of
   `docs/plans/README.md` with the date and the PR numbers.

## Verify

Every path, script and route named in the docs exists on `main`, or in an
open plan 30 PR if it's being added there. All links resolve. No mention is
left of `/projects`, Montserrat, Plex Mono or `tailwind.config`.
