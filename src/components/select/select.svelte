<script lang="ts">
  import type { SelectOptionType } from "$lib/types/docs";
  import { SelectContent, SelectItem, SelectRoot, SelectTrigger, SelectValue } from ".";

  export let options: SelectOptionType[];
  export let currentValue: SelectOptionType; 
  export let onChangeHandle: (value: SelectOptionType) => void;
  export let size: "sm" |"md" | "lg" = "md";

</script>


<SelectRoot onSelectedChange={v => v && onChangeHandle(v as SelectOptionType)} selected={currentValue}>
  <SelectTrigger size={size}>
    <SelectValue placeholder="Theme" />
  </SelectTrigger>
  <SelectContent>
    {#each options as option}
      <SelectItem value={option.value}>{option.label}</SelectItem>
    {/each}
  </SelectContent>
</SelectRoot>