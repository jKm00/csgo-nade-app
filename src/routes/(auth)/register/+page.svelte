<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import { Chasing } from 'svelte-loading-spinners';
	import TextInput from '$lib/components/inputs/TextInput.svelte';
	import FormMessage from '$lib/components/feedback/FormMessage.svelte';
	import { page } from '$app/stores';

	export let data;

	const { form, errors, enhance, delayed, message } = superForm(data.form);
</script>

<form class="grid gap-4 w-80" action="?/registerUser" method="POST" use:enhance>
	<h1 class="font-bold uppercase text-center text-3xl">Register</h1>
	<TextInput
		id="username"
		name="username"
		label="Username:"
		placeholder="myUsername"
		bind:value={$form.username}
		errors={$errors.username}
	/>
	<TextInput
		id="fullName"
		name="fullName"
		label="Full name:"
		placeholder="myName"
		bind:value={$form.fullName}
		errors={$errors.fullName}
	/>
	<TextInput
		id="email"
		name="email"
		label="Email:"
		placeholder="email@example.com"
		bind:value={$form.email}
		errors={$errors.email}
	/>
	<TextInput
		id="password"
		name="password"
		label="Password:"
		placeholder="#Averysecretpassword123"
		bind:value={$form.password}
		errors={$errors.password}
		isPassword={true}
	/>
	<TextInput
		id="passwordConfirm"
		name="passwordConfirm"
		label="Confirm password:"
		placeholder="#Averysecretpassword123"
		bind:value={$form.passwordConfirm}
		errors={$errors.passwordConfirm}
		isPassword={true}
	/>
	<button
		class="bg-red-400 hover:bg-red-500 focus-within:bg-red-500 active:bg-red-600 p-2 rounded mt-2"
		type="submit"
		disabled={$delayed}
	>
		Register
	</button>
	<FormMessage message={$message} status={$page.status} />
	{#if $delayed}
		<div class="grid justify-center">
			<Chasing size="60" color="#F87171" unit="px" duration="1s" />
		</div>
	{/if}
	<p class="text-sm text-neutral-400 text-center">
		Already have an account? <a
			class="underline hover:text-white focus-within:text-white"
			href="/login">Login in here</a
		>
	</p>
</form>
