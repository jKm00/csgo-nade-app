<script lang="ts">
	import Footer from '$lib/components/layout/Footer.svelte';
	import { onMount } from 'svelte';
	import '../app.css';
	import { invalidate } from '$app/navigation';
	import { Toaster } from 'svelte-french-toast';
	import { page } from '$app/stores';

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

<Toaster />
<div class="flex flex-col min-h-screen bg-neutral-900 text-white">
	<slot />
	<Footer version={'0.3.3'} />
</div>
