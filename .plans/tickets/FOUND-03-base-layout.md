# FOUND-03: BaseLayout Component

**Status:** `todo`
**Priority:** High
**Track:** Foundation
**Dependencies:** FOUND-01 (Tailwind colors), FOUND-04 (Navbar), FOUND-05 (Footer)
**Blocked by:** FOUND-01

---

## Description

Create the `BaseLayout.astro` component that serves as the HTML shell for every page. It includes the `<head>` with meta tags, Open Graph, Twitter Cards, JSON-LD structured data, and wraps page content with the Navbar and Footer.

## Acceptance Criteria

- [ ] `src/layouts/BaseLayout.astro` exists and is a valid Astro layout
- [ ] Accepts props: `title`, `description`, `ogImage`, `canonicalUrl`, `structuredData`
- [ ] Renders complete `<head>` with charset, viewport, title, meta description
- [ ] Includes Open Graph and Twitter Card meta tags
- [ ] Includes a `<script type="application/ld+json">` block for structured data
- [ ] Preloads hero image with `<link rel="preload">`
- [ ] Imports `global.css` for Tailwind styles
- [ ] Includes Navbar at top and Footer at bottom
- [ ] Uses semantic HTML: `<main>` wrapper for slot content
- [ ] Page background is `bg-bg` with `text-body` as default text color

## Implementation Details

### Props Interface

```typescript
interface Props {
  title: string;
  description?: string;
  ogImage?: string;
  canonicalUrl?: string;
  structuredData?: object;
}
```

### Template Structure

```astro
---
import Navbar from "../components/Navbar.astro";
import Footer from "../components/Footer.astro";
import "../styles/global.css";

interface Props {
  title: string;
  description?: string;
  ogImage?: string;
  canonicalUrl?: string;
  structuredData?: object;
}

const {
  title,
  description = "Photography portfolio of Zot Goe",
  ogImage = "/images/hero.jpg",
  canonicalUrl = Astro.url.href,
  structuredData,
} = Astro.props;

const fullTitle = `${title} | Zot Goe Photography`;
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{fullTitle}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={canonicalUrl} />
    <link rel="preload" as="image" href="/images/hero.jpg" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

    <!-- Open Graph -->
    <meta property="og:title" content={fullTitle} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={ogImage} />
    <meta property="og:url" content={canonicalUrl} />
    <meta property="og:type" content="website" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={fullTitle} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={ogImage} />

    <!-- JSON-LD Structured Data -->
    {structuredData && (
      <script type="application/ld+json" set:html={JSON.stringify(structuredData)} />
    )}
  </head>
  <body class="bg-bg text-body min-h-screen flex flex-col">
    <Navbar />
    <main class="flex-1">
      <slot />
    </main>
    <Footer />
  </body>
</html>
```

## Files to Create/Modify

- `src/layouts/BaseLayout.astro` — create the layout component
