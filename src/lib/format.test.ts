import { describe, expect, it } from 'vitest';
import { formatMonthYear, formatYear } from './format';

describe(formatMonthYear, () => {
	it('should format the month in lowercase Dutch with the year', () => {
		expect(formatMonthYear(new Date('2025-04-10'))).toBe('april 2025');
	});

	it('should read YAML dates in UTC so midnight stays on the same day', () => {
		expect(formatMonthYear(new Date('2026-03-01T00:00:00Z'))).toBe(
			'maart 2026',
		);
		expect(formatMonthYear(new Date('2025-12-31T23:30:00Z'))).toBe(
			'december 2025',
		);
	});
});

describe(formatYear, () => {
	it('should return the four-digit year', () => {
		expect(formatYear(new Date('2025-04-10'))).toBe('2025');
	});

	it('should use the UTC year at a year boundary', () => {
		expect(formatYear(new Date('2025-12-31T23:30:00Z'))).toBe('2025');
	});
});
