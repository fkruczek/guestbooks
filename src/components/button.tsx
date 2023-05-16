import type { QwikJSX } from "@builder.io/qwik";
import { Slot, component$ } from "@builder.io/qwik";

type ButtonProps = Omit<QwikJSX.IntrinsicElements["button"], "children">;

export const Button = component$<ButtonProps>(({ type }) => (
  <button class="bg-green-200 p-4" type={type}>
    <Slot />
  </button>
));
