import { component$, Slot } from "@builder.io/qwik";

import { Header } from "~/components/header";

export default component$(() => {
  return (
    <>
      <Header />
      <main class="max-w-4xl m-auto my-10">
        <Slot />
      </main>
    </>
  );
});
