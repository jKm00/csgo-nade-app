import { authUser } from '$lib/stores/authStore.js';
import { redirect } from '@sveltejs/kit';

export const POST = async ({ locals }) => {
	await locals.supabase.auth.signOut();
	authUser.set(null);
	redirect(303, '/');
};
