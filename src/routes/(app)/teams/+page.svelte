<script lang="ts">
  import { toast } from '$lib/components/feedback/toast/toastStore.js';
  import Dropdown from '$lib/components/inputs/Dropdown.svelte';
  import TextInput from '$lib/components/inputs/TextInput.svelte';
  import { TEAM_ROLES } from '$lib/shared/teamRoles.js';
  import { superForm } from 'sveltekit-superforms/client';
  import { Button } from '$lib/components/ui/button';

  export let data;
  export let form;

  const {
    form: teamForm,
    errors,
    enhance,
    delayed,
    message,
  } = superForm(data.form);

  $: if (form?.error) {
    toast.push({
      type: 'error',
      title: 'Error',
      desc: form.error,
    });
  }
</script>

<form
  class="grid gap-4 my-10 w-default"
  action="?/createTeam"
  method="POST"
  use:enhance
>
  <TextInput
    id="name"
    name="name"
    label="Team name:"
    value={$teamForm.name}
    errors={$errors.name}
    placeholder="myTeam"
  />
  <TextInput
    id="org"
    name="org"
    label="Organization:"
    value={$teamForm.org}
    errors={$errors.org}
    placeholder="myOrganization"
  />
  <div>
    <p class="font-bold">Your team role:</p>
    <Dropdown
      id="role"
      name="role"
      value={$teamForm.role}
      errors={$errors.role}
      placeholder="Team role"
      options={TEAM_ROLES}
    />
  </div>
  <Button>Create new team</Button>
</form>
