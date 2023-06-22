<script lang="ts">
	export let disabled = false;
</script>

<button
	on:click
	{disabled}
	class="flex items-center justify-center gap-2 text-sm bg-red-400 hover:bg-red-500 focus-within:bg-red-500 active:bg-red-600 p-2 rounded"
	><slot /></button
>
