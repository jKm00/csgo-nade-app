<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Filter } from '../types/Filter';
	import FilterChip from './FilterChip.svelte';

	const dispatch = createEventDispatcher<{ delete: { id: number } }>();

	export let filters: Filter[];

	const handleFilterDelete = (id: number) => {
		dispatch('delete', { id });
	};
</script>

<div class="flex flex-wrap gap-2">
	{#each filters as filter}
		<FilterChip
			on:click={() => handleFilterDelete(filter.id)}
			label={filter.label}
			value={filter.value}
		/>
	{/each}
</div>
