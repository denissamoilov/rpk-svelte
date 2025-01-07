import { type VariantProps, tv } from "tailwind-variants";
import type { Button as ButtonPrimitive } from "bits-ui";
import Root from "./button.svelte";

const buttonVariants = tv({
  base: "inline-flex items-center justify-center whitespace-nowrap font-semibold transition-colors disabled:pointer-events-none disabled:opacity-50 ring-offset-background",
  variants: {
    variant: {
      primary: "bg-primary-500 text-primary-foreground hover:bg-primary-600",
      secondary: "bg-secondary-500 text-white hover:bg-secondary-600",
      accent: "bg-accent-500 text-white hover:bg-accent-600",
      outline: "border border-secondary-500 hover:border-secondary-400",
      ghost: "hover:bg-gray-200 hover:text-gray-900",
      gray: "bg-neutral-900 border border-neutral-800 hover:bg-neutral-800/25",
    },
    size: {
      "icon-xs": "input-xs px-1 min-w-8",
      "icon-sm": "input-sm px-1 min-w-10",
      "icon-md": "input-md px-2 min-w-11",
      "icon-lg": "input-lg px-2 min-w-14",
      xs: "input-xs",
      sm: "input-sm",
      md: "input-md",
      lg: "input-lg",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

type Variant = VariantProps<typeof buttonVariants>["variant"];
type Size = VariantProps<typeof buttonVariants>["size"];

type Props = ButtonPrimitive.Props & {
  variant?: Variant;
  size?: Size;
};

type Events = ButtonPrimitive.Events;

export {
  Root,
  type Props,
  type Events,
  //
  Root as Button,
  type Props as ButtonProps,
  type Events as ButtonEvents,
  buttonVariants,
};
