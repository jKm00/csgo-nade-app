<script lang="ts">
	import Footer from '$lib/components/layout/Footer.svelte';
	import { onMount } from 'svelte';
	import '../app.css';
	import Toast from '$lib/components/feedback/toast/Toast.svelte';
	import { toast } from '$lib/components/feedback/toast/toastStore';
	import { goto, invalidate } from '$app/navigation';
	import BetaBanner from '$lib/components/layout/BetaBanner.svelte';
	import type { User } from '$lib/features/navBar/types/User';
	import { authUser } from '$lib/stores/authStore';

	export let data;

	$: ({ supabase, session } = data);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange(
			async (event, _session) => {
				if (_session?.expires_at !== session?.expires_at) {
					invalidate('supabase:auth');
				}

				if (session) {
					const { data } = await supabase
						.from('profiles')
						.select('id, uuid, name, username, profile_picture ( filename )')
						.eq('uuid', session.user.id)
						.single();

					if (!data) {
						goto('/profile-setup');
					} else {
						authUser.set(data as User);
					}
				} else {
					authUser.set(null);
				}
			}
		);

		return () => data.subscription.unsubscribe();
	});
</script>

<svelte:head>
	<link
		rel="icon"
		type="image/x-icon"
		href="/assets/icons/favicons/favicon.ico"
	/>
	<title>CSGO Strats - BETA</title>
</svelte:head>

<Toast />
<div class="flex flex-col min-h-screen bg-neutral-900 text-white">
	<BetaBanner />
	<slot />
	<Footer />
</div>
