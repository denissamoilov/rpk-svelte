import { type VariantProps, tv } from "tailwind-variants";
import Root from "./input.svelte";
import type { HTMLInputAttributes } from "svelte/elements";

const inputVariants = tv({
  base: "input file:border-0 bg-gray-100 file:text-sm file:font-medium",
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

type Size = VariantProps<typeof inputVariants>["size"];

type Props = Omit<HTMLInputAttributes, "size"> & {
  size?: Size;
};

export type FormInputEvent<T extends Event = Event> = T & {
  currentTarget: EventTarget & HTMLInputElement;
};
export type InputEvents = {
  blur: FormInputEvent<FocusEvent>;
  change: FormInputEvent<Event>;
  click: FormInputEvent<MouseEvent>;
  focus: FormInputEvent<FocusEvent>;
  focusin: FormInputEvent<FocusEvent>;
  focusout: FormInputEvent<FocusEvent>;
  keydown: FormInputEvent<KeyboardEvent>;
  keypress: FormInputEvent<KeyboardEvent>;
  keyup: FormInputEvent<KeyboardEvent>;
  mouseover: FormInputEvent<MouseEvent>;
  mouseenter: FormInputEvent<MouseEvent>;
  mouseleave: FormInputEvent<MouseEvent>;
  mousemove: FormInputEvent<MouseEvent>;
  paste: FormInputEvent<ClipboardEvent>;
  input: FormInputEvent<InputEvent>;
  wheel: FormInputEvent<WheelEvent>;
};

export {
  Root,
  //
  Root as Input,
  type Props as InputProps,
  inputVariants,
};
