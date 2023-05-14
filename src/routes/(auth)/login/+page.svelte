<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';

	export let data;

	const { form, errors, enhance } = superForm(data.form);
</script>

<form class="grid gap-4 w-80" action="?/login" method="POST" use:enhance>
	<h1 class="font-bold uppercase text-center text-3xl">Login</h1>
	<div class="grid gap-1">
		<label class="text-neutral-400 text-sm" for="email">Email:</label>
		<input
			class="bg-neutral-700 p-2 rounded"
			type="text"
			id="email"
			name="email"
			placeholder="email@example.com"
			bind:value={$form.email}
		/>
		{#if $errors.email}
			<p class="text-xs text-red-400 text-left">{$errors.email[0]}</p>
		{/if}
	</div>
	<div class="grid gap-2">
		<label class="text-neutral-400 text-sm" for="password">Password:</label>
		<input
			class="bg-neutral-700 p-2 rounded"
			type="password"
			id="password"
			name="password"
			placeholder="#Averysecretpassword123"
			bind:value={$form.password}
		/>
		{#if $errors.password}
			<p class="text-xs text-red-400 text-left">{$errors.password[0]}</p>
		{/if}
	</div>
	<button
		class="bg-red-400 hover:bg-red-500 focus-within:bg-red-500 active:bg-red-600 p-2 rounded mt-2"
		type="submit">Login</button
	>
	<p class="text-sm text-neutral-400 text-center">
		Don't have an account? <a
			class="underline hover:text-white focus-within:text-white"
			href="/register">Sign up here</a
		>
	</p>
</form>
