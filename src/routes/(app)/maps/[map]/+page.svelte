<script lang="ts">
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
				<p class="text-neutral-400 text-center">
					No strats available for {data.mapName}
				</p>
			{:else}
				{#each strats as strat}
					<a
						class="bg-neutral-800 rounded shadow overflow-hidden group"
						href="/maps/{data.mapName}/strats/{strat.id}"
					>
						{#if strat.positionImage && strat.positionName}
							<img
								class="aspect-[16/6] w-full object-cover"
								src="/assets/images/maps/{mapName.toLowerCase()}/{strat.positionImage}"
								alt="Overview over {strat.positionName}"
							/>
						{:else}
							<div
								class="grid text-center items-center content-center aspect-[16/6] bg-neutral-700 text-neutral-300"
							>
								<p class="font-bold">CSGO Strats</p>
								<p>No image to display</p>
							</div>
						{/if}
						<div class="grid p-4">
							<h2 class="text-2xl font-bold">{strat.name}</h2>
							<p class="text-neutral-400">
								<a class="underline" href="/users/{strat.authorUuid}"
									>{strat.authorName}</a
								>
								- {new Date(strat.createdAt).toLocaleDateString()}
								{#if strat.teamName !== null}
									- <a href="/teams/{strat.teamName}">{strat.teamName}</a>
								{/if}
							</p>
							<div class="flex gap-4 mt-6">
								{#if strat.teamSide === 'CT'}
									<p
										class="bg-blue-400/20 border border-blue-400 text-blue-400 group-hover:bg-blue-400 group-hover:text-white group-focus-within:bg-blue-400 group-focus-within:text-white transition-colors rounded-full px-4"
									>
										{strat.teamSide}
									</p>
								{:else}
									<p
										class="bg-red-400/20 border border-red-400 text-red-400 group-hover:bg-red-400 group-hover:text-white group-focus-within:bg-red-400 group-focus-within:text-white transition-colors rounded-full px-4"
									>
										{strat.teamSide}
									</p>
								{/if}
								{#if strat.positionName}
									<p
										class="bg-green-400/20 border border-green-400 text-green-400 group-hover:bg-green-400 group-hover:text-white group-focus-within:bg-green-400 group-focus-within:text-white transition-colors rounded-full px-4"
									>
										{strat.positionName}
									</p>
								{/if}
							</div>
						</div>
					</a>
				{/each}
			{/if}
		{/await}
	</div>
</div>
