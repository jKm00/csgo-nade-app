import API from '@/services/Api';
import type { PageLoad } from './$types';
import type { Strat } from '@/types/Strat';
import type { CsgoMap } from '@/types/CsgoMap';

type OutputProps = { map: CsgoMap, strats: Strat[] };

export const load: PageLoad<OutputProps> = async ({ params, data }) => {
	let map = await API.get(`/maps/${params.map.toLowerCase()}`);
	let strats = await API.get(`/strats/${params.map.toLowerCase()}`);

	return {
		map: map,
		strats: strats
	};
};

export const ssr = true;
