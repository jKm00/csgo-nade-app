<script lang="ts">
	export let disabled: boolean = false;
</script>

<button
	class="bg-red-400 hover:bg-red-500 focus-within:bg-red-500 active:bg-red-600 p-2 text-sm rounded"
	type="submit"
	{disabled}
>
	<slot />
</button>
