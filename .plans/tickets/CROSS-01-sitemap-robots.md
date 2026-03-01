# CROSS-01: Sitemap & robots.txt Setup

**Status:** `todo`
**Priority:** Medium
**Track:** Cross-cutting
**Dependencies:** All page tickets (should be done after pages exist)
**Blocked by:** None (can be done in parallel but best after pages exist)

---

## Description

Install and configure `@astrojs/sitemap` for automatic sitemap generation and create a proper `robots.txt` file that allows all crawlers including AI crawlers.

## Acceptance Criteria

- [ ] `@astrojs/sitemap` is installed
- [ ] Sitemap integration is added to `astro.config.mjs`
- [ ] `site` property is set in Astro config to `https://zotgoe.com`
- [ ] `public/robots.txt` exists with proper directives
- [ ] AI crawlers (GPTBot, Google-Extended, anthropic-ai, CCBot) are explicitly allowed
- [ ] Sitemap URL referenced in robots.txt
- [ ] Build generates `sitemap-index.xml` in the output

## Implementation Details

### Install

```bash
npm install @astrojs/sitemap
```

### Astro Config (`astro.config.mjs`)

```javascript
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://zotgoe.com",
  integrations: [tailwind(), sitemap()],
});
```

### robots.txt (`public/robots.txt`)

```
User-agent: *
Allow: /

Sitemap: https://zotgoe.com/sitemap-index.xml

# AI Crawlers (allowed for portfolio visibility)
User-agent: GPTBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: CCBot
Allow: /
```

### Verification

- Run `npm run build` and check that `dist/sitemap-index.xml` is generated
- Verify the sitemap includes all pages: `/`, `/projects`, `/projects/{slug}`, `/contact`

## Files to Create/Modify

- `package.json` — add `@astrojs/sitemap` dependency
- `astro.config.mjs` — add sitemap integration and `site` property
- `public/robots.txt` — create or update
