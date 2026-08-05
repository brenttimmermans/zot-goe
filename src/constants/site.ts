export interface NavLink {
	label: string;
	href: string;
}

export const NAV_LINKS: NavLink[] = [
	{ label: 'Werk', href: '/projects' },
	{ label: 'Over', href: '/about' },
	{ label: 'Contact', href: '/contact' },
];

export interface Social {
	label: string;
	href: string;
}

export const SOCIALS: Social[] = [
	{ label: 'Instagram · @zotgoe', href: 'https://instagram.com/zotgoe' },
	{ label: 'LinkedIn', href: 'https://www.linkedin.com/' },
];

export interface ProcessStep {
	no: string;
	title: string;
	body: string;
}

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

export const CONTACT_HINT =
	'Datum · Soort shoot · Locatie · Waarvoor je de beelden gaat gebruiken';
