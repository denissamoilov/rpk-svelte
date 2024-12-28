<script lang="ts">
	import { onMount } from "svelte";
	import { Select as SelectPrimitive } from "bits-ui";
	import { type TriggerProps, selectVariants} from "./index";
	import ChevronDown from "lucide-svelte/icons/chevron-down";
	import { cn } from "$lib/utils.js";

	type $$Props = TriggerProps;
	type $$Events = SelectPrimitive.TriggerEvents;

	let className: $$Props["class"] = undefined;
	export let size: $$Props["size"] = undefined;
	export { className as class };
</script>

<SelectPrimitive.Trigger
	class={cn(
		selectVariants({size}),
		"focus-outline",
		className
	)}
	{...$$restProps}
	let:builder
	on:click
	on:keydown
>
	<slot {builder} />
	<div>
		<ChevronDown class="h-4 w-4 opacity-50" />
	</div>
</SelectPrimitive.Trigger>