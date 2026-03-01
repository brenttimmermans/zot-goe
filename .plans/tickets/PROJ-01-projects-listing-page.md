# PROJ-01: Projects Listing Page

**Status:** `todo`
**Priority:** High
**Track:** Projects
**Dependencies:** FOUND-02 (content collections), FOUND-03 (BaseLayout), FOUND-06 (ProjectCard)
**Blocked by:** FOUND-02, FOUND-03, FOUND-06

---

## Description

Build the projects listing page at `/projects`. This page displays all projects as vertically stacked `ProjectCard` components, sorted by date (newest first).

## Acceptance Criteria

- [ ] `src/pages/projects/index.astro` exists
- [ ] Displays all projects from the content collection
- [ ] Sorted by date, newest first
- [ ] Uses `ProjectCard` component for each project
- [ ] Cards are stacked vertically with `gap-6` spacing
- [ ] Page heading: "Projects"
- [ ] Wrapped in `BaseLayout` with appropriate SEO
- [ ] Each card links to `/projects/{slug}`

## Implementation Details

### Page Template

```astro
---
import BaseLayout from "../../layouts/BaseLayout.astro";
import ProjectCard from "../../components/ProjectCard.astro";
import { getCollection } from "astro:content";

const allProjects = await getCollection("projects");
const sorted = allProjects.sort(
  (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
);

const structuredData = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Projects — Zot Goe Photography",
  "description": "Browse all photography projects by Zot Goe.",
  "url": "https://zotgoe.be/projects",
};
---

<BaseLayout
  title="Projects"
  description="Browse all photography projects by Zot Goe."
  structuredData={structuredData}
>
  <section class="py-20">
    <div class="max-w-7xl mx-auto px-6">
      <h1 class="text-4xl font-bold text-heading mb-12">Projects</h1>
      <div class="flex flex-col gap-6">
        {sorted.map((project) => (
          <ProjectCard
            title={project.data.title}
            description={project.data.description}
            date={project.data.date}
            slug={project.id}
            highlights={project.data.highlights}
          />
        ))}
      </div>
    </div>
  </section>
</BaseLayout>
```

### Notes

- The `slug` is derived from `project.id` which is the YAML filename without extension
- `max-w-7xl mx-auto px-6` for consistent site-wide container width
- The heading uses `mb-12` for generous spacing before the cards

## Files to Create/Modify

- `src/pages/projects/index.astro` — create the projects listing page
