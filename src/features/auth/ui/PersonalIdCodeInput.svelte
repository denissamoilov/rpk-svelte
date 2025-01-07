<script lang="ts">
  import { Input } from "$components";
  
  export let value = '';
  export let required = false;
  
  const maxLength = 11;
  
  $: counter = `${value.toString().length}/${maxLength}`;
  
  // Estonian ID validation
  function validateEstonianId(code: string): boolean {
    if (code.length !== 11) return false;
    
    // Check if first number is 1-6 (gender and century)
    if (!/^[1-6]/.test(code)) return false;
    
    // Check if rest are numbers
    if (!/^\d{11}$/.test(code)) return false;
    
    // Extract date parts
    const year = parseInt(code.slice(1, 3));
    const month = parseInt(code.slice(3, 5));
    const day = parseInt(code.slice(5, 7));
    
    // Basic date validation
    if (month < 1 || month > 12) return false;
    if (day < 1 || day > 31) return false;
    
    return true;
  }

  $: isValid = value.length === 0 || validateEstonianId(value);
  $: validationMessage = !isValid ? "Invalid Estonian personal ID code" : "";
</script>

<div class="flex flex-col gap-1">
  <Input
    type="text"
    placeholder="Personal ID Code"
    size="lg"
    label="Personal ID Code"
    maxlength={maxLength}
    minlength={maxLength}
    {required}
    bind:value
    aria-invalid={!isValid}
    data-invalid={!isValid}
  >
    {#snippet append()}
      <div class="text-sm text-neutral-500 border-l border-neutral-800 pl-2">{counter}</div>
    {/snippet}
  </Input>

  {#if !isValid && value.length > 0}
    <p class="text-sm text-error-500">{validationMessage}</p>
{/if}
</div>
