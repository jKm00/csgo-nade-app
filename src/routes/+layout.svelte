<script lang="ts">
	import Footer from '$lib/components/layout/Footer.svelte';
	import '../app.css';

	export let data;

	$: ({ version } = data);
</script>

<div class="flex flex-col min-h-screen bg-neutral-900 text-white">
	<slot />
	<Footer {version} />
</div>
