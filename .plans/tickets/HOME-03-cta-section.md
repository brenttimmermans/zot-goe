# HOME-03: CTA Section on Home Page

**Status:** `todo`
**Priority:** Medium
**Track:** Home Page
**Dependencies:** FOUND-01, FOUND-03
**Blocked by:** FOUND-01

---

## Description

Add the call-to-action (CTA) section between the featured projects and the footer on the home page. A simple centered block encouraging visitors to get in touch.

## Acceptance Criteria

- [ ] CTA text: "Let's work together." (or similar)
- [ ] Button/link: "Get in Touch" linking to `/contact`
- [ ] Centered layout with generous vertical padding
- [ ] Uses `text-heading` for the CTA text
- [ ] Link styled as a subtle button or text link with arrow

## Implementation Details

### Template (added to `index.astro` after the featured projects section)

```html
<section class="py-20">
  <div class="max-w-7xl mx-auto px-6 text-center">
    <h2 class="text-3xl md:text-4xl font-bold text-heading mb-6">
      Let's work together.
    </h2>
    <a
      href="/contact"
      class="inline-block text-accent hover:text-heading transition-colors font-medium text-lg"
    >
      Get in Touch &rarr;
    </a>
  </div>
</section>
```

### Styling Notes

- Keep it very simple — just text and a link, no heavy styling
- Generous `py-20` for breathing room
- Could add a `border-t border-muted/20` at the top for subtle separation from the projects section
- The link can be plain text with arrow, or a bordered button — keep it minimal

## Files to Create/Modify

- `src/pages/index.astro` — add CTA section
