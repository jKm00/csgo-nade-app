import type { User } from '$lib/features/navBar/types/User';
import { get, writable } from 'svelte/store';
import { page } from '$app/stores';
import { notificationSubscription, notifications } from './notificationStore';
import toast from 'svelte-french-toast';

export const authUser = writable<User | null>(null);

authUser.subscribe(async (user) => {
	if (user) {
		const supabase = get(page).data.supabase;

		const { data } = await supabase
			.from('team_invitations')
			.select('*', { count: 'exact' })
			.eq('player_id', user.id);

		notifications.set(data.length);

		const subscription = await supabase
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
						notifications.update((value) => {
							return value + 1;
						});
						toast('You got a new invite', {
							icon: '📩',
							style: 'background: #333; color:#fff',
						});
					} else if (eventType === 'DELETE') {
						notifications.update((value) => {
							if (value === 0) return 0;
							return value - 1;
						});
					}
				}
			)
			.subscribe();

		notificationSubscription.set(subscription);
	} else {
		const subscription = get(notificationSubscription);
		subscription?.unsubscribe();
		notificationSubscription.set(null);
	}
});
