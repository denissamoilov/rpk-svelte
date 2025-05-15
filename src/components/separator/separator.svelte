<script lang="ts">
	import { Separator as SeparatorPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	// type $$Props = SeparatorPrimitive.Props & { label?: string };
	type Properties = {
		label?: string;
	} & SeparatorPrimitive.Props;

	// let className: $$Props["class"] = undefined;
	// export let orientation: $$Props["orientation"] = "horizontal";
	// export let decorative: $$Props["decorative"] = undefined;
	// export { className as class };
	let { label, orientation = "horizontal", class: className, ...restProps }: Properties = $props();
</script>

<SeparatorPrimitive.Root
	class={cn(
		"flex items-center justify-center shrink-0 bg-inherit text-sm relative",
		"before:bg-border before:absolute",
		orientation === "horizontal" ? "before:h-px before:min-w-full" : "before:min-h-full before:w-px",
		label && label.length > 0 && "after:content-[attr(data-label)] after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:text-sm after:text-muted after:bg-inherit after:px-2 after:z-10",
		className
	)}
	data-label={label}
	{...restProps}
/>