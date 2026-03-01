# PROJ-05: Projects Pages — SEO & Structured Data

**Status:** `todo`
**Priority:** Medium
**Track:** Projects
**Dependencies:** PROJ-01, PROJ-02
**Blocked by:** PROJ-01, PROJ-02

---

## Description

Ensure both the projects listing page and each project detail page have proper SEO meta tags and JSON-LD structured data. This ticket is a verification/polish pass — PROJ-01 and PROJ-02 include basic SEO, but this ticket ensures completeness.

## Acceptance Criteria

- [ ] Projects listing page (`/projects`) has `CollectionPage` JSON-LD schema
- [ ] Each project detail page has `ImageGallery` JSON-LD schema with individual `ImageObject` entries
- [ ] All pages have unique `<title>` and `<meta description>`
- [ ] Open Graph image is set to the project's `cover` image on detail pages
- [ ] Canonical URLs are correct
- [ ] All images have `alt` attributes (even if empty `alt=""` for decorative)

## Implementation Details

### Projects Listing — JSON-LD

```json
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Projects — Zot Goe Photography",
  "description": "Browse all photography projects by Zot Goe.",
  "url": "https://zotgoe.be/projects"
}
```

### Project Detail — JSON-LD

```json
{
  "@context": "https://schema.org",
  "@type": "ImageGallery",
  "name": "Urban Decay",
  "description": "Abandoned industrial spaces reclaimed by nature.",
  "dateCreated": "2025-06-15",
  "author": {
    "@type": "Person",
    "name": "Zot Goe"
  },
  "image": [
    {
      "@type": "ImageObject",
      "contentUrl": "https://zotgoe.be/images/projects/urban-decay/gallery-01.jpg"
    },
    {
      "@type": "ImageObject",
      "contentUrl": "https://zotgoe.be/images/projects/urban-decay/gallery-02.jpg"
    }
  ]
}
```

### Checklist

- [ ] Verify `<title>` on listing: "Projects | Zot Goe Photography"
- [ ] Verify `<title>` on detail: "{Project Title} | Zot Goe Photography"
- [ ] Verify `<meta description>` on listing is a general portfolio description
- [ ] Verify `<meta description>` on detail matches the project's `description` field
- [ ] Verify `og:image` on detail page uses the project's `cover` image
- [ ] Verify JSON-LD renders correctly in the HTML `<head>`
- [ ] Test with Google's Rich Results Test or Schema.org validator

## Files to Create/Modify

- `src/pages/projects/index.astro` — verify/add structured data
- `src/pages/projects/[slug].astro` — verify/add structured data
