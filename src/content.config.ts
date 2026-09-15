import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
	loader: glob({ pattern: '**/*.yaml', base: './src/content/projects' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		date: z.coerce.date(),
		category: z.string(),
		location: z.string(),
		cover: z.string(),
		imageFolder: z.string(),
		highlights: z.array(z.string()).length(3),
		gallery: z.array(z.string()).min(1),
		credits: z
			.array(z.object({ label: z.string(), value: z.string() }))
			.optional(),
		brief: z.array(z.string()).optional(),
		featured: z.boolean().default(false),
		order: z.number().optional(),
	}),
});

export const collections = { projects };
