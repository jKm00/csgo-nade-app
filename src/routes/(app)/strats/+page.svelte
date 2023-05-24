<script lang="ts">
	import TextInput from '$lib/components/inputs/TextInput.svelte';
	import TextAreaInput from '$lib/components/inputs/TextAreaInput.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import Dropdown from '$lib/components/inputs/Dropdown.svelte';

	enum FormSteps {
		INFO,
		NADES,
		OVERVIEW,
	}

	export let data;

	$: ({ map } = data);

	let activeStep = FormSteps.INFO;

	const { form, errors, enhance, delayed } = superForm(data.form);
	let selectedPrivacy = '';
	let selectedTeam = '';

	const goBack = () => {
		switch (activeStep) {
			case FormSteps.INFO:
				break;
			case FormSteps.NADES:
				activeStep = FormSteps.INFO;
				break;
			case FormSteps.OVERVIEW:
				activeStep = FormSteps.NADES;
				break;
		}
	};

	const goNext = () => {
		switch (activeStep) {
			case FormSteps.INFO:
				activeStep = FormSteps.NADES;
				break;
			case FormSteps.NADES:
				activeStep = FormSteps.OVERVIEW;
				break;
			case FormSteps.OVERVIEW:
				break;
		}
	};
</script>

<main class="w-default my-10">
	<!-- Form steps -->
	<ol class="flex mb-10">
		<li
			class="flex-grow text-center py-4 border-red-400 {activeStep ===
			FormSteps.INFO
				? 'border-b-4 text-red-400'
				: ''}"
		>
			<button on:click={() => (activeStep = FormSteps.INFO)}
				>1. General info</button
			>
		</li>
		<li
			class="flex-grow text-center py-4 border-red-400 {activeStep ===
			FormSteps.NADES
				? 'border-b-4 text-red-400'
				: ''}"
		>
			<button on:click={() => (activeStep = FormSteps.NADES)}>2. Nades</button>
		</li>
		<li
			class="flex-grow text-center py-4 border-red-400 {activeStep ===
			FormSteps.OVERVIEW
				? 'border-b-4 text-red-400'
				: ''}"
		>
			<button on:click={() => (activeStep = FormSteps.OVERVIEW)}
				>3. Overview</button
			>
		</li>
	</ol>

	<!-- Info form -->
	{#if activeStep === FormSteps.INFO}
		<form class="grid gap-4 mb-10" action="" method="POST" use:enhance>
			<TextInput
				id="name"
				name="name"
				label="Name:"
				value={$form.name}
				errors={$errors.name}
				placeholder="Name of strat"
			/>
			<TextAreaInput
				id="description"
				name="description"
				label="Description:"
				value={$form.description ?? ''}
				errors={$errors.description}
				placeholder="Short description (optional)"
			/>
			<div class="flex gap-4">
				<Dropdown
					placeholder="Privacy"
					options={[
						{ label: 'Public', value: 'PUBLIC' },
						{ label: 'Private', value: 'PRIVATE' },
					]}
					on:update={(event) => (selectedPrivacy = event.detail.value)}
				/>
				<Dropdown
					placeholder="Team"
					options={[
						{ label: 'Faze', value: 'Faze' },
						{ label: 'DOT Esport', value: 'DOT' },
					]}
					on:update={(event) => (selectedTeam = event.detail.value)}
				/>
			</div>
		</form>
	{/if}

	<!-- Back and forth buttons -->
	<div class="flex justify-between">
		{#if activeStep !== FormSteps.INFO}
			<button class="flex gap-2 items-center rounded p-2" on:click={goBack}
				><svg
					class="w-2 fill-white"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 320 512"
					><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
						d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"
					/></svg
				>Back</button
			>
		{:else}
			<span />
		{/if}
		{#if activeStep === FormSteps.OVERVIEW}
			<button class="flex gap-2 items-center bg-red-400 rounded p-2"
				>Complete</button
			>
		{:else}
			<button
				class="flex gap-2 items-center bg-red-400 rounded p-2"
				on:click={goNext}
				>Next<svg
					class="w-2 fill-white"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 320 512"
					><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
						d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
					/></svg
				></button
			>
		{/if}
	</div>
</main>
