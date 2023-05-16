import type { QwikJSX } from "@builder.io/qwik";
import { Slot, component$ } from "@builder.io/qwik";

type LinkProps = Omit<QwikJSX.IntrinsicElements["a"], "children">;

export const Link = component$<LinkProps>((linkProps) => (
  <a class="text-green-900 text-xl" {...linkProps}>
    <Slot />
  </a>
));
