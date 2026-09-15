# Agents Guide

Before starting any task, **read these two files in full**:

- [`ARCHITECTURE.md`](./ARCHITECTURE.md) — project structure, tech stack, data flow, and component responsibilities
- [`CODE_STYLE.md`](./CODE_STYLE.md) — naming conventions, file organization, import order, patterns, and do's/don'ts

These are required reading. Every task should be consistent with both documents.

## Comments

Code must be self-explanatory; prefer clear names and structure over comments.
Only comment genuinely complex or non-obvious blocks (e.g. a workaround or a
subtle invariant), and explain the _why_, not the _what_. Do not add comments
that merely restate the code, label sections, or describe obvious intent.

## Skills

Load all skills from [`.agent/skills/`](./.agent/skills/) before starting work. Each skill defines conventions and workflows for specific tasks—check the `SKILL.md` in each subfolder for when to use it.
