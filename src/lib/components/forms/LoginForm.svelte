<script lang="ts">
  import type { LoginSchema } from '$lib/validations/zodShemas';
  import { superForm } from 'sveltekit-superforms/client';
  import { page } from '$app/stores';
  import { Chasing } from 'svelte-loading-spinners';
  import FormMessage from '../feedback/FormMessage.svelte';
  import type { SuperValidated } from 'sveltekit-superforms';
  import type { User } from '$lib/features/navBar/types/User';
  import { authUser } from '$lib/stores/authStore';
  import { goto } from '$app/navigation';
  import { Button } from '$lib/components/ui/button';
  import { Label } from '$lib/components/ui/label';
  import { Input } from '$lib/components/ui/input';

  export let data: SuperValidated<LoginSchema>;
  export let redirectTo: string;

  const {
    form,
    errors,
    enhance: superEnhance,
    delayed,
    message,
  } = superForm(data);

  $: {
    setAuthUser($message?.user, $message?.redirectTo);
  }

  const setAuthUser = (user?: User, redirectTo?: string) => {
    if (user && redirectTo) {
      authUser.set(user);
      goto(redirectTo);
    }
  };
</script>

<form
  class="grid"
  action="?/login{redirectTo ? `&redirectTo=${redirectTo}` : ''}"
  method="POST"
  use:superEnhance
>
  <h2 class="font-bold uppercase text-center text-xl">Login</h2>
  <p class="text-center text-sm text-muted-foreground mb-8">Enter your email and password to login</p>
  <FormMessage message={$message} status={$page.status} />
  <div class="mb-4">
    <Label for="email" class="mb-2">Email</Label>
    <Input id="email" name="email" type="email" placeholder="email@example.com" bind:value={$form.email} class={$errors.email ? 'border-destructive' : ''} />
    {#if $errors.email}
      <p class="text-xs text-destructive">{$errors.email[0]}</p>
    {/if}
  </div>
  <div class="mb-4">
    <Label for="password" class="mb-2">Password</Label>
    <Input id="password" name="password" type="password" bind:value={$form.password} class={$errors.password ? 'border-destructive' : ''} />
    {#if $errors.password}
      <p class="text-xs text-destructive">{$errors.password[0]}</p>
    {/if}
  </div>
  <Button type="submit" disabled={$delayed}>Login</Button>
   <!-- loading indicator -->
  {#if $delayed}
    <div class="grid justify-center">
      <Chasing size="60" color="#F87171" unit="px" duration="1s" />
    </div>
  {/if}
</form>
