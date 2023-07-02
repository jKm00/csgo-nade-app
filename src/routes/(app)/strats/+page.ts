import type { Filter } from '$lib/features/stratListing/types/Filter';
import { FilterType } from '$lib/features/stratListing/types/FilterType';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ url, parent }) => {
	const params = url.searchParams;

	let filters: Filter[] = [];
	let index = 0;
	params.forEach((value, key) => {
		filters.push({ id: index, label: key, value });
		index++;
	});

	let maps: string[] = [];
	let positions: string[] = [];
	let sides: string[] = [];
	let stratNames: string[] = [];
	let teamNames: string[] = [];
	let authors: string[] = [];
	filters.forEach((filter) => {
		switch (filter.label) {
			case FilterType.MAP.toLowerCase():
				maps.push(filter.value);
				break;
			case FilterType.POSITION.toLowerCase():
				positions.push(filter.value);
				break;
			case FilterType.SIDE.toLowerCase():
				sides.push(filter.value);
				break;
			case FilterType.STRAT.toLowerCase():
				stratNames.push(filter.value);
				break;
			case FilterType.TEAM.toLowerCase():
				teamNames.push(filter.value);
				break;
			case FilterType.AUTHOR.toLowerCase():
				authors.push(filter.value);
				break;
			default:
				break;
		}
	});

	console.log(maps, sides);

	const { supabase } = await parent();
	const { data, error } = await supabase.rpc('query_strats_with_filters', {
		map_names: maps,
		positions: positions,
		sides: sides,
		strat_names: stratNames,
		team_names: teamNames,
		authors: authors,
	});

	console.log(data, error);

	return {
		filters,
	};
};
