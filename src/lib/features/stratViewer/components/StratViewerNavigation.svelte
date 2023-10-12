<script lang="ts">
  import FormButton from '$lib/components/buttons/FormButton.svelte';
  import SecondaryButton from '$lib/components/buttons/SecondaryButton.svelte';
  import Dialog from '$lib/components/containers/Dialog.svelte';
  import type { Session } from '@supabase/supabase-js';
  import { Button } from '$lib/components/ui/button';
  import { Trash } from 'lucide-svelte';

  export let session: Session | null = null;
  export let authorUuid: string | undefined = undefined;
  export let stratId: number | undefined = undefined;

  export let map: string | undefined = undefined;

  let showDeleteDialog = false;
</script>

<nav class="flex justify-between font-bold">
  <a
    class="flex items-center gap-2 hover:text-red-400 focus-within:text-red-400 group"
    href="/strats{map ? `?map=${map}` : ''}"
    ><svg
      class="fill-white group-hover:fill-red-400 group-focus-within:fill-red-400"
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      viewBox="0 0 320 512"
      ><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
        d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"
      /></svg
    >Back</a
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
