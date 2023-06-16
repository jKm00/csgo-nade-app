<script lang="ts">
	export let value: string;
	export let id: string;
	export let name: string;
	export let label: string | undefined = undefined;
	export let placeholder: string | undefined = undefined;
	export let errors: string[] | undefined = undefined;

	export let isPassword = false;
</script>

<div class="grid">
	{#if label}
		<label class="font-bold" for={id}>{label}</label>
	{/if}
	{#if isPassword}
		<input
			class="bg-neutral-800 rounded-sm p-2"
			type="password"
			placeholder={placeholder ?? ''}
			{id}
			{name}
			bind:value
		/>
	{:else}
		<input
			class="bg-neutral-800 rounded-sm p-2"
			type="text"
			placeholder={placeholder ?? ''}
			{id}
			{name}
			bind:value
		/>
	{/if}
	{#if errors}
		<p class="text-xs text-red-400 text-left">{errors[0]}</p>
	{/if}
</div>
