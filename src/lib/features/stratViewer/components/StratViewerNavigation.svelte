<script lang="ts">
  import Dialog from '$lib/components/containers/Dialog.svelte';
  import type { Session } from '@supabase/supabase-js';
  import { Button } from '$lib/components/ui/button';
  import { ChevronLeft, Trash } from 'lucide-svelte';

  export let session: Session | null = null;
  export let authorUuid: string | undefined = undefined;
  export let stratId: number | undefined = undefined;
  export let redirect: string;

  export let map: string | undefined = undefined;

  let showDeleteDialog = false;
</script>

<nav class="flex justify-between font-bold">
  <a
    class="flex items-center gap-1 hover:text-red-400 focus-within:text-red-400 group"
    href="/strats{redirect}"><ChevronLeft size="20" />Back</a
  >
  {#if authorUuid === session?.user.id}
    <Button on:click={() => (showDeleteDialog = true)} class="gap-1">
      <Trash size="20" />Delete strat
    </Button>
    <!-- Delete team dialog -->
    <Dialog
      show={showDeleteDialog}
      title="Delete strat"
      body="Are you sure you want to delete the strat? All nades assosiated with the strat will also be deleted!"
    >
      <div class="flex gap-2 justify-end" slot="form">
        <Button variant="secondary" on:click={() => (showDeleteDialog = false)}>
          Cancel
        </Button>
        <form action="?/delete&id={stratId}" method="POST">
          <Button class="flex items-center gap-1">
            Delete strat <Trash size="20" />
          </Button>
        </form>
      </div>
    </Dialog>
  {/if}
</nav>
