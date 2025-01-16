<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from "$app/stores";
  import { Select, type SelectSizeType } from "$components/select";
  import { companyStore } from "$lib/stores/company";
  import type { SelectOptionType } from "$lib/types/docs";
  import { Building2Icon } from "lucide-svelte";

  let { size = "md" } = $props<{ size?: SelectSizeType }>();

  let currentCompany = $companyStore.selectedCompany;

  const storeCompanies = $companyStore.companies;

  const companyList: SelectOptionType[] = $derived(storeCompanies.map(company => ({value: company.id, label: company.name, disabled: false})));
  const selectedCompany: SelectOptionType = $derived({value: currentCompany!.id, label: currentCompany!.name, disabled: false});

  const changeCompany = (company: SelectOptionType) => {
    const lang = $page.params.lang;
    const storeCompany = storeCompanies.find(c => c.id === company.value);
    storeCompany && companyStore.setSelectedCompany(company.value);
    
    goto(`/${lang}/in/${company.value}`);
  }

  $effect(() => {
    console.log("selectedCompany", $companyStore.selectedCompany);
  })
</script>

<!-- <Select size={size} onChangeHandle={changeCompany} options={companyList} currentValue={selectedCompany} leftIcon={Building2Icon} placeholder="SelectCompany" /> -->
<Select size={size} onChangeHandle={changeCompany} options={companyList} currentValue={selectedCompany} leftIcon={Building2Icon} placeholder="Select Company" />