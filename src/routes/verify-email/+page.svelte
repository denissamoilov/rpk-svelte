<script lang="ts">
  import type { PageData } from './$types';
  import { Alert, AlertTitle, AlertDescription } from '$components/alert';

  export let data: PageData;
</script>

<div class="min-h-screen flex items-center justify-center p-4">
  <div class="w-full max-w-md">
    <Alert variant="error">
      <AlertTitle>Verification Failed</AlertTitle>
      <AlertDescription>
        {data.error?.message || 'An error occurred during email verification.'}
      </AlertDescription>
    </Alert>

    <div class="mt-4 text-center">
      <a href="/login" class="text-primary hover:underline">Back to Login</a>
    </div>
  </div>
</div> 