<script lang="ts">
	import { Button as ButtonPrimitive } from "bits-ui";
	import { type Events, type Props, buttonVariants } from "./index";
	import { cn } from "$lib/utils";
  import type { Icon as IconType } from "lucide-svelte";

	type $$Props = Props & { leftIcon?: typeof IconType; rightIcon?: typeof IconType; isLoading?: boolean};
	export let variant: $$Props["variant"] = "primary";
	export let size: $$Props["size"] = "md";
	export let builders: $$Props["builders"] = [];
	export { className as class };
  
	let className: $$Props["class"] = undefined;
  let { leftIcon = undefined, rightIcon = undefined, isLoading = false } = $$props;
	type $$Events = Events;
  const LeftIcon = leftIcon;
  const RightIcon = rightIcon;
  
</script>

<ButtonPrimitive.Root
	{builders}
	class={cn(buttonVariants({ variant, size, className }), "focus-outline")}
	type="button"
	{...$$restProps}
	on:click
	on:keydown
>
  {#if leftIcon}
    <LeftIcon />
  {/if}
	<slot />
  {#if rightIcon}
    <RightIcon />
  {/if}
</ButtonPrimitive.Root>
