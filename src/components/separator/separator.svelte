<script lang="ts">
	import { Separator as SeparatorPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	type $$Props = SeparatorPrimitive.Props & { label?: string };

	let className: $$Props["class"] = undefined;
	export let orientation: $$Props["orientation"] = "horizontal";
	export let decorative: $$Props["decorative"] = undefined;
	export { className as class };
</script>

<SeparatorPrimitive.Root
	class={cn(
		"flex items-center justify-center shrink-0 bg-gray-200 text-sm text-shadow-lg",
		orientation === "horizontal" ? "h-px w-full" : "min-h-full w-px",
		className
	)}
	{orientation}
	{decorative}
	{...$$restProps}
>
  <slot name="label" />
</SeparatorPrimitive.Root>