<script lang="ts">
  import { CompanyCreateForm } from '$features';
  import { companyStore, type Company } from '$lib/stores/company';
  import { ArrowRightIcon } from 'lucide-svelte';

  let { data } = $props();
  const companyList = $derived($companyStore.companies);
  const lang = data.locale;
</script>

<div class="flex flex-col gap-6 max-w-md m-auto">
  {#if companyList.length === 0}
    <h1 class="heading-1">Create your company</h1>
    <p class="text-muted-foreground">Create your company to start using our platform</p>
    <CompanyCreateForm />
  {:else}
    <h1 class="heading-1">Select your company</h1>
    <p class="text-muted-foreground">Select your company to start using our platform</p>
    <div class="flex flex-col gap-4">
      {#each companyList as company}
        <a href={`/${lang}/in/${company.id}`} class="flex gap-4 justify-between items-center rounded-md bg-neutral-900 hover:bg-neutral-800 text-neutral-700 hover:text-foreground transition-colors duration-300 p-4 text-foreground !no-underline truncate">
          <span class="truncate grow">{company.name}</span>
          <ArrowRightIcon size={20} class="shrink-0" />
        </a>
      {/each}
    </div>
  {/if}
</div>