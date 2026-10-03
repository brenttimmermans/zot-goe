const MONTH_YEAR = new Intl.DateTimeFormat('nl-BE', {
	month: 'long',
	year: 'numeric',
	timeZone: 'UTC',
});

export function formatMonthYear(date: Date): string {
	return MONTH_YEAR.format(date);
}

export function formatYear(date: Date): string {
	return String(date.getUTCFullYear());
}
