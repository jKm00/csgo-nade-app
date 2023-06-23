<script lang="ts">
	import Dialog from '$lib/components/containers/Dialog.svelte';
	import type { SupabaseClient } from '@supabase/supabase-js';
	import type { Nade } from '../dtos/nade';
	import SecondaryButton from '$lib/components/buttons/SecondaryButton.svelte';

	export let show: boolean = false;
	export let nade: Nade;
	export let supabase: SupabaseClient;

	$: console.log(nade);

	let lineupImgUrl: string | undefined = undefined;
	let impactImgUrl: string | undefined = undefined;

	$: if (show) {
		fetchImgUrls();
	}

	const fetchImgUrls = () => {
		lineupImgUrl = supabase.storage.from('strats').getPublicUrl(nade.lineupImg)
			.data.publicUrl;
		impactImgUrl = supabase.storage.from('strats').getPublicUrl(nade.impactImg)
			.data.publicUrl;
	};
</script>

<Dialog bind:show title={nade.name}>
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
						<p>{nade.notes}</p>
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
