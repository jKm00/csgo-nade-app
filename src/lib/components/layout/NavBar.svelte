<script lang="ts">
	import { page } from '$app/stores';
	import type { RealtimeChannel } from '@supabase/supabase-js';
	import { onDestroy, onMount } from 'svelte';
	import toast from 'svelte-french-toast';
	import { clickOutside } from 'svelte-use-click-outside';
	import Divider from '../forms/Divider.svelte';

	$: ({ session, supabase } = $page.data);

	let user: { id: number; profile_picture: { filename: string } };

	let showUserInfo = false;
	let numberOfAlerts: number;

	let invitationSubscription: RealtimeChannel;

	onMount(async () => {
		const { data: userData } = await supabase
			.from('profiles')
			.select('id, profile_picture ( filename )')
			.eq('uuid', session.user.id);

		user = userData[0];

		// Fetch all invitations
		const { data } = await supabase
			.from('team_invitations')
			.select('*', { count: 'exact' })
			.eq('player_id', user.id);

		numberOfAlerts = data?.length ?? 0;

		// Subscribe to any further changes to invitations
		invitationSubscription = await supabase
			.channel('table_db_changes')
			.on(
				'postgres_changes',
				{
					event: '*',
					schema: 'public',
					table: 'team_invitations',
					filter: `player_id=eq.${user.id}`,
				},
				(payload: any) => {
					const eventType = payload.eventType;
					if (eventType === 'INSERT') {
						numberOfAlerts = numberOfAlerts + 1;
						toast('You got a new invite', {
							icon: '📩',
							style: 'background: #333; color:#fff',
						});
					} else if (eventType === 'DELETE') {
						numberOfAlerts = numberOfAlerts - 1;
					}
				}
			)
			.subscribe();
	});

	onDestroy(() => {
		if (invitationSubscription) {
			invitationSubscription.unsubscribe();
		}
	});
</script>

<nav class="flex justify-between p-4">
	<div>
		<h1 class="font-bold uppercase"><a href="/">Csgo Strats</a></h1>
	</div>
	{#if session}
		<div class="flex items-center gap-6">
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
				{#if numberOfAlerts > 0}
					<span
						class="absolute -top-1 -right-2 grid place-items-center w-2 aspect-square rounded-full text-xs bg-red-400"
					/>
				{/if}
			</a>
			<!-- User info -->
			<div class="relative" use:clickOutside={() => (showUserInfo = false)}>
				<button
					class="flex items-center gap-2"
					on:click={() => (showUserInfo = !showUserInfo)}
				>
					{#if user}
						<img
							class="w-5 rounded-full"
							src="/assets/images/profile_pictures/{user?.profile_picture
								.filename}"
							alt="{session.user.email}'s profile picture"
						/>
					{:else}
						<span class="w-5 rounded-full aspect-square" />
					{/if}
					<svg
						class="w-2 fill-white"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 320 512"
						><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
							d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"
						/></svg
					>
				</button>
				{#if showUserInfo}
					<div
						class="absolute right-0 z-50 top-full bg-neutral-800 p-4 rounded shadow"
					>
						<ul class="grid gap-2 w-32 text-sm">
							<li>
								<a
									class="flex items-center gap-4 hover:underline focus-within:underline"
									href="/users/{session.user.id}"
									on:click={() => (showUserInfo = false)}
									><svg
										class="w-3 fill-white"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 448 512"
										><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
											d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"
										/></svg
									>Account page</a
								>
							</li>
							<li>
								<a
									class="flex items-center gap-4 hover:underline focus-within:underline"
									href="/users/{session.user.id}/settings"
									on:click={() => (showUserInfo = false)}
									><svg
										class="w-3 fill-white"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 512 512"
										><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
											d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z"
										/></svg
									>Settings</a
								>
							</li>
							<Divider />
							<li>
								<form action="/logout" method="POST">
									<button
										class="flex items-center gap-4 hover:underline focus-within:underline"
										type="submit"
										><svg
											class="w-3 fill-white"
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 512 512"
											><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
												d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
											/></svg
										>Logout</button
									>
								</form>
							</li>
						</ul>
					</div>
				{/if}
			</div>
		</div>
	{:else}
		<ul class="flex items-center gap-4">
			<li><a href="/login">Login</a></li>
			<li><a href="/register">Register</a></li>
		</ul>
	{/if}
</nav>
