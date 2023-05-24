<script lang="ts">
	import { page } from '$app/stores';
	import { superForm } from 'sveltekit-superforms/client';
	import { Chasing } from 'svelte-loading-spinners';
	import TextInput from '$lib/components/inputs/TextInput.svelte';
	import FormMessage from '$lib/components/feedback/FormMessage.svelte';
	import { enhance, type SubmitFunction } from '$app/forms';
	import type { Provider } from '@supabase/supabase-js';

	export let data;

	$: ({ supabase } = data);

	const {
		form,
		errors,
		enhance: superEnhance,
		delayed,
		message,
	} = superForm(data.form);

	const signInWithProvider = async (provider: Provider) => {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: provider,
		});
	};

	const submitSocialLogin: SubmitFunction = async ({ action, cancel }) => {
		switch (action.searchParams.get('provider')) {
			case 'github':
				await signInWithProvider('github');
				break;
			default:
				break;
		}
		cancel();
	};
</script>

<!-- Default form -->
<form class="grid gap-4 w-80" action="?/login" method="POST" use:superEnhance>
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
	<!-- Ouath alternatives -->
	<div class="grid gap-4 my-4">
		<p class="text-sm text-neutral-400 text-center">Or sign up using:</p>
		<form class="grid gap-2" method="POST" use:enhance={submitSocialLogin}>
			<button
				formaction="?/login&provider=github"
				class="flex items-center justify-center gap-2 bg-black rounded p-2 w-full"
				><img
					class="w-5 invert"
					src="/assets/images/logos/github-logo.png"
					alt="GitHub logo"
				/>GitHub</button
			>
			<button
				formaction="?/login&provider=github"
				class="flex items-center justify-center gap-2 bg-indigo-500 rounded p-2 w-full"
				><img
					class="w-5"
					src="/assets/images/logos/discord-logo.png"
					alt="Discord logo"
				/>Discord</button
			>
		</form>
	</div>
	<p class="text-sm text-neutral-400 text-center">
		Don't have an account? <a
			class="underline hover:text-white focus-within:text-white"
			href="/register">Sign up here</a
		>
	</p>
</form>
