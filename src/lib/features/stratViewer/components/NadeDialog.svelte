<script lang="ts">
	import Dialog from '$lib/components/containers/Dialog.svelte';
	import type { SupabaseClient } from '@supabase/supabase-js';
	import type { Nade } from '../dtos/nade';
	import SecondaryButton from '$lib/components/buttons/SecondaryButton.svelte';

	export let show: boolean = false;
	export let nade: Nade;
	export let supabase: SupabaseClient;

	let lineupImgUrl: string | undefined = undefined;
	let impactImgUrl: string | undefined = undefined;

	$: if (show) {
		fetchImgUrls();
	}

	const fetchImgUrls = () => {
		lineupImgUrl = supabase.storage.from('strats').getPublicUrl(nade.lineupImg)
			.data.publicUrl;

		const lineupPaths = lineupImgUrl.split('/');
		if (lineupPaths[lineupPaths.length - 1] === 'null') {
			lineupImgUrl = undefined;
		}

		impactImgUrl = supabase.storage.from('strats').getPublicUrl(nade.impactImg)
			.data.publicUrl;

		const impactPaths = impactImgUrl.split('/');
		if (impactPaths[impactPaths.length - 1] === 'null') {
			impactImgUrl = undefined;
		}
	};
</script>

<Dialog bind:show title={`Nade: ${nade.name}`}>
	<div slot="body" class="grid mt-4">
		<div class="grid sm:flex gap-4">
			<div>
				<h2 class="font-bold mb-1">Lineup image:</h2>
				{#if lineupImgUrl}
					<img
						class="rounded aspect-video object-cover bg-neutral-800"
						src={lineupImgUrl}
						alt="Lineup for {nade.name}"
					/>
				{:else}
					<div
						class="grid place-items-center px-10 bg-neutral-800 border-2 border-dashed rounded aspect-video"
					>
						<p class="text-center">Author has not provided any lineup image</p>
					</div>
				{/if}
			</div>
			<div>
				<h2 class="font-bold mb-1">Impact image:</h2>
				{#if impactImgUrl}
					<img
						class="rounded aspect-video object-cover bg-neutral-800"
						src={impactImgUrl}
						alt="Impact for {nade.name}"
					/>
				{:else}
					<div
						class="grid place-items-center px-10 bg-neutral-800 border-2 border-dashed rounded aspect-video"
					>
						<p class="text-center">Author has not provided any impact image</p>
					</div>
				{/if}
			</div>
		</div>
		<h1 class="text-xl font-bold mt-10">Notes:</h1>
		{#if nade.notes}
			<p>{nade.notes}</p>
		{:else}
			<p class="text-neutral-400">
				Author has not provided any notes for this nade
			</p>
		{/if}
	</div>
	<div slot="form" class="flex justify-end">
		<SecondaryButton on:click={() => (show = false)}>Close</SecondaryButton>
	</div>
</Dialog>
