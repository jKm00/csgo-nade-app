<script lang="ts">
	export let value: boolean;
	export let id: string;
	export let name: string;
	export let errors: string[] | undefined = undefined;
</script>

<div>
	<div class="flex items-center gap-2">
		<input {id} {name} type="checkbox" bind:checked={value} />
		<p><slot /></p>
	</div>
	{#if errors}
		<p>{errors[0]}</p>
	{/if}
</div>
