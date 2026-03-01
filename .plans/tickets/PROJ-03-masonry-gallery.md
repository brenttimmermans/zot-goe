# PROJ-03: Project Detail Page — Masonry Gallery

**Status:** `todo`
**Priority:** High
**Track:** Projects
**Dependencies:** PROJ-02 (detail page layout)
**Blocked by:** PROJ-02

---

## Description

Add the masonry-style image gallery to the project detail page. Uses CSS multi-column layout (`columns-3`) with responsive breakpoints. Each image is wrapped in an `<a>` tag for the lightbox (PROJ-04). This gallery is the core visual element of the detail page.

## Acceptance Criteria

- [ ] Gallery rendered in `[slug].astro` below the project header
- [ ] CSS multi-column layout: 1 column on mobile, 2 on tablet, 3 on desktop
- [ ] Images fill column width; height determined by aspect ratio (masonry effect)
- [ ] Each image wrapped in `<a>` with `class="glightbox"` and `data-gallery="project-gallery"`
- [ ] All images use `loading="lazy"` and `decoding="async"`
- [ ] `break-inside-avoid` on each image container to prevent column breaks mid-image
- [ ] Hover effect: subtle opacity change on images
- [ ] `gap-4` between columns, `mb-4` between rows

## Implementation Details

### Gallery Markup (inside `[slug].astro`)

Add this below the project header in the detail page:

```html
<!-- Masonry gallery -->
<div class="columns-1 sm:columns-2 lg:columns-3 gap-4">
  {gallery.map((src, i) => (
    <a
      href={src}
      class="glightbox mb-4 block break-inside-avoid"
      data-gallery="project-gallery"
      data-description={`Image ${i + 1}`}
    >
      <img
        src={src}
        alt=""
        loading="lazy"
        decoding="async"
        class="w-full rounded hover:opacity-90 transition-opacity"
      />
    </a>
  ))}
</div>
```

### How CSS Multi-Column Masonry Works

- `columns-3` creates 3 equal-width columns
- Content flows top-to-bottom in each column, then left-to-right to the next
- `break-inside-avoid` ensures an image + its margin never splits across columns
- Each image's natural aspect ratio determines its height — no fixed height needed
- `gap-4` controls the horizontal gap between columns
- `mb-4` on each item controls the vertical gap between images

### Responsive Breakpoints

| Screen | Class | Columns |
|---|---|---|
| Mobile (< 640px) | `columns-1` | 1 |
| Tablet (640–1023px) | `sm:columns-2` | 2 |
| Desktop (1024px+) | `lg:columns-3` | 3 |

### Accessibility Notes

- Each `<a>` links to the full-size image — works even without JS (progressive enhancement)
- Add meaningful `alt` text if available; empty `alt=""` is acceptable for decorative gallery images
- `data-gallery="project-gallery"` groups images for the lightbox navigation

## Files to Create/Modify

- `src/pages/projects/[slug].astro` — add gallery markup below the header
