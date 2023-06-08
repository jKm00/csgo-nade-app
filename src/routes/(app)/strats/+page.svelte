<script lang="ts">
	import TextInput from '$lib/components/inputs/TextInput.svelte';
	import TextAreaInput from '$lib/components/inputs/TextAreaInput.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import FormDropdown from '$lib/components/inputs/FormDropdown.svelte';
	import StratEditorNavigation from '$lib/components/layout/StratEditorNavigation.svelte';
	import MapEditor from '$lib/components/forms/MapEditor.svelte';
	import type { Nade } from '$lib/shared/nade.js';

	export let data;

	$: ({ maps, teams } = data);

	const { form, errors, enhance, delayed } = superForm(data.form);

	let selectedMap = '';
	$: mapRadar = maps?.find((m) => m.name === selectedMap)?.radar;

	let nades: Nade[] = [];
</script>

<StratEditorNavigation>
	<form
		class="grid gap-4 mb-10"
		slot="info"
		action=""
		method="POST"
		use:enhance
	>
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
			<FormDropdown
				id="map"
				name="map"
				value={$form.map}
				errors={$errors.map}
				placeholder="Map"
				options={maps
					? maps.map((m) => {
							return { value: m.name, label: m.name };
					  })
					: []}
				on:update={(event) => (selectedMap = event.detail.value)}
			/>
			<FormDropdown
				id="position"
				name="position"
				value={$form.position}
				errors={$errors.position}
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
				value={$form.privacy}
				errors={$errors.privacy}
				placeholder="Privacy"
				options={[
					{ label: 'Public', value: 'PUBLIC' },
					{ label: 'Private', value: 'PRIVATE' },
				]}
			/>
			<FormDropdown
				id="team"
				name="team"
				value={$form.team}
				errors={$errors.team}
				placeholder="Team"
				options={teams
					? teams.map((m) => {
							return { value: `${m.team_id}`, label: m.team_name ?? '' };
					  })
					: []}
			/>
		</div>
	</form>
	<!-- Nade selector -->
	<div slot="nades">
		{#if mapRadar && mapRadar !== ''}
			<MapEditor bind:nades mapName={selectedMap} {mapRadar} />
		{:else}
			<p class="text-sm text-red-400 text-center">
				No map selected! Go back and select a map first
			</p>
		{/if}
	</div>
</StratEditorNavigation>
