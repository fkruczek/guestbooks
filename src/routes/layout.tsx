import { component$, Slot } from "@builder.io/qwik";

import { Header } from "~/components/header";

export default component$(() => {
  return (
    <>
      <Header />
      <main class="m-2">
        <Slot />
      </main>
    </>
  );
});
