# FOUND-05: Footer Component

**Status:** `todo`
**Priority:** High
**Track:** Foundation
**Dependencies:** FOUND-01 (Tailwind colors)
**Blocked by:** FOUND-01

---

## Description

Create a minimal `Footer.astro` component with a copyright line. The footer should be simple and unobtrusive, using the muted color for text.

## Acceptance Criteria

- [ ] `src/components/Footer.astro` exists
- [ ] Displays `© {currentYear} Zot Goe. All rights reserved.`
- [ ] Current year is dynamically generated (not hardcoded)
- [ ] Uses `text-muted` for text color
- [ ] Centered text with minimal padding
- [ ] Uses semantic `<footer>` element
- [ ] Optional: row of social icon links (can be empty placeholder for now)

## Implementation Details

```astro
---
const currentYear = new Date().getFullYear();
---

<footer class="py-8 text-center text-muted text-sm">
  <div class="max-w-7xl mx-auto px-6">
    <p>&copy; {currentYear} Zot Goe. All rights reserved.</p>
  </div>
</footer>
```

### Styling Notes

- Keep it minimal: just padding, centered text, muted color
- Use `border-t border-muted/20` if a subtle top border is desired
- `text-sm` for a small, unobtrusive footer

## Files to Create/Modify

- `src/components/Footer.astro` — create the component
