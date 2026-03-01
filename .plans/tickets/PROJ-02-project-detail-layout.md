# PROJ-02: Project Detail Page — Layout & Header

**Status:** `todo`
**Priority:** High
**Track:** Projects
**Dependencies:** FOUND-02 (content collections), FOUND-03 (BaseLayout)
**Blocked by:** FOUND-02, FOUND-03

---

## Description

Create the dynamic project detail page at `/projects/[slug]`. This ticket covers the page routing, data loading, and header section (title, description, date, back link). The gallery section is handled in PROJ-03.

## Acceptance Criteria

- [ ] `src/pages/projects/[slug].astro` exists
- [ ] Uses `getStaticPaths()` to generate routes for all projects
- [ ] Displays project title in large heading (`text-heading`)
- [ ] Displays project description in `text-body`
- [ ] Displays formatted date (e.g., "June 2025") in `text-muted`
- [ ] "Back to Projects" link at the top, linking to `/projects`
- [ ] Wrapped in `BaseLayout` with project-specific SEO meta tags
- [ ] Page builds successfully for all projects in the collection

## Implementation Details

### Page Template

```astro
---
import BaseLayout from "../../layouts/BaseLayout.astro";
import { getCollection } from "astro:content";

export async function getStaticPaths() {
  const projects = await getCollection("projects");
  return projects.map((project) => ({
    params: { slug: project.id },
    props: { project },
  }));
}

const { project } = Astro.props;
const { title, description, date, gallery, cover } = project.data;

const formattedDate = date.toLocaleDateString("en-US", {
  year: "numeric",
  month: "long",
});

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ImageGallery",
  "name": title,
  "description": description,
  "dateCreated": date.toISOString().split("T")[0],
  "author": {
    "@type": "Person",
    "name": "Zot Goe",
  },
  "image": gallery.map((src: string) => ({
    "@type": "ImageObject",
    "contentUrl": `https://zotgoe.be${src}`,
  })),
};
---

<BaseLayout
  title={title}
  description={description}
  ogImage={cover}
  structuredData={structuredData}
>
  <section class="py-20">
    <div class="max-w-7xl mx-auto px-6">
      <!-- Back link -->
      <a href="/projects" class="text-muted hover:text-accent transition-colors text-sm mb-8 inline-block">
        &larr; Back to Projects
      </a>

      <!-- Project header -->
      <header class="mb-12">
        <h1 class="text-4xl md:text-5xl font-bold text-heading mb-4">{title}</h1>
        <p class="text-body text-lg max-w-2xl mb-2">{description}</p>
        <p class="text-muted text-sm">{formattedDate}</p>
      </header>

      <!-- Gallery goes here (PROJ-03) -->
      <slot />
    </div>
  </section>
</BaseLayout>
```

### Notes

- `getStaticPaths` generates one page per YAML file in the `projects` collection
- The `project.id` gives the filename without extension, used as the slug
- `cover` is used as the `ogImage` for social sharing
- The gallery section will be added inline in this same file by PROJ-03 (not as a slot — the slot reference above is just a placeholder to indicate where it goes)

## Files to Create/Modify

- `src/pages/projects/[slug].astro` — create the dynamic detail page
