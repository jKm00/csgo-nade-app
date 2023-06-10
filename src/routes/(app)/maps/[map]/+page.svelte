<script lang="ts">
	import MapSkeleton from '$lib/components/skeletons/MapSkeleton.svelte';

	export let data;
</script>

<div>
	<!-- Header -->
	<div class="flex justify-between mb-4">
		<h2 class="font-bold uppercase">Strats</h2>
		<a
			class="bg-red-400 hover:bg-red-500 focus-within:bg-red-500 active:bg-red-600 rounded py-1 px-2"
			href="/strats">Create new strat</a
		>
	</div>
	{#await data.streamed.strats}
		<MapSkeleton />
	{:then strats}
		<div class="grid grid-cols-main-small gap-4">
			{#if strats === null || strats.length === 0}
				<p class="text-neutral-400 text-center">
					No strats available for {data.mapName}
				</p>
			{:else}
				{#each strats as strat}
					<!-- Dummy card -->
					<a
						class="grid gap-4 bg-neutral-800 rounded shadow p-4"
						href="/maps/{data.mapName}/strats/{strat.id}"
					>
						<div class="flex justify-between items-center">
							<h3 class="text-xl font-bold">{strat.name}</h3>
							<svg
								class="fill-white"
								xmlns="http://www.w3.org/2000/svg"
								height="1em"
								viewBox="0 0 320 512"
								><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
									d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
								/></svg
							>
						</div>
						<div class="flex gap-4 justify-between text-sm text-neutral-400">
							<p>
								Creator: <a class="underline" href="/users/{strat.authorUuid}"
									>{strat.authorName}</a
								>
							</p>
							<p>
								Created at: {new Date(strat.createdAt).toLocaleDateString()}
							</p>
							{#if strat.teamName !== null}
								<p>
									Team: <a class="underline" href="/teams/{strat.teamName}"
										>{strat.teamName}</a
									>
								</p>
							{/if}
						</div>
					</a>
				{/each}
			{/if}
		</div>
	{/await}
</div>
