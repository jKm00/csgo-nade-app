<script lang="ts">
  import { superForm } from 'sveltekit-superforms/client';
  import TextInput from '../inputs/TextInput.svelte';
  import { TEAM_ROLES } from '$lib/shared/teamRoles';
  import FormDropdown from '../inputs/Dropdown.svelte';
  import type { InvitePlayerSchema } from '$lib/validations/zodShemas';
  import { Button } from '$lib/components/ui/button';
  import type { SuperValidated } from 'sveltekit-superforms';

  export let data: SuperValidated<InvitePlayerSchema>;
  export let teamId: number;

  const { form, errors, enhance } = superForm(data);
</script>

<form
  class="grid gap-4 items-center mb-6 px-4"
  action="?/invitePlayer"
  method="POST"
  use:enhance
>
  <input type="hidden" name="teamId" value={teamId} />
  <TextInput
    id="username"
    name="username"
    label="Username:"
    placeholder="Enter players username"
    value={$form.username}
    errors={$errors.username}
  />
  <FormDropdown
    id="role"
    name="role"
    placeholder="Team role"
    options={TEAM_ROLES}
    value={$form.role}
    errors={$errors.role}
  />
  <Button>Invite player</Button>
</form>
