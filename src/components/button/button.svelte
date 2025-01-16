<script lang="ts">
	import { Button as ButtonPrimitive } from "bits-ui";
	import { type Events, type Props, buttonVariants } from "./index";
	import { cn } from "$lib/utils";
  import type { Icon as IconType } from "lucide-svelte";

  type Properties = Props & { leftIcon?: typeof IconType; rightIcon?: typeof IconType; isLoading?: boolean, isCentered?: boolean, isFullWidth?: boolean};
  export { className as class };

  
  let { variant, size,leftIcon = undefined, rightIcon = undefined, isLoading = false, isCentered = false, isFullWidth = false, class: className, children, builders = [], ...restProps }: Properties = $props();
  type $$Events = Events;

  const iconSize = $derived(size?.includes("sm") || size?.includes("xs") ? 16 : 20);

  const LeftIcon = leftIcon;
  const RightIcon = rightIcon;
  
</script>

<ButtonPrimitive.Root
	class={cn(buttonVariants({ variant, size }), "focus-outline", className)}
	{...restProps}
>
  {#if leftIcon}
    <LeftIcon class="shrink-0" size={iconSize} />
  {/if}
  {#if children}
    <span class={cn("text-left", isCentered && "text-center", isFullWidth && "w-full")}>
      {@render children?.()}
    </span>
  {/if}
  {#if rightIcon}
    <RightIcon class="shrink-0" size={iconSize} />
  {/if}
</ButtonPrimitive.Root>
