import { component$ } from "@builder.io/qwik";
import { Form, routeAction$, z, zod$ } from "@builder.io/qwik-city";
import { Button } from "~/components/button";
import { Input } from "~/components/input";

export const useCreateGuestbook = routeAction$(
  async (data, { redirect }) => {
    // todo: check if guestbook exists

    // todo: create

    redirect(302, "/");
  },
  zod$({
    name: z.string(),
    email: z.string(),
  })
);

export default component$(() => {
  const createUserAction = useCreateGuestbook();
  return (
    <section>
      <h1>Create Guestbook:</h1>
      <Form action={createUserAction}>
        <Input name="name">Name</Input>
        <Input name="email" type="email">
          Email
        </Input>
        <Button type="submit">Create</Button>
      </Form>
    </section>
  );
});
