import { goto } from '$app/navigation';

export const load = async ({ params, parent }) => {
	const stratId = params.id;

	const fetchStrat = async (id: number) => {
		const { supabase } = await parent();

		const { data } = await supabase
			.from('strats')
			.select(
				`
				id,
				name,
				description,
				inserted_at,
				team_side,
				positions (
					name
				),
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
			.eq('id', id)
			.single();

		if (data === null) {
			return null;
		}

		return {
			id: data.id,
			name: data.name,
			desc: data.description,
			teamSide: data.team_side,
			position:
				data.positions instanceof Array
					? data.positions[0].name
					: data.positions?.name ?? undefined,
			createAt: data.inserted_at,
			authorUuid:
				data.profiles instanceof Array
					? data.profiles[0].uuid
					: data.profiles?.uuid,
			authorName:
				data.profiles instanceof Array
					? data.profiles[0].username
					: data.profiles?.username,
			teamName:
				data.teams instanceof Array
					? data.teams[0].name
					: data.teams?.name ?? null,
			nades: data.nades?.map(
				(nade: {
					name: string;
					type: string;
					lineup_x: number;
					lineup_y: number;
					impact_x: number;
					impact_y: number;
					lineup_img: string;
					impact_img: string;
				}) => {
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
				}
			),
		};
	};

	return {
		lazy: {
			strat: fetchStrat(Number(stratId)),
		},
	};
};
