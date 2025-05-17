<!-- src/routes/[lang]/in/[id]/+page.svelte -->
<script lang="ts">
  let { data } = $props<{ data: { company: any } }>();
  let company = $derived(data.company);
</script>

<div class="py-2">
  {#if company.company}
    <h1 class="text-heading-2">{company.company.name}</h1>
    <!-- Add your company dashboard content here -->
  {:else}
    <p>Company not found</p>
  {/if}
</div>