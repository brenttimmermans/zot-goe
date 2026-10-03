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
	{ x: 40, y: 32, w: 220, h: 290, depth: 18 },
	{ x: 340, y: 96, w: 180, h: 124, depth: 34 },
	{ x: 720, y: 24, w: 320, h: 212, depth: 12 },
	{ x: 1100, y: 150, w: 140, h: 186, depth: 40 },
	{ x: 80, y: 420, w: 260, h: 172, depth: 24 },
	{ x: 240, y: 660, w: 150, h: 190, depth: 44 },
	{ x: 560, y: 640, w: 230, h: 150, depth: 28 },
	{ x: 900, y: 400, w: 300, h: 380, depth: 10 },
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
