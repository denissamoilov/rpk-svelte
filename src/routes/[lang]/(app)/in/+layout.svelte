<script lang="ts">
  import { userStore } from '$lib/stores/user';
  import { companyStore } from '$lib/stores/company';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { BackofficeSidebar, Footer, Header } from '$features';
  import type { LayoutData } from './$types';

  let { data, children } = $props<{ data: LayoutData }>();

  let companyList = $derived($companyStore.companies);

  // try {
  //   await companyStore.getCompanyList();
  // } catch (error) {
  //   console.error("Error fetching user companies:", error);
  // }

  onMount(async () => {
    try {
      await companyStore.getCompanyList();
    } catch (error) {
      console.error("Error fetching user companies:", error);
    }
  })

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
  <div class="flex flex-col flex-1 p-3">
    <div class="grow flex items-center justify-center">
      {@render children()}
    </div>
  </div>
</div>
