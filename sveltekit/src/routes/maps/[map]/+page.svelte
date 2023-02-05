<script lang="ts">
	import MapView from '@/components/MapView.svelte';
	import NadeSummary from '@/components/NadeSummary.svelte';
	import StratList from '@/components/StratList.svelte';
	import type { CsgoMap } from '@/types/CsgoMap';
	import type { Strat } from '@/types/Strat';
	import type { PageData } from './$types';

	export let data: PageData;

	let map: CsgoMap;
	let strats: Strat[] = [];

	$: map = data.map;
	$: strats = map !== undefined ? map.strats : [];

	let activeStrat: Strat | undefined;

	const handleStratChange = (event: CustomEvent<{ id: number }>) => {
		activeStrat = strats.find((s) => s.id == event.detail.id);
	};
</script>

<!-- Show error when unknown map name -->
{#if map === undefined}
	<div class="header">
		<a href="/" class="back-navigation"
			><span
				><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"
					><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path
						d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 278.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"
					/></svg
				></span
			>Back</a
		>
		<h1 class="title">No map found with name: {data.map}</h1>
	</div>
{:else}
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
	<section class="grid-2-col">
		<MapView {map} lineups={activeStrat !== undefined ? activeStrat.lineups : []} />
		<StratList {strats} on:change={handleStratChange} />
	</section>
	<!-- Nade summary -->
	<NadeSummary
		nades={activeStrat === undefined ? [] : activeStrat.lineups.map((lineup) => lineup.nade)}
	/>
	<p class="tip">
		<span class="underline">Pro tip:</span> Click on a strat, then on a nade to see video with lineup!
	</p>
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
</style>
