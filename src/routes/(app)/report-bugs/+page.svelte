<script lang="ts">
  import { toast } from '$lib/components/feedback/toast/toastStore.js';
  import { reportBugSchema } from '$lib/validations/zodShemas';
  import * as Form from '$lib/components/ui/form';

  export let data;
  export let form;

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
  <Form.Button class="mt-4">Submit report</Form.Button>
</Form.Root>
