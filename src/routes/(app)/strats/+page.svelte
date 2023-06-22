<script lang="ts">
	import { goto } from '$app/navigation';
	import MainButton from '$lib/components/buttons/MainButton.svelte';
	import NadeEditor from '$lib/features/stratEditor/components/NadeEditor.svelte';
	import StratEditorNav from '$lib/features/stratEditor/components/StratEditorNav.svelte';
	import StratInfo from '$lib/features/stratEditor/components/StratInfo.svelte';
	import StratOverview from '$lib/features/stratEditor/components/StratOverview.svelte';
	import { FormSteps } from '$lib/features/stratEditor/types/formSteps';
	import type { Nade } from '$lib/features/stratEditor/types/nade';
	import toast from 'svelte-french-toast';
	import { Chasing } from 'svelte-loading-spinners';

	export let data;

	$: ({ maps, teams, authUser } = data);

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
	let isLoading = false;

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

	const handleCreateStrat = async () => {
		isLoading = true;
		if (stratInfo.map === null) {
			toast.error('Map is not selected!', {
				style: 'background: #333; color:#fff',
			});
			return;
		}
		if (stratInfo.position === null) {
			toast.error('Position is not selected!', {
				style: 'background: #333; color:#fff',
			});
			return;
		}

		// Create form data with general strat info
		const formData = new FormData();

		formData.append('name', stratInfo.name);
		formData.append('description', stratInfo.description);
		formData.append('mapId', `${stratInfo.map.id}`);
		formData.append('side', stratInfo.side);
		formData.append('positionId', `${stratInfo.position.id}`);
		formData.append('privacy', stratInfo.privacy);
		formData.append('teamId', `${stratInfo.team?.id}`);
		formData.append('playerId', `${authUser?.id}`);

		// Add nades to form
		formData.append('numberOfNades', `${nades.length}`);

		nades.forEach((nade, index) => {
			formData.append(`nadeName${index}`, nade.name);
			formData.append(`nadeNotes${index}`, nade.notes);
			formData.append(`nadeType${index}`, `${nade.type}`);
			formData.append(`nadeLineupX${index}`, `${nade.lineupX}`);
			formData.append(`nadeLineupY${index}`, `${nade.lineupY}`);
			formData.append(`nadeImpactX${index}`, `${nade.impactPointX}`);
			formData.append(`nadeImpactY${index}`, `${nade.impactPointY}`);
			if (nade.lineupImg) {
				formData.append(
					`nadeLineupImg${index}`,
					nade.lineupImg,
					`${nade.lineupImg.name}`
				);
			}
			if (nade.impactImg) {
				formData.append(
					`nadeImpactImg${index}`,
					nade.impactImg,
					`${nade.impactImg.name}`
				);
			}
		});

		try {
			const response = await fetch('/api/strats', {
				method: 'POST',
				body: formData,
			});

			if (response) {
				const stratId = await response.json();
				goto(`/maps/${stratInfo.map.name}/strats/${stratId}`);
			}
		} catch (err) {
			console.log(err);
		} finally {
			isLoading = false;
		}
	};
</script>

<main class="w-default">
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
			<MainButton on:click={handleCreateStrat} disabled={isLoading}
				>Create strat</MainButton
			>
			{#if isLoading}
				<div class="grid justify-center">
					<Chasing size="60" color="#F87171" unit="px" duration="1s" />
				</div>
			{/if}
		</div>
	{/if}
</main>
