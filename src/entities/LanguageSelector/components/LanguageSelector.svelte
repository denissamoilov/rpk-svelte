<script lang="ts">
  import { onMount } from "svelte";
  import { languageStore, setLanguage } from "../stores/languageStore";
  import { Select, type SelectSizeType } from "$components/select";
  import type { SelectOptionType } from "$lib/types/docs";

  let currentLanguage: SelectOptionType;
  export let size: SelectSizeType ="md";

  const unsubscribe = languageStore.subscribe(value => {
    currentLanguage = value;
  })

  const languages = [
    { value: "en", label: "English", disabled: false},
    { value: "ee", label: "Estonian", disabled: false},
    { value: "ru", label: "Russian", disabled: false},
  ]

  onMount(() => {
    return () => unsubscribe();
  })

  const changeLanguage = (lang: SelectOptionType) => {
    setLanguage(lang);
  }
</script>

<Select size={size} onChangeHandle={changeLanguage} options={languages} currentValue={currentLanguage} />
