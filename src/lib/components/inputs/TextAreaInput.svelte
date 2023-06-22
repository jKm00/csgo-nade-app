<script lang="ts">
	export let value: string;
	export let id: string;
	export let name: string;
	export let label: string;
	export let rows: number = 6;
	export let placeholder: string | undefined = undefined;
	export let errors: string[] | undefined = undefined;
</script>

<div class="grid">
	<label class="font-bold" for={id}>{label}</label>
	<textarea
		class="bg-neutral-800 rounded-sm p-2 resize-y"
		{name}
		{id}
		{rows}
		placeholder={placeholder ?? ''}
		bind:value
	/>
	{#if errors}
		<p class="text-xs text-red-400 text-left">{errors[0]}</p>
	{/if}
</div>
