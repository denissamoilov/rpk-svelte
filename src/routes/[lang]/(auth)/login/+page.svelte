<script lang="ts">
  import { t } from '$translations';
  import type { SuperValidated } from 'sveltekit-superforms';
  import type { LoginSchema } from '$schemas/auth';
  import { LoginForm } from '$features';

  let { data }: SuperValidated<LoginSchema> = $props();
</script>

<div data-testid="login-page">
  <h1 class="text-heading-1 text-center mb-6" data-testid="login-title">{$t('auth.title')}</h1>
  <LoginForm {data} />
</div>
