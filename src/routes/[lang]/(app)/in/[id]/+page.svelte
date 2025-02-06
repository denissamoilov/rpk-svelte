<!-- src/routes/[lang]/in/[id]/+page.svelte -->
<script lang="ts">
  import { companyStore } from '$lib/stores/company';

  let company = $derived($companyStore.selectedCompany);

</script>

<div>
  {#if company}
    <h1>{company.name}</h1>
    <!-- Add your company dashboard content here -->
  {:else}
    <p>Company not found</p>
  {/if}
</div>