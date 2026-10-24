import type { Project, ProjectPhoto } from './projects';

export interface Highlight {
	project: Project;
	photo: ProjectPhoto;
}

const GAP_TO_COLUMN_WIDTH = 12 / 291;
const COLUMN_HEIGHT_RATIOS = [6.0, 6.0, 4.4, 4.4];

export function pickHighlights(projects: Project[]): Highlight[] {
	const covers = new Set(projects.map(({ data }) => data.cover.src.src));

	return interleavePhotos(projects).filter(
		({ photo }) => !covers.has(photo.src.src),
	);
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
