<script lang="ts">
  import { Input, Button, Separator } from "$components";
  import { Alert, AlertDescription, AlertTitle } from "$components/alert";
  import { api } from "$lib/api";
  import { config } from "$lib/config";

  let isLoading = false;
  let email = '';
  let message = '';
  let isSuccess = false;

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    isLoading = true;

    try {
      const response = await api(config.endpoints.auth.forgotPassword, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      isSuccess = data.success;
      message = data.message;

      if (data.success) {
        localStorage.setItem('token', data.token);
      }
    } catch (error) {
      console.error("Forgot password error:", error);
    } finally {
      isLoading = false;
    }
  }

</script>

<div class="flex flex-col gap-4 w-full">
  {#if isSuccess}
    <p>{message}</p>
  {:else}
    <form class="flex flex-col gap-4" on:submit={handleSubmit}>
      <Input type="email" placeholder="Email" size="lg" label="Email" bind:value={email} />

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