<script lang="ts">
	import Drawer from '$lib/components/containers/Drawer.svelte';
	import type { Filter } from '../../types/Filter';
	import ActiveFilters from './ActiveFilters.svelte';
	import FilterForm from './FilterForm.svelte';

	export let filters: Filter[];
	export let showDrawer: boolean;
</script>

<Drawer bind:show={showDrawer} width="min(90vw, 25rem)" side="left">
	<div slot="title">
		<h1 class="text-2xl font-bold text-red-400">Filters (3):</h1>
		<div class="flex gap-4">
			<button class="text-neutral-400 underline">Clear all</button>
			<button
				class="text-neutral-400 underline"
				on:click={() => (showDrawer = false)}>Close</button
			>
		</div>
	</div>
	<div slot="body" class="grid gap-10 p-4">
		<FilterForm />
		<ActiveFilters {filters} />
	</div>
</Drawer>
