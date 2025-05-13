<script lang="ts">
  import { Alert, AlertTitle, AlertDescription } from '$components/alert';
  import { Button } from '$components';
  import { t } from '$translations';
  import { page } from '$app/stores';
  import type { PageData } from './$types';

  export let data: PageData;
  
  const error = !data?.success;
  const success = data?.success;
  const user = data?.user;

  const lang = $page.params.lang;
</script>

<h1 class="text-heading-1 text-center mb-6" data-testid="login-title">{$t("auth.verifyEmail.title")}</h1>
<div class="flex flex-col gap-4 place-items-center">
  {#if error}
    <Alert variant="error">
      <AlertTitle>Verification Failed</AlertTitle>
      <AlertDescription>
        {data.message || 'An error occurred during email verification.'}
      </AlertDescription>
    </Alert>
  {:else if success}
    <Alert variant="success">
      <AlertTitle>Email Verified</AlertTitle>
      <AlertDescription>
        <p>{data.message}</p>
        {#if user}
          <p class="mt-2">Verified email: {user.email}</p>
        {/if}
      </AlertDescription>
    </Alert>
  {/if}

  <div class="text-center">
    <Button 
      variant="link" 
      href={`/${lang}/login`}
    >
      Go to Login
    </Button>
  </div>
</div>