<script lang="ts">
	export let disabled: boolean = false;
</script>

<button
	class="bg-red-400 hover:bg-red-500 focus-within:bg-red-500 active:bg-red-600 p-2 text-sm rounded mt-2"
	type="submit"
	{disabled}
>
	<slot />
</button>
