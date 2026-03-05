# Code Style

## Naming Conventions

- Components: PascalCase file names and identifiers (e.g., `src/components/ProjectCard.astro`).
- Pages/routes: lowercase paths, with dynamic segments in brackets (e.g., `src/pages/projects/[slug].astro`).
- Content entries: kebab-case filenames (e.g., `src/content/projects/spa-24-001.yaml`).
- Content keys: lower camelCase (e.g., `imageFolder`, `highlights`).
- CSS tokens: `--color-*` in `src/styles/global.css` and Tailwind token classes (`bg-bg`, `text-body`).

## File Organization

- Routes in `src/pages/` using Astro page frontmatter + template markup.
- Shared layout in `src/layouts/BaseLayout.astro`.
- Reusable UI in `src/components/`.
- Content collection schema in `src/content/config.ts`.
- Content data in `src/content/projects/*.yaml`.
- Styles in `src/styles/` with Tailwind imports and font-face definitions.

## Import Style

- Astro pages/components use ES module imports at top of frontmatter.
- Imports are relative within `src/` (e.g., `../components/HeroSection.astro`).
- Type-only imports are used for content entries (`type CollectionEntry`).

## Code Patterns

- Astro frontmatter (`---`) defines data loading and helper values.
- Content loading via `getCollection("projects")` in pages.
- Sort by date descending using `new Date(...).getTime()`.
- Structured data JSON-LD built as plain objects and injected in `BaseLayout`.
- Lightbox initialized in module script in `src/pages/projects/[slug].astro`.
- Tailwind utility classes used directly in templates, with minimal custom CSS.

## Error Handling

- No explicit try/catch in pages; errors from Astro content loading propagate.
- Content schema validation enforced by `zod` in `src/content/config.ts`.

## Logging

- No logging patterns present in the codebase.

## Testing

- No test files or test configuration found.

## Do's and Don'ts

- Do use plain `<img>` tags (not Astro `<Image>`) for `public/images/*` assets.
- Do add `loading="lazy"` and `decoding="async"` to images, except hero images use `loading="eager"`.
- Do keep colors in the defined palette (`bg-bg`, `text-heading`, etc.).
- Don't use pure white `#fff` or pure black `#000`.
- Don't add non-token colors without updating `tailwind.config.mjs` and `src/styles/global.css`.
- Don't add new content fields without updating `src/content/config.ts`.
