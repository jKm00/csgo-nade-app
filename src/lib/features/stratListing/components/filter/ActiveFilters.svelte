<script lang="ts">
	import type { Filter } from '../../types/Filter';
	import FilterChip from './FilterChip.svelte';

	export let filters: Filter[];
</script>

<h2 class="text-sm font-bold">Active filters:</h2>
<ul>
	{#each filters as filter}
		<FilterChip label={filter.label} value={filter.value} />
	{/each}
</ul>
