import { component$ } from "@builder.io/qwik";
import { Form, routeAction$, z, zod$ } from "@builder.io/qwik-city";
import { PrismaClient } from "@prisma/client";
import { Button } from "~/components/button";
import { Input } from "~/components/input";

export const useCreateGuestbook = routeAction$(
  async (data, { redirect }) => {
    const prisma = new PrismaClient();

    const guestbookInDb = await prisma.guestbook.findUnique({
      where: {
        name: data.name,
      },
    });

    if (guestbookInDb) {
      throw new Error("Guestbook already exists");
    }

    await prisma.guestbook.create({
      data,
    });

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
