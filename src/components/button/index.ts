import { type VariantProps, tv } from "tailwind-variants";
import type { Button as ButtonPrimitive } from "bits-ui";

const buttonVariants = tv({
  base: "cursor-pointer text-md inline-flex items-center justify-center whitespace-nowrap font-semibold transition-colors disabled:pointer-events-none disabled:opacity-50 ring-offset-background focus-ring no-underline",
  variants: {
    variant: {
      primary: "bg-primary text-primary-foreground hover:bg-primary-hover",
      secondary: "bg-secondary text-white",
      accent: "bg-accent text-white",
      outline: "border border-primary hover:bg-primary/10",
      ghost: "hover:bg-background hover:text-foreground",
      gray: "bg-background border border-border hover:bg-background/25",
      link: "font-normal underline hover:no-underline",
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
  type Props,
  type Events,
  //
  type Props as ButtonProps,
  type Events as ButtonEvents,
  buttonVariants,
};
