import type { Filter } from '$lib/features/stratListing/types/Filter';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ url }) => {
	const params = url.searchParams;

	let filters: Filter[] = [];
	let index = 0;
	params.forEach((value, key) => {
		filters.push({ id: index, label: key, value });
		index++;
	});

	console.log(filters);

	return {
		filters,
	};
};
