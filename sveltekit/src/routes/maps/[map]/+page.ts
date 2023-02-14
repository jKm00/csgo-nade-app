import type { PageLoad } from './$types';
import type { Strat } from '@/types/Strat';
import type { CsgoMap } from '@/types/CsgoMap';
import ApiService from '@/services/ApiService';

type OutputProps = { map: CsgoMap, strats: Strat[] };

export const load: PageLoad<OutputProps> = async ({ params, data }) => {
	let map = await ApiService.get(`/maps/${params.map.toLowerCase()}`);
	let strats = await ApiService.get(`/strats/${params.map.toLowerCase()}`);

	return {
		map: map,
		strats: strats
	};
};

export const ssr = true;
