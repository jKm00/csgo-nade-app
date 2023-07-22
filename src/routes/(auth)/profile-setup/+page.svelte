<script lang="ts">
	import { goto } from '$app/navigation';
	import FormButton from '$lib/components/buttons/FormButton.svelte';
	import FormMessage from '$lib/components/feedback/FormMessage.svelte';
	import TextInput from '$lib/components/inputs/TextInput.svelte';
	import type { User } from '$lib/features/navBar/types/User.js';
	import { authUser } from '$lib/stores/authStore.js';
	import { Chasing } from 'svelte-loading-spinners';
	import { superForm } from 'sveltekit-superforms/client';

	export let data;
	export let form;

	const {
		form: enhancedForm,
		errors,
		enhance,
		delayed,
		message,
	} = superForm(data.form);

	$: {
		updateAuthUser(form?.user);
	}

	const updateAuthUser = (user: User | undefined) => {
		if (user) {
			authUser.set(user);
			goto('/');
		}
	};
</script>

<form
	class="grid gap-4 mb-4"
	action="?/createProfile"
	method="POST"
	use:enhance
>
	<p class="text-sm">
		Please fill out the form to finish setting up your profile
	</p>
	<TextInput
		id="username"
		name="username"
		label="Username:"
		placeholder="myUsername"
		bind:value={$enhancedForm.username}
		errors={$errors.username}
	/>
	<TextInput
		id="name"
		name="name"
		label="Full name:"
		placeholder="myName"
		bind:value={$enhancedForm.name}
		errors={$errors.name}
	/>
	<FormButton>Submit</FormButton>
	<FormMessage message={$message} />
	{#if $delayed}
		<div class="grid justify-center">
			<Chasing size="60" color="#F87171" unit="px" duration="1s" />
		</div>
	{/if}
</form>
<form class="flex justify-center" action="/logout" method="POST">
	<button class="text-neutral-500 underline text-center">Logout</button>
</form>
