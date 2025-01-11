<script lang="ts">
  import { userStore } from '$lib/stores/user';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { BackofficeSidebar, Header } from '$features';
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

<div class="h-dvh flex flex-col">
  <Header />
  <div class="grid grid-cols-[250px_1fr] flex-1 gap-4 px-3 pb-3">
    <BackofficeSidebar />
    <main class="flex-1 p-3">
      {@render children()}
    </main>
  </div>
</div>