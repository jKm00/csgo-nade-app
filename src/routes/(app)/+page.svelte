<script lang="ts">
	import MapThumbnail from '$lib/components/containers/MapThumbnail.svelte';
	import Dropdown from '$lib/components/inputs/Dropdown.svelte';
	import MultiSelect from '$lib/components/inputs/MultiSelect.svelte';
	import { maps } from '$lib/shared/maps';

	const selectOptions = [
		{ key: 0, label: 'Joakim', value: { id: 0, name: 'Joakim' } },
		{ key: 1, label: 'Hans', value: { id: 1, name: 'Hans' } },
		{ key: 2, label: 'Sebba', value: { id: 2, name: 'Sebba' } },
		{ key: 3, label: 'Karl', value: { id: 3, name: 'Karl' } },
		{ key: 4, label: 'Tor', value: { id: 4, name: 'Tor' } },
	];

	let values = [selectOptions[0], selectOptions[1], selectOptions[2]];

	$: console.log(values);

	let side: string;
</script>

<div class="flex gap-4">
	<div class="w-48">
		<MultiSelect
			id="test"
			name="test"
			bind:values
			options={selectOptions}
			placeholder="Select name"
			clearable={true}
		/>
	</div>
	<Dropdown
		id="side"
		name="side"
		placeholder="Select side"
		bind:value={side}
		options={[
			{ value: 'CT', label: 'CT' },
			{ value: 'T', label: 'T' },
		]}
	/>
</div>
<main class="grid gap-4 grid-cols-main my-10 px-4">
	{#if maps}
		{#each maps as map}
			<MapThumbnail
				img="/assets/images/thumbnails/{map.thumbnail}"
				imgAlt={`${map.name} thumbnail`}
				name={map.name}
			/>
		{/each}
	{:else}
		<p class="text-sm text-neutral-400">
			Obs... Seems like something is not working. We are surley working to fix
			it!
		</p>
	{/if}
</main>
