import type { User } from '$lib/features/navBar/types/User';
import { get, writable } from 'svelte/store';
import { page } from '$app/stores';
import {
	decrement,
	increment,
	notificationSubscription,
	notifications,
} from './notificationStore';

export const authUser = writable<User | null>(null);

// Subscribe / unsubscribe from invitations when auth user changes
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
						increment();
					} else if (eventType === 'DELETE') {
						decrement();
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
