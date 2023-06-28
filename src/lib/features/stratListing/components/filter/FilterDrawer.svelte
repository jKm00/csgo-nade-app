<script lang="ts">
	import Drawer from '$lib/components/containers/Drawer.svelte';
	import type { Filter } from '../../types/Filter';
	import ActiveFilters from './ActiveFilters.svelte';
	import FilterForm from './FilterForm.svelte';

	export let filters: Filter[];
	export let showDrawer: boolean;

	const clearFilters = () => {
		filters = [];
	};
</script>

<Drawer bind:show={showDrawer} width="min(90vw, 25rem)" side="left">
	<div slot="title">
		<h1 class="text-2xl font-bold text-red-400">
			Filters ({filters.length}):
		</h1>
	</div>
	<div slot="body" class="grid gap-10 p-4">
		<FilterForm
			on:submit
			on:close={() => (showDrawer = false)}
			on:clear={clearFilters}
		/>
		<ActiveFilters {filters} />
	</div>
</Drawer>
