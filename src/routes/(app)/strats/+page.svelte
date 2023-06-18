<script lang="ts">
	import NadeEditor from '$lib/features/stratEditor/components/NadeEditor.svelte';
	import StratEditorNav from '$lib/features/stratEditor/components/StratEditorNav.svelte';
	import StratInfo from '$lib/features/stratEditor/components/StratInfo.svelte';
	import { FormSteps } from '$lib/features/stratEditor/types/formSteps';
	import type { Nade } from '$lib/features/stratEditor/types/nade';

	let activeStep = FormSteps.NADES;
	let nades: Nade[];
	let showTutorial = true;

	const goToStep = (step: FormSteps) => {
		// TODO: Validate forms

		activeStep = step;
	};
</script>

<main class="w-default">
	<StratEditorNav
		bind:activeStep
		on:updateFormStep={(event) => goToStep(event.detail.step)}
	/>
	{#if activeStep === FormSteps.INFO}
		<StratInfo />
	{:else if activeStep === FormSteps.NADES}
		<NadeEditor map="mirage" bind:nades bind:showTutorial />
	{/if}
</main>
