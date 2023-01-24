import API from '@/services/Api';
import type { PageLoad } from './$types';
import type { CsgoMap } from '@/types/CsgoMap';

type OutputProps = { map: CsgoMap };

export const load: PageLoad<OutputProps> = async ({ params, data }) => {
	let map = await API.get(`/maps/${params.map.toLowerCase()}`);

	return {
		map: map
	};
};

export const ssr = true;
