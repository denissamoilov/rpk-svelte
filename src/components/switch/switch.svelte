<script lang="ts">
	import { Switch as SwitchPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	type $$Props = SwitchPrimitive.Props;
	type $$Events = SwitchPrimitive.Events;

	let className: $$Props["class"] = undefined;
	export let checked: $$Props["checked"] = undefined;
	export { className as class };
</script>

<SwitchPrimitive.Root
	bind:checked
	class={cn(
		"focus-visible data-[state=checked]:bg-neutral-800/50 data-[state=unchecked]:bg-neutral-900 peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors  disabled:cursor-not-allowed disabled:opacity-50",
		className
	)}
	{...$$restProps}
	on:click
	on:keydown
>
	<SwitchPrimitive.Thumb
		class={cn(
			"bg-neutral-100 pointer-events-none block h-5 w-5 rounded-full shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
		)}
	/>
</SwitchPrimitive.Root>