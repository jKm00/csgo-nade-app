import { browser } from '$app/environment';
import { onMount } from 'svelte';
import { writable } from 'svelte/store';

/**
 * For persiting data in local storage
 *
 * @param key for the data to store
 * @param fallback value of the data if no data is already stored for the given key
 * @returns a store with subscribe, set, and update functions
 */
export const useLocalStorage = <T>(key: string, fallback: T) => {
	let storedValue = browser ? window.localStorage.getItem(key) : null;
	let initValue = storedValue ? JSON.parse(storedValue) : fallback;

	const store = writable<T | null>(initValue);
	const { subscribe } = store;

	subscribe((val) => {
		if (browser) {
			window.localStorage.setItem(key, JSON.stringify(val));
		}
	});

	return store;
};
