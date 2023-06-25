<script lang="ts">
	import { fade } from 'svelte/transition';
	import FilterForm from './FilterForm.svelte';
	import FilterChips from './FilterChips.svelte';
	import type { Filter } from '../types/Filter';
	import { useQueryParams } from '../composable/useQueryParams';
	import type { FilterFormEvent } from '../types/FilterFormEvent';

	export let map: string;

	export let filters: Filter[] = [];
	$: numberOfFilters = filters.length;

	let showFilterForm = false;

	let { set } = useQueryParams(
		filters.map((filter) => ({
			label: filter.label,
			value: filter.value,
		})),
		`/maps/${map}`
	);

	const clearFilters = () => {
		filters = [];
		set([]);
	};

	const deleteFilter = (event: CustomEvent<{ id: number }>) => {
		filters = filters.filter((f) => f.id !== event.detail.id);
		set(
			filters.map((filter) => ({
				label: filter.label,
				value: filter.value,
			}))
		);
	};

	const handleSubmit = (event: CustomEvent<FilterFormEvent>) => {
		const stratName = event.detail.stratName;
		if (stratName !== null) {
			const found = filters.find(
				(filter) => filter.label === 'Strat' && filter.value === stratName
			);
			if (!found) {
				filters = [
					...filters,
					{ id: getNextIndex(), label: 'Strat', value: stratName },
				];
			}
		}

		const teamName = event.detail.teamName;
		if (teamName !== null) {
			const found = filters.find(
				(filter) => filter.label === 'Team' && filter.value === teamName
			);
			if (!found) {
				filters = [
					...filters,
					{ id: getNextIndex(), label: 'Team', value: teamName },
				];
			}
		}

		const position = event.detail.position;
		if (position !== null) {
			const found = filters.find(
				(filter) =>
					filter.label === 'Position' && filter.value === position.name
			);
			if (!found) {
				filters = [
					...filters,
					{
						id: getNextIndex(),
						label: 'Position',
						value: position.name,
					},
				];
			}
		}

		const teamSide = event.detail.teamSide;
		if (teamSide !== null) {
			const found = filters.find(
				(filter) => filter.label === 'Side' && filter.value === teamSide
			);
			if (!found) {
				filters = [
					...filters,
					{ id: getNextIndex(), label: 'Side', value: teamSide },
				];
			}
		}

		set(
			filters.map((filter) => ({
				label: filter.label,
				value: filter.value,
			}))
		);
	};

	const getNextIndex = () => {
		const lastFilter = filters[filters.length - 1];
		if (lastFilter) {
			return lastFilter.id + 1;
		}
		return 0;
	};
</script>

<div class="grid gap-4">
	<!-- Filter header -->
	<div class="flex items-center gap-4">
		<p>Filters ({numberOfFilters}):</p>
		<button
			on:click={() => (showFilterForm = !showFilterForm)}
			class="text-neutral-400 underline">Change</button
		>
		<button on:click={clearFilters} class="text-neutral-400 underline"
			>Clear all</button
		>
	</div>
	<!-- Filter form -->
	{#if showFilterForm}
		<div transition:fade={{ duration: 100 }}>
			<FilterForm on:submit={handleSubmit} />
		</div>
	{/if}
	<!-- Filter chips -->
	<FilterChips on:delete={deleteFilter} {filters} />
</div>
