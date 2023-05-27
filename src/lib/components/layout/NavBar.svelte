<script lang="ts">
	import { page } from '$app/stores';
	import type { RealtimeChannel } from '@supabase/supabase-js';
	import { onDestroy, onMount } from 'svelte';
	import { clickOutside } from 'svelte-use-click-outside';

	$: ({ session, supabase, authUser } = $page.data);

	$: playerId = authUser === null ? '-1' : authUser.id;

	let showUserInfo = false;
	let numberOfAlerts: number;

	let invitationSubscription: RealtimeChannel;

	onMount(async () => {
		// Fetch all invitations
		const { data } = await supabase
			.from('team_invitations')
			.select('*', { count: 'exact' })
			.eq('player_id', playerId);

		numberOfAlerts = data.length;

		// Subscribe to any further changes to invitations
		invitationSubscription = supabase
			.channel('table_db_changes')
			.on(
				'postgres_changes',
				{
					event: '*',
					schema: 'public',
					table: 'team_invitations',
					filter: `player_id=eq.${playerId}`,
				},
				(payload: any) => {
					const eventType = payload.eventType;
					if (eventType === 'INSERT') {
						numberOfAlerts = numberOfAlerts + 1;
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
	<ul class="flex gap-2">
		{#if session}
			<div class="flex gap-6">
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
						class="flex gap-2"
						on:click={() => (showUserInfo = !showUserInfo)}
					>
						<img
							class="w-4 invert"
							src="/assets/images/default_profile_picture.avif"
							alt="{session.user.email}'s profile picture"
						/>
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
							<ul class="grid gap-2 text-sm">
								<li>
									<a
										class="hover:underline focus-within:underline"
										href="/users/{session.user.id}"
										on:click={() => (showUserInfo = false)}
										>{session.user.email}</a
									>
								</li>
								<li>
									<form action="/logout" method="POST">
										<button
											class="hover:underline focus-within:underline"
											type="submit">Logout</button
										>
									</form>
								</li>
							</ul>
						</div>
					{/if}
				</div>
			</div>
			<!-- <li>
				<a href="/users/{session.user.id}">{session.user.email}</a>
			</li>
			<li>
				<form action="/logout" method="POST">
					<button type="submit">Logout</button>
				</form>
			</li> -->
		{:else}
			<li><a href="/login">Login</a></li>
			<li><a href="/register">Register</a></li>
		{/if}
	</ul>
</nav>
