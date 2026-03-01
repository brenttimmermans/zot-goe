# PROJ-04: GLightbox Integration

**Status:** `todo`
**Priority:** High
**Track:** Projects
**Dependencies:** PROJ-03 (masonry gallery)
**Blocked by:** PROJ-03

---

## Description

Install and integrate GLightbox on the project detail page to provide full-screen image viewing when gallery images are clicked. GLightbox is lightweight (~11 KB), has no dependencies, supports touch/swipe, and works with plain `<a>` tags as progressive enhancement.

## Acceptance Criteria

- [ ] `glightbox` npm package is installed
- [ ] GLightbox initializes on the project detail page via a `<script>` tag
- [ ] Clicking any gallery image opens the lightbox with full-screen viewing
- [ ] Arrow keys and swipe gestures navigate between images
- [ ] Escape key closes the lightbox
- [ ] GLightbox CSS is imported
- [ ] Overlay background matches the neutral palette (dark overlay: `rgba(44, 42, 39, 0.95)`)
- [ ] Lightbox loops through images (`loop: true`)
- [ ] Gallery still works without JS (links go directly to image files)

## Implementation Details

### Install

```bash
npm install glightbox
```

### Script Tag (in `[slug].astro`)

Add this at the bottom of the page, after the gallery markup:

```html
<script>
  import GLightbox from "glightbox";
  import "glightbox/dist/css/glightbox.min.css";

  const lightbox = GLightbox({
    selector: ".glightbox",
    touchNavigation: true,
    loop: true,
    autoplayVideos: false,
  });
</script>
```

### GLightbox Overlay Style Override

This should already be in `src/styles/global.css` (from FOUND-01):

```css
.goverlay {
  background: rgba(44, 42, 39, 0.95);
}
```

If not present, add it.

### How It Works

- GLightbox scans for all elements matching `.glightbox` selector
- Each `<a class="glightbox" href="/path/to/image.jpg">` becomes a lightbox item
- `data-gallery="project-gallery"` groups all images so they can be navigated as a set
- The `<script>` tag uses Astro's default script handling (bundled, deduped)

### Testing

- Click an image → lightbox opens showing that image
- Use arrow keys or swipe to navigate to next/previous
- Press Escape or click outside to close
- Verify overlay is dark grey, not pure black

## Files to Create/Modify

- `package.json` — add `glightbox` dependency
- `src/pages/projects/[slug].astro` — add `<script>` block
- `src/styles/global.css` — verify `.goverlay` override exists
