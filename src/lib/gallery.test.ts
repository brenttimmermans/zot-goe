import type { ImageMetadata } from 'astro';
import { describe, expect, it } from 'vitest';
import { buildGalleryRows, GalleryRowKind, isLandscape } from './gallery';
import type { ProjectPhoto } from './projects';

describe(isLandscape, () => {
	it('should treat a wider-than-tall photo as landscape', () => {
		expect(isLandscape(landscape('a'))).toBe(true);
	});

	it('should treat a taller-than-wide photo as portrait', () => {
		expect(isLandscape(portrait('a'))).toBe(false);
	});

	it('should treat a square photo as landscape', () => {
		const square = _createPhoto({ width: 2000, height: 2000 });

		expect(isLandscape(square)).toBe(true);
	});
});

describe(buildGalleryRows, () => {
	it('should return no rows for no photos', () => {
		expect(buildGalleryRows([])).toEqual([]);
	});

	it('should pair two landscapes that follow a wide row', () => {
		const [a, b, c] = [landscape('a'), landscape('b'), landscape('c')];

		expect(buildGalleryRows([a, b, c])).toEqual([
			{ kind: GalleryRowKind.Wide, photos: [a] },
			{ kind: GalleryRowKind.Pair, photos: [b, c] },
		]);
	});

	it('should show a landscape full width', () => {
		const [a, b] = [landscape('a'), portrait('b')];

		expect(buildGalleryRows([a, b])).toEqual([
			{ kind: GalleryRowKind.Wide, photos: [a] },
			{ kind: GalleryRowKind.Single, photos: [b] },
		]);
	});

	it('should show a landscape after a wide row full width when no landscape follows', () => {
		const [a, b, c] = [landscape('a'), landscape('b'), portrait('c')];

		expect(buildGalleryRows([a, b, c])).toEqual([
			{ kind: GalleryRowKind.Wide, photos: [a] },
			{ kind: GalleryRowKind.Wide, photos: [b] },
			{ kind: GalleryRowKind.Single, photos: [c] },
		]);
	});

	it('should pair two portraits', () => {
		const [a, b] = [portrait('a'), portrait('b')];

		expect(buildGalleryRows([a, b])).toEqual([
			{ kind: GalleryRowKind.Pair, photos: [a, b] },
		]);
	});

	it('should offset a portrait against the landscape after it', () => {
		const [a, b] = [portrait('a'), landscape('b')];

		expect(buildGalleryRows([a, b])).toEqual([
			{ kind: GalleryRowKind.Offset, photos: [a, b] },
		]);
	});

	it('should show a trailing portrait on its own', () => {
		const a = portrait('a');

		expect(buildGalleryRows([a])).toEqual([
			{ kind: GalleryRowKind.Single, photos: [a] },
		]);
	});

	it('should lay out the spa-24h sequence', () => {
		const photos = [
			portrait('01'),
			landscape('03'),
			landscape('04'),
			portrait('05'),
			portrait('06'),
			portrait('07'),
			landscape('08'),
			landscape('09'),
			portrait('10'),
			landscape('11'),
			landscape('12'),
			portrait('13'),
		];

		const rows = buildGalleryRows(photos);

		expect(rows.map((row) => row.kind)).toEqual([
			GalleryRowKind.Offset,
			GalleryRowKind.Wide,
			GalleryRowKind.Pair,
			GalleryRowKind.Offset,
			GalleryRowKind.Wide,
			GalleryRowKind.Offset,
			GalleryRowKind.Wide,
			GalleryRowKind.Single,
		]);
		expect(rows.flatMap((row) => row.photos)).toEqual(photos);
	});
});

function _createPhoto(overrides: Partial<ImageMetadata> = {}): ProjectPhoto {
	return {
		src: {
			src: '/photo.jpg',
			width: 2560,
			height: 1707,
			format: 'jpg',
			...overrides,
		},
	};
}

function landscape(name: string): ProjectPhoto {
	return _createPhoto({ src: `/${name}.jpg` });
}

function portrait(name: string): ProjectPhoto {
	return _createPhoto({ src: `/${name}.jpg`, width: 1707, height: 2560 });
}
