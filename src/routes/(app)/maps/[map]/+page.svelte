<script lang="ts">
	import StratCard from '$lib/components/containers/StratCard.svelte';
	import MapSkeleton from '$lib/components/skeletons/MapSkeleton.svelte';

	export let data;

	$: ({ mapName } = data);
</script>

<div class="w-default mt-10">
	<!-- Header -->
	<div class="flex justify-between mb-4">
		<h2 class="font-bold uppercase">Strats</h2>
		<a
			class="bg-red-400 hover:bg-red-500 focus-within:bg-red-500 active:bg-red-600 rounded py-1 px-2"
			href="/strats">Create new strat</a
		>
	</div>
	<div
		class="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4"
	>
		{#await data.streamed.strats}
			<MapSkeleton />
		{:then strats}
			{#if strats === null || strats.length === 0}
				<p class="text-neutral-400 text-center col-span-full">
					No strats available for {data.mapName}
				</p>
			{:else}
				{#each strats as strat}
					<StratCard
						map={mapName}
						stratId={strat.id}
						stratName={strat.name}
						authorId={strat.authorUuid}
						authorName={strat.authorName}
						createdAt={strat.createdAt}
						teamSide={strat.teamSide}
						team={strat.teamName}
						positionImage={strat.positionImage}
						positionName={strat.positionName}
					/>
				{/each}
			{/if}
		{/await}
	</div>
</div>
