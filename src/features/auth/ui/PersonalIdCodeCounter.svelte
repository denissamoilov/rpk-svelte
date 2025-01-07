<script lang="ts">
  import { cn } from "$lib/utils";
  
  export let value: string;
  export let maxLength = 11;
  
  $: isMaxLength = value.length >= maxLength;
</script>

<div class={cn(
  "text-sm px-2",
  isMaxLength ? "text-destructive" : "text-muted-foreground"
)}>
  {value.length}/{maxLength}
</div> 