<script lang="ts">
  import { userStore } from '$lib/stores/user';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { BackofficeHeader } from '$features';

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

<div>
  <BackofficeHeader />
  <main class="py-4 px-6">
    {@render children()}
  </main>
</div>