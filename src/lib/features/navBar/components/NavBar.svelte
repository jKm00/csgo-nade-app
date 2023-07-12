<script lang="ts">
	import { page } from '$app/stores';
	import CreateMenu from './CreateDialog.svelte';
	import UserMenu from '$lib/features/navBar/components/UserMenu.svelte';
	import { notifications } from '$lib/stores/notificationStore';

	$: ({ session } = $page.data);

	notifications.subscribe((val) => {
		console.log(val);
	});
</script>

<nav class="flex justify-between p-4">
	<div>
		<h1 class="font-bold uppercase"><a href="/">Csgo Strats</a></h1>
	</div>
	{#if session}
		<div class="flex items-center gap-6">
			<CreateMenu />
			<!-- Notificaitons -->
			<a class="relative" href="/users/{session.user.id}/alerts">
				<svg
					class="w-4 fill-white cursor-pointer"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 448 512"
					><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
						d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z"
					/></svg
				>
				{#if $notifications !== 0}
					<span
						class="absolute -top-1 -right-2 grid place-items-center w-2 aspect-square rounded-full text-xs bg-red-400"
					/>
				{/if}
			</a>
			<!-- User info -->
			<UserMenu />
			<form action="/logout" method="POST">
				<button
					class="flex items-center gap-4 hover:underline focus-within:underline"
					type="submit"
					><svg
						class="w-4 aspect-square fill-white"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 512 512"
						><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
							d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
						/></svg
					>Logout</button
				>
			</form>
		</div>
	{:else}
		<ul class="flex items-center gap-4">
			<li><a href="/login">Login</a></li>
			<li><a href="/register">Register</a></li>
		</ul>
	{/if}
</nav>
