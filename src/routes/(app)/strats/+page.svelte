<script lang="ts">
	import TextInput from '$lib/components/inputs/TextInput.svelte';
	import TextAreaInput from '$lib/components/inputs/TextAreaInput.svelte';
	import FormDropdown from '$lib/components/inputs/FormDropdown.svelte';
	import MapEditor from '$lib/features/stratEditor/components/MapEditor.svelte';
	import type { Nade } from '$lib/features/stratEditor/util/nade.js';
	import StratEditorNav from '$lib/features/stratEditor/components/StratEditorNav.svelte';
	import { FormSteps } from '$lib/features/stratEditor/util/formSteps.js';
	import toast from 'svelte-french-toast';
	import StratOverview from '$lib/features/stratEditor/components/StratOverview.svelte';
	import FormButton from '$lib/components/buttons/FormButton.svelte';

	export let data;
	export let form;

	$: ({ maps, teams } = data);

	$: if (form?.message) {
		toast.error(form.message, {
			style: 'background: #333; color:#fff',
		});
	}

	let stratName = '';
	let stratDesc = '';
	let mapName = '';
	let stratPos = '';
	let privacy = '';
	let team = '';
	let nades: Nade[] = [];

	$: mapRadar = maps?.find((m) => m.name === mapName)?.radar;
	$: mapId = maps?.find((m) => m.name === mapName)?.id;
	$: teamId = teams?.find((t) => t.team_name === team)?.team_id;
	$: nadesString = JSON.stringify(nades);

	let activeFormStep = FormSteps.INFO;

	const goToStep = (step: FormSteps) => {
		switch (step) {
			case FormSteps.INFO:
				activeFormStep = step;
				break;
			case FormSteps.NADES:
				if (validateFormInfo()) {
					activeFormStep = step;
				}
				break;
			case FormSteps.OVERVIEW:
				if (validateFormInfo() && validateNades()) {
					activeFormStep = step;
				}
				break;
		}
	};

	const validateFormInfo = () => {
		if (stratName === '' || stratDesc === '') {
			toast.error('Make sure no inputs are empty', {
				style: 'background: #333; color:#fff',
			});
			return false;
		}

		if (mapName === '' || stratPos === '' || privacy === '') {
			toast.error(
				'Need to select a value for map name, position, and privacy',
				{
					style: 'background: #333; color:#fff',
				}
			);
			return false;
		}

		return true;
	};

	const validateNades = () => {
		if (nades.length === 0) {
			toast.error('A strat needs at least 1 nade!', {
				style: 'background: #333; color:#fff',
			});
			return false;
		}

		const incompleteNade = nades.find(
			(nade) => nade.name === '' || nade.type === ''
		);
		if (incompleteNade !== undefined) {
			toast.error('Make sure all nades have a name and a type!', {
				style: 'background: #333; color:#fff',
			});
			return false;
		}

		return true;
	};
</script>

<form class="grid gap-4 w-default" action="" method="POST">
	<StratEditorNav
		bind:activeStep={activeFormStep}
		on:updateFormStep={(event) => goToStep(event.detail.step)}
	/>
	<input type="hidden" name="name" bind:value={stratName} />
	<input type="hidden" name="description" bind:value={stratDesc} />
	<input type="hidden" name="mapId" bind:value={mapId} />
	<input type="hidden" name="position" bind:value={stratPos} />
	<input type="hidden" name="privacy" bind:value={privacy} />
	<input type="hidden" name="teamId" bind:value={teamId} />
	<input type="hidden" name="nades" bind:value={nadesString} />
	<input type="hidden" name="playerId" value={data.authUser?.id} />
	{#if activeFormStep === FormSteps.INFO}
		<TextInput
			id="name"
			name="name"
			label="Name:"
			bind:value={stratName}
			placeholder="Name of strat"
		/>
		<TextAreaInput
			id="description"
			name="description"
			label="Description:"
			bind:value={stratDesc}
			placeholder="Short description (optional)"
		/>
		<div class="flex gap-4">
			<FormDropdown
				id="map"
				name="map"
				bind:value={mapName}
				placeholder="Map"
				options={maps
					? maps.map((m) => {
							return { value: m.name, label: m.name };
					  })
					: []}
			/>
			<FormDropdown
				id="position"
				name="position"
				bind:value={stratPos}
				placeholder="Position"
				options={[
					{ label: 'A site', value: 'A site' },
					{ label: 'B site', value: 'B site' },
					{ label: 'Mid', value: 'Mid' },
				]}
			/>
			<FormDropdown
				id="privacy"
				name="privacy"
				bind:value={privacy}
				placeholder="Privacy"
				options={[
					{ label: 'Public', value: 'PUBLIC' },
					{ label: 'Private', value: 'PRIVATE' },
				]}
			/>
			<FormDropdown
				id="team"
				name="team"
				bind:value={team}
				placeholder="Team"
				defaultOptions={teams?.length === 0 ? 'No available teams' : undefined}
				options={teams
					? teams.map((m) => {
							return { value: `${m.team_name}`, label: m.team_name ?? '' };
					  })
					: []}
			/>
		</div>
	{:else if activeFormStep === FormSteps.NADES}
		<!-- Nade selector -->
		<div>
			<MapEditor bind:nades {mapName} mapRadar={mapRadar ?? ''} />
		</div>
	{:else if activeFormStep === FormSteps.OVERVIEW}
		<StratOverview
			name={stratName}
			desc={stratDesc}
			map={mapName}
			position={stratPos}
			{privacy}
			{team}
			{nades}
		/>
		<div class="grid mt-10">
			<FormButton>Create strat</FormButton>
		</div>
	{/if}
</form>
