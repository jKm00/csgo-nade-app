<script lang="ts">
	import { goto } from '$app/navigation';
	import NavBar from '$lib/components/layout/NavBar.svelte';
	import WelcomeBanner from '$lib/components/layout/WelcomeBanner.svelte';
	import { onMount } from 'svelte';

	export let data;

	$: ({ session, authUser } = data);

	$: if (session && authUser === null) {
		goto('/profile-setup');
	}

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
