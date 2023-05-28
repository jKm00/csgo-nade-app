<script lang="ts">
	import MapThumbnail from '$lib/components/containers/MapThumbnail.svelte';

	export let data;

	$: ({ maps } = data);
</script>

<main class="grid gap-4 grid-cols-main my-10 px-4">
	{#if maps}
		{#each maps as map}
			<MapThumbnail
				img={map.thumbnail}
				imgAlt={`${map.name} thumbnail`}
				name={map.name}
			/>
		{/each}
	{:else}
		<p class="text-sm text-neutral-400">
			Obs... Seems like something is not working. We are surley working to fix
			it!
		</p>
	{/if}
</main>
