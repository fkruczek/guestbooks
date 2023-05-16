import { component$ } from "@builder.io/qwik";
import {
  Form,
  routeAction$,
  routeLoader$,
  z,
  zod$,
} from "@builder.io/qwik-city";
import { PrismaClient } from "@prisma/client";
import { Button } from "~/components/button";
import { Input } from "~/components/input";

export const useGetGuestbookId = routeLoader$(async ({ params, status }) => {
  const guestbookId = parseInt(params["guestbookId"], 10);

  const prisma = new PrismaClient();
  const guestbook = await prisma.guestbook.findUnique({
    where: { id: guestbookId },
  });
  if (!guestbook) {
    status(404);
  }
  return guestbookId;
});

export const useCreateUser = routeAction$(
  async (data, { redirect }) => {
    const prisma = new PrismaClient();

    const guestbook = await prisma.guestbook.findUnique({
      where: { id: +data.guestbookId },
    });

    if (!guestbook) {
      throw new Error("Guestbook not found");
    }

    await prisma.entry.create({
      data: {
        ...data,
        guestbookId: +data.guestbookId,
      },
    });
    redirect(302, "/guestbooks/" + data.guestbookId);
  },
  zod$({
    name: z.string(),
    message: z.string(),
    email: z.string(),
    guestbookId: z.string(),
  })
);

export default component$(() => {
  const guestbookId = useGetGuestbookId();
  const createUserAction = useCreateUser();

  return (
    <section>
      <h1>Create Guestbook entry:</h1>
      <Form action={createUserAction}>
        <input type="hidden" name="guestbookId" value={guestbookId.value} />
        <Input name="name">Name</Input>
        <Input name="email" type="email">
          Email
        </Input>
        <Input name="message">Message</Input>
        <Button type="submit">Create</Button>
      </Form>
    </section>
  );
});
