import type { Project, ProjectPhoto } from './projects';

export interface Highlight {
	project: Project;
	photo: ProjectPhoto;
}

const GAP_TO_COLUMN_WIDTH = 40 / 290;
const COLUMN_HEIGHT_RATIOS = [5.3, 5.3, 4.5, 4.5];

export function pickHighlights(projects: Project[]): Highlight[] {
	const shownImages = new Set(projects.map(({ data }) => data.cover.src.src));
	const highlights: Highlight[] = [];

	for (const highlight of interleavePhotos(projects)) {
		if (shownImages.has(highlight.photo.src.src)) continue;

		shownImages.add(highlight.photo.src.src);
		highlights.push(highlight);
	}

	return highlights;
}

export function buildHighlightColumns(highlights: Highlight[]): Highlight[][] {
	const room = [...COLUMN_HEIGHT_RATIOS];
	const columns = room.map((): Highlight[] => []);

	for (const highlight of highlights) {
		const height = relativeHeight(highlight.photo);
		const roomiest = room.indexOf(Math.max(...room));
		if (room[roomiest] < height) continue;

		columns[roomiest].push(highlight);
		room[roomiest] -= height;
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
