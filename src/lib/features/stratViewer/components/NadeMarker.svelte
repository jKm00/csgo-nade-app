<script lang="ts">
	import { page } from '$app/stores';
	import SecondaryButton from '$lib/components/buttons/SecondaryButton.svelte';
	import Dialog from '$lib/components/containers/Dialog.svelte';
	import { useMarkerColor } from '$lib/composables/useMarkerColor';
	import type { SupabaseClient } from '@supabase/supabase-js';
	import type { Nade } from '../dtos/nade';

	export let index: number;
	export let nade: Nade;
	export let supabase: SupabaseClient;

	$: color = useMarkerColor(nade.type);

	let showDialog = false;
	let lineupImgUrl: string | undefined = undefined;
	let impactImgUrl: string | undefined = undefined;

	const openDialog = async () => {
		lineupImgUrl = supabase.storage.from('strats').getPublicUrl(nade.lineupImg)
			.data.publicUrl;
		impactImgUrl = supabase.storage.from('strats').getPublicUrl(nade.impactImg)
			.data.publicUrl;

		showDialog = true;
	};
</script>

<button
	class="absolute grid place-items-center text-2xl -translate-x-1/2 -translate-y-1/2 z-10 aspect-square rounded"
	style="left: {nade.lineupX}%; top: {nade.lineupY}%"
	on:click={openDialog}
	><svg
		style="fill: {color}"
		xmlns="http://www.w3.org/2000/svg"
		height="1em"
		viewBox="0 0 384 512"
		><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
			d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
		/></svg
	><span class="absolute text-xs pointer-events-none">{index + 1}</span></button
>
<button
	class="absolute grid place-items-center w-5 aspect-square rounded-full -translate-x-1/2 -translate-y-1/2 z-10"
	style="background-color: {color}; left: {nade.impactX}%; top: {nade.impactY}%"
	on:click={openDialog}
>
	<span class="absolute text-xs pointer-events-none">{index + 1}</span>
</button>

<Dialog bind:show={showDialog} title={nade.name}>
	<div slot="body" class="grid mt-4">
		<div class="flex gap-4">
			<div>
				<h2 class="font-bold">Lineup image:</h2>
				{#if lineupImgUrl}
					<img
						class="w-[40vw] rounded aspect-video object-cover"
						src={lineupImgUrl}
						alt="Lineup for {nade.name}"
					/>
				{:else}
					<div
						class="grid place-items-center px-4 w-[40vw] bg-neutral-800 border-2 border-dashed rounded aspect-video"
					>
						<p>No lineup image for this nade</p>
					</div>
				{/if}
			</div>
			<div>
				<h2 class="font-bold">Impact image:</h2>
				{#if impactImgUrl}
					<img
						class="w-[40vw] rounded aspect-video object-cover"
						src={impactImgUrl}
						alt="Impact for {nade.name}"
					/>
				{:else}
					<div
						class="grid place-items-center px-4 w-[40vw] bg-neutral-800 border-2 border-dashed rounded aspect-video"
					>
						<p>No impact image for this nade</p>
					</div>
				{/if}
			</div>
		</div>
		<h1 class="text-xl font-bold mt-10">Notes:</h1>
		<p>Notes are soon to be implemented!</p>
	</div>
	<div slot="form" class="flex justify-end">
		<SecondaryButton on:click={() => (showDialog = false)}
			>Close</SecondaryButton
		>
	</div>
</Dialog>
