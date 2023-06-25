<script lang="ts">
	export let link: string;
</script>

<a
	class="bg-red-400 hover:bg-red-500 focus-within:bg-red-500 active:bg-red-600 rounded-sm py-2 px-4 transition-colors"
	href={link}><slot /></a
>
