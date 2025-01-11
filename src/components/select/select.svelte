<script lang="ts">
  import type { SelectOptionType } from "$lib/types/docs";
  import { SelectContent, SelectItem, SelectRoot, SelectTrigger, SelectValue } from ".";
  import type { Icon as IconType } from "lucide-svelte";

  export let options: SelectOptionType[];
  export let currentValue: SelectOptionType; 
  export let onChangeHandle: (value: SelectOptionType) => void;
  export let size: "sm" |"md" | "lg" = "md";
  export let placeholder: string = "Placeholder";
  export let leftIcon: typeof IconType;

  const Icon = leftIcon;
</script>


<SelectRoot onSelectedChange={v => v && onChangeHandle(v as SelectOptionType)} selected={currentValue}>
  <SelectTrigger size={size}>
    <div class="flex items-center gap-2 flex-1 truncate">
      {#if leftIcon}
      <div class="shrink-0 text-neutral-600">
        <Icon size={16} />
      </div>
      {/if}
      <SelectValue placeholder={placeholder} class="truncate" />
    </div>
  </SelectTrigger>
  <SelectContent>
    {#each options as option}
      <SelectItem value={option.value}>{option.label}</SelectItem>
    {/each}
  </SelectContent>
</SelectRoot>