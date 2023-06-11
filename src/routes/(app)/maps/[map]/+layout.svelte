<script lang="ts">
	import { maps } from '$lib/shared/maps.js';

	export let data;

	$: ({ mapName } = data);
	$: thumbnail = maps.find((map) => map.name === mapName)?.thumbnail;
</script>

<header
	class="grid items-center relative w-default overflow-hidden p-4 rounded mt-4"
>
	<img
		class="absolute"
		src="/assets/images/thumbnails/{thumbnail}"
		alt={mapName}
	/>
	<div class="absolute h-full w-full bg-neutral-950/40 z-10" />
	<h1 class="relative text-3xl font-bold text-center z-10">{mapName}</h1>
</header>

<slot />
