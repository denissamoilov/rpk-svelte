<script lang="ts">
  import { Input, Button } from "$components";
  import { Alert, AlertDescription, AlertTitle } from "$components/alert";
  import PasswordStrengthIndicator from "./PasswordStrengthIndicator.svelte";
  import { page } from "$app/stores";

  let isLoading = false;
  let password = '';
  let message = '';
  let isSuccess = false;
  let lang = $page.params.lang;
  const token = $page.url.searchParams.get('token');

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    isLoading = true;

    try {
      const response = await fetch(`http://localhost:5005/api/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();

      password = '';
      isSuccess = data.success;
      message = data.message;
    } catch (error) {
      console.error("Reset password error:", error);
    } finally {
      isLoading = false;
    }
  }

</script>

<div class="flex flex-col gap-4 w-full">
  {#if isSuccess}
    <p>{message}</p>
    <a href={`/${lang}/login`}>Go to login</a>
  {:else}
    <form class="flex flex-col gap-4" on:submit={handleSubmit}>
      <div class="flex flex-col gap-1">
        <Input type="password" placeholder="Password" size="lg" label="Password" bind:value={password} />
        {#if password.length > 0}
          <PasswordStrengthIndicator password={password} />
        {/if}
      </div>

      {#if message}
        <Alert variant="error">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {message}
          </AlertDescription>
        </Alert>
      {/if}
      <Button
        type="submit"
        size="lg"
        disabled={isLoading}
      >
        {isLoading ? 'Sending...' : 'Send'}
      </Button>
    </form>
  {/if}
</div>