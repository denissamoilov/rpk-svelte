<script lang="ts">
	import { inputVariants, type InputEvents, type InputProps } from "./index.js";
	import { cn } from "$lib/utils.js";
  import { Label } from "$components";

	type $$Props = InputProps & { label?: string };
	type $$Events = InputEvents;

	let className: $$Props["class"] = undefined;
  let { label = ''} = $$props;
	export let size: $$Props["size"] = "md";
	export let value: $$Props["value"] = undefined;
	export { className as class };

	// Workaround for https://github.com/sveltejs/svelte/issues/9305
	// Fixed in Svelte 5, but not backported to 4.x.
	export let readonly: $$Props["readonly"] = undefined;
</script>

<div class="flex flex-col gap-2">
  {#if label}
    <Label for={$$restProps.id}>{label}</Label>
  {/if}
  <input
    class={cn(
      inputVariants({size}),
      "focus-outline",
      className
    )}
    bind:value
    {readonly}
    on:blur
    on:change
    on:click
    on:focus
    on:focusin
    on:focusout
    on:keydown
    on:keypress
    on:keyup
    on:mouseover
    on:mouseenter
    on:mouseleave
    on:mousemove
    on:paste
    on:input
    on:wheel|passive
    {...$$restProps}
  />
</div>