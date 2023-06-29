<script lang="ts">
	import FilterDrawer from './FilterDrawer.svelte';
	import type { Filter } from '../../types/Filter';
	import type { FilterFormEvent } from '../../types/FilterFormEvent';
	import { useQueryParams } from '../../composable/useQueryParams';
	import { FilterType } from '../../types/FilterType';

	export let loadedFilters: Filter[];

	let showDrawer = false;

	// Initialize filters from url params
	let filters: Filter[] = loadedFilters;

	const { set } = useQueryParams(
		filters.map((filter) => ({ key: filter.label, value: filter.value })),
		'/strats'
	);

	// Change url params when filter changes
	$: {
		set(
			filters.map((filter) => ({
				key: filter.label,
				value: filter.value,
			}))
		);
	}

	/**
	 * Handles the event when the filter form is submitted
	 *
	 * @param event dispatched from the form
	 */
	const handleFilterSubmit = (event: CustomEvent<FilterFormEvent>) => {
		const formData = event.detail;

		if (formData.stratName !== null) {
			tryAddFilter(FilterType.STRAT, formData.stratName);
		}

		if (formData.teamName !== null) {
			tryAddFilter(FilterType.TEAM, formData.teamName);
		}

		if (formData.author !== null) {
			tryAddFilter(FilterType.AUTHOR, formData.author);
		}

		if (formData.maps !== null) {
			formData.maps.forEach((map) => tryAddFilter(FilterType.MAP, map));
		}

		if (formData.positions !== null) {
			formData.positions.forEach((position) =>
				tryAddFilter(FilterType.POSITION, position)
			);
		}

		if (formData.sides !== null) {
			formData.sides.forEach((side) => tryAddFilter(FilterType.SIDE, side));
		}
	};

	/**
	 * Tries to add a filter to the filter list. Duplicated filters are
	 * not added
	 *
	 * @param type of filter
	 * @param value of the filter
	 */
	const tryAddFilter = (type: FilterType, value: string) => {
		const found = filters.find(
			(filter) => filter.label === type.toLowerCase() && filter.value === value
		);
		if (!found) {
			filters = [
				...filters,
				{
					id: getIndex(),
					label: type.toLowerCase(),
					value: value,
				},
			];
		}
	};

	/**
	 * Returns the next index for a new filter
	 */
	const getIndex = () => {
		if (filters.length === 0) return 0;
		return filters[filters.length - 1].id + 1;
	};

	/**
	 * Clears all filters
	 */
	const clearFilters = () => {
		filters = [];
	};

	/**
	 * Deletes a filter
	 *
	 * @param id of the filter to delete
	 */
	const deleteFilter = (id: number) => {
		filters = filters.filter((filter) => filter.id !== id);
	};
</script>

<div class="grid gap-2">
	<!-- Buttons -->
	<div class="flex gap-[1px] text-sm">
		<button
			on:click={() => (showDrawer = true)}
			class="flex items-center gap-1 bg-neutral-700 py-1 px-3 rounded-s hover:bg-neutral-600 focus-within:bg-neutral-600 active:bg-neutral-500"
		>
			<svg
				class="fill-white"
				xmlns="http://www.w3.org/2000/svg"
				height="1em"
				viewBox="0 0 512 512"
				><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
					d="M0 416c0 17.7 14.3 32 32 32l54.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 448c17.7 0 32-14.3 32-32s-14.3-32-32-32l-246.7 0c-12.3-28.3-40.5-48-73.3-48s-61 19.7-73.3 48L32 384c-17.7 0-32 14.3-32 32zm128 0a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM320 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm32-80c-32.8 0-61 19.7-73.3 48L32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l246.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48l54.7 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-54.7 0c-12.3-28.3-40.5-48-73.3-48zM192 128a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm73.3-64C253 35.7 224.8 16 192 16s-61 19.7-73.3 48L32 64C14.3 64 0 78.3 0 96s14.3 32 32 32l86.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 128c17.7 0 32-14.3 32-32s-14.3-32-32-32L265.3 64z"
				/></svg
			>Filters ({filters.length})
		</button>
		<button
			class="flex items-center gap-1 bg-neutral-700 py-1 px-3 rounded-e hover:bg-neutral-600 focus-within:bg-neutral-600 active:bg-neutral-500"
			on:click={() => (filters = [])}
			><svg
				xmlns="http://www.w3.org/2000/svg"
				height="1em"
				viewBox="0 0 576 512"
				><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
					d="M290.7 57.4L57.4 290.7c-25 25-25 65.5 0 90.5l80 80c12 12 28.3 18.7 45.3 18.7H288h9.4H512c17.7 0 32-14.3 32-32s-14.3-32-32-32H387.9L518.6 285.3c25-25 25-65.5 0-90.5L381.3 57.4c-25-25-65.5-25-90.5 0zM297.4 416H288l-105.4 0-80-80L227.3 211.3 364.7 348.7 297.4 416z"
				/></svg
			>Clear</button
		>
	</div>
</div>

<FilterDrawer
	on:submit={handleFilterSubmit}
	on:clear={clearFilters}
	on:delete={(event) => deleteFilter(event.detail.id)}
	bind:showDrawer
	{filters}
/>
