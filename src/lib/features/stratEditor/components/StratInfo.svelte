<script lang="ts">
	import FormDropdown from '$lib/components/inputs/FormDropdown.svelte';
	import TextAreaInput from '$lib/components/inputs/TextAreaInput.svelte';
	import TextInput from '$lib/components/inputs/TextInput.svelte';

	export let name: string;
	export let description: string;
	export let map: { id: number; name: string } | null;
	export let side: string;
	export let position: { id: number; name: string } | null;
	export let privacy: string;
	export let team: { id: number; name: string } | null;
</script>

<form class="grid gap-4" on:submit|preventDefault>
	<fieldset class="grid gap-4">
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
	</fieldset>
	<fieldset class="flex flex-wrap gap-4">
		<FormDropdown
			id="map"
			name="map"
			placeholder="Select map"
			bind:value={map}
			options={[
				{ value: { id: 1, name: 'Mirage' }, label: 'Mirage' },
				{ value: { id: 2, name: 'Overpass' }, label: 'Overpass' },
				{ value: { id: 3, name: 'Nuke' }, label: 'Nuke' },
				{ value: { id: 4, name: 'Ancient' }, label: 'Ancient' },
			]}
		/>
		<FormDropdown
			id="side"
			name="side"
			placeholder="Select side"
			bind:value={side}
			options={[
				{ value: 'ct', label: 'CT' },
				{ value: 't', label: 'T' },
			]}
		/>
		<FormDropdown
			id="position"
			name="position"
			placeholder="Select position"
			bind:value={position}
			options={[
				{ value: { id: 1, name: 'A site' }, label: 'A site' },
				{ value: { id: 2, name: 'B site' }, label: 'B site' },
				{ value: { id: 3, name: 'Mid' }, label: 'Mid' },
				{ value: { id: 4, name: 'Connector' }, label: 'Connector' },
				{ value: { id: 5, name: 'Short' }, label: 'short' },
			]}
		/>
		<FormDropdown
			id="privacy"
			name="privacy"
			placeholder="Select privacy"
			bind:value={privacy}
			options={[
				{ value: 'public', label: 'Public' },
				{ value: 'private', label: 'Private' },
			]}
		/>
		<FormDropdown
			id="team"
			name="team"
			placeholder="Select team"
			bind:value={team}
			options={[
				{ value: { id: 1, name: 'DOT Esport' }, label: 'DOT Esport' },
				{ value: { id: 2, name: 'NaVi' }, label: 'NaVi' },
			]}
		/>
	</fieldset>
</form>
