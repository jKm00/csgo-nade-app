<script lang="ts">
	export let disabled: boolean = false;
</script>

<button
	class="flex items-center justify-center gap-2 bg-red-400 hover:bg-red-500 focus-within:bg-red-500 active:bg-red-600 p-2 text-sm rounded"
	type="submit"
	{disabled}
>
	<slot />
</button>
