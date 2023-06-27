<script lang="ts">
	import TextInput from '$lib/components/inputs/TextInput.svelte';
	import { createEventDispatcher } from 'svelte';
	import type { FilterFormEvent } from '../../types/FilterFormEvent';
	import FormButton from '$lib/components/buttons/FormButton.svelte';
	import type { Filter } from '../../types/Filter';

	const dispatch = createEventDispatcher<{
		submit: FilterFormEvent;
		close: boolean;
		clear: boolean;
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

	const close = () => {
		dispatch('close', true);
	};

	const clearFilters = () => {
		dispatch('clear', true);
	};
</script>

<div class="grid gap-4">
	<!-- Buttons -->
	<div class="flex gap-[1px]">
		<button
			class="flex flex-1 items-center justify-center gap-1 bg-neutral-700 py-1 px-3 rounded-s hover:bg-neutral-600 focus-within:bg-neutral-600 active:bg-neutral-500"
			on:click={clearFilters}
		>
			<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"
				><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
					d="M290.7 57.4L57.4 290.7c-25 25-25 65.5 0 90.5l80 80c12 12 28.3 18.7 45.3 18.7H288h9.4H512c17.7 0 32-14.3 32-32s-14.3-32-32-32H387.9L518.6 285.3c25-25 25-65.5 0-90.5L381.3 57.4c-25-25-65.5-25-90.5 0zM297.4 416H288l-105.4 0-80-80L227.3 211.3 364.7 348.7 297.4 416z"
				/></svg
			>Clear all</button
		>
		<button
			class="flex flex-1 items-center justify-center gap-1 bg-neutral-700 py-1 px-3 rounded-e hover:bg-neutral-600 focus-within:bg-neutral-600 active:bg-neutral-500"
			on:click={close}
		>
			<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"
				><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
					d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
				/></svg
			>Close</button
		>
	</div>
	<!-- Form -->
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
</div>
