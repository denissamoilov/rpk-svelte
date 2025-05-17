<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { Separator } from '$components';
  import { Select } from '$components/select';
  import Button from '$components/button/button.svelte';
  import { CompanyCreateForm } from '$features';
  import { companyStore } from '$lib/stores/company';
  import type { SelectOptionType } from '$lib/types/docs';
  import { PlusIcon } from 'lucide-svelte';

  let { data } = $props();
  const companyList = $derived($companyStore.companies);
  const lang = data.locale;

  const companyOptions = $derived(companyList.map(company => ({
    value: company.id,
    label: company.name
  })));

  const changeCompany = (company: SelectOptionType) => {
    const lang = $page.params.lang;
    goto(`/${lang}/in/${company.value}`);
  }
</script>

<div class="bg-surface rounded-xl p-6 flex flex-col gap-6 max-w-md m-auto">
  {#if companyList.length === 0}
    <h1 class="text-heading-1">Create your company</h1>
    <p class="text-muted text-md">Create your company to start using our platform</p>
    <CompanyCreateForm />
  {:else}
    <h1 class="text-heading-1">Select your company</h1>
    <p class="text-muted text-md">Select your company to start using our platform</p>
    <Select currentValue={undefined} size="md" placeholder="Select your company" options={companyOptions} onChangeHandle={changeCompany} />
    <Separator label="Or" class="my-2" />
    <Button
      leftIcon={PlusIcon}
      size="lg"
      variant="primary"
      href={`/${lang}/in/create`}
    >
      Add new company
    </Button>
  {/if}
</div>