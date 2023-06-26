// TODO: Remove this entire folder branch
import { redirect } from '@sveltejs/kit';

export const load = async () => {
	throw redirect(302, '/');
};
