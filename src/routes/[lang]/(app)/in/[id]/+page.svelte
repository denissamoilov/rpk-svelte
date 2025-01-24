<!-- src/routes/[lang]/in/[id]/+page.svelte -->
<script lang="ts">
  import { companyStore } from '$lib/stores/company';
  import type { PageData } from './$types';

  let { data } = $props<{ data: PageData }>();

  let company = $derived($companyStore.selectedCompany);

  $effect(() => {
    companyStore.fetchCompany(data.id);
  });
  
</script>

<div>
  {#if company}
    <h1>{company.name}</h1>
    <!-- Add your company dashboard content here -->
  {:else}
    <p>Company not found</p>
  {/if}
</div>