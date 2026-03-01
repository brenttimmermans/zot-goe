# CROSS-04: Cloudflare Pages Deployment Configuration

**Status:** `todo`
**Priority:** Low
**Track:** Cross-cutting
**Dependencies:** All other tickets
**Blocked by:** All page and foundation tickets

---

## Description

Prepare the project for deployment on Cloudflare Pages. This includes verifying the build configuration, adding a `.node-version` file, ensuring the Astro config is correct, and documenting the deployment steps.

## Acceptance Criteria

- [ ] `npm run build` succeeds and produces output in `dist/`
- [ ] `.node-version` file exists at project root with content `22`
- [ ] Astro config has `site: "https://zotgoe.com"` set
- [ ] Astro output mode is `"static"` (default, no SSR)
- [ ] No build errors or warnings
- [ ] All pages are generated in `dist/`
- [ ] Images in `public/` are copied to `dist/` correctly

## Implementation Details

### `.node-version`

Create a file at the project root:

```
22
```

### Astro Config Verification

Ensure `astro.config.mjs` has:

```javascript
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://zotgoe.com",
  integrations: [tailwind(), sitemap()],
});
```

### Cloudflare Pages Settings (for manual setup in dashboard)

| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node.js version | 22 (via `.node-version` or `NODE_VERSION` env var) |
| Environment variable | `SITE_URL=https://zotgoe.com` |

### Build Verification

Run `npm run build` and verify:
- `dist/index.html` exists (home page)
- `dist/projects/index.html` exists (projects listing)
- `dist/projects/urban-decay/index.html` exists (project detail)
- `dist/projects/coastal-light/index.html` exists (project detail)
- `dist/contact/index.html` exists (contact page)
- `dist/sitemap-index.xml` exists
- `dist/images/` contains all images from `public/images/`

### Post-Deploy Optimizations (manual in Cloudflare dashboard)

- Enable Auto Minify (HTML, CSS, JS)
- Enable Brotli compression
- Set Browser Cache TTL to 1 year for static assets
- Use Cache Rules to cache HTML at the edge

## Files to Create/Modify

- `.node-version` — create at project root
- `astro.config.mjs` — verify configuration
