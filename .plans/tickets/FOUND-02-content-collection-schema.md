# FOUND-02: Content Collection Schema & Sample Project Data

**Status:** `todo`
**Priority:** High
**Track:** Foundation
**Dependencies:** None
**Blocked by:** None

---

## Description

Set up Astro's content collections for project data. Create the schema definition in `src/content/config.ts` and add two sample project YAML files with placeholder data. Also create the corresponding image folder structure in `public/images/projects/`.

## Acceptance Criteria

- [ ] `src/content/config.ts` exists with a `projects` collection using type `"data"`
- [ ] Schema validates: `title`, `description`, `date`, `cover`, `imageFolder`, `highlights` (exactly 3), `gallery` (min 1)
- [ ] Two sample YAML files exist: `spa-24-001.yaml` and `spa-24-002.yaml`
- [ ] Corresponding image folders exist in `public/images/projects/`
- [ ] Placeholder images exist (can be simple colored rectangles or any test images)
- [ ] `npm run build` succeeds with the content collection

## Implementation Details

### Schema (`src/content/config.ts`)

```typescript
import { defineCollection, z } from "astro:content";

const projects = defineCollection({
  type: "data",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    cover: z.string(),
    imageFolder: z.string(),
    highlights: z.array(z.string()).length(3),
    gallery: z.array(z.string()).min(1),
  }),
});

export const collections = { projects };
```

### Sample YAML (`src/content/projects/urban-decay.yaml`)

```yaml
title: "Urban Decay"
description: "Abandoned industrial spaces reclaimed by nature across Northern Europe."
date: 2025-06-15
cover: "/images/projects/urban-decay/highlight-1.jpg"
imageFolder: "urban-decay"
highlights:
  - "/images/projects/urban-decay/highlight-1.jpg"
  - "/images/projects/urban-decay/highlight-2.jpg"
  - "/images/projects/urban-decay/highlight-3.jpg"
gallery:
  - "/images/projects/urban-decay/gallery-01.jpg"
  - "/images/projects/urban-decay/gallery-02.jpg"
  - "/images/projects/urban-decay/gallery-03.jpg"
  - "/images/projects/urban-decay/gallery-04.jpg"
  - "/images/projects/urban-decay/gallery-05.jpg"
```

### Sample YAML (`src/content/projects/coastal-light.yaml`)

```yaml
title: "Coastal Light"
description: "The interplay of light and water along Europe's Atlantic coastline."
date: 2025-03-20
cover: "/images/projects/coastal-light/highlight-1.jpg"
imageFolder: "coastal-light"
highlights:
  - "/images/projects/coastal-light/highlight-1.jpg"
  - "/images/projects/coastal-light/highlight-2.jpg"
  - "/images/projects/coastal-light/highlight-3.jpg"
gallery:
  - "/images/projects/coastal-light/gallery-01.jpg"
  - "/images/projects/coastal-light/gallery-02.jpg"
  - "/images/projects/coastal-light/gallery-03.jpg"
```

## Files to Create/Modify

- `src/content/config.ts` — collection schema
