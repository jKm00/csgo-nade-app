<script lang="ts">
  import { page } from '$app/stores';
  import TextInput from '$lib/components/inputs/TextInput.svelte';
  import { superForm } from 'sveltekit-superforms/client';
  import { Button } from '$lib/components/ui/button';

  export let data;

  const { url } = $page;
  const { searchParams } = url;

  const token = searchParams.get('token');

  const { form, errors, delayed, enhance, message } = superForm(data.form);

  $: console.log($message);
</script>

{#if $message && $page.status === 200}
  <div class="grid gap-4 text-center">
    <p>Your password has changed!</p>
    <a class="text-primary hover:underline focus-within:underline" href="/"
      >Back to home page</a
    >
  </div>
{:else}
  <form class="grid gap-4 w-default-form" method="POST" use:enhance>
    <TextInput
      id="newPassword"
      name="newPassword"
      label="Password:"
      placeholder="Enter new password..."
      bind:value={$form.newPassword}
      errors={$errors.newPassword}
      isPassword={true}
    />
    <TextInput
      id="newPasswordConfirm"
      name="newPasswordConfirm"
      label="Confirm password:"
      placeholder="Enter the same password again..."
      bind:value={$form.newPasswordConfirm}
      errors={$errors.newPasswordConfirm}
      isPassword={true}
    />
    <input type="hidden" name="token" bind:value={$form.token} />
    {#if $message}
      <p class="text-sm text-red-400">{$message}</p>
    {/if}
    <Button disabled={$delayed ?? false}>Change password</Button>
    <a
      class="text-sm text-neutral-400 text-center hover:underline focus-within:underline"
      href="/login">Back to login page</a
    >
  </form>
{/if}
