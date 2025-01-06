<script lang="ts">
  export let password: string;

  // Password strength checker
  let strengthResult = { score: 0, checks: {}, feedback: '' };

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
</script>

<div class="mt-3">
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