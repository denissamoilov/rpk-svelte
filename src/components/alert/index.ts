import { type VariantProps, tv } from "tailwind-variants";

import Root from "./alert.svelte";
import Description from "./alert-description.svelte";
import Title from "./alert-title.svelte";

export const alertVariants = tv({
  base: "text-foreground relative w-full rounded-sm border px-4 py-2 [&:has(svg)]:pl-11 [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-3",

  variants: {
    variant: {
      default: "bg-background text-foreground [&>svg]:text-foreground",
      error:
        "border-destructive bg-destructive/10 [&>svg]:text-destructive",
      warning:
        "border-warning bg-warning/10 [&>svg]:text-warning",
      success:
        "border-success bg-success/10 [&>svg]:text-success",
      info:
        "border-info bg-info/10 [&>svg]:text-info",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export type Variant = VariantProps<typeof alertVariants>["variant"];
export type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export {
  Root,
  Description,
  Title,
  //
  Root as Alert,
  Description as AlertDescription,
  Title as AlertTitle,
};
