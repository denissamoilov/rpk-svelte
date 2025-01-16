<script lang="ts">
  import { Input, Button, Separator } from "$components";
  import PasswordStrengthIndicator from "./PasswordStrengthIndicator.svelte";
  import PersonalIdCodeInput from "./PersonalIdCodeInput.svelte";
  import Alert from "$components/alert/alert.svelte";
  import { AlertDescription, AlertTitle } from "$components/alert";
  import { api } from "$lib/api";
  import { config } from "$lib/config";
  import { page } from "$app/stores";
  let name = '';
  let surname = '';
  let personalIdCode = '';
  let email = '';
  let password = '';
  let errorMessage: Error = { message: '', name: '' };
  let isLoading: boolean;
  export let formSendSuccess;
  export let message;
  let lang = $page.params.lang;

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    isLoading = true;
    message = '';
    errorMessage = { message: '', name: '' };
    formSendSuccess = false;
    
    try {
      const response = await api(config.endpoints.auth.signup, {
        requireAuth: false,
        method: 'POST',
        body: JSON.stringify({ 
          name,
          surname,
          personalIdCode,
          email, 
          password 
        }),
      });
      
      if (!response.ok) {
        const error = await response.json();
        errorMessage = error;
        throw new Error(error.error || 'Registration failed');
      }

      const data = await response.json();
      message = data.message || 'Please check your email for verification instructions.';
      formSendSuccess = true;
      name = '';
      surname = '';
      personalIdCode = '';
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
        type="text"
        placeholder="Name"
        size="lg"
        label="Name"
        bind:value={name}
        required
      />
      <Input
        type="text"
        placeholder="Surname"
        size="lg"
        label="Surname"
        bind:value={surname}
        required
      />
      <PersonalIdCodeInput required={true} bind:value={personalIdCode} />
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
      variant="gray"
      size="lg"
    >
      Continue with Google
    </Button>
  </div>

  <p class="text-center text-md">
    Already have an account?{" "}
    <a href={`/${lang}/login`}>Login</a>
  </p>
</div> 