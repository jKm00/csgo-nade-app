import type { Strat } from '$lib/features/stratEditor/types/strat';

export const POST = async ({ request }) => {
	const strat = (await request.json()) as Strat;

	strat.nades.forEach((nade) => {
		console.log(nade.lineupImg);
	});

	return new Response('OK', { status: 200 });
};
