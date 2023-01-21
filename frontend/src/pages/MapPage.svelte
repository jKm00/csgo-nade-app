<script lang="ts">
	import MapView from '@/components/MapView.svelte';
	import NadeSummary from '@/components/NadeSummary.svelte';
	import StratEditor from '@/components/StratEditor.svelte';
	import StratList from '@/components/StratList.svelte';
	import type { CsgoMap } from '@/types/CsgoMap';
	import type { Strat } from '@/types/Strat';

	// TODO: tmp solution. Should fetch map from api based "map" prop
	export let mapName: string;
	export let maps: CsgoMap[];
	let map = maps.find((m) => m.name === mapName);

	let activeStrat: Strat | undefined;
	let showEditor = false;

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
					throwCoordinateX: 83,
					throwCoordinateY: 51,
					landCoordinateX: 43,
					landCoordinateY: 78,
					videoPath: 'mirage_ct_smoke.mp4',
				},
				{
					id: 2,
					name: 'Stairs',
					desc: 'Smokes of stairs on A site',
					nade: 'SMOKE',
					throwCoordinateX: 85,
					throwCoordinateY: 55,
					landCoordinateX: 52,
					landCoordinateY: 62,
					videoPath: 'mirage_stairs_smoke.mp4',
				},
				{
					id: 3,
					name: 'Jungle',
					desc: 'Smokes of jungle on A site',
					nade: 'SMOKE',
					throwCoordinateX: 78,
					throwCoordinateY: 61,
					landCoordinateX: 47.9,
					landCoordinateY: 62,
					videoPath: 'mirage_jungle_smoke.mp4',
				},
				{
					id: 4,
					name: 'Ramp',
					desc: 'Flashes just above ramp to not blind teammates',
					nade: 'FLASH',
					throwCoordinateX: 78,
					throwCoordinateY: 52,
					landCoordinateX: 65,
					landCoordinateY: 62,
					videoPath: 'mirage_jungle_smoke.mp4',
				},
				{
					id: 5,
					name: 'Dark',
					desc: 'Molotoves dark',
					nade: 'MOLOTOV',
					throwCoordinateX: 74.5,
					throwCoordinateY: 75,
					landCoordinateX: 62,
					landCoordinateY: 70.5,
					videoPath: 'mirage_jungle_smoke.mp4',
				},
				{
					id: 6,
					name: 'Deep jungle',
					desc: 'Nades deep jungle',
					nade: 'HE',
					throwCoordinateX: 70,
					throwCoordinateY: 62,
					landCoordinateX: 41,
					landCoordinateY: 59,
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
					throwCoordinateX: 50,
					throwCoordinateY: 50,
					landCoordinateX: 50,
					landCoordinateY: 50,
					videoPath: 'mirage_ct_smoke.mp4',
				},
				{
					id: 2,
					name: 'Stairs',
					desc: 'Smokes of stairs on A site',
					nade: 'FLASH',
					throwCoordinateX: 50,
					throwCoordinateY: 50,
					landCoordinateX: 50,
					landCoordinateY: 50,
					videoPath: 'mirage_stairs_smoke.mp4',
				},
				{
					id: 3,
					name: 'Jungle',
					desc: 'Smokes of jungle on A site',
					nade: 'MOLOTOV',
					throwCoordinateX: 50,
					throwCoordinateY: 50,
					landCoordinateX: 50,
					landCoordinateY: 50,
					videoPath: 'mirage_jungle_smoke.mp4',
				},
			],
		},
	];

	const handleStratChange = (event: CustomEvent<{ id: number }>) => {
		activeStrat = strats.find((s) => s.id == event.detail.id);
	};

	const handleToggle = (event: CustomEvent<{ toggle: boolean }>) => {
		showEditor = event.detail.toggle;
	};
</script>

<!-- Show error when unknown map name -->
{#if map === undefined}
	<p>No map found with name: {mapName}</p>
	<a href="/" class="back-navigation"
		><span
			><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"
				><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path
					d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 278.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"
				/></svg
			></span
		>Back</a
	>
{:else}
	<!-- Main wrapper -->
	<main>
		{#if !showEditor}
			<!-- Header -->
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
			<!-- Main section -->
			<section class="content">
				<MapView {map} {activeStrat} />
				<StratList
					{strats}
					on:change={handleStratChange}
					on:add={handleToggle}
				/>
			</section>
			<!-- Nade summary -->
			<NadeSummary
				nades={activeStrat === undefined
					? []
					: activeStrat.lineups.map((lineup) => lineup.nade)}
			/>
		{:else}
			<StratEditor {map} on:cancel={() => (showEditor = false)} />
		{/if}
	</main>
{/if}

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

	.btn--create {
		justify-self: end;
	}

	.content {
		display: grid;
		grid-template-columns: 1fr 15rem;
		gap: 1rem;
	}

	@media only screen and (max-width: 800px) {
		.content {
			display: flex;
			flex-direction: column;
		}
	}
</style>
