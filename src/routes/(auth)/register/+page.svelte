<script lang="ts">
	import RegisterForm from '$lib/components/forms/RegisterForm.svelte';
	import SignUpOAuthLinks from '$lib/components/forms/SignUpOAuthLinks.svelte';

	export let data;
</script>

<!-- Default register form -->
<RegisterForm data={data.form} />
<!-- Ouath alternatives -->
<SignUpOAuthLinks />
<p class="text-sm text-neutral-400 text-center">
	Already have an account? <a
		class="underline hover:text-white focus-within:text-white"
		href="/login">Login in here</a
	>
</p>
