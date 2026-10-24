import type { Project, ProjectPhoto } from './projects';

export interface CollageSlot {
	x: number;
	y: number;
	w: number;
	h: number;
	depth: number;
}

export interface CollageTile {
	project: Project;
	photo: ProjectPhoto;
}

export const COLLAGE_WIDTH = 1280;
export const COLLAGE_HEIGHT = 888;

// Design pixels inside the COLLAGE_WIDTH × COLLAGE_HEIGHT hero box.
export const COLLAGE_SLOTS: CollageSlot[] = [
	{ x: 40, y: 28, w: 260, h: 340, depth: 18 },
	{ x: 360, y: 84, w: 212, h: 146, depth: 34 },
	{ x: 650, y: 20, w: 360, h: 238, depth: 12 },
	{ x: 1072, y: 128, w: 168, h: 222, depth: 40 },
	{ x: 64, y: 436, w: 296, h: 196, depth: 24 },
	{ x: 404, y: 590, w: 168, h: 216, depth: 44 },
	{ x: 620, y: 640, w: 258, h: 170, depth: 28 },
	{ x: 940, y: 400, w: 300, h: 390, depth: 10 },
];

export function pickCollageTiles(
	projects: Project[],
	count: number,
): CollageTile[] {
	const sequences = projects.map(({ data }) => [data.cover, ...data.photos]);
	const longest = Math.max(0, ...sequences.map((photos) => photos.length));
	const passes = Array.from({ length: longest }, (_, pass) =>
		projects.flatMap((project, index) => {
			const photo = sequences[index][pass];

			return photo ? [{ project, photo }] : [];
		}),
	);

	return passes.flat().slice(0, count);
}
