<script lang="ts">
	import RegisterForm from '$lib/components/forms/RegisterForm.svelte';
	import SignUpOAuthLinks from '$lib/components/forms/SignUpOAuthLinks.svelte';

	export let data;
</script>

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
