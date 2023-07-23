<script lang="ts">
	import FilterMenu from '$lib/features/stratListing/components/FilterMenu.svelte';
	import StratCard from '$lib/features/stratListing/components/StratCard.svelte';
	import StratListingHeader from '$lib/features/stratListing/components/StratListingHeader.svelte';
	import StratListingSkeleton from '$lib/features/stratListing/components/StratListingSkeleton.svelte';

	export let data;

	$: params = {
		map: data.map ?? '',
		position: data.position ?? '',
		side: data.side ?? '',
		strat: data.strat ?? '',
		team: data.team ?? '',
		author: data.author ?? '',
	};
</script>

<main class="grid gap-6 mt-10 w-default">
	<StratListingHeader />
	<FilterMenu {params} />
	<div
		class="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4"
	>
		{#await data.lazy.strats}
			<StratListingSkeleton />
		{:then strats}
			{#if strats}
				{#each strats as strat}
					<StratCard
						thumbnail={strat.thumbnail}
						position={strat.position}
						stratId={strat.stratId}
						stratName={strat.stratName}
						authorId={strat.authorId}
						authorName={strat.author}
						createdAt={strat.createdAt}
						team={strat.team}
						side={strat.side}
					/>
				{/each}
			{/if}
		{/await}
	</div>
</main>
