<script lang="ts">
	import Footer from '$lib/components/layout/Footer.svelte';
	import { onMount } from 'svelte';
	import '../app.css';
	import { invalidate } from '$app/navigation';
	import { Toaster } from 'svelte-french-toast';
	import { page } from '$app/stores';
	import BetaBanner from '$lib/components/layout/BetaBanner.svelte';

	export let data;

	$: ({ supabase, session } = data);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

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

<Toaster />
<div class="flex flex-col min-h-screen bg-neutral-900 text-white">
	<BetaBanner />
	<slot />
	<Footer />
</div>
