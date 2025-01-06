<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import type { HeadingLevel } from "./index";
	import { cn } from "$lib/utils";

	type $$Props = HTMLAttributes<HTMLHeadingElement> & {
		level?: HeadingLevel;
	};

	let className: $$Props["class"] = undefined;
	export let level: $$Props["level"] = "h6";
	export { className as class };
</script>

<svelte:element
	this={level}
	class={cn("mb-2 font-medium", className)}
	{...$$restProps}
>
	<slot />
</svelte:element>