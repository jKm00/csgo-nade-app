<script lang="ts">
    import { dev } from "$app/environment";
    import { Button } from "$lib/components/ui/button";
    import { Sun } from "lucide-svelte";
    import { toggleMode, ModeWatcher } from "mode-watcher";
    
</script>

{#if dev}
  <Button variant="outline" class="fixed bottom-4 right-4  " on:click={() => toggleMode()}><Sun class="w-4 h-4" /></Button>
{/if}

<ModeWatcher />
