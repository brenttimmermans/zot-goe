import type { ImageMetadata } from 'astro';
import { describe, expect, it } from 'vitest';
import { Category } from '~/constants/categories';
import {
	buildHighlightColumns,
	type Highlight,
	pickHighlights,
} from './highlights';
import type { Project } from './projects';

describe(pickHighlights, () => {
	it('should interleave photos across projects, skipping covers and repeats', () => {
		const projects = [
			_createProject('a', ['a1', 'shared', 'b-cover']),
			_createProject('b', ['b1', 'shared', 'b2']),
		];

		expect(names(pickHighlights(projects, 8))).toEqual([
			'a1',
			'b1',
			'shared',
			'b2',
		]);
	});
});

describe(buildHighlightColumns, () => {
	it('should fill the shortest column, with columns 3 and 4 starting lower', () => {
		const highlights = ['1', '2', '3', '4', '5', '6'].map(_createHighlight);

		expect(buildHighlightColumns(highlights).map(names)).toEqual([
			['1', '5'],
			['2', '6'],
			['3'],
			['4'],
		]);
	});
});

function _createProject(id: string, photoNames: string[]): Project {
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
			cover: { src: _createImage(`${id}-cover`), alt: `${id} cover` },
			photos: photoNames.map((name) => ({
				src: _createImage(name),
				alt: name,
			})),
		},
	};
}

function _createHighlight(name: string): Highlight {
	return {
		project: _createProject('a', []),
		photo: { src: _createImage(name), alt: name },
	};
}

function _createImage(name: string): ImageMetadata {
	return { src: `/${name}.jpg`, width: 2560, height: 1707, format: 'jpg' };
}

function names(highlights: Highlight[]): (string | undefined)[] {
	return highlights.map(({ photo }) => photo.alt);
}
