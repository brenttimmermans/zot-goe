import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { Category } from '~/constants/categories';

const projects = defineCollection({
	loader: glob({ pattern: '*/index.yaml', base: './src/content/projects' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			category: z.enum(Category),
			kind: z.string(),
			date: z.coerce.date(),
			location: z.string(),
			summary: z.string(),
			featured: z.number().int().positive().optional(),
			story: z.array(z.string()).min(1).max(3),
			cover: z.object({ src: image(), alt: z.string() }),
			photos: z
				.array(z.object({ src: image(), alt: z.string().optional() }))
				.min(1),
		}),
});

export const collections = { projects };
