# Code Style Guide

## Naming Conventions

### Files & Directories

| Type            | Pattern    | Example                                        |
| --------------- | ---------- | ---------------------------------------------- |
| **Pages**       | PascalCase | `index.astro`, `contact.astro`, `[slug].astro` |
| **Components**  | PascalCase | `Navbar.astro`, `ProjectCard.astro`            |
| **Layouts**     | PascalCase | `BaseLayout.astro`                             |
| **Styles**      | kebab-case | `global.css`, `fonts.css`                      |
| **Content**     | kebab-case | `spa-24-001.yaml`                              |
| **Directories** | lowercase  | `components/`, `pages/`, `layouts/`            |

### Variables & Functions

```typescript
// Constants: UPPER_SNAKE_CASE
const MAX_FEATURED_PROJECTS = 4;

// Variables: camelCase
const allProjects = await getCollection("projects");
const formattedDate = date.toLocaleDateString("en-US", {...});

// Functions: camelCase
function isActive(href: string): boolean { ... }

// Component Props: PascalCase (interface)
interface Props {
  title: string;
  description: string;
  date: Date;
}
```

### CSS Classes

```html
<!-- Tailwind utility classes: lowercase with hyphens -->
<div class="max-w-7xl mx-auto px-6 py-20">
  <h1 class="text-4xl font-bold text-heading mb-12">Title</h1>
</div>

<!-- Custom theme colors: lowercase -->
<div class="bg-bg text-heading border-muted"></div>
```

## File Organization

### Astro Component Structure

```astro
---
// 1. Imports (Astro, components, utilities)
import BaseLayout from "../layouts/BaseLayout.astro";
import { getCollection } from "astro:content";

// 2. Type definitions
interface Props {
  title: string;
  description: string;
}

// 3. Component logic
const { title, description } = Astro.props;
const projects = await getCollection("projects");

// 4. Computed values
const sorted = projects.sort((a, b) =>
  new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
);
---

<!-- 5. HTML template -->
<BaseLayout title={title}>
  <h1>{title}</h1>
  <p>{description}</p>
</BaseLayout>
```

### Content Schema (TypeScript)

```typescript
// src/content/config.ts
import { defineCollection, z } from "astro:content";

const projects = defineCollection({
  type: "data",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    // ... other fields
  }),
});

export const collections = { projects };
```

## Import Style

```typescript
// 1. Astro imports
import { getCollection, type CollectionEntry } from "astro:content";

// 2. Component imports (relative paths)
import BaseLayout from "../layouts/BaseLayout.astro";
import ProjectCard from "../components/ProjectCard.astro";

// 3. Type imports
import type { Props } from "./types";

// 4. External library imports
import GLightbox from "glightbox";
import "glightbox/dist/css/glightbox.min.css";
```

## Code Patterns

### Conditional Rendering

```astro
<!-- If/else in template -->
{success ? (
  <div class="bg-surface rounded p-8">
    <h2>Message sent!</h2>
  </div>
) : (
  <ContactForm />
)}

<!-- Map with index -->
{featured.map((project, index) => (
  <ProjectCard
    title={project.data.title}
    textPositionIndex={index === 1 ? 2 : 0}
  />
))}
```

### Sorting & Filtering

```typescript
// Sort by date (newest first)
const sorted = allProjects.sort(
  (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime(),
);

// Slice for featured (first 4)
const featured = sorted.slice(0, 4);

// Type-safe collection entries
const allProjects: CollectionEntry<"projects">[] = await getCollection("projects");
```

### Dynamic Routes

```typescript
// In [slug].astro
export async function getStaticPaths() {
  const projects = await getCollection("projects");
  return projects.map((project) => ({
    params: { slug: project.id },
    props: { project },
  }));
}

const { project } = Astro.props as { project: CollectionEntry<"projects"> };
```

### Structured Data (JSON-LD)

```typescript
const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Zot Goe Photography",
  url: "https://zotgoe.be",
};
```

Then in template:

```astro
{structuredData && (
  <script type="application/ld+json" set:html={JSON.stringify(structuredData)} />
)}
```

### Form Handling

```astro
<form action="https://api.web3forms.com/submit" method="POST" class="space-y-6">
  <input type="hidden" name="access_key" value="YOUR_KEY" />
  <input type="hidden" name="redirect" value="/contact?success=true" />
  <input type="checkbox" name="botcheck" class="hidden" style="display:none" />

  <div>
    <label for="name" class="block text-sm font-medium text-heading mb-2">
      Name
    </label>
    <input
      type="text"
      id="name"
      name="name"
      required
      autocomplete="name"
      placeholder="Your name"
      class="w-full px-4 py-3 bg-surface border border-muted/30 rounded"
    />
  </div>
</form>
```

### Image Optimization

```astro
<!-- Hero/critical images: eager loading -->
<img
  src="/images/hero.png"
  alt="Featured photography"
  loading="eager"
  decoding="async"
  class="w-full h-auto"
/>

<!-- Gallery/non-critical: lazy loading -->
<img
  src={src}
  alt={`${title} photo`}
  loading="lazy"
  decoding="async"
  class="w-full rounded"
/>
```

### Active Link Detection

```typescript
function isActive(href: string): boolean {
  if (href === "/") return currentPath === "/";
  return currentPath.startsWith(href);
}
```

Then in template:

```astro
<a
  href={link.href}
  class={isActive(link.href)
    ? `${baseLinkClass} text-heading font-medium`
    : `${baseLinkClass} text-muted hover:text-accent`
  }
>
  {link.label}
</a>
```

## Styling Patterns

### Tailwind Classes

```astro
<!-- Layout -->
<div class="max-w-7xl mx-auto px-6 py-20">

<!-- Typography -->
<h1 class="text-4xl md:text-5xl font-bold text-heading mb-4">

<!-- Spacing -->
<div class="flex flex-col gap-6">

<!-- Responsive -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

<!-- Hover/transitions -->
<a class="text-accent hover:text-heading transition-colors">

<!-- Focus states (auto-applied in global.css) -->
<!-- All interactive elements get focus-visible outline -->
```

### Custom CSS

```css
/* src/styles/global.css */
@import "tailwindcss";
@import "./fonts.css";

@theme {
  --color-bg: #f5f4f0;
  --color-surface: #eceae4;
  --color-muted: #b0ada6;
  --color-body: #4a4845;
  --color-heading: #2c2a27;
  --color-accent: #6b6863;
}

@layer base {
  body {
    @apply bg-bg text-body;
    font-family: "Montserrat Variable", sans-serif;
  }
}
```

## Accessibility

### Semantic HTML

```astro
<!-- Use semantic elements -->
<nav>Navigation</nav>
<main id="main-content">Content</main>
<section>Section</section>
<article>Article</article>
<footer>Footer</footer>

<!-- Skip to content link (always included) -->
<a href="#main-content" class="sr-only focus:not-sr-only">
  Skip to content
</a>
```

### ARIA & Labels

```astro
<!-- Always use labels for form inputs -->
<label for="name" class="block text-sm font-medium">Name</label>
<input id="name" name="name" required />

<!-- Alt text for images -->
<img src="photo.jpg" alt="Descriptive text" />

<!-- Gallery descriptions -->
<a href={src} data-description={`Image ${i + 1}`}>
  <img alt={`${title} photo ${i + 1}`} />
</a>
```

### Focus Management

```css
/* Global focus styles (in global.css) */
:where(a, button, input, textarea, select, summary) {
  @apply focus-visible:outline focus-visible:outline-2 
         focus-visible:outline-offset-2 focus-visible:outline-accent;
}
```

## Do's and Don'ts

### ✅ Do

- Use TypeScript strict mode (enforced in `tsconfig.json`)
- Type component props with interfaces
- Use `type` keyword for type imports
- Organize imports: Astro → components → utilities → external
- Use Tailwind utilities instead of custom CSS when possible
- Add `alt` text to all images
- Include `loading="lazy"` for non-critical images
- Use semantic HTML elements
- Add structured data (JSON-LD) to pages
- Sort projects by date (newest first)
- Use `z.coerce.date()` for date fields in schemas

### ❌ Don't

- Use `any` type (strict mode prevents this)
- Mix CSS-in-JS with Tailwind
- Hardcode colors (use theme variables)
- Forget `alt` text on images
- Use `loading="eager"` on all images (performance)
- Nest too deeply in Tailwind classes
- Skip focus states
- Use `<div>` for navigation/sections (use semantic elements)
- Commit without running lint/format (Husky prevents this)
- Hardcode Web3Forms API key in repo (use environment variable)

## Linting & Formatting

### Pre-commit

Husky automatically runs on `git commit`:

```bash
# Staged .astro and .ts files
npm run lint    # Oxlint
npm run format  # Oxfmt

# Staged .json, .css, .md, .yaml, .yml files
npm run format  # Oxfmt
```

### Manual

```bash
npm run lint      # Check all files
npm run format    # Format all files
npm run lint -- --fix  # Auto-fix (if supported)
```

### Configuration

- **Oxlint**: `.oxlintrc.json` (default rules)
- **Oxfmt**: `.oxfmtrc.json` (default rules)

## TypeScript

### Strict Mode

Project uses `astro/tsconfigs/strict`:

```json
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"]
}
```

### Type Patterns

```typescript
// Collection entries
const projects: CollectionEntry<"projects">[] = await getCollection("projects");

// Component props
interface Props {
  title: string;
  description: string;
  date: Date;
  slug: string;
  highlights: string[];
  textPositionIndex?: 0 | 1 | 2 | 3;
}

// Type guards
const { project } = Astro.props as { project: CollectionEntry<"projects"> };
```
