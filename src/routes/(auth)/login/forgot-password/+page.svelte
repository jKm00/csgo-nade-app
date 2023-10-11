<script lang="ts">
  import { page } from '$app/stores';
  import TextInput from '$lib/components/inputs/TextInput.svelte';
  import { superForm } from 'sveltekit-superforms/client';
  import { Button } from '$lib/components/ui/button';

  export let data;

  const { form, errors, delayed, enhance, message } = superForm(data.form);
</script>

{#if $message && $page.status === 200}
  <p>
    An email has been sent. Please open the email and follow the link to reset
    your password
  </p>
{:else}
  <form class="grid gap-4 w-default-form" method="POST" use:enhance>
    <TextInput
      id="email"
      name="email"
      label="Email:"
      placeholder="Enter your email..."
      bind:value={$form.email}
      errors={$errors.email}
    />
    <Button disabled={$delayed ?? false}>Submit</Button>
    <a
      class="text-sm text-neutral-400 text-center hover:underline focus-within:underline"
      href="/login">Back to login page</a
    >
  </form>
{/if}
