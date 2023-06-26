import { writable, get } from 'svelte/store';
import { goto } from '$app/navigation';
import { browser } from '$app/environment';

export const useQueryParams = (
	params: { key: string; value: string }[],
	baseUrl: string
) => {
	const { subscribe, set } = writable(params);

	let queryParams = new URLSearchParams();

	subscribe((value) => {
		if (value) {
			queryParams = new URLSearchParams();
			value.forEach((param) => {
				queryParams.append(param.key, param.value);
			});
			if (browser) {
				goto(`${baseUrl}?${queryParams.toString()}`);
			}
		}
	});

	return {
		set,
	};
};
