// @ts-check

import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import { ENV_SCHEMA } from './src/env';

// https://astro.build/config
export default defineConfig({
	site: 'https://zotgoe.be',
	integrations: [
		sitemap({ filter: (page) => !page.includes('/contact/bedankt') }),
	],
	prefetch: { prefetchAll: true, defaultStrategy: 'viewport' },
	env: {
		schema: ENV_SCHEMA,
	},
	vite: {
		plugins: [tailwindcss()],
	},
});
