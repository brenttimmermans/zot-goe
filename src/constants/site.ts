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
		body: 'Datum, soort shoot, locatie. Ik antwoord binnen 24 uur, meestal sneller.',
	},
	{
		no: '02',
		title: 'We bellen kort',
		body: 'Vijftien minuten om te weten wat je nodig hebt en waarvoor je de beelden gebruikt.',
	},
	{
		no: '03',
		title: 'Ik kom fotograferen',
		body: 'Discreet, meestal zonder flits. Ik loop mee, ik regisseer niet.',
	},
	{
		no: '04',
		title: 'Je krijgt je beelden',
		body: 'Bewerkte selectie in web- en drukformaat, binnen een week. Sneller kan, in overleg.',
	},
];
