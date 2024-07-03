<script lang="ts">
	import LoginForm from '$lib/components/forms/LoginForm.svelte';
	import OAuthLogin from '$lib/components/forms/OAuthLogin.svelte';

	export let data;

	$: ({ supabase, redirectTo } = data);
</script>

<div class="bg-background rounded-md border py-8 px-8 sm:px-16" style="width: min(40rem, 95vw)">
	<!-- Default form -->
	<LoginForm data={data.form} redirectTo={redirectTo ?? ''} />
	<!-- Ouath alternatives -->
	<OAuthLogin {supabase} />
	<!-- Other links -->
	<div class="text-center">
		<p class="text-sm text-muted-foreground">
			Don't have an account? <a
				class="underline"
				href="/register">Sign up here</a
			>
		</p>
		<a href="/login/forgot-password" class="text-sm text-muted-foreground underline"
			>Forgot password</a
		>
	</div>
</div>
