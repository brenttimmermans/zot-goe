# CROSS-03: Accessibility Audit

**Status:** `todo`
**Priority:** Medium
**Track:** Cross-cutting
**Dependencies:** All page tickets completed
**Blocked by:** HOME-04, PROJ-01, PROJ-02, CONT-02

---

## Description

Review all pages and components for accessibility compliance. Ensure semantic HTML, keyboard navigation, ARIA attributes, color contrast, and screen reader support are all in order.

## Acceptance Criteria

- [ ] All pages use semantic HTML elements (`<main>`, `<nav>`, `<section>`, `<article>`, `<header>`, `<footer>`)
- [ ] All images have `alt` attributes (meaningful where possible, empty `alt=""` for purely decorative)
- [ ] All form inputs have associated `<label>` elements
- [ ] Keyboard navigation works: Tab through all interactive elements, Enter/Space to activate
- [ ] Focus styles are visible on all interactive elements
- [ ] Skip-to-content link exists (optional but recommended)
- [ ] Color contrast between text and backgrounds meets WCAG AA (4.5:1 for normal text)
- [ ] Mobile hamburger menu is keyboard accessible and has `aria-label`
- [ ] GLightbox is keyboard navigable (arrow keys, Escape to close)
- [ ] No `tabindex` values greater than 0

## Color Contrast Check

Verify these combinations against WCAG AA (4.5:1 ratio):

| Foreground | Background | Usage |
|---|---|---|
| `#4A4845` (body) | `#F5F4F0` (bg) | Body text on page background |
| `#2C2A27` (heading) | `#F5F4F0` (bg) | Headings on page background |
| `#B0ADA6` (muted) | `#F5F4F0` (bg) | Muted text — may need checking |
| `#4A4845` (body) | `#ECEAE4` (surface) | Text on cards |
| `#2C2A27` (heading) | `#ECEAE4` (surface) | Headings on cards |

**Note:** `#B0ADA6` (muted) on `#F5F4F0` (bg) may have insufficient contrast. If it fails, only use `text-muted` for non-essential decorative text, not for critical information.

## Semantic HTML Checklist

- [ ] `<nav>` wraps navigation
- [ ] `<main>` wraps primary content (one per page)
- [ ] `<footer>` wraps the footer
- [ ] `<header>` wraps the project header on detail pages
- [ ] `<section>` wraps distinct content sections (hero, projects, CTA)
- [ ] `<h1>` used once per page, heading hierarchy is logical (h1 > h2 > h3)

## Files to Create/Modify

- Any component or page file that needs accessibility improvements
