<script lang="ts">
	import { page } from '$app/stores';
	import FormMessage from '$lib/components/feedback/FormMessage.svelte';
	import TextInput from '$lib/components/inputs/TextInput.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import Dialog from '$lib/components/containers/Dialog.svelte';
	import SecondaryButton from '$lib/components/buttons/SecondaryButton.svelte';
	import FormButton from '$lib/components/buttons/FormButton.svelte';
	import { toast } from '$lib/components/feedback/toast/toastStore.js';

	export let data;
	export let form;

	let showDeleteAccountDialog = false;

	const {
		form: userDetailsForm,
		errors,
		enhance,
		message,
	} = superForm(data.userDetailsForm);

	const {
		form: emailForm,
		errors: emailErrors,
		enhance: emailEnhance,
		message: emailMessage,
	} = superForm(data.emailForm);

	const {
		form: passwordForm,
		errors: passwordErrors,
		enhance: passwordEnhance,
		message: passwordMessage,
	} = superForm(data.passwordForm);

	$: if ($message !== undefined) {
		const statusOk = String($page.status).charAt(0) === '2';
		if (statusOk) {
			toast.push({
				type: 'success',
				title: 'Success',
				desc: $message,
			});
		} else {
			toast.push({
				type: 'error',
				title: 'Error',
				desc: $message,
			});
		}
	}

	$: if ($passwordMessage !== undefined) {
		const statusOk = String($page.status).charAt(0) === '2';
		if (statusOk) {
			toast.push({
				type: 'success',
				title: 'Success',
				desc: $passwordMessage,
			});
		}
	}

	$: if (form?.message) {
		toast.push({
			type: 'error',
			title: 'Error',
			desc: form.message,
		});
	}
</script>

<form
	action="?/updateUserDetails"
	method="POST"
	class="grid gap-4 max-w-sm m-auto mb-16"
	use:enhance
>
	<TextInput
		id="name"
		name="fullName"
		label="Name:"
		bind:value={$userDetailsForm.fullName}
		errors={$errors.fullName}
	/>
	<TextInput
		id="username"
		name="username"
		label="Username:"
		bind:value={$userDetailsForm.username}
		errors={$errors.username}
	/>
	<button
		class="bg-green-400 hover:bg-green-500 focus-within:bg-green-500 active:bg-green-600 px-2 py-1 rounded justify-self-end text-neutral-950 text-sm"
		type="submit">Save changes</button
	>
</form>

<form
	action="?/updateEmail"
	method="POST"
	class="grid gap-4 max-w-sm m-auto mb-16"
	use:emailEnhance
>
	<TextInput
		id="email"
		name="email"
		label="Email:"
		bind:value={$emailForm.email}
		errors={$emailErrors.email}
	/>
	<FormMessage message={$emailMessage} status={$page.status} />
	<button
		class="bg-green-400 px-2 py-1 rounded justify-self-end text-neutral-950 text-sm"
		type="submit">Change email</button
	>
</form>

<form
	action="?/updatePassword"
	method="POST"
	class="grid gap-4 max-w-sm m-auto mb-16"
	use:passwordEnhance
>
	<TextInput
		id="currentPassword"
		name="currentPassword"
		label="Current password:"
		bind:value={$passwordForm.currentPassword}
		errors={$passwordErrors.currentPassword}
		placeholder="********"
		isPassword={true}
	/>
	<TextInput
		id="newPassword"
		name="newPassword"
		label="New password:"
		bind:value={$passwordForm.newPassword}
		errors={$passwordErrors.newPassword}
		placeholder="********"
		isPassword={true}
	/>
	<TextInput
		id="newPasswordConfirm"
		name="newPasswordConfirm"
		label="Confirm new password:"
		bind:value={$passwordForm.newPasswordConfirm}
		errors={$passwordErrors.newPasswordConfirm}
		placeholder="********"
		isPassword={true}
	/>
	<button
		class="bg-green-400 px-2 py-1 rounded justify-self-end text-neutral-950 text-sm"
		type="submit">Change password</button
	>
</form>

<div class="grid gap-4 max-w-sm m-auto mb-16">
	<h2 class="font-bold text-red-400">Danger zone</h2>
	<button
		on:click={() => (showDeleteAccountDialog = true)}
		class="bg-red-400/20 border-2 p-2 border-red-400 rounded text-red-400 hover:bg-red-400 hover:text-white focus-within:bg-red-400 focus-within:text-white transition-colors"
		>Delete account</button
	>
</div>

<!-- Delete account dialog -->
<Dialog show={showDeleteAccountDialog} title="Delete account">
	<div slot="body">
		<p class="mb-4">
			Are you sure you want to delete you account? All strats you have created
			will also be deleted! This action cannot be undone!
		</p>
		<p class="italic">
			<span class="underline">NB:</span> You cannot delete your account if you are
			a team leader. You can go to the team you are a leader for and transfer the
			leadership to another player or delete them team!
		</p>
	</div>
	<div class="flex gap-2 justify-end" slot="form">
		<SecondaryButton on:click={() => (showDeleteAccountDialog = false)}
			>Cancel</SecondaryButton
		>
		<form action="?/deleteUser" method="POST">
			<FormButton>Delete account</FormButton>
		</form>
	</div>
</Dialog>
