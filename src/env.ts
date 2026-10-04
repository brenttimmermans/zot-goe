import { envField } from 'astro/config';

export const ENV_SCHEMA = {
	PUBLIC_WEB3FORMS_KEY: envField.string({
		context: 'client',
		access: 'public',
		optional: true,
	}),
};
