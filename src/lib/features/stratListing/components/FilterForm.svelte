<script lang="ts">
	import FormButton from '$lib/components/buttons/FormButton.svelte';
	import MainButton from '$lib/components/buttons/MainButton.svelte';
	import FormDropdown from '$lib/components/inputs/FormDropdown.svelte';
	import TextInput from '$lib/components/inputs/TextInput.svelte';
	import { createEventDispatcher } from 'svelte';
	import type { FilterFormEvent } from '../types/FilterFormEvent';

	const dispatch = createEventDispatcher<{
		submit: FilterFormEvent;
	}>();

	let stratName: string = '';
	let teamName: string = '';
	let position: { name: string; id: number } | null;
	let teamSide: string | null;

	const teamSideOptions = [
		{ label: 'CT', value: 'CT' },
		{ label: 'T', value: 'T' },
	];

	$: positionOptions = [
		{ label: 'A site', value: { name: 'A site', id: 0 } },
		{ label: 'B site', value: { name: 'B site', id: 1 } },
		{ label: 'Mid', value: { name: 'Mid', id: 2 } },
		{ label: 'Short', value: { name: 'Short', id: 3 } },
	];

	const handleSubmit = () => {
		dispatch('submit', {
			stratName: stratName !== '' ? stratName : null,
			teamName: teamName !== '' ? teamName : null,
			position,
			teamSide,
		});
	};
</script>

<form on:submit|preventDefault={handleSubmit} class="flex items-center gap-4">
	<TextInput
		id="stratName"
		name="stratName"
		placeholder="Strat name"
		bind:value={stratName}
	/>
	<TextInput
		id="teamName"
		name="teamName"
		placeholder="Team name"
		bind:value={teamName}
	/>
	<FormDropdown
		id="position"
		name="position"
		placeholder="Position"
		options={positionOptions}
		bind:value={position}
	/>
	<FormDropdown
		id="side"
		name="side"
		placeholder="Team side"
		options={teamSideOptions}
		bind:value={teamSide}
	/>
	<MainButton>Add filters</MainButton>
</form>
