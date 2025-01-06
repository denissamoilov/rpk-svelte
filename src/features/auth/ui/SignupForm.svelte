<script lang="ts">
  import { Input, Button, Separator } from "$components";
  import PasswordStrengthIndicator from "./PasswordStrengthIndicator.svelte";
  import Alert from "$components/alert/alert.svelte";
  import { AlertDescription, AlertTitle } from "$components/alert";

  let email = '';
  let password = '';
  let errorMessage: Error = { message: '', name: '' };
  let isLoading: boolean;
  export let formSendSuccess;
  export let message;

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    isLoading = true;
    message = '';
    errorMessage = { message: '', name: '' };
    formSendSuccess = false;
    
    try {
      const response = await fetch(`http://localhost:5005/api/verify-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      if (!response.ok) {
        const error = await response.json();
        console.log(error);
        errorMessage = error;
        throw new Error(error.error || 'Registration failed');
      }

      const data = await response.json();
      message = data.message || 'Please check your email for verification instructions.';
      formSendSuccess = true;
      email = '';
      password = '';
    } catch (error) {
      console.error('Registration error:', error);
      error instanceof Error ? errorMessage = error : errorMessage = { message: 'Registration failed', name: 'Registration failed' };
    } finally {
      isLoading = false;
    }
  };
</script>

<div class="flex flex-col gap-4 w-full">
  <!-- <Form action="?/register" data={data.form} invalidateAll={false} let:message let:superform> -->
    <form class="flex flex-col gap-4" on:submit={handleSubmit}>
      <Input
        type="email"
        placeholder="Email"
        size="lg"
        label="Email"
        bind:value={email}
        required
      />
      
      <div class="flex flex-col gap-1">
        <Input
          type="password"
          placeholder="Password"
          size="lg"
          label="Password"
          bind:value={password}
          required
        />
        
        <!-- Password strength indicator -->
        {#if password.length > 0}
          <PasswordStrengthIndicator password={password} />
        {/if}
      </div>
      {#if errorMessage.name}
        <Alert variant="error">
          <AlertTitle>{errorMessage.name}</AlertTitle>
          <AlertDescription>
            {errorMessage.message}
          </AlertDescription>
        </Alert>
      {/if}

      <Button
        type="submit"
        size="lg"
        disabled={isLoading}
      >
        {isLoading ? 'Registering...' : 'Register'}
      </Button>
    </form>
  <!-- </Form> -->

  <Separator label="Or" class="my-4" />

  <div class="flex flex-col gap-3">
    <Button
      variant="outline"
      size="lg"
    >
      Continue with Google
    </Button>
  </div>

  <p class="text-center text-md">
    Already have an account?{" "}
    <a href="/login">Login</a>
  </p>
</div> 
