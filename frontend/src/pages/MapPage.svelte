<script lang="ts">
	import NadeSummary from '@/components/NadeSummary.svelte';
	import PageTransition from '@/components/PageTransition.svelte';
	import StratList from '@/components/StratList.svelte';
	import type { Strat } from '@/types/Strat';

	// TODO: tmp solution. Should fetch map from api based "map" prop
	export let maps: { name: string; thumbnail: string; map: string }[];
	export let mapName: string;

	let map = maps.find((m) => m.name === mapName);
	let activeStrat: Strat;

	// TODO: dummy data. fetch from api
	let strats: Strat[] = [
		{
			id: 1,
			name: 'A smokes',
			lineups: [
				{
					id: 1,
					name: 'CT',
					desc: 'Smokes of CT on A site',
					nade: 'SMOKE',
					throwCoordinateX: 400,
					throwCoordinateY: 300,
					landCoordinateX: 200,
					landCoordinateY: 400,
					videoPath: 'mirage_ct_smoke.mp4',
				},
				{
					id: 2,
					name: 'Stairs',
					desc: 'Smokes of stairs on A site',
					nade: 'SMOKE',
					throwCoordinateX: 420,
					throwCoordinateY: 320,
					landCoordinateX: 250,
					landCoordinateY: 340,
					videoPath: 'mirage_stairs_smoke.mp4',
				},
				{
					id: 3,
					name: 'Jungle',
					desc: 'Smokes of jungle on A site',
					nade: 'SMOKE',
					throwCoordinateX: 380,
					throwCoordinateY: 340,
					landCoordinateX: 210,
					landCoordinateY: 340,
					videoPath: 'mirage_jungle_smoke.mp4',
				},
			],
		},
		{
			id: 2,
			name: 'Mid to B',
			lineups: [
				{
					id: 1,
					name: 'CT',
					desc: 'Smokes of CT on A site',
					nade: 'SMOKE',
					throwCoordinateX: 400,
					throwCoordinateY: 300,
					landCoordinateX: 200,
					landCoordinateY: 400,
					videoPath: 'mirage_ct_smoke.mp4',
				},
				{
					id: 2,
					name: 'Stairs',
					desc: 'Smokes of stairs on A site',
					nade: 'FLASH',
					throwCoordinateX: 420,
					throwCoordinateY: 320,
					landCoordinateX: 250,
					landCoordinateY: 340,
					videoPath: 'mirage_stairs_smoke.mp4',
				},
				{
					id: 3,
					name: 'Jungle',
					desc: 'Smokes of jungle on A site',
					nade: 'MOLOTOV',
					throwCoordinateX: 380,
					throwCoordinateY: 340,
					landCoordinateX: 210,
					landCoordinateY: 340,
					videoPath: 'mirage_jungle_smoke.mp4',
				},
			],
		},
	];

	const handleStratChange = (event: CustomEvent<{ id: number }>) => {
		activeStrat = strats.find((s) => s.id == event.detail.id);
	};
</script>

<main>
	<header class="header">
		<a href="/" class="back-navigation"
			><span
				><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"
					><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path
						d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 278.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"
					/></svg
				></span
			>Back</a
		>
		<h1 class="title">{map.name}</h1>
	</header>
	<section class="content">
		<div class="map">
			<img src={map.map} alt={`Map over ${map.name}`} class="map__img" />
		</div>
		<StratList {strats} on:change={handleStratChange} />
	</section>
	<NadeSummary
		nades={activeStrat === undefined
			? []
			: activeStrat.lineups.map((lineup) => lineup.nade)}
	/>
</main>

<style scoped>
	.header {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		justify-content: space-between;
		align-items: center;
	}

	.back-navigation {
		justify-self: start;
	}

	.content {
		display: grid;
		grid-template-columns: 1fr 15rem;
		gap: 1rem;
	}

	.map__img {
		width: 100%;
		height: 100%;
	}

	@media only screen and (max-width: 800px) {
		.content {
			display: flex;
			flex-direction: column;
		}
	}
</style>
