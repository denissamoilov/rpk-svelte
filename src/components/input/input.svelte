<script lang="ts">
	import { inputVariants, type InputEvents, type InputProps } from "./index.js";
  import type { Icon as IconType } from "lucide-svelte";
	import { cn } from "$lib/utils.js";
  import { Label } from "$components";

	type $$Props = InputProps & { label?: string, icon?: typeof IconType; };
	type $$Events = InputEvents;
	
  export let size: $$Props["size"] = "md";
	export let value: $$Props["value"] = undefined;
	export { className as class };

	let className: $$Props["class"] = undefined;
  let { label = '', icon = undefined } = $$props;
  const Icon = icon;

	// Workaround for https://github.com/sveltejs/svelte/issues/9305
	// Fixed in Svelte 5, but not backported to 4.x.
	export let readonly: $$Props["readonly"] = undefined;
</script>

<div class="flex flex-col gap-2">
  {#if label}
    <Label for={$$restProps.id}>{label}</Label>
  {/if}
  <div class="relative">
    {#if icon}
      <div class="absolute left-3 flex items-center top-1/2 -translate-y-1/2 pointer-events-none text-neutral-600">
        <Icon />
      </div>
    {/if}
    <input
      class={cn(
        inputVariants({size}),
        icon ? "pl-11" : "pl-2",
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
</div>
