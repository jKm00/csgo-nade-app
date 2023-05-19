<script lang="ts">
	import MapThumbnail from '$lib/components/containers/MapThumbnail.svelte';
	import Toast from '$lib/components/toasts/Toast.svelte';

	const MAPS = [
		{
			name: 'Inferno',
			thumbnail: 'inferno_compressed.webp',
		},
		{
			name: 'Mirage',
			thumbnail: 'mirage_compressed.webp',
		},
		{
			name: 'Nuke',
			thumbnail: 'nuke_compressed.webp',
		},
		{
			name: 'Overpass',
			thumbnail: 'overpass_compressed.webp',
		},
		{
			name: 'Vertigo',
			thumbnail: 'vertigo_compressed.webp',
		},
		{
			name: 'Ancient',
			thumbnail: 'ancient_compressed.webp',
		},
		{
			name: 'Anubis',
			thumbnail: 'anubis_compressed.webp',
		},
	];

	export let data;

	$: ({ session, user } = data);
</script>

{#if session && !user}
	<Toast uuid={session.user.id}>
		Your account is not completely setup.
		<a class="underline" href="/users/{session.user.id}/settings">
			Go to account settings
		</a>
		to finish setting up your profile
	</Toast>
{/if}

<main class="grid gap-4 grid-cols-main mt-20 px-4">
	{#each MAPS as map}
		<MapThumbnail
			img={map.thumbnail}
			imgAlt={`${map.name} thumbnail`}
			name={map.name}
		/>
	{/each}
</main>
