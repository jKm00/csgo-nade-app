<script lang="ts">
	import NavBar from '$lib/components/layout/NavBar.svelte';

	export let data;
</script>

<NavBar user={data.user} />

<div class="flex-1 max-w-6xl m-auto">
	<slot />
</div>
