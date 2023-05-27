<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';
	import MainLink from '../buttons/MainLink.svelte';

	const dispatch = createEventDispatcher<{ close: {} }>();

	const handleClose = () => {
		dispatch('close', {});
	};
</script>

<section
	transition:fade={{ duration: 100 }}
	class="relative overflow-hidden mb-5"
>
	<!-- background img -->
	<img
		class="absolute h-full w-full object-cover"
		src="/assets/images/wallpapers/csgo_wallpaper_t.webp"
		alt="CSGO Terrorist smoking a cigar"
	/>
	<!-- background overlay -->
	<div
		class="absolute w-full h-full bg-gradient-to-t from-neutral-900/100 to-neutral-900/60"
	/>
	<!-- body -->
	<div
		class="grid gap-16 items-center justify-center relative z-10 py-20 w-default m-auto"
	>
		<header class="grid">
			<h1 class="text-red-400 font-bold uppercase text-6xl">CSGO Strats</h1>
			<p>
				Unleash your CS:GO mastery with our app - Create, strategize, and
				dominate the game like never before.
			</p>
		</header>
		<div class="flex gap-10 relative">
			<div class="grid gap-2 relative">
				<h2 class="text-red-400 font-bold">1. Create your account</h2>
				<p class="text-sm leading-6">
					Get ready to revolutionize your CS:GO gameplay. Sign up and unleash
					your strategic prowess with our platform.
				</p>
			</div>
			<div class="grid gap-2 relative">
				<h2 class="text-red-400 font-bold">2. Join / create a team</h2>
				<p class="text-sm leading-6">
					Forge alliances with elite players or create your own dream team.
					Collaborate, strategize, and dominate the CS:GO scene together.
				</p>
			</div>
			<div class="grid gap-2 relative">
				<h2 class="text-red-400 font-bold">3. Find / create a strat</h2>
				<p class="text-sm leading-6">
					Discover battle-tested tactics or invent your own. Our platform
					empowers you to create and explore innovative strategies tailored to
					your playstyle.
				</p>
			</div>
			<div class="grid gap-2 relative">
				<h2 class="text-red-400 font-bold">4. Share with the community</h2>
				<p class="text-sm leading-6">
					Amplify your impact by sharing your game-winning strategies with our
					thriving community. Inspire, receive feedback, and elevate your skills
					to new heights.
				</p>
			</div>
		</div>
		<div class="justify-self-start">
			<MainLink link="/strats">Get started</MainLink>
		</div>
	</div>
	<button on:click={handleClose} class="absolute z-20 top-4 right-4"
		><svg
			class="w-4 fill-white hover:fill-red-400 focus-within:fill-red-400 transition-colors"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 384 512"
			><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
				d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
			/></svg
		></button
	>
</section>
