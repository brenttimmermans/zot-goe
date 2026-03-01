# HOME-04: Home Page Assembly & SEO

**Status:** `todo`
**Priority:** High
**Track:** Home Page
**Dependencies:** HOME-01, HOME-02, HOME-03, FOUND-03
**Blocked by:** HOME-01, HOME-02, HOME-03

---

## Description

Assemble the complete `index.astro` home page, combining the HeroSection, featured projects section, and CTA section within BaseLayout. Add page-specific SEO meta tags and JSON-LD structured data.

## Acceptance Criteria

- [ ] `src/pages/index.astro` renders HeroSection, Featured Projects, and CTA in order
- [ ] Wrapped in `BaseLayout` with appropriate title and description
- [ ] JSON-LD structured data: `WebSite` + `Person` schema
- [ ] Page title: "Home | Zot Goe Photography"
- [ ] Meta description is relevant to the portfolio
- [ ] Open Graph image set to `/images/hero.jpg`
- [ ] Page builds successfully with `npm run build`

## Implementation Details

### Complete Page Structure

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
import HeroSection from "../components/HeroSection.astro";
import ProjectCard from "../components/ProjectCard.astro";
import { getCollection } from "astro:content";

const allProjects = await getCollection("projects");
const featured = allProjects
  .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime())
  .slice(0, 4);

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "name": "Zot Goe Photography",
      "url": "https://zotgoe.be",
    },
    {
      "@type": "Person",
      "name": "Zot Goe",
      "url": "https://zotgoe.be",
      "jobTitle": "Photographer",
    },
  ],
};
---

<BaseLayout
  title="Home"
  description="Zot Goe — a photography portfolio capturing the unseen."
  structuredData={structuredData}
>
  <HeroSection />

  <!-- Featured Projects -->
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

  <!-- CTA -->
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
</BaseLayout>
```

## Files to Create/Modify

- `src/pages/index.astro` — complete assembly of the home page
