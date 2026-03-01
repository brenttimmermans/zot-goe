# CROSS-02: Responsive Design Pass

**Status:** `todo`
**Priority:** Medium
**Track:** Cross-cutting
**Dependencies:** All page tickets completed
**Blocked by:** HOME-04, PROJ-01, PROJ-02, PROJ-03, CONT-02

---

## Description

Perform a comprehensive responsive design review across all pages. Verify that the layout works correctly on mobile (375px), tablet (768px), and desktop (1280px+) viewports. Fix any layout issues found.

## Acceptance Criteria

- [ ] Navbar: hamburger menu works on mobile, desktop links visible on desktop
- [ ] HeroSection: stacks vertically on mobile (text top, image bottom)
- [ ] ProjectCard: stacks to 1 or 2 columns on mobile, 4 columns on desktop
- [ ] Masonry gallery: 1 column on mobile, 2 on tablet, 3 on desktop
- [ ] Contact form: full width on mobile, constrained on desktop
- [ ] Footer: readable at all sizes
- [ ] No horizontal overflow on any page at any viewport size
- [ ] Touch targets are at least 44x44px on mobile
- [ ] Text is readable without zooming on mobile

## Test Viewports

| Device | Width | Height |
|---|---|---|
| Mobile | 375px | 812px |
| Tablet | 768px | 1024px |
| Desktop | 1280px | 800px |
| Wide | 1920px | 1080px |

## Pages to Check

1. `/` (Home) — Hero, featured projects, CTA
2. `/projects` — Listing page
3. `/projects/{slug}` — Detail page with gallery
4. `/contact` — Form page

## Implementation Notes

If issues are found, fix them using Tailwind responsive prefixes (`sm:`, `md:`, `lg:`, `xl:`). Common fixes:
- Padding/margin adjustments: `px-4 md:px-6`
- Font size scaling: `text-3xl md:text-5xl`
- Grid column changes: `grid-cols-1 md:grid-cols-4`
- Hide/show elements: `hidden md:block`

## Files to Create/Modify

- Any component or page file that has responsive issues
