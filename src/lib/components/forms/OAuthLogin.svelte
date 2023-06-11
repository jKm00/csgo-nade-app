<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Provider, SupabaseClient } from '@supabase/supabase-js';
	import type { SubmitFunction } from '@sveltejs/kit';

	export let supabase: SupabaseClient;

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
			case 'discord':
				await signInWithProvider('discord');
				break;
			default:
				break;
		}
		cancel();
	};
</script>

<div class="grid gap-4 my-4">
	<p class="text-sm text-neutral-400 text-center">Or log in using:</p>
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
			formaction="?/login&provider=discord"
			class="flex items-center justify-center gap-2 bg-indigo-500 rounded p-2 w-full"
			><img
				class="w-5"
				src="/assets/images/logos/discord-logo.png"
				alt="Discord logo"
			/>Discord</button
		>
	</form>
</div>
