<script lang="ts">
	import FormDropdown from '$lib/components/inputs/FormDropdown.svelte';
	import TextAreaInput from '$lib/components/inputs/TextAreaInput.svelte';
	import TextInput from '$lib/components/inputs/TextInput.svelte';

	let title: string;
	let description: string;
	let map: string;
	let side: string;
	let position: string;
	let privacy: string;
	let team: string;

	const handleSubmit = () => {
		// TODO: handle submit ...
	};
</script>

<form class="grid gap-4" on:submit|preventDefault={handleSubmit}>
	<fieldset>
		<TextInput
			id="title"
			name="title"
			label="Strat title:"
			placeholder="A site execute..."
			bind:value={title}
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
				{ value: 'mirage', label: 'Mirage' },
				{ value: 'overpass', label: 'Overpass' },
				{ value: 'nuke', label: 'Nuke' },
				{ value: 'ancient', label: 'Ancient' },
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
				{ value: 'a_site', label: 'A site' },
				{ value: 'b_site', label: 'B site' },
				{ value: 'mid', label: 'Mid' },
				{ value: 'connector', label: 'Connector' },
				{ value: 'short', label: 'short' },
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
				{ value: 'dot_esport', label: 'DOT Esport' },
				{ value: 'navi', label: 'NaVi' },
			]}
		/>
	</fieldset>
</form>
