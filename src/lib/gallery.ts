import type { ProjectPhoto } from './projects';

export enum GalleryRowKind {
	Wide = 'wide',
	Pair = 'pair',
	Offset = 'offset',
	Single = 'single',
}

export interface GalleryRow {
	kind: GalleryRowKind;
	photos: ProjectPhoto[];
}

export function isLandscape(photo: ProjectPhoto): boolean {
	return photo.src.width >= photo.src.height;
}

export function buildGalleryRows(photos: ProjectPhoto[]): GalleryRow[] {
	const rows: GalleryRow[] = [];
	let index = 0;

	while (index < photos.length) {
		const row = buildRow(photos[index], photos[index + 1], rows.at(-1));
		rows.push(row);
		index += row.photos.length;
	}

	return rows;
}

function buildRow(
	photo: ProjectPhoto,
	next: ProjectPhoto | undefined,
	previous: GalleryRow | undefined,
): GalleryRow {
	if (isLandscape(photo)) {
		const followsWide = previous?.kind === GalleryRowKind.Wide;
		if (followsWide && next && isLandscape(next)) {
			return { kind: GalleryRowKind.Pair, photos: [photo, next] };
		}

		return { kind: GalleryRowKind.Wide, photos: [photo] };
	}

	if (!next) return { kind: GalleryRowKind.Single, photos: [photo] };

	const kind = isLandscape(next) ? GalleryRowKind.Offset : GalleryRowKind.Pair;

	return { kind, photos: [photo, next] };
}
