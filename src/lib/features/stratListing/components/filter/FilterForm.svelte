<script lang="ts">
	import TextInput from '$lib/components/inputs/TextInput.svelte';
	import { createEventDispatcher } from 'svelte';
	import type { FilterFormEvent } from '../../types/FilterFormEvent';
	import FormButton from '$lib/components/buttons/FormButton.svelte';
	import type { Filter } from '../../types/Filter';

	const dispatch = createEventDispatcher<{
		submit: FilterFormEvent;
	}>();

	let strat = '';
	let team = '';
	let author = '';

	const handleSubmit = () => {
		dispatch('submit', {
			stratName: '',
			teamName: '',
			position: '',
			teamSide: '',
		});
	};
</script>

<form on:submit|preventDefault={handleSubmit} class="grid gap-10">
	<fieldset class="grid gap-2 mb-2">
		<legend class="text-sm font-bold">Map options:</legend>
		<!-- TODO: Make multiselect dropdown -->
		<p class="text-neutral-400 text-sm">Multiselect dropdown comming!</p>
	</fieldset>
	<fieldset class="grid gap-2">
		<legend class="text-sm font-bold mb-2">Other options:</legend>
		<TextInput
			id="strat"
			name="strat"
			placeholder="Strat name..."
			bind:value={strat}
		/>
		<TextInput
			id="team"
			name="team"
			placeholder="Team name..."
			bind:value={team}
		/>
		<TextInput
			id="author"
			name="author"
			placeholder="Strat author..."
			bind:value={author}
		/>
	</fieldset>
	<FormButton>Save filters</FormButton>
</form>
