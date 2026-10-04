export enum Category {
	Concert = 'concert',
	Event = 'event',
	Motorsport = 'motorsport',
	Wedding = 'huwelijk',
}

export const CATEGORY_LABELS: Record<Category, string> = {
	[Category.Concert]: 'Concerten',
	[Category.Event]: 'Events',
	[Category.Motorsport]: 'Motorsport',
	[Category.Wedding]: 'Huwelijken',
};
