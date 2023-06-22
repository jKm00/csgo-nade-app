<script lang="ts">
	import FormDropdown from '$lib/components/inputs/FormDropdown.svelte';
	import TextAreaInput from '$lib/components/inputs/TextAreaInput.svelte';
	import TextInput from '$lib/components/inputs/TextInput.svelte';

	export let maps: {
		id: number;
		name: string;
		positions: {
			id: number;
			name: string;
		}[];
	}[];
	export let teams: { id: number; name: string }[] | null;

	export let name: string;
	export let description: string;
	export let map: { id: number; name: string } | null;
	export let side: string;
	export let position: { id: number; name: string } | null;
	export let privacy: string;
	export let team: { id: number; name: string } | null;

	$: mapOptions =
		maps?.map((map) => ({
			value: { id: map.id, name: map.name },
			label: map.name,
		})) ?? [];

	$: mapPositions =
		maps
			?.find((m) => m.name === map?.name)
			?.positions?.map((pos) => {
				return {
					label: pos.name,
					value: { id: pos.id, name: pos.name },
				};
			}) ?? [];

	$: teamOptions = teams
		? teams.map((team) => ({
				label: team.name,
				value: { id: team.id, name: team.name },
		  }))
		: [];
</script>

<div class="grid gap-4">
	<div class="grid gap-4">
		<TextInput
			id="name"
			name="name"
			label="Strat name:"
			placeholder="A site execute..."
			bind:value={name}
		/>
		<TextAreaInput
			id="description"
			name="description"
			label="Short description:"
			placeholder="Full execute with on a site..."
			bind:value={description}
		/>
	</div>
	<div class="flex flex-wrap gap-4">
		<FormDropdown
			id="map"
			name="map"
			placeholder="Select map"
			bind:value={map}
			options={mapOptions}
		/>
		<FormDropdown
			id="side"
			name="side"
			placeholder="Select side"
			bind:value={side}
			options={[
				{ value: 'CT', label: 'CT' },
				{ value: 'T', label: 'T' },
			]}
		/>
		<FormDropdown
			id="position"
			name="position"
			placeholder="Select position"
			defaultOptions={map === null ? 'Select map first' : 'No value'}
			bind:value={position}
			options={mapPositions}
		/>
		<FormDropdown
			id="privacy"
			name="privacy"
			placeholder="Select privacy"
			bind:value={privacy}
			options={[
				{ value: 'PUBLIC', label: 'Public' },
				{ value: 'PRIVATE', label: 'Private' },
			]}
		/>
		<FormDropdown
			id="team"
			name="team"
			placeholder="Select team"
			bind:value={team}
			options={teamOptions}
		/>
	</div>
</div>
