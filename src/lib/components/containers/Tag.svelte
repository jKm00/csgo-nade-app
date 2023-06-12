<script lang="ts">
	export let color: string;
</script>

<p
	class="bg-{color}-400/10 border border-{color}-400 text-{color}-400 group-hover:bg-{color}-400 group-hover:text-white group-focus-within:bg-purple-400 group-focus-within:text-white transition-colors rounded-full px-4"
>
	<slot />
</p>
