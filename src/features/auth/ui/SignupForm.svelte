<script lang="ts">
  import { Input, Button, Separator } from "$components";
  import { signIn } from "@auth/sveltekit/client";

  let email = '';
  let password = '';
  let strengthResult = { score: 0, checks: {}, feedback: '' };

  // Password strength checker
  const checkPasswordStrength = (password: string) => {
    let strength = 0;
    const checks = {
      length: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumbers: /\d/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };

    strength += checks.length ? 20 : 0;
    strength += checks.hasUpperCase ? 20 : 0;
    strength += checks.hasLowerCase ? 20 : 0;
    strength += checks.hasNumbers ? 20 : 0;
    strength += checks.hasSpecialChar ? 20 : 0;

    const missing = [];
    if (!checks.length) missing.push('8+ characters');
    if (!checks.hasUpperCase) missing.push('uppercase');
    if (!checks.hasLowerCase) missing.push('lowercase');
    if (!checks.hasNumbers) missing.push('number');
    if (!checks.hasSpecialChar) missing.push('special character');

    return {
      score: strength,
      checks,
      feedback: missing.length 
        ? `Add ${missing.join(', ')}` 
        : 'Password strength is excellent!'
    };
  };

  $: strengthResult = checkPasswordStrength(password);
  $: strengthColor = 
    strengthResult.score < 40 ? 'bg-error-500' :  // red
    strengthResult.score < 80 ? 'bg-warning-500' :  // orange
    'bg-success-500';  // green

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    // Add your registration logic here
    try {
      const response = await fetch(`http://localhost:5005/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.details?.join(', ') || 'Registration failed');
      }

      // Redirect to login or home page after successful registration
      window.location.href = '/login';
    } catch (error) {
      console.error('Registration error:', error);
      // Handle error (show message to user)
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
        <div class="mt-1">
          <div class="h-1 bg-gray-200 rounded-full overflow-hidden">
            <div
              class="h-full transition-all duration-300 {strengthColor}"
              style="width: {strengthResult.score}%;"
            ></div>
          </div>
          <p class="text-sm mt-1" style="color: {strengthColor}">
            {strengthResult.feedback}
          </p>
        </div>
      {/if}
    </div>

    <Button
      type="submit"
      size="lg"
    >
      Register
    </Button>
  </form>

  <Separator label="Or" orientation="horizontal">
    <span slot="label">Or</span>
  </Separator>

  <div class="flex flex-col gap-3">
    <Button
      variant="outline"
      size="lg"
      on:click={() => signIn("google")}
    >
      Continue with Google
    </Button>
  </div>

  <p class="text-center text-md">
    Already have an account?{" "}
    <a href="/login">Login</a>
  </p>
</div> 