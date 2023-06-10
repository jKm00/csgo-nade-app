<script lang="ts">
	import MapThumbnail from '$lib/components/containers/MapThumbnail.svelte';

	const maps = [
		{ name: 'Ancient', thumbnail: 'ancient_compressed.webp' },
		{ name: 'Anubis', thumbnail: 'anubis_compressed.webp' },
		{ name: 'Inferno', thumbnail: 'inferno_compressed.webp' },
		{ name: 'Mirage', thumbnail: 'mirage_compressed.webp' },
		{ name: 'Nuke', thumbnail: 'nuke_compressed.webp' },
		{ name: 'Overpass', thumbnail: 'overpass_compressed.webp' },
		{ name: 'Vertigo', thumbnail: 'vertigo_compressed.webp' },
	];
</script>

<main class="grid gap-4 grid-cols-main my-10 px-4">
	{#if maps}
		{#each maps as map}
			<MapThumbnail
				img="/assets/images/thumbnails/{map.thumbnail}"
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
