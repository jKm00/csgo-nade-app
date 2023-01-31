import API from '@/services/Api';
import type { CsgoMap } from '@/types/CsgoMap';
import type { PageLoad } from './$types';

export type OutputProps = { map: CsgoMap }

export const load: PageLoad<OutputProps> = async ({ params, data }): Promise<OutputProps> => {
  let map = await API.get(`/maps/${params.map.toLowerCase()}`);

  return {
    map: map
  };
}

export const ssr = true;