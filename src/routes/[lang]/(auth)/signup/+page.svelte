<script lang="ts">
  import type { PageData } from "./$types";
  import { SignupForm } from "$features";

  // export let data: PageData;
  let formSendSuccess = false;
  let message = '';
</script>

<!-- <div class="min-h-screen flex items-center justify-center p-4"> -->
  <!-- <div class="w-full max-w-md"> -->
    {#if formSendSuccess}
      <h1 class="text-2xl font-bold text-center mb-8">Congratulations!</h1>
      <p class="text-center">{message}</p>
    {:else}
      <h1 class="text-2xl font-bold text-center mb-8">Create an Account</h1>
      <SignupForm bind:formSendSuccess bind:message />
    {/if}
  <!-- </div> -->
<!-- </div>  -->
