import type { RealtimeChannel } from '@supabase/supabase-js';
import { writable } from 'svelte/store';

export const notifications = writable<number>(0);

export const notificationSubscription = writable<RealtimeChannel | null>(null);
