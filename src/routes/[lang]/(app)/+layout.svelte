<script lang="ts">
  import { userStore } from '$lib/stores/user';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { onMount, onDestroy } from 'svelte';

  let isInitialLoad = true;
  let unsubscribeAuth: () => void;

  onMount(() => {
    // Check if user is authenticated
    const unsubscribe = userStore.subscribe(({ isAuthenticated, isLoading }) => {
      if (!isLoading && !isAuthenticated) {
        const lang = $page.params.lang;
        goto(`/${lang}/login`);
      }
      if (!isLoading) {
        isInitialLoad = false;
      }
    });

    // Listen for auth events
    const handleTokenExpired = () => {
      console.log('Session expiring soon, refreshing...');
    };

    const handleTokenRefresh = () => {
      console.log('Session refreshed successfully');
    };

    const handleAuthError = (event: any) => {
      console.error('Auth error:', event.payload?.error);
      
      // If it's a critical error, redirect to login
      if (event.payload?.context === 'auto-refresh') {
        const lang = $page.params.lang;
        goto(`/${lang}/login`);
      }
    };

    // Initialize auth state after checking
    userStore.initializeAuth();
  });

  onDestroy(() => {
    if (unsubscribeAuth) {
      unsubscribeAuth();
    }
  });
</script>

{#if isInitialLoad}
  <div class="fixed inset-0 bg-background/50 backdrop-blur-sm">
    <div class="flex h-full w-full items-center justify-center">
      <div class="flex flex-col items-center gap-2">
        <div class="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        <p class="text-muted-foreground">Loading...</p>
      </div>
    </div>
  </div>
{/if}

<div class:opacity-0={isInitialLoad} class:pointer-events-none={isInitialLoad}>
  <slot />
</div> 