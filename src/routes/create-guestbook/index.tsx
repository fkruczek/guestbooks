import { component$ } from "@builder.io/qwik";
import { Form, routeAction$, z, zod$ } from "@builder.io/qwik-city";
import { Button } from "~/components/button";
import { Input } from "~/components/input";
import { createDbClient } from "~/database";

export const useCreateGuestbook = routeAction$(
  async (data, requestEvent) => {
    const db = createDbClient(requestEvent);

    const { data: existingGuestbooks } = await db
      .from("guestbooks")
      .select("email")
      .eq("email", data.email);

    if (existingGuestbooks?.length) {
      return requestEvent.fail(400, { message: "Guestbook already exists" });
    }

    const { error } = await db
      .from("guestbooks")
      .insert([{ email: data.email, name: data.name }]);

    if (error) {
      return requestEvent.fail(500, { message: error.message });
    }

    requestEvent.redirect(302, "/");
  },
  zod$({
    name: z.string().min(3),
    email: z.string().min(3),
  })
);

export default component$(() => {
  const createUserAction = useCreateGuestbook();

  return (
    <section>
      <h1>Create Guestbook:</h1>
      <Form
        action={createUserAction}
        onSubmitCompleted$={(res: CustomEvent) => {
          res.detail.value?.failed && alert(res.detail.value.message);
        }}
      >
        <Input
          name="name"
          value={createUserAction.formData?.get("name")}
          required
        >
          Name
        </Input>
        <Input
          name="email"
          type="email"
          value={createUserAction.formData?.get("email")}
          required
        >
          Email
        </Input>
        <Button type="submit">Create</Button>
      </Form>
    </section>
  );
});
