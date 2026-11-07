import { CITY, EMAIL, OWNER, SITE_NAME, SITE_URL } from '~/config';
import { SOCIALS } from '~/constants/site';

export const STRUCTURED_DATA = {
	'@context': 'https://schema.org',
	'@graph': [
		{ '@type': 'WebSite', name: SITE_NAME, url: SITE_URL },
		{
			'@type': 'Person',
			name: OWNER,
			jobTitle: 'Fotograaf',
			email: EMAIL,
			address: {
				'@type': 'PostalAddress',
				addressLocality: CITY,
				addressCountry: 'BE',
			},
			sameAs: SOCIALS.map(({ href }) => href),
		},
	],
};
