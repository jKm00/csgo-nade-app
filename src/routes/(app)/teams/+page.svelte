<script lang="ts">
	import { page } from '$app/stores';
	import FormButton from '$lib/components/buttons/FormButton.svelte';
	import FormMessage from '$lib/components/feedback/FormMessage.svelte';
	import Dropdown from '$lib/components/inputs/Dropdown.svelte';
	import TextInput from '$lib/components/inputs/TextInput.svelte';
	import { superForm } from 'sveltekit-superforms/client';

	export let data;

	const { form, errors, enhance, delayed, message } = superForm(data.form);

	const teamRoles = [
		{
			label: 'Main AWPer',
			value: 'Main AWPer',
		},
		{
			label: 'Secondary AWPer',
			value: 'Secondary AWPer',
		},
		{
			label: 'Entry fragger',
			value: 'Entry fragger',
		},
		{
			label: 'Coach',
			value: 'Coach',
		},
		{
			label: 'Support player',
			value: 'Support player',
		},
	];

	let selectedRole = '';
</script>

<form class="grid gap-4" action="?/createTeam" method="POST" use:enhance>
	<TextInput
		id="name"
		name="name"
		label="Team name:"
		value={$form.name}
		errors={$errors.name}
		placeholder="myTeam"
	/>
	<Dropdown
		placeholder="Team role"
		options={teamRoles}
		on:update={(event) => (selectedRole = event.detail.value)}
	/>
	<input type="hidden" name="role" bind:value={selectedRole} />
	<FormMessage message={$message} status={$page.status} />
	<FormButton>Create new team</FormButton>
</form>
