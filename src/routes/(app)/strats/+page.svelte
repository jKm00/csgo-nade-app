<script lang="ts">
	import MapSkeleton from '$lib/components/skeletons/MapSkeleton.svelte';
	import StratCard from '$lib/features/stratListing/components/StratCard.svelte';
	import StratListingHeader from '$lib/features/stratListing/components/StratListingHeader.svelte';
	import FilterMenu from '$lib/features/stratListing/components/filter/FilterMenu.svelte';

	let tmpStrat = [
		{
			map: 'Inferno',
			id: '14',
			name: 'A site execute',
			authorUuid: 'e17f51ea-4c8b-4e29-98b5-c08b3612b9cc',
			authorName: 'jKm',
			createdAt: '23/04/2023',
			teamSide: 'T' as 'CT' | 'T',
			team: 'DOT Esport',
			positionImage: 'a_site.webp',
			positionName: 'A site',
		},
	];
</script>

<main class="grid gap-6 w-default">
	<StratListingHeader />
	<FilterMenu />
	<div
		class="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4"
	>
		{#each tmpStrat as strat}
			<StratCard
				map={strat.map}
				stratId={strat.id}
				stratName={strat.name}
				authorId={strat.authorUuid}
				authorName={strat.authorName}
				createdAt={strat.createdAt}
				teamSide={strat.teamSide}
				team={strat.team}
				positionImage={strat.positionImage}
				positionName={strat.positionName}
			/>
		{/each}
	</div>
</main>
