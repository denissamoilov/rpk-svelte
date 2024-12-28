<script>
  import { signIn } from "@auth/sveltekit/client"
  import { Input, Button, Separator } from "$components";
  import { page } from "$app/stores";
  console.log("session :: ", $page.data.session)
</script>

<div class="flex flex-col gap-4 w-full">
  <form class="flex flex-col gap-4">
    <Input type="email" placeholder="Email" size="lg" label="Email" />
    <Input type="password" placeholder="Password" size="lg" label="Pasword" />

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
      <a href="/forgot-password" class="text-md">
        Forgot password?
      </a>
    </div>
    <Button
      type="submit"
      size="lg"
    >
      <!-- {#if (isSubmitting || isLoading)}
        Loading
      {:else} -->
        Login
      <!-- {/if} -->
    </Button>
  </form>
  <Separator label="Or" orientation="horizontal"><span slot="label">Or</span></Separator>
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
    <a href="/signup">Register</a>
  </p>
</div>