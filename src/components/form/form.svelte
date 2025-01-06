<script lang="ts" generics="T extends Record<string, unknown>">
  import { superForm } from 'sveltekit-superforms';
  import type { SuperValidated } from 'sveltekit-superforms';

  export let data: SuperValidated<T>;
  export let dataType: 'form' | 'json' = 'form';
  export let invalidateAll = true;
  
  export const superform = superForm(data, {
		dataType,
		invalidateAll,
		onUpdated({ form }) {
			if (form.valid) {
				// Successful post! Do some more client-side stuff.
			}
		}
	});

  const { form, message, delayed, errors, allErrors, enhance } = superform;
</script>

<form method="POST" use:enhance {...$$restProps}>
	<slot
		{superform}
		form={$form}
		message={$message}
		errors={$errors}
		allErrors={$allErrors}
		delayed={$delayed}
	/>
</form>