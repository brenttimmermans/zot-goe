import type { PROJECT_CARD_COLUMNS } from "../constants/project";

/**
 * Valid positions for the text/description card within a ProjectCard grid.
 * 0-indexed: position 0 = first column, up to PROJECT_CARD_COLUMNS - 1 = last column.
 *
 * e.g. with PROJECT_CARD_COLUMNS = 4, this resolves to: 0 | 1 | 2 | 3
 */
type BuildUnion<
	N extends number,
	Acc extends number[] = [],
> = Acc["length"] extends N
	? Acc[number]
	: BuildUnion<N, [...Acc, Acc["length"]]>;

export type CardTextPosition = BuildUnion<typeof PROJECT_CARD_COLUMNS>;
