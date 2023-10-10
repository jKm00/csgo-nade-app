<!-- The loading bar show at the top of the page when navigating -->
<script lang="ts">
  import navigationStore from '$lib/stores/navigationStore';
  import { onMount, onDestroy } from 'svelte';
  import { cubicOut } from 'svelte/easing';
  import { tweened } from 'svelte/motion';

  const progress = tweened(0, {
    duration: 3500,
    easing: cubicOut,
  });

  const unsubscribe = navigationStore.subscribe((state) => {
    if (state === 'loaded') {
      progress.set(1, { duration: 1000 });
    }
  });

  onMount(() => {
    progress.set(0.7);
  });

  onDestroy(() => {
    unsubscribe();
  });
</script>

<div
  class="fixed top-0 left-0 right-0 bg-red-400 h-1 origin-left custom"
  style="--scale: {$progress * 100}%"
/>

<style scoped>
  .custom {
    --scale: 0;
    transform: scaleX(var(--scale));
  }
</style>
