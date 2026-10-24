import type { NavLink, ProcessStep, Social } from '../types/site';

export const NAV_LINKS: NavLink[] = [
	{ label: 'Werk', href: '/werk' },
	{ label: 'Over', href: '/over' },
	{ label: 'Contact', href: '/contact' },
];

export const SOCIALS: Social[] = [
	{ label: 'Instagram', href: 'https://instagram.com/zotgoe' },
];

export const PROCESS_STEPS: ProcessStep[] = [
	{
		no: '01',
		title: 'Je stuurt een bericht',
		body: 'Datum, soort shoot, locatie. Ik antwoord binnen 24 uur.',
	},
	{
		no: '02',
		title: 'We bellen kort',
		body: 'Een kwartiertje om te horen wat je nodig hebt en waarvoor je de beelden gebruikt.',
	},
	{
		no: '03',
		title: 'Ik kom fotograferen',
		body: 'Ik loop discreet mee en regisseer niet.',
	},
	{
		no: '04',
		title: 'Je krijgt je beelden',
		body: 'Bewerkte selectie in hoge resolutie, binnen een week. Sneller kan, in overleg.',
	},
];
