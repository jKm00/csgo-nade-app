<script lang="ts">
	import MainButton from '$lib/components/buttons/MainButton.svelte';
	import NadeEditor from '$lib/features/stratEditor/components/NadeEditor.svelte';
	import StratEditorNav from '$lib/features/stratEditor/components/StratEditorNav.svelte';
	import StratInfo from '$lib/features/stratEditor/components/StratInfo.svelte';
	import StratOverview from '$lib/features/stratEditor/components/StratOverview.svelte';
	import { FormSteps } from '$lib/features/stratEditor/types/formSteps';
	import type { Nade } from '$lib/features/stratEditor/types/nade';
	import toast from 'svelte-french-toast';

	export let data;

	$: ({ maps, teams } = data);

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
			(nade) =>
				nade.name === '' ||
				!nade.impactPointX ||
				!nade.impactPointY ||
				!nade.type
		);
		if (nade) {
			toast.error(
				'Make sure all nades have a name, a type and correct markers',
				{
					style: 'background: #333; color:#fff',
				}
			);
			return false;
		}
		return true;
	};

	const tryCreateStrat = async () => {
		try {
			const response = await fetch('/api/strats', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					...stratInfo,
					nades,
				}),
			});

			console.log(response);
		} catch (err) {
			console.log(err);
		}
	};

	$: console.log(nades);
</script>

<main class="w-default">
	<!-- <form action="?/createStrat" method="POST" bind:this={form}>
		<input type="hidden" name="name" value={stratInfo.name} />
		<input type="hidden" name="description" value={stratInfo.description} />
		<input type="hidden" name="map" value={stratInfo.map?.id} />
		<input type="hidden" name="side" value={stratInfo.side} />
		<input type="hidden" name="position" value={stratInfo.position?.id} />
		<input type="hidden" name="privacy" value={stratInfo.privacy} />
		<input type="hidden" name="team" value={stratInfo.team?.id} />
		<input type="hidden" name="nades" value={nades} />
	</form> -->

	<StratEditorNav
		bind:activeStep
		on:updateFormStep={(event) => goToStep(event.detail.step)}
	/>
	{#if activeStep === FormSteps.INFO}
		<!-- TODO: Fix maps, maybe as chat -->
		<StratInfo
			bind:name={stratInfo.name}
			bind:description={stratInfo.description}
			bind:map={stratInfo.map}
			bind:side={stratInfo.side}
			bind:position={stratInfo.position}
			bind:privacy={stratInfo.privacy}
			bind:team={stratInfo.team}
			{maps}
			{teams}
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
		<div class="grid mt-4">
			<MainButton on:click={tryCreateStrat}>Create strat</MainButton>
		</div>
	{/if}
</main>
