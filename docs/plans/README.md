# Plans — "The Quiet Grid" editorial redesign

Retrofit of the Claude Design **Turn 02** direction (`Zot Goe.dc.html`) into the
existing Astro + Tailwind 4 site. Dutch, editorial newsprint, light + dark.

Read [`00-overview.md`](./00-overview.md) first. Then Stage 1 (blocking), then the
page stages (parallelizable), then Stage 7.

| Order | Plan | Scope | Parallel? |
| ----- | ---- | ----- | --------- |
| —  | [`00-overview.md`](./00-overview.md)        | Master plan: design language, architecture, staging | read first |
| 1  | [`01-foundation.md`](./01-foundation.md)    | Tokens+dark · fonts · config · schema · layout · `ui/*` · `ProjectCard` | **do first, alone** |
| 2  | [`02-home.md`](./02-home.md)                | Home `/` (design `2a`) | ✅ after Stage 1 |
| 3  | [`03-projects-index.md`](./03-projects-index.md) | Werk `/projects` (`2b`) | ✅ after Stage 1 |
| 4  | [`04-project-detail.md`](./04-project-detail.md) | Detail `/projects/[slug]` (`2c`) | ✅ after Stage 1 |
| 5  | [`05-about.md`](./05-about.md)              | Over `/over` (`2d`) | ✅ after Stage 1 |
| 6  | [`06-contact.md`](./06-contact.md)          | Contact `/contact` (`1g`) | ✅ after Stage 1 |
| 7  | [`07-integration.md`](./07-integration.md)  | Reconcile · dead-code · a11y · quality gates | after all pages |

**Decisions locked:** Dutch UI · keep light/dark toggle (new dark palette) · extend
the projects content schema.
