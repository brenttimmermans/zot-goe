// @ts-check

import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, envField } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://zotgoe.be',
	integrations: [sitemap()],
	env: {
		schema: {
			PUBLIC_WEB3FORMS_KEY: envField.string({
				context: 'client',
				access: 'public',
				optional: true,
			}),
		},
	},
	vite: {
		plugins: [tailwindcss()],
	},
});
