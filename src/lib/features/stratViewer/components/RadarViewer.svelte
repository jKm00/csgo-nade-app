<script lang="ts">
	import { page } from '$app/stores';
	import { maps } from '$lib/shared/maps';
	import type { SupabaseClient } from '@supabase/supabase-js';
	import NadeMarker from './NadeMarker.svelte';

	export let map: string;
	export let supabase: SupabaseClient;

	$: radar = maps.find((m) => m.name === map)?.radar;
</script>

<div>
	<div class="relative aspect-square bg-neutral-800 rounded overflow-hidden">
		{#await $page.data.lazy.strat then strat}
			{#if strat !== null}
				{#each strat.nades as nade, index}
					<NadeMarker {nade} {index} {supabase} />
				{/each}
			{/if}
		{/await}
		<img
			class="w-full"
			src="/assets/images/radars/{radar}"
			alt="Radar of {map}"
		/>
	</div>
</div>
