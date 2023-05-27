<script lang="ts">
	import FormButton from '$lib/components/buttons/FormButton.svelte';
	import FormDropdown from '$lib/components/inputs/FormDropdown.svelte';
	import TextInput from '$lib/components/inputs/TextInput.svelte';
	import { TEAM_ROLES } from '$lib/shared/teamRoles.js';
	import toast from 'svelte-french-toast';
	import { superForm } from 'sveltekit-superforms/client';

	export let data;
	export let form;

	const {
		form: teamForm,
		errors,
		enhance,
		delayed,
		message,
	} = superForm(data.form);

	$: if (form?.error) {
		toast.error(form.error, {
			style: 'background: #333; color:#fff',
		});
	}
</script>

<form
	class="grid gap-4 my-10 w-default"
	action="?/createTeam"
	method="POST"
	use:enhance
>
	<TextInput
		id="name"
		name="name"
		label="Team name:"
		value={$teamForm.name}
		errors={$errors.name}
		placeholder="myTeam"
	/>
	<TextInput
		id="org"
		name="org"
		label="Organization:"
		value={$teamForm.org}
		errors={$errors.org}
		placeholder="myOrganization"
	/>
	<div>
		<p class="font-bold">Your team role:</p>
		<FormDropdown
			id="role"
			name="role"
			value={$teamForm.role}
			errors={$errors.role}
			placeholder="Team role"
			options={TEAM_ROLES}
		/>
	</div>
	<FormButton>Create new team</FormButton>
</form>
