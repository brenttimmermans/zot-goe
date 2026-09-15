import { type CollectionEntry, getCollection } from 'astro:content';

type Project = CollectionEntry<'projects'>;

export async function getSortedProjects(): Promise<Project[]> {
	const all = await getCollection('projects');
	return all.sort(
		(a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime(),
	);
}

export function getCategories(projects: Project[]): string[] {
	return [...new Set(projects.map((project) => project.data.category))];
}
