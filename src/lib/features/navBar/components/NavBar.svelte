<script lang="ts">
	import { page } from '$app/stores';
	import type { RealtimeChannel } from '@supabase/supabase-js';
	import { onDestroy, onMount } from 'svelte';
	import toast from 'svelte-french-toast';
	import { clickOutside } from 'svelte-use-click-outside';
	import Divider from '../../../components/forms/Divider.svelte';
	import CreateMenu from './CreateMenu.svelte';
	import type { User } from '$lib/features/navBar/types/User';
	import UserMenu from '$lib/features/navBar/components/UserMenu.svelte';

	$: ({ session, supabase } = $page.data);

	let user: User;

	let showUserInfo = false;
	let numberOfAlerts: number;

	let invitationSubscription: RealtimeChannel;

	onMount(async () => {
		if (session !== null) {
			const { data: userData } = await supabase
				.from('profiles')
				.select('id, uuid, name, username, profile_picture ( filename )')
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
		}
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
				{#if numberOfAlerts > 0}
					<span
						class="absolute -top-1 -right-2 grid place-items-center w-2 aspect-square rounded-full text-xs bg-red-400"
					/>
				{/if}
			</a>
			<!-- User info -->
			<UserMenu {user} />
		</div>
	{:else}
		<ul class="flex items-center gap-4">
			<li><a href="/login">Login</a></li>
			<li><a href="/register">Register</a></li>
		</ul>
	{/if}
</nav>
