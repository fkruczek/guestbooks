import type { QwikJSX } from "@builder.io/qwik";
import { Slot, component$ } from "@builder.io/qwik";

type InputProps = Omit<QwikJSX.IntrinsicElements["input"], "children">;

export const Input = component$<InputProps>((inputProps) => {
  return (
    <label class="grid gap-1 my-4">
      <Slot />
      <input {...inputProps} class="bg-fuchsia-200 h-10 px-4 max-w-xs" />
    </label>
  );
});
