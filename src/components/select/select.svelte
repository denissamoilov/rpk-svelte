<script lang="ts">
  import type { SelectOptionType } from "$lib/types/docs";
  import { SelectContent, SelectItem, SelectRoot, SelectTrigger, SelectValue } from ".";
  import type { Icon as IconType } from "lucide-svelte";

  const { 
    options, 
    currentValue, 
    onChangeHandle, 
    size = "md", 
    placeholder = "Placeholder", 
    leftIcon = null 
  } = $props<{
    options: SelectOptionType[];
    currentValue?: SelectOptionType;
    onChangeHandle: (value: SelectOptionType) => void;
    size?: "xs" | "sm" | "md" | "lg";
    placeholder?: string;
    leftIcon?: typeof IconType | null;
  }>();

  const Icon = leftIcon;
</script>


<SelectRoot onSelectedChange={v => v && onChangeHandle(v as SelectOptionType)} selected={currentValue}>
  <SelectTrigger size={size}>
    <div class="flex items-center gap-2 flex-1 truncate">
      {#if leftIcon}
      <div class="shrink-0 text-subtle">
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