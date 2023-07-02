<script lang="ts">
	export let disabled: boolean = false;
</script>

<button
	class="flex items-center justify-center gap-2 font-bold bg-red-400 hover:bg-red-500 focus-within:bg-red-500 active:bg-red-600 py-2 px-4 rounded"
	type="submit"
	{disabled}
>
	<slot />
</button>
