export const load = async ({ params }) => {
	const mapName = params.map;

	return {
		mapName,
	};
};
