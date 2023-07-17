<script lang="ts">
	export let data;
</script>

{#await data.lazy.greeting}
	<p>Loading...</p>
{:then message}
	<p>{message}</p>
{/await}
