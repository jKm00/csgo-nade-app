import type { RealtimeChannel } from '@supabase/supabase-js';
import toast from 'svelte-french-toast';
import { writable } from 'svelte/store';

export const notifications = writable<number>(0);

export const notificationSubscription = writable<RealtimeChannel | null>(null);

export const increment = () => {
	toast('You got a new invite', {
		icon: '📩',
		style: 'background: #333; color:#fff',
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
