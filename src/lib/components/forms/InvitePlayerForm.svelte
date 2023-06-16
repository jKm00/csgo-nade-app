<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import type { Validation } from 'sveltekit-superforms/index';
	import TextInput from '../inputs/TextInput.svelte';
	import { TEAM_ROLES } from '$lib/shared/teamRoles';
	import FormButton from '../buttons/FormButton.svelte';
	import FormDropdown from '../inputs/FormDropdown.svelte';
	import type { InvitePlayerSchema } from '$lib/validations/zodShemas';

	export let data: Validation<InvitePlayerSchema>;
	export let teamId: number;

	const { form, errors, enhance } = superForm(data);
</script>

<h1 class="text-xl font-bold mb-4 px-4">Invite player</h1>
<form
	class="grid gap-4 items-center mb-6 p-4"
	action="?/invitePlayer"
	method="POST"
	use:enhance
>
	<input type="hidden" name="teamId" value={teamId} />
	<TextInput
		id="username"
		name="username"
		placeholder="Username"
		value={$form.username}
		errors={$errors.username}
	/>
	<FormDropdown
		id="role"
		name="role"
		placeholder="Team role"
		options={TEAM_ROLES}
		value={$form.role}
		errors={$errors.role}
	/>
	<FormButton>Invite player</FormButton>
</form>
