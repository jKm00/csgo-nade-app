<script lang="ts">
	import NadeEditor from '$lib/features/stratEditor/components/NadeEditor.svelte';
	import StratEditorNav from '$lib/features/stratEditor/components/StratEditorNav.svelte';
	import StratInfo from '$lib/features/stratEditor/components/StratInfo.svelte';
	import StratOverview from '$lib/features/stratEditor/components/StratOverview.svelte';
	import { FormSteps } from '$lib/features/stratEditor/types/formSteps';
	import type { Nade } from '$lib/features/stratEditor/types/nade';
	import toast from 'svelte-french-toast';

	let stratInfo = {
		name: '',
		description: '',
		map: null as null | { id: number; name: string },
		side: '',
		position: null as null | { id: number; name: string },
		privacy: '',
		team: null as null | { id: number; name: string },
	};
	let activeStep = FormSteps.INFO;
	let nades: Nade[];
	let showTutorial = true;

	const goToStep = (step: FormSteps) => {
		switch (step) {
			case FormSteps.INFO:
				activeStep = step;
				break;
			case FormSteps.NADES:
				if (isValidInfo()) {
					activeStep = step;
				}
				break;
			case FormSteps.OVERVIEW:
				if (isValidInfo() && isValidNades()) {
					activeStep = step;
				}
				break;
		}
	};

	const isValidInfo = () => {
		if (
			stratInfo.name === '' ||
			stratInfo.description === '' ||
			stratInfo.map === null ||
			stratInfo.side === '' ||
			stratInfo.position === null ||
			stratInfo.privacy === ''
		) {
			toast.error('Need to fill out the form before continuing', {
				style: 'background: #333; color:#fff',
			});
			return false;
		}
		return true;
	};

	const isValidNades = () => {
		if (nades.length === 0) {
			toast.error('Need at least one nade!', {
				style: 'background: #333; color:#fff',
			});
			return false;
		}

		const nade = nades.find(
			(nade) => nade.name === '' || !nade.impactPointX || !nade.impactPointY
		);
		if (nade) {
			toast.error('Make sure all nades have name, type and correct markers', {
				style: 'background: #333; color:#fff',
			});
			return false;
		}
		return true;
	};
</script>

<main class="w-default">
	<StratEditorNav
		bind:activeStep
		on:updateFormStep={(event) => goToStep(event.detail.step)}
	/>
	{#if activeStep === FormSteps.INFO}
		<StratInfo
			bind:name={stratInfo.name}
			bind:description={stratInfo.description}
			bind:map={stratInfo.map}
			bind:side={stratInfo.side}
			bind:position={stratInfo.position}
			bind:privacy={stratInfo.privacy}
			bind:team={stratInfo.team}
		/>
	{:else if activeStep === FormSteps.NADES}
		<NadeEditor map={stratInfo.map?.name ?? ''} bind:nades bind:showTutorial />
	{:else if activeStep === FormSteps.OVERVIEW}
		<StratOverview
			name={stratInfo.name}
			desc={stratInfo.description}
			map={stratInfo.map?.name ?? 'N/A'}
			teamSide={stratInfo.side}
			position={stratInfo.position?.name ?? 'N/A'}
			privacy={stratInfo.privacy}
			team={stratInfo.team?.name ?? 'N/A'}
			{nades}
		/>
	{/if}
</main>
