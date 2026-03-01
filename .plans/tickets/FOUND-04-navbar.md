# FOUND-04: Navbar Component

**Status:** `todo`
**Priority:** High
**Track:** Foundation
**Dependencies:** FOUND-01 (Tailwind colors)
**Blocked by:** FOUND-01

---

## Description

Build the `Navbar.astro` component with the "Zot Goe" wordmark on the left and three navigation links (Home, Projects, Contact) on the right. The navbar should be sticky, use active link highlighting based on the current path, and include a mobile hamburger menu.

## Acceptance Criteria

- [ ] `src/components/Navbar.astro` exists
- [ ] Left side: "Zot Goe" wordmark linking to `/`
- [ ] Right side: Home (`/`), Projects (`/projects`), Contact (`/contact`) links
- [ ] Active link uses `text-heading`, inactive uses `text-muted`
- [ ] Sticky positioning (`sticky top-0`)
- [ ] Mobile: hamburger menu icon that toggles a dropdown/slide-in menu
- [ ] Uses semantic `<nav>` element
- [ ] No pure black or pure white colors

## Implementation Details

### Active Link Detection

Use `Astro.url.pathname` to determine the current page:

```astro
---
const currentPath = Astro.url.pathname;

const links = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

function isActive(href: string): boolean {
  if (href === "/") return currentPath === "/";
  return currentPath.startsWith(href);
}
---
```

### Desktop Layout

```html
<nav class="sticky top-0 z-50 bg-bg/80 backdrop-blur-sm">
  <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
    <a href="/" class="text-xl font-bold text-heading">Zot Goe</a>
    <div class="hidden md:flex items-center gap-8">
      {links.map((link) => (
        <a
          href={link.href}
          class={isActive(link.href) ? "text-heading font-medium" : "text-muted hover:text-accent transition-colors"}
        >
          {link.label}
        </a>
      ))}
    </div>
    <!-- Mobile hamburger button -->
    <button class="md:hidden text-heading" id="menu-toggle" aria-label="Toggle menu">
      <!-- hamburger icon SVG -->
    </button>
  </div>
  <!-- Mobile menu (hidden by default) -->
  <div class="md:hidden hidden" id="mobile-menu">
    <!-- mobile nav links -->
  </div>
</nav>
```

### Mobile Menu

The mobile menu needs a small `<script>` tag for toggling visibility:

```html
<script>
  const toggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("mobile-menu");
  toggle?.addEventListener("click", () => {
    menu?.classList.toggle("hidden");
  });
</script>
```

### Styling Notes

- Use `bg-bg/80 backdrop-blur-sm` for a semi-transparent sticky effect
- Keep the nav minimal — no heavy borders or shadows
- Use `max-w-7xl mx-auto px-6` for consistent page width
- Transition colors on hover: `hover:text-accent transition-colors`

## Files to Create/Modify

- `src/components/Navbar.astro` — create the component
