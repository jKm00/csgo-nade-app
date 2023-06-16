<script lang="ts">
	import StratEditorNav from '$lib/features/stratEditor/components/StratEditorNav.svelte';
	import StratInfo from '$lib/features/stratEditor/components/StratInfo.svelte';
	import { FormSteps } from '$lib/features/stratEditor/util/formSteps';

	let activeStep = FormSteps.INFO;

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
	{/if}
</main>
