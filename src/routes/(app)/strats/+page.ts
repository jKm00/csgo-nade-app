export const load = async ({ url }) => {
	const map = url.searchParams.get('map');
	const position = url.searchParams.get('position');
	const side = url.searchParams.get('side');
	const strat = url.searchParams.get('stratName');
	const team = url.searchParams.get('teamName');
	const author = url.searchParams.get('author');

	return {
		map,
		position,
		side,
		strat,
		team,
		author,
	};
};
