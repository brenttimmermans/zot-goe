# FOUND-01: Tailwind Color Palette & Global CSS Setup

**Status:** `todo`
**Priority:** High
**Track:** Foundation
**Dependencies:** None
**Blocked by:** None

---

## Description

Configure Tailwind CSS with the project's custom neutral color palette and set up the global CSS file with Tailwind directives. The design direction is a strictly neutral palette — no pure white (`#fff`) and no pure black (`#000`). Photography is the only source of colour.

## Acceptance Criteria

- [ ] Tailwind config defines all 6 custom color tokens
- [ ] `src/styles/global.css` contains Tailwind directives (`@import "tailwindcss"`)
- [ ] Global CSS sets `bg-bg` as the default page background
- [ ] No usage of `text-black`, `text-white`, `bg-white`, or `bg-black` anywhere
- [ ] GLightbox overlay style override is added to global CSS

## Implementation Details

### Color Tokens

Add these to `tailwind.config.mjs` under `theme.extend.colors`:

```javascript
colors: {
  bg:       "#F5F4F0",   // Off-white background
  surface:  "#ECEAE4",   // Slightly darker for cards, sections
  muted:    "#B0ADA6",   // Muted text, borders, dividers
  body:     "#4A4845",   // Body text
  heading:  "#2C2A27",   // Headings, strong text
  accent:   "#6B6863",   // Hover states, secondary elements
}
```

### Usage Reference

- `bg-bg` — page background
- `bg-surface` — card/section backgrounds
- `text-heading` — headings, strong text
- `text-body` — paragraph text
- `text-muted` — secondary text, inactive nav links
- `text-accent` — hover states
- `border-muted` — borders, dividers

### Global CSS (`src/styles/global.css`)

```css
@import "tailwindcss";

/* GLightbox overlay override */
.goverlay {
  background: rgba(44, 42, 39, 0.95);
}
```

### Tailwind Config

Ensure `tailwind.config.mjs` has the correct content paths:

```javascript
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: { /* tokens above */ },
    },
  },
  plugins: [],
};
```

## Files to Create/Modify

- `tailwind.config.mjs` — add color tokens
- `src/styles/global.css` — Tailwind directives + GLightbox override
