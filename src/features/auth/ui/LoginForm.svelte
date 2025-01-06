<script lang="ts">
  import { signIn } from "@auth/sveltekit/client"
  import { Input, Button, Separator } from "$components";
  import { Alert, AlertDescription, AlertTitle } from "$components/alert";
  import { page } from "$app/stores";
  import { goto } from '$app/navigation';
  import { userStore } from "$lib/stores/user";

  let email = '';
  let password = '';
  let errorMessage: Error = { message: '', name: '' };
  let isLoading = false;
  let lang = $page.params.lang;
  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    isLoading = true;
    errorMessage = { message: '', name: '' };
    
    try {
      const response = await fetch(`http://localhost:5005/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      if (!response.ok) {
        const error = await response.json();
        errorMessage = error;
        throw new Error(error.error || 'Login failed');
      }

      const data = await response.json();
      
      // Store user data and tokens
      userStore.login(data.user, {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken
      });
      
      // Redirect to dashboard in the app group
      goto(`/${lang}/in`);
    } catch (error) {
      console.error('Login error:', error);
      error instanceof Error ? errorMessage = error : errorMessage = { message: 'Login failed', name: 'Login failed' };
    } finally {
      isLoading = false;
    }
  };
</script>

<div class="flex flex-col gap-4 w-full">
  <form class="flex flex-col gap-4" on:submit={handleSubmit}>
    <Input
      type="email"
      placeholder="Email"
      size="lg"
      label="Email"
      bind:value={email}
      required
    />
    
    <Input
      type="password"
      placeholder="Password"
      size="lg"
      label="Password"
      bind:value={password}
      required
    />

    {#if errorMessage.name}
      <Alert variant="error">
        <AlertTitle>{errorMessage.name}</AlertTitle>
        <AlertDescription>
          {errorMessage.message}
        </AlertDescription>
      </Alert>
    {/if}

      <div class="flex justify-between items-center">
        <!-- <Controller
          control={control}
          name={`rememberMe`}
          render={({ field: { onChange, value } }) => (
            <Checkbox
              onCheckedChange={onChange}
              checked={value === true}
              id="rememberMe"
              label={t("Auth.LoginForm.rememberMe")}
            />
          )}
        /> -->
        <a href={`/${lang}/forgot-password`} class="text-md">
          Forgot password?
        </a>
      </div>
      <Button
        type="submit"
        size="lg"
        disabled={isLoading}
      >
        {isLoading ? 'Logging in...' : 'Login'}
      </Button>
    </form>
    <Separator label="Or" class="my-4" />
    <div class="flex flex-col gap-3">
      <Button
        variant="outline"
        size="lg"
        on:click={() => {
          signIn("google");
          /* Add Google login handler */
        }}
      >
        <!-- <GoogleIcon class="size-6" /> -->
        Continue with Google
      </Button>
    </div>
    <p class="text-center text-md">
      No account?{" "}
      <a href={`/${lang}/signup`}>Register</a>
    </p>
</div>
