import { Select as SelectPrimitive, type SelectTriggerProps } from "bits-ui";

import Label from "./select-label.svelte";
import Item from "./select-item.svelte";
import Content from "./select-content.svelte";
import Trigger from "./select-trigger.svelte";
import Separator from "./select-separator.svelte";
import Select from "./select.svelte";
import { tv, type VariantProps } from "tailwind-variants";

const Root = SelectPrimitive.Root;
const Group = SelectPrimitive.Group;
const Input = SelectPrimitive.Input;
const Value = SelectPrimitive.Value;

const selectVariants = tv({
  base: "shrink-0 text-md input aria-[invalid]:border-destructive data-[placeholder]:[&>span]:text-muted-foreground flex items-center justify-between [&>span]:line-clamp-1",
  variants: {
    size: {
      sm: "input-sm",
      md: "input-md",
      lg: "input-lg",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type Size = VariantProps<typeof selectVariants>["size"];

type TriggerProps = SelectTriggerProps & {
  size?: Size;
};

export {
  Root,
  Group,
  Input,
  Label,
  Item,
  Value,
  Content,
  Trigger,
  Separator,
  //
  Select,
  Root as SelectRoot,
  Group as SelectGroup,
  Input as SelectInput,
  Label as SelectLabel,
  Item as SelectItem,
  Value as SelectValue,
  Content as SelectContent,
  Trigger as SelectTrigger,
  Separator as SelectSeparator,
  type TriggerProps,
  selectVariants,
  type Size as SelectSizeType,
};
