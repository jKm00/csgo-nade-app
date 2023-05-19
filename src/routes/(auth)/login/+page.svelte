<script lang="ts">
  import { page } from "$app/stores";
  import { superForm } from "sveltekit-superforms/client";
  import { Chasing } from "svelte-loading-spinners";

  export let data;

  const { form, errors, enhance: superEnhance, delayed } = superForm(data.form);
</script>

<form class="grid gap-4 w-80" action="?/login" method="POST" use:superEnhance>
  <h1 class="font-bold uppercase text-center text-3xl">Login</h1>
  <div class="grid gap-1">
    <label class="text-neutral-400 text-sm" for="email">Email:</label>
    <input
      class="bg-neutral-700 p-2 rounded"
      type="text"
      id="email"
      name="email"
      placeholder="email@example.com"
      bind:value={$form.email}
    />
    {#if $errors.email}
      <p class="text-xs text-red-400 text-left">{$errors.email[0]}</p>
    {/if}
  </div>
  <div class="grid gap-2">
    <label class="text-neutral-400 text-sm" for="password">Password:</label>
    <input
      class="bg-neutral-700 p-2 rounded"
      type="password"
      id="password"
      name="password"
      placeholder="#Averysecretpassword123"
      bind:value={$form.password}
    />
    {#if $errors.password}
      <p class="text-xs text-red-400 text-left">{$errors.password[0]}</p>
    {/if}
  </div>
  {#if $page.status === 400}
    <p class="text-sm text-red-400">
      {"Invalid credentials. Please try again"}
    </p>
  {/if}
  {#if $page.status === 500}
    <p class="text-sm text-red-400">
      {"Server error. Please try again later"}
    </p>
  {/if}
  <button
    class="bg-red-400 hover:bg-red-500 focus-within:bg-red-500 active:bg-red-600 p-2 rounded mt-2"
    type="submit"
    disabled={$delayed}>Login</button
  >
  {#if $delayed}
    <div class="grid justify-center">
      <Chasing size="60" color="#F87171" unit="px" duration="1s" />
    </div>
  {/if}
  <p class="text-sm text-neutral-400 text-center">
    Don't have an account? <a
      class="underline hover:text-white focus-within:text-white"
      href="/register">Sign up here</a
    >
  </p>
</form>
