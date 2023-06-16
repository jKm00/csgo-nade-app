<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { FormSteps } from '../util/formSteps';

	export let activeStep: FormSteps;

	const dispatch = createEventDispatcher<{
		updateFormStep: { step: FormSteps };
	}>();

	const changeStep = (step: FormSteps) => {
		dispatch('updateFormStep', {
			step,
		});
	};

	const navNext = () => {
		switch (activeStep) {
			case FormSteps.INFO:
				changeStep(FormSteps.NADES);
				break;
			case FormSteps.NADES:
				changeStep(FormSteps.OVERVIEW);
				break;
			case FormSteps.OVERVIEW:
				break;
		}
	};

	const navPrev = () => {
		switch (activeStep) {
			case FormSteps.INFO:
				break;
			case FormSteps.NADES:
				changeStep(FormSteps.INFO);
				break;
			case FormSteps.OVERVIEW:
				changeStep(FormSteps.NADES);
				break;
		}
	};
</script>

<ol class="flex mb-5">
	<li class="flex mr-4 items-end">
		<button
			class="{activeStep === FormSteps.INFO
				? 'bg-neutral-800'
				: 'bg-red-400 hover:bg-red-500 focus-within:bg-red-500 active:bg-red-600'} rounded p-3"
			on:click|preventDefault={navPrev}
			disabled={activeStep === FormSteps.INFO}
			><svg
				class="fill-white"
				xmlns="http://www.w3.org/2000/svg"
				height="1em"
				viewBox="0 0 320 512"
				><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
					d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"
				/></svg
			></button
		>
	</li>
	<li
		class="grid flex-grow text-center border-red-400 {activeStep ===
		FormSteps.INFO
			? 'border-b-4 text-red-400'
			: ''}"
		data-hidden={activeStep !== FormSteps.INFO}
	>
		<button
			class="py-4"
			on:click|preventDefault={() => changeStep(FormSteps.INFO)}
			>1. General info</button
		>
	</li>
	<li
		class="grid flex-grow text-center border-red-400 {activeStep ===
		FormSteps.NADES
			? 'border-b-4 text-red-400'
			: ''}"
		data-hidden={activeStep !== FormSteps.NADES}
	>
		<button
			class="py-4"
			on:click|preventDefault={() => changeStep(FormSteps.NADES)}
			>2. Nades</button
		>
	</li>
	<li
		class="grid flex-grow text-center border-red-400 {activeStep ===
		FormSteps.OVERVIEW
			? 'border-b-4 text-red-400'
			: ''}"
		data-hidden={activeStep !== FormSteps.OVERVIEW}
	>
		<button
			class="py-4"
			on:click|preventDefault={() => changeStep(FormSteps.OVERVIEW)}
			>3. Overview</button
		>
	</li>
	<li class="flex ml-4 items-end">
		<button
			class="{activeStep === FormSteps.OVERVIEW
				? 'bg-neutral-800'
				: 'bg-red-400 hover:bg-red-500 focus-within:bg-red-500 active:bg-red-600'} rounded p-3"
			on:click|preventDefault={navNext}
			disabled={activeStep === FormSteps.OVERVIEW}
			><svg
				class="fill-white"
				xmlns="http://www.w3.org/2000/svg"
				height="1em"
				viewBox="0 0 320 512"
				><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
					d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
				/></svg
			></button
		>
	</li>
</ol>

<style scoped>
	@media (max-width: 900px) {
		li[data-hidden='true'] {
			display: none;
		}
	}
</style>
