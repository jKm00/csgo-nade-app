<script lang="ts">
	import RegisterForm from '$lib/components/forms/RegisterForm.svelte';
	import SignUpOAuthLinks from '$lib/components/forms/SignUpOAuthLinks.svelte';

	export let data;
</script>

<div class="bg-background rounded-md border py-8 px-8 sm:px-16" style="width: min(40rem, 95vw)">
	<!-- Default register form -->
	<RegisterForm data={data.form} />
	<!-- Ouath alternatives -->
	<SignUpOAuthLinks />
	<p class="text-sm text-muted-foreground text-center">
		Already have an account? <a
			class="underline"
			href="/login">Login in here</a
		>
	</p>
</div>
