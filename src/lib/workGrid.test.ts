import { describe, expect, it } from 'vitest';
import { getWorkSlots, type WorkSlot } from './workGrid';

describe(getWorkSlots, () => {
	it('should return no slots for no cards', () => {
		expect(getWorkSlots(0)).toEqual([]);
	});

	it('should centre a single card', () => {
		expect(getWorkSlots(1)).toEqual([CENTRED]);
	});

	it('should start with a wide card followed by a narrow one', () => {
		expect(getWorkSlots(2)).toEqual([WIDE, NARROW]);
	});

	it('should centre the last card when the count is odd', () => {
		expect(getWorkSlots(5)).toEqual([WIDE, NARROW, NARROW, WIDE, CENTRED]);
	});

	it('should fill one full pattern with six cards', () => {
		expect(getWorkSlots(6)).toEqual([WIDE, NARROW, NARROW, WIDE, HALF, HALF]);
	});

	it('should centre a seventh card after a full pattern', () => {
		expect(getWorkSlots(7)).toEqual([
			WIDE,
			NARROW,
			NARROW,
			WIDE,
			HALF,
			HALF,
			CENTRED,
		]);
	});

	it('should repeat the pattern every six cards', () => {
		const slots = getWorkSlots(12);

		expect(slots.slice(6)).toEqual(slots.slice(0, 6));
	});
});

const WIDE: WorkSlot = { span: 8, height: 'tall' };
const NARROW: WorkSlot = { span: 4, height: 'tall' };
const HALF: WorkSlot = { span: 6, height: 'short' };
const CENTRED: WorkSlot = { span: 8, height: 'tall', centred: true };
