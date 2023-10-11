<script lang="ts">
  import Footer from '$lib/components/layout/Footer.svelte';
  import { onMount } from 'svelte';
  import '../app.css';
  import Toast from '$lib/components/feedback/toast/Toast.svelte';
  import {
    goto,
    invalidate,
    beforeNavigate,
    afterNavigate,
  } from '$app/navigation';
  import type { User } from '$lib/features/navBar/types/User';
  import { authUser } from '$lib/stores/authStore';
  import LoadingBar from '$lib/components/feedback/LoadingBar.svelte';
  import navigationStore from '$lib/stores/navigationStore';
  import { fade } from 'svelte/transition';

  export let data;

  $: ({ supabase, session } = data);

  onMount(() => {
    const { data } = supabase.auth.onAuthStateChange(
      async (event, _session) => {
        if (event === 'PASSWORD_RECOVERY') {
          goto(`/login/new-password?token=${_session?.access_token}`);
        } else {
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
              authUser.set(data as unknown as User);
            }
          } else {
            authUser.set(null);
          }
        }
      }
    );

    return () => data.subscription.unsubscribe();
  });

  beforeNavigate(() => {
    navigationStore.set('loading');
  });

  afterNavigate(() => {
    navigationStore.set('loaded');
  });
</script>

<svelte:head>
  <link
    rel="icon"
    type="image/x-icon"
    href="/assets/icons/favicons/favicon.ico"
  />
  <title>CS Strats</title>
</svelte:head>

<Toast />
{#if $navigationStore === 'loading'}
  <div out:fade={{ delay: 500 }}>
    <LoadingBar />
  </div>
{/if}
<div class="flex flex-col min-h-screen">
  <slot />
  <Footer />
</div>
