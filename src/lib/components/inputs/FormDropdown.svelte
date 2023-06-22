<script lang="ts">
	import { clickOutside } from 'svelte-use-click-outside';
	import ErrorMessage from '../feedback/ErrorMessage.svelte';
	import { createEventDispatcher } from 'svelte';

	type T = $$Generic;

	interface Option {
		value: T;
		label: string;
	}

	export let id: string;
	export let name: string;
	export let placeholder: string;
	export let value: T | null = null;
	export let options: Option[];
	export let errors: string[] | undefined = undefined;
	export let defaultOptions: string | undefined = undefined;
	export let selected: Option | null =
		options?.find((opt) => opt.value === value) ?? null;

	const dispatch = createEventDispatcher<{ update: { value: T | null } }>();

	$: value = selected?.value ?? null;

	let dropDown: HTMLElement;
	let showDropDown = false;

	const handleKeyUp = (event: KeyboardEvent) => {
		if (event.code === 'Escape') {
			showDropDown = false;
		}
	};

	const updateSelected = (option: Option | null) => {
		selected = option;
		showDropDown = false;
	};

	$: dispatch('update', { value });
</script>

<input type="hidden" {id} {name} bind:value />
<div
	class="relative w-40 text-sm text-neutral-400"
	use:clickOutside={() => (showDropDown = false)}
	bind:this={dropDown}
	on:keyup={handleKeyUp}
>
	<!-- Selected value or placeholder -->
	<button
		class="flex gap-2 justify-between min-w-full items-center p-2 rounded bg-neutral-800 hover:bg-neutral-700 focus-within:bg-neutral-700 active:bg-neutral-600"
		on:click|preventDefault={() => (showDropDown = !showDropDown)}
		>{selected && selected !== null ? selected.label : placeholder}<svg
			class={`${
				showDropDown ? '' : '-rotate-90'
			} fill-neutral-400 h-3 transition-transform`}
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 448 512"
			><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
				d="M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"
			/></svg
		></button
	>
	<!-- Options -->
	<div
		class="{showDropDown
			? ''
			: 'hidden'} absolute grid gap-2 bg-neutral-800 py-2 rounded min-w-full max-h-52 overflow-y-auto shadow z-10"
	>
		<button
			class="text-left p-2 hover:bg-neutral-700 focus-within:bg-neutral-700 active:bg-neutral-600"
			on:click|preventDefault={() => updateSelected(null)}
			>{defaultOptions ?? 'No value'}</button
		>
		{#if options}
			{#each options as option}
				<button
					on:click|preventDefault={() => updateSelected(option)}
					class="text-left p-2 hover:bg-neutral-700 focus-within:bg-neutral-700 active:bg-neutral-600"
					>{option.label}</button
				>
			{/each}
		{/if}
	</div>
	{#if errors}
		<ErrorMessage>{errors[0]}</ErrorMessage>
	{/if}
</div>
