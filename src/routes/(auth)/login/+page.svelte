<script lang="ts">
	import { page } from '$app/stores';
	import { superForm } from 'sveltekit-superforms/client';
	import { Chasing } from 'svelte-loading-spinners';
	import TextInput from '$lib/components/inputs/TextInput.svelte';
	import FormMessage from '$lib/components/feedback/FormMessage.svelte';
	import { enhance } from '$app/forms';
	import type { Provider } from '@supabase/supabase-js';
	import type { SubmitFunction } from '@sveltejs/kit';
	import LoginForm from '$lib/components/forms/LoginForm.svelte';
	import OAuthLogin from '$lib/components/forms/OAuthLogin.svelte';

	export let data;

	$: ({ supabase, redirectTo } = data);
</script>

<!-- Default form -->
<LoginForm data={data.form} redirectTo={redirectTo ?? ''} />
<!-- Ouath alternatives -->
<OAuthLogin {supabase} />
<!-- Register link -->
<p class="text-sm text-neutral-400 text-center">
	Don't have an account? <a
		class="underline hover:text-white focus-within:text-white"
		href="/register">Sign up here</a
	>
</p>
