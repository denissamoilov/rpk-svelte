<script lang="ts">
  import { LanguageSelector } from '$entities/LanguageSelector';
  import { cn } from '$lib/utils';
  import logo from '$lib/assets/logo.svg';
  import signup from '$lib/assets/signup.svg';

  let { children } = $props();
</script>

<div class="min-h-dvh flex justify-center p-4 gap-6">
  <main class="p-6 flex flex-col items-center justify-between w-full max-w-lg shrink-0">
    <div class="flex shrink-0 w-full items-center gap-3">
      <img src={logo} alt="Raamatupidamiskeskus logo" width={32} height={32} />
      <span class="text-heading-3 leading-8 font-bold">RPK</span>
    </div>
    <div class="w-full h-full flex flex-col justify-center">
      {@render children()}
    </div>
    <LanguageSelector />
  </main>
  <div
    class={cn(
      "bg-neutral-900 rounded-xl flex flex-col items-center justify-center w-full min-h-full",
      // "[background-color:hsla(203,88%,47%,1)]",
      // "[background-image:radial-gradient(circle_at_102%_80%,_hsla(269,66%,59%,1)_0%,_transparent_40.31%),_radial-gradient(circle_at_16%_46%,_hsla(0,0%,98%,0.64)_0%,_transparent_50%)]",
      // "[background-blend-mode:normal,normal]"
    )}
  >
  <!-- <div class="grid grid-cols-3 gap-4 p-4">
  {#each primaryColors as color}
    <div
      class={`flex items-center justify-center h-32 rounded-lg shadow-md ${color.class}`}
    >
      <span class="text-white font-bold">{color.name}</span>
    </div>
  {/each}
</div> -->

    <img src={signup} alt="Raamatupidamiskeskus logo" />
  </div>
</div>