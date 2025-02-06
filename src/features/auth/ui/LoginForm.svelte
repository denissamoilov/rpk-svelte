<script lang="ts">
  import { Input, Button, Separator } from "$components";
  import { Alert, AlertDescription, AlertTitle } from "$components/alert";
  import { page } from "$app/stores";
  import { goto } from '$app/navigation';
  import { authStore } from "$lib/stores/auth";

  let email = '';
  let password = '';
  let errorMessage: Error = { message: '', name: '' };
  let isLoading = false;
  let lang = $page.params.lang;

  const handleSubmit = async (e: Event) => {
    isLoading = true;
    errorMessage = { message: '', name: '' };

    try {
      await authStore.login(email, password);
      goto(`/${lang}/in`);
    } catch(error) {
      console.error('Login error:', error);
      error instanceof Error ? errorMessage = error : errorMessage = { message: 'Login failed', name: 'Login failed' };
    } finally {
      isLoading = false;
    }
  };
</script>

<div class="flex flex-col gap-4 w-full">
  <form class="flex flex-col gap-4" on:submit|preventDefault={handleSubmit}>
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
        on:click={handleSubmit}
        type="submit"
        size="lg"
        disabled={isLoading}
        isLoading={isLoading}
        isCentered={true}
      >
        {isLoading ? 'Logging in...' : 'Login'}
      </Button>
    </form>
    <Separator label="Or" class="my-4" />
    <!-- <div class="flex flex-col gap-3">
      <Button
        variant="gray"
        size="lg"
        on:click={() => {
          signIn("google");
          /* Add Google login handler */
        }}
      >
        <! -- <GoogleIcon class="size-6" /> -- >
        Continue with Google
      </Button>
    </div> -->
    <p class="text-center text-md">
      No account?{" "}
      <a href={`/${lang}/signup`}>Register</a>
    </p>
</div>
