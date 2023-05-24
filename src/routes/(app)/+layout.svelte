<script lang="ts">
	import { goto } from '$app/navigation';
	import NavBar from '$lib/components/layout/NavBar.svelte';
	import { onMount } from 'svelte';

	export let data;

	$: ({ session, authUser } = data);

	$: if (session && authUser === null) {
		goto('/profile-setup');
	}
</script>

<NavBar />

<div class="flex-1 max-w-6xl m-auto">
	<slot />
</div>
