<script lang="ts">
  import type { RegisterSchema } from '$lib/validations/zodShemas';
  import { superForm } from 'sveltekit-superforms/client';
  import TextInput from '../inputs/TextInput.svelte';
  import { Chasing } from 'svelte-loading-spinners';
  import { page } from '$app/stores';
  import FormMessage from '../feedback/FormMessage.svelte';
  import type { SuperValidated } from 'sveltekit-superforms';
  import { Button } from '$lib/components/ui/button';
  import { Label } from '$lib/components/ui/label';
  import { Input } from '$lib/components/ui/input';

  export let data: SuperValidated<RegisterSchema>;

  const { form, errors, enhance, delayed, message } = superForm(data);
</script>

<form class="grid sm:grid-cols-2 gap-x-4" action="?/registerUser" method="POST" use:enhance>
  <h2 class="font-bold uppercase text-center text-xl col-span-full">Register</h2>
  <p class="text-center text-sm text-muted-foreground mb-8 col-span-full">Create your account to get started</p>
  <FormMessage message={$message} status={$page.status} />
  <div class="mb-4">
    <Label for="username" class="mb-2">Username</Label>
    <Input id="username" name="username" type="text" placeholder="johndoe123" bind:value={$form.username} class={$errors.username ? 'border-destructive' : ''} />
    {#if $errors.username}
      <p class="text-xs text-destructive">{$errors.username[0]}</p>
    {/if}
  </div>
   <div class="mb-4">
    <Label for="fullName" class="mb-2">Full name</Label>
    <Input id="fullName" name="fullName" type="text" placeholder="John Doe" bind:value={$form.fullName} class={$errors.fullName ? 'border-destructive' : ''} />
    {#if $errors.fullName}
      <p class="text-xs text-destructive">{$errors.fullName[0]}</p>
    {/if}
  </div>
   <div class="mb-4 col-span-full">
    <Label for="email" class="mb-2">Email</Label>
    <Input id="email" name="email" type="text" placeholder="email@exampe.com" bind:value={$form.email} class={$errors.email ? 'border-destructive' : ''} />
    {#if $errors.email}
      <p class="text-xs text-destructive">{$errors.email[0]}</p>
    {/if}
  </div>
   <div class="mb-4 col-span-full">
    <Label for="password" class="mb-2">Password</Label>
    <Input id="password" name="password" type="password" bind:value={$form.password} class={$errors.password ? 'border-destructive' : ''} />
    {#if $errors.password}
      <p class="text-xs text-destructive">{$errors.password[0]}</p>
    {/if}
  </div>
   <div class="mb-4 col-span-full">
    <Label for="passwordConfirm" class="mb-2">Confirm password</Label>
    <Input id="passwordConfirm" name="passwordConfirm" type="password" bind:value={$form.passwordConfirm} class={$errors.passwordConfirm ? 'border-destructive' : ''} />
    {#if $errors.passwordConfirm}
      <p class="text-xs text-destructive">{$errors.passwordConfirm[0]}</p>
    {/if}
  </div>
  <div class="col-span-full mb-4">
    <div class="flex items-center gap-4 text-sm">
      <input
        type="checkbox"
        id="termsOfService"
        name="termsOfService"
        bind:checked={$form.termsOfService}
      />
      <label for="termsOfService" class="leading-4">
        I have read and accept the <a
          class="underline"
          href="/terms-of-service"
          target="_blank">terms of service</a
        >
      </label>
    </div>
    {#if $errors.termsOfService}
      <p class="text-xs text-destructive">Need to accept terms of service</p>
    {/if}
  </div>
  <Button class="col-span-full" disabled={$delayed}>Register</Button>
  {#if $delayed}
    <div class="grid justify-center">
      <Chasing size="60" color="#F87171" unit="px" duration="1s" />
    </div>
  {/if}
</form>
