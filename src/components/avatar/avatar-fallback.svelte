<script lang="ts">
	import { Avatar as AvatarPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	type Properties = AvatarPrimitive.FallbackProps;

    let { class: className, children, ...restProps }: Properties = $props();
</script>

<AvatarPrimitive.Fallback
	class={cn("border border-neutral-800 bg-muted flex h-full w-full items-center justify-center rounded-full text-sm font-bold", className)}
	{...restProps}
>
	<span>{@render children?.()}</span>
</AvatarPrimitive.Fallback>