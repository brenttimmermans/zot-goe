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
