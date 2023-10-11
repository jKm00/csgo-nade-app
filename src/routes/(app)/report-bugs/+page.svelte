<script lang="ts">
  import { page } from '$app/stores';
  import FormMessage from '$lib/components/feedback/FormMessage.svelte';
  import { toast } from '$lib/components/feedback/toast/toastStore.js';
  import TextAreaInput from '$lib/components/inputs/TextAreaInput.svelte';
  import TextInput from '$lib/components/inputs/TextInput.svelte';
  import { Button } from '$lib/components/ui/button';
  import { superForm } from 'sveltekit-superforms/client';
  import { Loader2 } from 'lucide-svelte';
  import { Input } from '$lib/components/ui/input';
  import { reportBugSchema } from '$lib/validations/zodShemas';
  import * as Form from '$lib/components/ui/form';
  import { Textarea } from '$lib/components/ui/textarea';

  export let data;
  export let form;

  // const {
  //   form: reportForm,
  //   errors,
  //   enhance,
  //   delayed,
  //   message,
  // } = superForm(data.form, { warnings: { duplicateId: false } });

  $: if (form?.message) {
    toast.push({ type: 'error', title: 'Error', desc: form.message });
  }

  $: if (form?.success) {
    toast.push({ type: 'success', title: 'Success', desc: form.success });
  }
</script>

<Form.Root method="post" form={data.form} schema={reportBugSchema} let:config>
  <Form.Field {config} name="title">
    <Form.Item>
      <Form.Label>Title</Form.Label>
      <Form.Input />
      <Form.Description>Descriptive title for the bug.</Form.Description>
      <Form.Validation />
    </Form.Item>
  </Form.Field>
  <Form.Field {config} name="description">
    <Form.Item>
      <Form.Label>Description</Form.Label>
      <Form.Textarea />
      <Form.Description
        >Please provide a meaning full description of the bug. If possible, also
        provide with a step by step of how this bug can be reproduced.</Form.Description
      >
      <Form.Validation />
    </Form.Item>
  </Form.Field>
  <Form.Button class="mt-4">
    {#if true}
      <Loader2 class="mr-2 h-4 w-4 animate-spin" />
    {/if}
    Submit report
  </Form.Button>
</Form.Root>
