import { toast } from '$lib/components/feedback/toast/toastStore';
import type { RealtimeChannel } from '@supabase/supabase-js';
import { writable } from 'svelte/store';

export const notifications = writable<number>(0);

export const notificationSubscription = writable<RealtimeChannel | null>(null);

export const increment = () => {
	toast.push({
		type: 'info',
		title: '📩 New invitations',
		desc: 'You just go a new invitations!',
	});
	notifications.update((val) => {
		return val + 1;
	});
};

export const decrement = () => {
	notifications.update((val) => {
		if (val === 0) return 0;
		return val - 1;
	});
};
