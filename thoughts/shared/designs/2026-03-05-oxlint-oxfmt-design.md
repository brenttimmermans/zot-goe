---
date: 2026-03-05
topic: oxlint and oxfmt minimal config
status: validated
---

## Problem Statement
We need lightweight linting and formatting using oxlint and oxfmt with minimal configuration and defaults, without adding CI integration or a format:check workflow.

## Constraints
- Keep configuration files minimal and human-readable.
- Prefer default rule sets; no custom rule tuning unless required.
- No CI integration and no format:check command.
- ASCII-only documentation.

## Approach
Add the smallest possible configuration files for oxlint and oxfmt and wire local developer scripts only (lint and format). Rely on defaults for rules and formatting behavior.

## Architecture
Configuration-only change. No runtime application changes. No CI or build pipeline updates.

## Components
- oxlint config file: minimal defaults, no rule overrides.
- oxfmt config file: minimal defaults, no formatting options unless required.
- npm scripts: local lint and format commands only.

## Data Flow
Developer runs local scripts that read config files and scan the workspace. No data leaves the repo and no CI hooks are invoked.

## Error Handling
Surface tool errors directly in the CLI. No custom error handling or retries.

## Testing Strategy
Manual verification by running local lint and format commands. No automated tests or format:check.

## Open Questions
- What exact config file names and locations are preferred for oxlint and oxfmt in this repo?
