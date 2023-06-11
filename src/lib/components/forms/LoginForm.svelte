<script lang="ts">
	import type { LoginSchema } from '$lib/validations/zodShemas';
	import { superForm } from 'sveltekit-superforms/client';
	import type { Validation } from 'sveltekit-superforms/index';
	import TextInput from '../inputs/TextInput.svelte';
	import { page } from '$app/stores';
	import { Chasing } from 'svelte-loading-spinners';
	import FormMessage from '../feedback/FormMessage.svelte';

	export let data: Validation<LoginSchema>;
	export let redirectTo: string;

	const {
		form,
		errors,
		enhance: superEnhance,
		delayed,
		message,
	} = superForm(data);
</script>

<form
	class="grid gap-4 w-80"
	action="?/login{redirectTo ? `&redirectTo=${redirectTo}` : ''}"
	method="POST"
	use:superEnhance
>
	<h1 class="font-bold uppercase text-center text-3xl">Login</h1>
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
		placeholder="#Averysecrepassword123"
		bind:value={$form.password}
		errors={$errors.password}
		isPassword={true}
	/>
	<button
		class="bg-red-400 hover:bg-red-500 focus-within:bg-red-500 active:bg-red-600 p-2 rounded mt-2"
		type="submit"
		disabled={$delayed}>Login</button
	>
	<FormMessage message={$message} status={$page.status} />
	<!-- loading indicator -->
	{#if $delayed}
		<div class="grid justify-center">
			<Chasing size="60" color="#F87171" unit="px" duration="1s" />
		</div>
	{/if}
</form>
