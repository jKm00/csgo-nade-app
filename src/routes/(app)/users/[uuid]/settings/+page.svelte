<script lang="ts">
	import { page } from '$app/stores';
	import FormMessage from '$lib/components/feedback/FormMessage.svelte';
	import TextInput from '$lib/components/inputs/TextInput.svelte';
	import toast from 'svelte-french-toast';
	import { superForm } from 'sveltekit-superforms/client';

	export let data;

	const { form, errors, enhance, message } = superForm(data.userDetailsForm);

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
			toast.success($message);
		} else {
			toast.error($message);
		}
	}

	$: if ($passwordMessage !== undefined) {
		const statusOk = String($page.status).charAt(0) === '2';
		if (statusOk) {
			toast.success($passwordMessage);
		}
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
		bind:value={$form.fullName}
		errors={$errors.fullName}
	/>
	<TextInput
		id="username"
		name="username"
		label="Username:"
		bind:value={$form.username}
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

<form action="" class="grid gap-4 max-w-sm m-auto mb-16">
	<h2 class="font-bold text-red-400">Danger zone</h2>
	<button
		class="bg-red-400/20 border-2 p-2 border-red-400 rounded text-red-400 hover:bg-red-400 hover:text-white focus-within:bg-red-400 focus-within:text-white transition-colors"
		>Delete account</button
	>
</form>
