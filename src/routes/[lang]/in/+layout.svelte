<script lang="ts">
  import { userStore } from '$lib/stores/user';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { BackofficeSidebar } from '$features';

  let { children } = $props();

  onMount(() => {
    // Check if user is authenticated
    const unsubscribe = userStore.subscribe(({ isAuthenticated }) => {
      if (!isAuthenticated) {
        const lang = $page.params.lang;
        goto(`/${lang}/login`);
      }
    });

    return () => {
      unsubscribe();
    };
  });
</script>

<div class="p-4 h-full">
  <div class="flex gap-6 h-full">
    <BackofficeSidebar />
    <main class="p-4 flex-1">
      {@render children()}
    </main>
  </div>
</div>