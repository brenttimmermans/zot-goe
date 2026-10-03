# Plans: Zot Goe "Final" redesign

These plans move the site from the newsprint "Quiet Grid" redesign (stages 1–2,
already on `main`) to the **Final** design: `design/Zot Goe Final.dc.html`,
frames `10a`–`10e`. That direction is quieter. It has no mono labels, no giant
wordmark and no rules everywhere. The photos lead, with Archivo for UI and
Newsreader for prose.

Read [`00-overview.md`](./00-overview.md) first. It covers the design spec,
architecture, conventions and the file-ownership rules that make parallel work
safe. Then read the plan you're assigned.

## Waves

Every plan is **one branch, one PR**. Plans in the same wave own disjoint files
and run in parallel worktrees. A wave starts only after every PR of the previous
wave is merged into `main`.

```
W0  Plans (this PR)
     │
W1  ┌─ 10 Design system & site shell ─┐   2 parallel
    └─ 11 Content model & images ─────┘
     │
W2  ┌─ 20 Home ──────────┐
    ├─ 21 Werk index ────┤
    ├─ 22 Project detail ┤   5 parallel
    ├─ 23 Over ──────────┤
    └─ 24 Contact ───────┘
     │
W3  ┌─ 30 Quality sweep ─┐   2 parallel
    └─ 31 Docs ──────────┘
```

| Plan | Branch | PR title | Design | Port |
| --- | --- | --- | --- | --- |
| [`10-design-system.md`](./10-design-system.md) | `redesign/10-design-system` | 🎨 design system & site shell | all frames | 4331 |
| [`11-content.md`](./11-content.md) | `redesign/11-content` | 🍱 content model & image pipeline | all frames | 4332 |
| [`20-home.md`](./20-home.md) | `redesign/20-home` | 💄 home: collage hero & featured work | `10a` | 4341 |
| [`21-werk.md`](./21-werk.md) | `redesign/21-werk` | 💄 werk: project grid & filters | `10b` | 4342 |
| [`22-project.md`](./22-project.md) | `redesign/22-project` | 💄 project detail & gallery | `10c` | 4343 |
| [`23-over.md`](./23-over.md) | `redesign/23-over` | 💄 over: bio & how it works | `10d` | 4344 |
| [`24-contact.md`](./24-contact.md) | `redesign/24-contact` | 💄 contact form & thank-you page | `10e` | 4345 |
| [`30-quality.md`](./30-quality.md) | `redesign/30-quality` | ✅ quality sweep: a11y, responsive, dark, cleanup | all | 4351 |
| [`31-docs.md`](./31-docs.md) | `redesign/31-docs` | 📝 architecture, readme & content guide | — | — |

## Running a wave with herdr

The orchestrator (the Claude session in the main checkout) does this for each
plan in the wave.

```sh
# 1. Worktree on a fresh branch off the latest main
git -C /Users/brent/Developer/zot-goe fetch origin
herdr worktree create --cwd /Users/brent/Developer/zot-goe \
  --branch redesign/<id> --base origin/main --label <id> --no-focus
#    → read the root pane id and worktree path from the JSON result

# 2. Start an agent in that pane, then hand it the brief below
herdr agent start <id> --kind claude --pane <pane-id>
herdr agent prompt <id> "<brief>"

# 3. Follow progress
herdr agent get <id>
herdr agent read <id> --source recent-unwrapped --lines 120
```

When an agent is `blocked` on a permission prompt, the user answers it in that
pane. The orchestrator never approves prompts for them.

### Agent brief (template)

> You are implementing `docs/plans/<plan>.md` of the Zot Goe redesign in this
> worktree (branch `redesign/<id>`).
>
> 1. Read `AGENTS.md`, `CODE_STYLE.md`, `.agent/skills/git-workflow/SKILL.md`,
>    `docs/plans/00-overview.md` and `docs/plans/<plan>.md`.
>    `ARCHITECTURE.md` is stale until plan 31 lands. Where it disagrees with
>    the plans, the plans win.
> 2. The design source is read-only and lives outside the worktree:
>    `/Users/brent/Developer/zot-goe/design/Zot Goe Final.dc.html` (frame
>    `<frame>`). It won't render on its own, so read the markup. The plan
>    already transcribes everything you need.
> 3. Run `npm ci`. Start the dev server with `npm run dev -- --port <port>`.
> 4. Only touch the files your plan lists under **Owns**. Make the listed
>    commits in order. Every commit must pass `npm run check:types`.
> 5. Before pushing, run `npx biome ci . && npm run check:types && npm test &&
>    npm run build` (`npm test` exists once plan 11 has landed). Check the
>    pages at 390, 768, 1280 and 1600 px wide, in light and dark.
> 6. Push and open the PR with `gh pr create`. Use the PR title from the plan
>    and fill in every section of `.github/PULL_REQUEST_TEMPLATE.md`. Do not
>    merge. Reply with the PR URL and anything you had to change outside
>    **Owns**.

## Decisions (confirmed with Brent, 2026-10-03)

1. **Keep the light/dark toggle.** It sits in the header after "Contact". The
   dark palette is derived from the new light tokens.
2. **Seed the six design projects with stand-in photos.** The copy comes from
   the design and the images come from the existing Spa sets until real photos
   land. Only `spa-24h` uses its own real photos.
3. **Brent merges every PR.** The orchestrator stops at each wave boundary.
4. **Dutch routes:** `/werk`, `/werk/[slug]`, `/over`, `/contact`. Nothing is in
   production, so `/projects` simply goes away.
