import type { ImageMetadata } from 'astro';
import { describe, expect, it } from 'vitest';
import { Category } from '~/constants/categories';
import {
	getNextProject,
	type Project,
	selectFeatured,
	sortByNewest,
} from './projects';

describe(sortByNewest, () => {
	it('should order projects from newest to oldest', () => {
		const projects = [
			_createProject('old', { date: new Date('2024-05-01') }),
			_createProject('new', { date: new Date('2026-03-14') }),
			_createProject('mid', { date: new Date('2025-06-15') }),
		];

		expect(ids(sortByNewest(projects))).toEqual(['new', 'mid', 'old']);
	});

	it('should not mutate the input', () => {
		const projects = [
			_createProject('old', { date: new Date('2024-05-01') }),
			_createProject('new', { date: new Date('2026-03-14') }),
		];

		sortByNewest(projects);

		expect(ids(projects)).toEqual(['old', 'new']);
	});
});

describe(selectFeatured, () => {
	it('should keep only ranked projects, lowest rank first', () => {
		const projects = [
			_createProject('third', { featured: 3 }),
			_createProject('unranked'),
			_createProject('first', { featured: 1 }),
			_createProject('second', { featured: 2 }),
		];

		expect(ids(selectFeatured(projects))).toEqual(['first', 'second', 'third']);
	});

	it('should return an empty list when nothing is featured', () => {
		expect(selectFeatured([_createProject('a')])).toEqual([]);
	});
});

describe(getNextProject, () => {
	const projects = [
		_createProject('a'),
		_createProject('b'),
		_createProject('c'),
	];

	it('should return the following project', () => {
		expect(getNextProject(projects, 'a')?.id).toBe('b');
	});

	it('should wrap around from the last project to the first', () => {
		expect(getNextProject(projects, 'c')?.id).toBe('a');
	});

	it('should return undefined when there are fewer than two projects', () => {
		expect(getNextProject([_createProject('a')], 'a')).toBeUndefined();
		expect(getNextProject([], 'a')).toBeUndefined();
	});

	it('should return undefined for an unknown id', () => {
		expect(getNextProject(projects, 'x')).toBeUndefined();
	});
});

function _createProject(
	id: string,
	overrides: Partial<Project['data']> = {},
): Project {
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
			category: Category.Event,
			kind: 'Expo',
			date: new Date('2025-01-01'),
			location: 'Gent',
			summary: 'Samenvatting',
			story: ['Verhaal'],
			cover: { src: image, alt: 'Cover' },
			photos: [{ src: image }],
			...overrides,
		},
	};
}

function ids(projects: Project[]): string[] {
	return projects.map((project) => project.id);
}
