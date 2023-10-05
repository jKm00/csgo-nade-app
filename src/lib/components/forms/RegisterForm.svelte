<script lang="ts">
  import type { RegisterSchema } from "$lib/validations/zodShemas";
  import { superForm } from "sveltekit-superforms/client";
  import TextInput from "../inputs/TextInput.svelte";
  import FormButton from "../buttons/FormButton.svelte";
  import { Chasing } from "svelte-loading-spinners";
  import { page } from "$app/stores";
  import FormMessage from "../feedback/FormMessage.svelte";
  import type { SuperValidated } from "sveltekit-superforms";

  export let data: SuperValidated<RegisterSchema>;

  const { form, errors, enhance, delayed, message } = superForm(data);
</script>

<form class="grid gap-4 w-80" action="?/registerUser" method="POST" use:enhance>
  <h1 class="font-bold uppercase text-center text-3xl">Register</h1>
  <TextInput
    id="username"
    name="username"
    label="Username:"
    placeholder="myUsername"
    bind:value={$form.username}
    errors={$errors.username}
  />
  <TextInput
    id="fullName"
    name="fullName"
    label="Full name:"
    placeholder="myName"
    bind:value={$form.fullName}
    errors={$errors.fullName}
  />
  <TextInput
    id="email"
    name="email"
    label="Email:"
    placeholder="email@example.com"
    bind:value={$form.email}
    errors={$errors.email}
  />
  <TextInput
    id="password"
    name="password"
    label="Password:"
    placeholder="#Averysecretpassword123"
    bind:value={$form.password}
    errors={$errors.password}
    isPassword={true}
  />
  <TextInput
    id="passwordConfirm"
    name="passwordConfirm"
    label="Confirm password:"
    placeholder="#Averysecretpassword123"
    bind:value={$form.passwordConfirm}
    errors={$errors.passwordConfirm}
    isPassword={true}
  />
  <div>
    <div class="flex items-center gap-4">
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
      <p class="text-xs text-red-400 mt-2">Need to accept terms of service</p>
    {/if}
  </div>
  <FormButton loading={$delayed}>Register</FormButton>
  <FormMessage message={$message} status={$page.status} />
  {#if $delayed}
    <div class="grid justify-center">
      <Chasing size="60" color="#F87171" unit="px" duration="1s" />
    </div>
  {/if}
</form>
