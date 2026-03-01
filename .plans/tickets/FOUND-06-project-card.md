# FOUND-06: ProjectCard Component

**Status:** `todo`
**Priority:** High
**Track:** Foundation
**Dependencies:** FOUND-01 (Tailwind colors)
**Blocked by:** FOUND-01

---

## Description

Build the reusable `ProjectCard.astro` component used on both the Home page (featured projects) and the Projects listing page. The card is a horizontal 4-column grid: the first column contains title, description, and date; the remaining three columns each show a highlight photo.

## Acceptance Criteria

- [ ] `src/components/ProjectCard.astro` exists
- [ ] Accepts props: `title`, `description`, `date`, `slug`, `highlights` (3 image paths)
- [ ] 4-column grid layout with `gap-2` between all blocks
- [ ] First column: title, description, date on `bg-surface` background
- [ ] Three image columns with `object-cover` images
- [ ] Entire card is wrapped in an `<a>` tag linking to `/projects/{slug}`
- [ ] Images use `loading="lazy"` and `decoding="async"`
- [ ] Hover effect on images (subtle scale or opacity transition)
- [ ] Responsive: stacks on mobile (`grid-cols-1` or `grid-cols-2`)

## Implementation Details

### Props Interface

```typescript
interface Props {
  title: string;
  description: string;
  date: Date;
  slug: string;
  highlights: string[];
}
```

### Template

```astro
---
interface Props {
  title: string;
  description: string;
  date: Date;
  slug: string;
  highlights: string[];
}

const { title, description, date, slug, highlights } = Astro.props;

const formattedDate = date.toLocaleDateString("en-US", {
  year: "numeric",
  month: "long",
});
---

<a href={`/projects/${slug}`} class="group block">
  <div class="grid grid-cols-1 md:grid-cols-4 gap-2">
    <!-- Text column -->
    <div class="bg-surface rounded p-6 flex flex-col justify-center">
      <h3 class="text-xl font-bold text-heading mb-2">{title}</h3>
      <p class="text-body text-sm mb-4">{description}</p>
      <p class="text-muted text-xs">{formattedDate}</p>
    </div>
    <!-- Three highlight images -->
    {highlights.map((src) => (
      <div class="overflow-hidden rounded">
        <img
          src={src}
          alt=""
          loading="lazy"
          decoding="async"
          class="w-full h-full object-cover aspect-square group-hover:scale-105 transition-transform duration-300"
        />
      </div>
    ))}
  </div>
</a>
```

### Styling Notes

- `group` on the parent `<a>` enables `group-hover:` on child images
- `aspect-square` ensures images are square in the card
- `overflow-hidden rounded` on image containers clips the scale effect
- `transition-transform duration-300` for smooth hover animation
- On mobile (`grid-cols-1`): text block goes full width, images stack below
- Consider `md:grid-cols-4` breakpoint for the 4-column desktop layout

## Files to Create/Modify

- `src/components/ProjectCard.astro` — create the component
