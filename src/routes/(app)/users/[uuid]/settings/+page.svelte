<script lang="ts">
	import { page } from '$app/stores';
	import FormMessage from '$lib/components/feedback/FormMessage.svelte';
	import TextInput from '$lib/components/inputs/TextInput.svelte';
	import { superForm } from 'sveltekit-superforms/client';

	export let data;

	const { form, errors, enhance, message } = superForm(data.userDetailsForm);

	const {
		form: emailForm,
		errors: emailErrors,
		enhance: emailEnhance,
		message: emailMessage,
	} = superForm(data.emailForm);
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
	<FormMessage message={$message} status={$page.status} />
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

<form action="" class="grid gap-4 max-w-sm m-auto mb-16">
	<div class="grid">
		<label class="font-bold" for="currentPassword">Current password:</label>
		<input
			class="bg-neutral-800 rounded-sm p-2"
			type="password"
			id="currentPassword"
			name="currentPassword"
			placeholder="********"
		/>
	</div>
	<div class="grid">
		<label class="font-bold" for="newPassword">New password:</label>
		<input
			class="bg-neutral-800 rounded-sm p-2"
			type="password"
			id="newPassword"
			name="newPassword"
			placeholder="********"
		/>
	</div>
	<div class="grid">
		<label class="font-bold" for="confirmPassword">Confirm password:</label>
		<input
			class="bg-neutral-800 rounded-sm p-2"
			type="password"
			id="confirmPassword"
			name="confirmPassword"
			placeholder="********"
		/>
	</div>
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
