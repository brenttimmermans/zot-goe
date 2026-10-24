import type { Project, ProjectPhoto } from './projects';

export interface Highlight {
	project: Project;
	photo: ProjectPhoto;
}

export const HIGHLIGHT_COUNT = 16;

const GAP_TO_COLUMN_WIDTH = 40 / 290;
const LEAD_PROJECT_ROOM = 0.75;

export function pickHighlights(
	projects: Project[],
	count: number,
): Highlight[] {
	const shownImages = new Set(projects.map(({ data }) => data.cover.src.src));
	const highlights: Highlight[] = [];

	for (const highlight of interleavePhotos(projects)) {
		if (highlights.length === count) break;
		if (shownImages.has(highlight.photo.src.src)) continue;

		shownImages.add(highlight.photo.src.src);
		highlights.push(highlight);
	}

	return highlights;
}

export function buildHighlightColumns(highlights: Highlight[]): Highlight[][] {
	const heights = [0, 0, LEAD_PROJECT_ROOM, LEAD_PROJECT_ROOM];
	const columns = heights.map((): Highlight[] => []);

	for (const highlight of highlights) {
		const shortest = heights.indexOf(Math.min(...heights));
		columns[shortest].push(highlight);
		heights[shortest] += relativeHeight(highlight.photo);
	}

	return columns;
}

function interleavePhotos(projects: Project[]): Highlight[] {
	const longest = Math.max(
		0,
		...projects.map(({ data }) => data.photos.length),
	);
	const passes = Array.from({ length: longest }, (_, pass) =>
		projects.flatMap((project) => {
			const photo = project.data.photos[pass];

			return photo ? [{ project, photo }] : [];
		}),
	);

	return passes.flat();
}

function relativeHeight({ src }: ProjectPhoto): number {
	return src.height / src.width + GAP_TO_COLUMN_WIDTH;
}
