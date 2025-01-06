<script lang="ts">
  import { Alert, AlertTitle, AlertDescription } from '$components/alert';
  import { Button } from '$components';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import type { PageData } from './$types';

  export let data: PageData;
  
  const error = !data?.success;
  const success = data?.success;
  const user = data?.user;

  const handleLoginRedirect = () => {
    const lang = $page.params.lang;
    goto(`/${lang}/login`);
  };
</script>

<div class="min-h-screen flex items-center justify-center p-4">
  <div class="w-full max-w-md">
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

    <div class="mt-4 text-center">
      <Button 
        variant="outline" 
        on:click={handleLoginRedirect}
      >
        Go to Login
      </Button>
    </div>
  </div>
</div>