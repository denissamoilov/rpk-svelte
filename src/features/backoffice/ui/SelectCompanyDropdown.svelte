<script lang="ts">
  import { Select, type SelectSizeType } from "$components/select";
  import type { SelectOptionType } from "$lib/types/docs";
  import { Building2Icon } from "lucide-svelte";
  export let size: SelectSizeType = "md";

  const myCompanies = [
    { value: "upapp", label: "UpApp OÜ", disabled: false},
    { value: "rpk", label: "Raamatupidamiskeskus OÜ", disabled: false},
    { value: "dial", label: "Dial OÜ", disabled: false},
  ]

  let currentCompany: SelectOptionType = myCompanies[0];

  // const unsubscribe = languageStore.subscribe(value => {
  //   currentCompany = value;
  // })

  // onMount(() => {
  //   return () => unsubscribe();
  // })

  const changeCompany = (company: SelectOptionType) => {
    // setCompany(company);
  }
</script>

<Select size={size} onChangeHandle={changeCompany} options={myCompanies} currentValue={currentCompany} leftIcon={Building2Icon} placeholder="SelectCompany" />