import { writable } from 'svelte/store';

export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
	id: string;
	type: ToastType;
	title: string;
	desc: string;
}

export const toastStore = writable<Toast[]>([]);

const push = (toast: Omit<Toast, 'id'>, delay: number = 4000) => {
	const id = crypto.randomUUID();

	toastStore.update((value) => {
		return [
			...value,
			{
				id,
				...toast,
			},
		];
	});

	setTimeout(() => {
		removeToast(id);
	}, delay);
};

export const removeToast = (id: string) => {
	toastStore.update((value) => {
		return value.filter((toast) => toast.id !== id);
	});
};

export const toast = {
	push,
};
