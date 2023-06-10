import { goto } from '$app/navigation';

export const load = async ({ params, parent }) => {
	const stratId = params.id;

	const fetchStrat = async (id: number) => {
		const { supabase } = await parent();

		const { data } = await supabase
			.from('strats')
			.select(
				`
				name,
				description,
				strat_position,
				inserted_at,
				profiles (
					uuid,
					username
				),
				teams (
					name
				),
				nades (*)
			`
			)
			.eq('id', id);

		if (data.length === 0) {
			return null;
		}

		return {
			name: data[0].name,
			desc: data[0].description,
			position: data[0].strat_position,
			createAt: data[0].inserted_at,
			authorUuid: data[0].profiles.uuid,
			authorName: data[0].profiles.username,
			teamName: data[0].teams === null ? null : data[0].teams.name,
			nades: data[0].nades.map((nade) => {
				return {
					name: nade.name,
					type: nade.type,
					lineupX: nade.lineup_x,
					lineupY: nade.lineup_y,
					impactX: nade.impact_x,
					impactY: nade.impact_y,
					lineupImg: nade.lineup_img,
					impactImg: nade.impact_img,
				};
			}),
		};
	};

	return {
		lazy: {
			strat: fetchStrat(stratId),
		},
	};
};
