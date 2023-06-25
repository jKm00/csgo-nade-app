import { fail } from '@sveltejs/kit';
import type { Filter } from '$lib/features/stratListing/types/Filter';

export const load = async ({ params, parent, url }) => {
	const mapName = params.map;

	const searchParams = url.searchParams;
	let filters: Filter[] = [];

	let index = 0;
	for (const [key, value] of searchParams.entries()) {
		filters = [...filters, { id: index, label: key, value }];
		index++;
	}

	const fetchStrats = async () => {
		const { supabase } = await parent();

		const { data } = await supabase
			.from('maps')
			.select(
				`strats (
				id,
				name, 
				description,
				inserted_at,
				team_side,
				positions (
					name,
					img
				),
				profiles (
					uuid,
					username
				),
				teams (
					name
				)
			)`
			)
			.eq('name', mapName)
			.single();

		if (!data || !data.strats) {
			return [];
		}

		if (!(data?.strats instanceof Array)) {
			const strat = data.strats;
			return [
				{
					id: strat.id,
					name: strat.name,
					desc: strat.description,
					createdAt: strat.inserted_at,
					teamSide: strat.team_side,
					positionName:
						strat.positions instanceof Array
							? strat.positions[0].name
							: strat.positions?.name ?? undefined,
					positionImage:
						strat.positions instanceof Array
							? strat.positions[0].img
							: strat.positions?.img ?? undefined,
					authorUuid:
						strat.profiles instanceof Array
							? strat.profiles[0].uuid
							: strat.profiles?.uuid,
					authorName:
						strat.profiles instanceof Array
							? strat.profiles[0].username
							: strat.profiles?.username,
					teamName:
						strat.teams instanceof Array
							? strat.teams[0].name
							: strat.teams?.name ?? null,
				},
			];
		}

		return data?.strats?.map((strat) => {
			return {
				id: strat.id,
				name: strat.name,
				desc: strat.description,
				createdAt: strat.inserted_at,
				teamSide: strat.team_side,
				positionName:
					strat.positions instanceof Array
						? strat.positions[0].name
						: strat.positions?.name ?? undefined,
				positionImage:
					strat.positions instanceof Array
						? strat.positions[0].img
						: strat.positions?.img ?? undefined,
				authorUuid:
					strat.profiles instanceof Array
						? strat.profiles[0].uuid
						: strat.profiles?.uuid,
				authorName:
					strat.profiles instanceof Array
						? strat.profiles[0].username
						: strat.profiles?.username,
				teamName:
					strat.teams instanceof Array
						? strat.teams[0].name
						: strat.teams?.name ?? null,
			};
		});
	};

	return {
		mapName,
		filters,
		streamed: {
			strats: fetchStrats(),
		},
	};
};
