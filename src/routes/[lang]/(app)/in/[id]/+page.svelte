<!-- src/routes/[lang]/in/[id]/+page.svelte -->
<script lang="ts">
  import type { PageData } from './$types';
  import { companyStore } from '$lib/stores/company';
  import { page } from '$app/stores';

  let { data } = $props<{ data: PageData }>();
  
  // You can access the company data from the store
  const company = $derived($companyStore.companies.find(c => c.id === $page.params.id));
  
  $effect(() => {
    console.log("company :: ", $companyStore);
  })
</script>

<div>
  {#if company}
    <h1>{company.name}</h1>
    <!-- Add your company dashboard content here -->
  {:else}
    <p>Company not found</p>
  {/if}
</div>