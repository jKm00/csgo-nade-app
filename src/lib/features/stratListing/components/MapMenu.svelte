<script lang="ts">
	// TODO: Remove as it is unused
	import { goto } from '$app/navigation';
	import MainLink from '$lib/components/buttons/MainLink.svelte';
	import Dropdown from '$lib/components/inputs/Dropdown.svelte';
	import { maps } from '$lib/shared/maps';

	export let selectedMap: string;

	$: dropdownOptions = maps.map((map) => ({
		label: map.name,
		value: map.name,
	}));

	const handleDropdownUpdate = (
		event: CustomEvent<{ value: string | null }>
	) => {
		goto(`/maps/${event.detail.value}`);
	};
</script>

<div class="flex justify-between items-center">
	<Dropdown
		id="map"
		name="map"
		placeholder="Select map"
		options={dropdownOptions}
		showDefaultOptions={false}
		bind:value={selectedMap}
		on:update={handleDropdownUpdate}
	/>
	<MainLink link="/strats/new">Create new strat</MainLink>
</div>
