<script lang="ts">
  import { companyStore } from '$lib/stores/company';
  import { authStore } from '$lib/stores/auth';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { Header } from '$features';
  import type { LayoutData } from './$types';

  let { data, children } = $props<{ data: LayoutData }>();

  // Update company store when data changes
  $effect(() => {
    if (data?.companies) {
      companyStore.setCompanyList(data.companies);
      
      // Set selected company if provided
      if (data.selectedCompanyId) {
        const selectedCompany = data.companies.find(c => c.id === data.selectedCompanyId);
        if (selectedCompany) {
          companyStore.setSelectedCompany(selectedCompany);
        }
      }
    }
  })

  onMount(() => {
    // Check if user is authenticated
    const unsubscribe = authStore.subscribe(({ isAuthenticated }) => {
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
