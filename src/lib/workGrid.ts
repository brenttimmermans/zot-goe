export interface WorkSlot {
	span: 4 | 6 | 8;
	height: 'tall' | 'short';
	centred?: boolean;
}

const SLOT_PATTERN: WorkSlot[] = [
	{ span: 8, height: 'tall' },
	{ span: 4, height: 'tall' },
	{ span: 4, height: 'tall' },
	{ span: 8, height: 'tall' },
	{ span: 6, height: 'short' },
	{ span: 6, height: 'short' },
];

const CENTRED_SLOT: WorkSlot = { span: 8, height: 'tall', centred: true };

export function getWorkSlots(count: number): WorkSlot[] {
	const slots = Array.from({ length: count }, (_, index) => ({
		...SLOT_PATTERN[index % SLOT_PATTERN.length],
	}));
	// Every row is a pair, so an odd card out would leave half a row empty.
	if (count % 2 === 1) slots[count - 1] = { ...CENTRED_SLOT };

	return slots;
}
