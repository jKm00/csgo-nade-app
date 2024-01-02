export const load = async ({ url, parent, fetch }) => {
  let filters = [];
  for (const [key, value] of url.searchParams.entries()) {
    filters.push({ key, value });
  }

  const fetchStrats = async () => {
    const response = await fetch(`/api/strats?${url.searchParams.toString()}`);
    const result = await response.json();

    return result;
  };

  const fetchMaps = async () => {
    const { supabase } = await parent();
    const { data, error } = await supabase.from('maps').select('id, name');

    return {
      data: data as { id: number; name: string }[],
    };
  };

  const fetchPosition = async () => {
    const { supabase } = await parent();
    const { data } = await supabase.from('positions').select('map_id, name');

    return {
      data: data as { map_id: number; name: string }[],
    };
  };

  const [maps, positions, strats] = await Promise.all([
    fetchMaps(),
    fetchPosition(),
    fetchStrats(),
  ]);

  return {
    filters,
    maps,
    positions,
    strats,
  };
};
