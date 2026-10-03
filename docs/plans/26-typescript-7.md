# 26: TypeScript 7 spike

| | |
| --- | --- |
| Wave | W2 dependency lane (starts once [25](./25-astro.md) is merged) |
| Branch | `redesign/26-typescript-7` |
| PR title | ⬆️ TypeScript 7 (adopt) or ⚗️ TypeScript 7 spike (no-go) |
| Design | none |
| Dev port | none |

## Goal

Measure how much faster type checking gets on TypeScript 7, the native Go
compiler, compared with TypeScript `6.0.3`. Then decide whether we can switch.
Brent mostly wants to **see the speed difference**, so the benchmark is the
main deliverable. Adopting TS 7 is a bonus, and only if everything stays
green.

Known going in (npm, 2026-10-03):

- `typescript@latest` is `7.0.2`.
- `@astrojs/check@0.9.10` declares the peer `typescript: ^5.0.0 || ^6.0.0`.
  Whether `astro check` runs on TS 7 at all is the open question.

## Owns

- `package.json`, `package-lock.json`
- `tsconfig.json`, only if TS 7 rejects an option. Keep the `~/*` alias.

## Method

Run everything on one machine with nothing else heavy running (other
worktrees' dev servers are fine). Record the CPU
(`sysctl -n machdep.cpu.brand_string`), Node and npm versions. `hyperfine`
isn't installed, so write a small timing script in your scratchpad:

- 1 warm-up run, then 10 timed runs
- report the median, min and max
- read peak RSS from `/usr/bin/time -l`

Run `npx astro sync` first so `.astro/types.d.ts` exists.

| # | Measure | TS 6.0.3 (current `main`) | TS 7.0.2 |
| --- | --- | --- | --- |
| A | Plain `.ts` check | `npx tsc --noEmit` | `npx -p typescript@7.0.2 tsc --noEmit`, with nothing installed yet |
| B | Full check, including `.astro` | `npm run check:types` | after installing TS 7, see below |
| C | CI "Type check" step | duration on `main`'s latest run | duration on this PR's run |

**Same work, both sides.** Before trusting the numbers, prove that both
compilers catch errors. Add a deliberate type error to one `.ts` file and one
`.astro` file. Confirm that each toolchain reports it, then revert.

**Installing TS 7.** Run `npm install -D typescript@^7.0.2`. If npm refuses
because of the `@astrojs/check` peer range, add an `overrides` entry in
`package.json` rather than `--legacy-peer-deps`. `npm ci` in CI has to work
without flags. Then run measure B and the full suite.

## Outcome

- **Adopt.** `astro check`, `npm test` and `npm run build` all pass on TS 7,
  with the same errors caught. Open a normal PR with one commit,
  `⬆️ upgrade TypeScript to 7`, which includes any `overrides`.
- **No-go.** `astro check` fails or misses errors. Open a **draft** PR titled
  `⚗️ TypeScript 7 spike (not for merge)` with the attempted switch, so the
  diff and CI run are on record. Brent closes it after reading. Say which
  `@astrojs/check` or language-server release we'd need, if that's knowable.

Either way, the PR description leads with this table (all numbers are the
median of 10 runs):

| Check | TS 6.0.3 | TS 7.0.2 | Speed-up | Peak RSS 6 → 7 |
| --- | --- | --- | --- | --- |
| `tsc --noEmit` | | | | |
| `astro check` | | | | |
| CI type-check step | | | | n/a |

Follow it with the machine details, the method in two lines, and one
paragraph of verdict.
