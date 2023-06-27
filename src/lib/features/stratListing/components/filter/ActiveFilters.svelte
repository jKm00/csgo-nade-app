<script lang="ts">
	import type { Filter } from '../../types/Filter';
	import FilterChip from './FilterChip.svelte';

	export let filters: Filter[];
</script>

<div class="grid gap-2">
	<h2 class="text-sm font-bold">Active filters:</h2>
	<ul class="flex flex-wrap gap-2">
		{#each filters as filter}
			<FilterChip label={filter.label} value={filter.value} />
		{/each}
	</ul>
</div>
