<script lang="ts">
	import { goto } from '$app/navigation';
	import NavBar from '$lib/features/navBar/components/NavBar.svelte';
	import WelcomeBanner from '$lib/components/layout/WelcomeBanner.svelte';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	export let data;

	$: ({ session } = data);

	// TODO: Check auth
	// $: if (session && authUser === null && browser) {
	// 	goto('/profile-setup');
	// }

	let firstTimeVisit = false;
	onMount(() => {
		const storedValue = localStorage.getItem('firstTimeVisit');
		if (storedValue) {
			firstTimeVisit = JSON.parse(storedValue);
		} else {
			firstTimeVisit = true;
		}
	});

	const closeHeader = () => {
		firstTimeVisit = false;
		localStorage.setItem('firstTimeVisit', JSON.stringify(firstTimeVisit));
	};
</script>

<NavBar />

{#if firstTimeVisit}
	<WelcomeBanner on:close={closeHeader} />
{/if}

<div class="flex-1 max-w-6xl m-auto">
	<slot />
</div>
