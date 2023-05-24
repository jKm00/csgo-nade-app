<script lang="ts">
	import { goto } from '$app/navigation';
	import NavBar from '$lib/components/layout/NavBar.svelte';
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
	<section class="relative overflow-hidden mb-5">
		<!-- background img -->
		<img
			class="absolute h-full w-full object-cover"
			src="/assets/images/wallpapers/csgo_wallpaper.webp"
			alt="CSGO Terrorist smoking a cigar"
		/>
		<!-- background overlay -->
		<div class="absolute w-full h-full bg-gradient-to-t from-neutral-950" />
		<!-- body -->
		<div
			class="grid gap-10 items-center justify-center text-center relative z-10 py-20"
		>
			<h1 class="text-red-400 font-bold uppercase text-3xl">CSGO Strats</h1>
			<p>
				A place to create and share strats with your friends, teams, and the
				community
			</p>
			<div class="flex justify-center items-center gap-4">
				<a
					class="bg-red-400 hover:bg-red-500 focus-within:bg-red-500 active:bg-red-600 rounded py-2 px-4"
					href="/login">Login</a
				>
				<a class="hover:underline focus-within:underline" href="/register"
					>Register</a
				>
			</div>
		</div>
		<button on:click={closeHeader} class="absolute z-20 top-4 right-4"
			><svg
				class="w-4 fill-white"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 384 512"
				><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
					d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
				/></svg
			></button
		>
	</section>
{/if}

<div class="flex-1 max-w-6xl m-auto">
	<slot />
</div>
