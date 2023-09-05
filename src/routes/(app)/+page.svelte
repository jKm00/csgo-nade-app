<script lang="ts">
	import { browser } from '$app/environment';
	import MapThumbnail from '$lib/components/containers/MapThumbnail.svelte';
	import GuideLink from '$lib/components/feedback/GuideLink.svelte';
	import { maps } from '$lib/shared/maps';
	import { onMount } from 'svelte';

	let showGuideLink = false;

	onMount(() => {
		if (browser) {
			const result = window.localStorage.getItem('showGuideLink');

			showGuideLink = result ? JSON.parse(result) : true;
		}
	});

	const disableGuideLink = () => {
		showGuideLink = false;

		if (browser) {
			window.localStorage.setItem('showGuideLink', JSON.stringify(false));
		}
	};
</script>

<main class="px-4 pt-5">
	{#if showGuideLink}
		<GuideLink on:dismiss={disableGuideLink} />
	{/if}
	<div class="grid gap-4 grid-cols-main mt-5">
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
	</div>
</main>
