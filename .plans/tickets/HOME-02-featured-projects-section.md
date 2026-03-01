# HOME-02: Featured Projects Section on Home Page

**Status:** `todo`
**Priority:** High
**Track:** Home Page
**Dependencies:** FOUND-02 (content collections), FOUND-06 (ProjectCard)
**Blocked by:** FOUND-02, FOUND-06

---

## Description

Add the "Selected Work" section to the home page. This section displays 2–4 featured projects using the `ProjectCard` component, sourced from the content collection, with a "View All Projects" link below.

## Acceptance Criteria

- [ ] Section heading: "Selected Work" in `text-heading`
- [ ] Renders ProjectCard components for projects (latest by date, or all if ≤ 4)
- [ ] Cards are stacked vertically with `gap-6` spacing
- [ ] "View All Projects" link below the cards, linking to `/projects`
- [ ] Projects are sorted by date (newest first)
- [ ] Section uses semantic `<section>` element
- [ ] Consistent max-width container (`max-w-7xl mx-auto px-6`)

## Implementation Details

### Data Loading (in `index.astro` frontmatter)

```astro
---
import { getCollection } from "astro:content";
import ProjectCard from "../components/ProjectCard.astro";

const allProjects = await getCollection("projects");
const featured = allProjects
  .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime())
  .slice(0, 4);
---
```

### Template

```html
<section class="py-20">
  <div class="max-w-7xl mx-auto px-6">
    <h2 class="text-3xl font-bold text-heading mb-10">Selected Work</h2>
    <div class="flex flex-col gap-6">
      {featured.map((project) => (
        <ProjectCard
          title={project.data.title}
          description={project.data.description}
          date={project.data.date}
          slug={project.id}
          highlights={project.data.highlights}
        />
      ))}
    </div>
    <div class="mt-10 text-center">
      <a href="/projects" class="text-accent hover:text-heading transition-colors font-medium">
        View All Projects &rarr;
      </a>
    </div>
  </div>
</section>
```

### Notes

- The `slug` comes from `project.id` (the filename without extension in Astro content collections)
- If a `featured` boolean is added to the YAML schema later, filter by that instead of just taking the latest
- The arrow (`&rarr;`) is a subtle directional cue

## Files to Create/Modify

- `src/pages/index.astro` — add featured projects section
