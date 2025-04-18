<!-- src/routes/[lang]/in/[id]/+page.svelte -->
<script lang="ts">
  let { data } = $props<{ data: { company: any } }>();
  let company = $derived(data.company);
</script>

<div>
  {#if company.company}
    <h1>{company.company.name}</h1>
    <!-- Add your company dashboard content here -->
  {:else}
    <p>Company not found</p>
  {/if}
</div>