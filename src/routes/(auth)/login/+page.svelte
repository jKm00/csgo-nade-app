<script lang="ts">
	import LoginForm from '$lib/components/forms/LoginForm.svelte';
	import OAuthLogin from '$lib/components/forms/OAuthLogin.svelte';

	export let data;

	$: ({ supabase, redirectTo } = data);
</script>

<!-- Default form -->
<LoginForm data={data.form} redirectTo={redirectTo ?? ''} />
<!-- Ouath alternatives -->
<OAuthLogin {supabase} />
<!-- Other links -->
<div class="text-center">
	<p class="text-sm text-neutral-400">
		Don't have an account? <a
			class="underline hover:text-white focus-within:text-white"
			href="/register">Sign up here</a
		>
	</p>
	<a href="/login/forgot-password" class="text-sm text-neutral-400 underline"
		>Forgot password</a
	>
</div>
