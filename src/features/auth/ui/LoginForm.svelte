<script lang="ts">
  import { Input, Button, Separator } from '$components';
  import { Alert, AlertDescription, AlertTitle } from '$components/alert';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import type { LoginSchema } from '$schemas/auth';
  import { superForm } from 'sveltekit-superforms';
  import { userStore } from '$lib/stores/user';

  let lang = $page.params.lang;

  export let data: LoginSchema;

  const { form, errors, enhance, delayed } = superForm(data, {
    dataType: 'json',
    onResult: async ({ result }) => {
      if (result.type === 'success' && result.data?.success) {
        console.log('result.data :: ', result.data);
        userStore.setUser(result.data.user);
        goto(`/${lang}/signup`);
      }
    },
  });

  let isInvalid = false;
  let errorDescription = '';

  $: {
    isInvalid = Boolean($errors.email?.length || $errors.password?.length);
    errorDescription = $errors.email?.[0] || $errors.password?.[0] || '';
  }
</script>

<div class="flex flex-col gap-4 w-full">
  <form class="flex flex-col gap-4" method="POST" use:enhance>
    <Input
      type="email"
      name="email"
      placeholder="Email"
      size="lg"
      bind:value={$form.email}
      isError={Boolean($errors.email?.length)}
    />

    <Input
      type="password"
      name="password"
      placeholder="Password"
      size="lg"
      bind:value={$form.password}
      isError={Boolean($errors.password?.length)}
    />

    {#if $errors.email || $errors.password}
      <Alert variant="error">
        <AlertTitle>Error!</AlertTitle>
        <AlertDescription>Wrong email or password.</AlertDescription>
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
      <a href={`/${lang}/forgot-password`} class="text-md"> Forgot password? </a>
    </div>
    <Button type="submit" size="lg" disabled={$delayed} isLoading={$delayed} isCentered={true}>
      {$delayed ? 'Logging in...' : 'Login'}
    </Button>
  </form>
  <Separator label="Or" class="my-4" />
  <div class="flex flex-col gap-3">
    <Button variant="gray" size="lg">
      <!-- <GoogleIcon class="size-6" /> -->
      Continue with Google
    </Button>
  </div>
  <p class="text-center text-md">
    No account?{' '}
    <a href={`/${lang}/signup`}>Register</a>
  </p>
</div>
