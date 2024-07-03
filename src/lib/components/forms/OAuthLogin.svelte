<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Provider, SupabaseClient } from '@supabase/supabase-js';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { Button } from '$lib/components/ui/button';

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
	<p class="text-sm text-muted-foreground text-center">Or log in using:</p>
	<form class="grid grid-cols-2 gap-2" method="POST" use:enhance={submitSocialLogin}>
		<Button
			formaction="?/login&provider=github"
			variant="outline"
			class="bg-neutral-950 text-white flex gap-2 items-center justify-center group"
			><img
				class="w-5 invert group-hover:invert-0 dark:group-hover:invert"
				src="/assets/images/logos/github-logo.png"
				alt="GitHub logo"
			/>GitHub</Button>
		<Button
			formaction="?/login&provider=discord"
			variant="outline"
			class="bg-indigo-500 text-white flex gap-2 items-center justify-center group"
			><img
				class="w-5 group-hover:invert dark:group-hover:invert-0"
				src="/assets/images/logos/discord-logo.png"
				alt="Discord logo"
			/>Discord</Button
		>
	</form>
</div>
