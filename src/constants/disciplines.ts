export enum Discipline {
	Concert = 'concert',
	Event = 'event',
	Motorsport = 'motorsport',
	Wedding = 'huwelijk',
}

export const DISCIPLINE_LABELS: Record<Discipline, string> = {
	[Discipline.Concert]: 'Concerten',
	[Discipline.Event]: 'Events',
	[Discipline.Motorsport]: 'Motorsport',
	[Discipline.Wedding]: 'Huwelijken',
};
