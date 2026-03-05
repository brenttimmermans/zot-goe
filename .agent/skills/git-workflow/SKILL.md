---
name: git-workflow
description: Git conventions for this repository. Use when committing changes, creating pull requests, or when the user asks about git workflow, commit messages, or PR templates.
---

# Git Workflow

## Commit Messages: Gitmoji Convention

All commits **must** use the [gitmoji](https://gitmoji.dev/) convention. Format:

```
<emoji> <message>
```

### Common emojis

| Emoji                        | Use for                   |
| ---------------------------- | ------------------------- |
| ✨ `:sparkles:`              | New features              |
| 🐛 `:bug:`                   | Bug fixes                 |
| ♻️ `:recycle:`               | Refactoring               |
| 📝 `:memo:`                  | Documentation             |
| 🎨 `:art:`                   | Code structure/formatting |
| ⚡️ `:zap:`                   | Performance               |
| 🔥 `:fire:`                  | Remove code/files         |
| 🚑 `:ambulance:`             | Critical hotfix           |
| ✅ `:white_check_mark:`      | Tests                     |
| 🔧 `:wrench:`                | Configuration             |
| 🏗️ `:building_construction:` | Architecture              |
| 💄 `:lipstick:`              | UI/style changes          |

Use unicode emoji (e.g. `✨`) in commit messages. Full list: [gitmoji.dev](https://gitmoji.dev/).

### Examples

```
✨ Add contact form with Web3Forms integration
🐛 Fix navbar active state on projects page
♻️ Extract HeroSection into reusable component
📝 Update AGENTS.md with deployment notes
```

---

## Commit Size

**Strive for small, focused commits.** Each commit should represent a single logical change.

- One feature or fix per commit
- Avoid mixing unrelated changes (e.g. don't fix a typo in the same commit as a new feature)
- If a change grows large, consider splitting into multiple commits
- Prefer `git add -p` to stage only relevant hunks when needed

---

## Pull Requests

When creating a pull request, **always use the project template** at `.github/PULL_REQUEST_TEMPLATE.md`.

Fill out every section. Do not leave placeholder text or empty bullets.
