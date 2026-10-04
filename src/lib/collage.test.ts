import type { ImageMetadata } from 'astro';
import { describe, expect, it } from 'vitest';
import { Discipline } from '~/constants/disciplines';
import { type CollageTile, pickCollageTiles } from './collage';
import type { Project } from './projects';

describe(pickCollageTiles, () => {
	it('should take every cover first, then each first photo, in project order', () => {
		const projects = [
			_createProject('a', ['a1', 'a2']),
			_createProject('b', ['b1', 'b2']),
		];

		expect(labels(pickCollageTiles(projects, 6))).toEqual([
			'a cover',
			'b cover',
			'a1',
			'b1',
			'a2',
			'b2',
		]);
	});

	it('should stop at the requested count', () => {
		const projects = [
			_createProject('a', ['a1', 'a2']),
			_createProject('b', ['b1', 'b2']),
		];

		expect(labels(pickCollageTiles(projects, 3))).toEqual([
			'a cover',
			'b cover',
			'a1',
		]);
	});

	it('should skip projects that ran out of photos and return fewer tiles', () => {
		const projects = [
			_createProject('a', ['a1']),
			_createProject('b', ['b1', 'b2', 'b3']),
		];

		expect(labels(pickCollageTiles(projects, 8))).toEqual([
			'a cover',
			'b cover',
			'a1',
			'b1',
			'b2',
			'b3',
		]);
	});

	it('should return no tiles without projects', () => {
		expect(pickCollageTiles([], 8)).toEqual([]);
	});

	it('should keep the project with each photo', () => {
		const project = _createProject('a', ['a1']);

		expect(pickCollageTiles([project], 1)[0].project).toBe(project);
	});
});

function _createProject(id: string, photoAlts: string[]): Project {
	const image: ImageMetadata = {
		src: '/stand-in.jpg',
		width: 2560,
		height: 1707,
		format: 'jpg',
	};

	return {
		id,
		collection: 'projects',
		data: {
			title: id,
			discipline: Discipline.Event,
			kind: 'Expo',
			date: new Date('2025-01-01'),
			location: 'Gent',
			summary: 'Samenvatting',
			story: ['Verhaal'],
			cover: { src: image, alt: `${id} cover` },
			photos: photoAlts.map((alt) => ({ src: image, alt })),
		},
	};
}

function labels(tiles: CollageTile[]): (string | undefined)[] {
	return tiles.map(({ photo }) => photo.alt);
}
