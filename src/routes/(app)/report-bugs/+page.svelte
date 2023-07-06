<script lang="ts">
	import { page } from '$app/stores';
	import FormButton from '$lib/components/buttons/FormButton.svelte';
	import FormMessage from '$lib/components/feedback/FormMessage.svelte';
	import { toast } from '$lib/components/feedback/toast/toastStore.js';
	import TextAreaInput from '$lib/components/inputs/TextAreaInput.svelte';
	import TextInput from '$lib/components/inputs/TextInput.svelte';
	import { Chasing } from 'svelte-loading-spinners';
	import { superForm } from 'sveltekit-superforms/client';

	export let data;
	export let form;

	const {
		form: reportForm,
		errors,
		enhance,
		delayed,
		message,
	} = superForm(data.form);

	$: if (form?.message) {
		toast.push({ type: 'error', title: 'Error', desc: form.message });
	}

	$: if (form?.success) {
		toast.push({ type: 'success', title: 'Success', desc: form.success });
	}
</script>

<form class="grid gap-4 w-default" action="" method="POST" use:enhance>
	<h1 class="text-3xl font-bold">Report A Bug</h1>
	<TextInput
		id="title"
		name="title"
		label="Title:"
		placeholder="Descriptive title for the bug"
		bind:value={$reportForm.title}
		errors={$errors.title}
	/>
	<TextAreaInput
		id="description"
		name="description"
		label="Description:"
		placeholder="Please provide a meaning full description of the bug. If possible, also provide with a step by step of how this bug can be reproduced"
		bind:value={$reportForm.description}
		errors={$errors.description}
	/>
	<p class="text-sm mb-4">
		By submitting this bug report you accept that we can take contact with you
		via mail to further discuss and fix the bug
	</p>
	<FormButton>Submit bug report</FormButton>
	<FormMessage message={$message} status={$page.status} />
	{#if $delayed}
		<div class="grid justify-center">
			<Chasing size="60" color="#F87171" unit="px" duration="1s" />
		</div>
	{/if}
</form>
