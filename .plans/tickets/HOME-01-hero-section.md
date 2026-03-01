# HOME-01: HeroSection Component

**Status:** `todo`
**Priority:** High
**Track:** Home Page
**Dependencies:** FOUND-01, FOUND-03, FOUND-04
**Blocked by:** FOUND-01

---

## Description

Build the `HeroSection.astro` component — a full-viewport-height section with the site heading on the left and a large hero photo on the right. This is the first thing visitors see.

## Acceptance Criteria

- [ ] `src/components/HeroSection.astro` exists
- [ ] Full viewport height (`min-h-screen`)
- [ ] Two-column layout: text left, image right
- [ ] Heading: "ZOT GOE" in large bold type (`text-5xl md:text-7xl font-bold text-heading`)
- [ ] Tagline below heading in `text-body` (e.g., "Photography that captures the unseen.")
- [ ] Hero photo uses plain `<img>` tag pointing to `/images/hero.jpg`
- [ ] Hero image uses `loading="eager"` (NOT lazy — it's above the fold)
- [ ] Responsive: stacks vertically on mobile (text on top, image below)

## Implementation Details

### Template

```astro
<section class="min-h-screen flex items-center">
  <div class="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
    <!-- Text side -->
    <div>
      <h1 class="text-5xl md:text-7xl font-bold text-heading mb-4 tracking-tight">
        ZOT GOE
      </h1>
      <div class="w-16 h-px bg-muted mb-6"></div>
      <p class="text-lg md:text-xl text-body max-w-md">
        Photography that captures the unseen.
      </p>
    </div>
    <!-- Image side -->
    <div>
      <img
        src="/images/hero.jpg"
        alt="Featured photography by Zot Goe"
        loading="eager"
        decoding="async"
        class="w-full h-auto rounded"
      />
    </div>
  </div>
</section>
```

### Styling Notes

- The divider line (`w-16 h-px bg-muted`) adds a subtle separator between heading and tagline
- `tracking-tight` on the heading for a tighter, more editorial feel
- `max-w-md` on the tagline to prevent it from stretching too wide
- On mobile, the grid stacks to `grid-cols-1` — text appears first, image below
- The hero image needs a placeholder in `public/images/hero.jpg`

### Placeholder Image

Create or provide a `public/images/hero.jpg` placeholder image (any landscape photo or colored rectangle, ~1200x800 or similar).

## Files to Create/Modify

- `src/components/HeroSection.astro` — create the component
- `public/images/hero.jpg` — placeholder hero image
