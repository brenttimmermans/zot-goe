import { type CollectionEntry, getCollection } from 'astro:content';

export type Project = CollectionEntry<'projects'>;
export type ProjectPhoto = Project['data']['photos'][number];

export function sortByNewest(projects: Project[]): Project[] {
	return projects.toSorted(
		(first, second) => second.data.date.getTime() - first.data.date.getTime(),
	);
}

export function selectFeatured(projects: Project[]): Project[] {
	return projects
		.filter((project) => project.data.featured !== undefined)
		.toSorted(
			(first, second) =>
				(first.data.featured ?? 0) - (second.data.featured ?? 0),
		);
}

export async function getProjects(): Promise<Project[]> {
	const projects = await getCollection('projects');

	return sortByNewest(projects);
}

export async function getFeaturedProjects(): Promise<Project[]> {
	const projects = await getCollection('projects');
	return selectFeatured(projects);
}

export function getNextProject(
	projects: Project[],
	id: string,
): Project | undefined {
	if (projects.length < 2) return undefined;

	const index = projects.findIndex((project) => project.id === id);
	if (index === -1) return undefined;

	return projects[(index + 1) % projects.length];
}
