<script lang="ts">
	import { page } from '$app/stores';
	import FormButton from '$lib/components/buttons/FormButton.svelte';
	import TextInput from '$lib/components/inputs/TextInput.svelte';
	import { superForm } from 'sveltekit-superforms/client';

	export let data;

	const { form, errors, delayed, enhance, message } = superForm(data.form);
</script>

{#if $message && $page.status === 200}
	<p>
		An email has been sent. Please open the email and follow the link to reset
		your password
	</p>
{:else}
	<form class="grid gap-4 w-64" method="POST" use:enhance>
		<TextInput
			id="email"
			name="email"
			label="Email:"
			placeholder="Enter your email..."
			bind:value={$form.email}
			errors={$errors.email}
		/>
		<FormButton loading={$delayed}>Submit</FormButton>
	</form>
{/if}
