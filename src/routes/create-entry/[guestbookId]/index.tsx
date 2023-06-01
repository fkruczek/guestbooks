import { component$ } from "@builder.io/qwik";
import {
  Form,
  routeAction$,
  routeLoader$,
  z,
  zod$,
} from "@builder.io/qwik-city";
import { Button } from "~/components/button";
import { Input } from "~/components/input";
import { PhotoUpload } from "~/components/photo-upload";

export const useGetGuestbookId = routeLoader$(async ({ params, status }) => {
  const guestbookId = parseInt(params["guestbookId"], 10);

  const guestbook = {
    id: guestbookId,
    name: "asdf",
    email: "asdf",
    entries: [],
  };

  if (!guestbook) {
    status(404);
  }
  return guestbookId;
});

export const useCreateUser = routeAction$(
  async (data, { redirect }) => {
    // todo: check if guestbook exists
    // todo: create guestbook

    redirect(302, "/guestbooks/" + data.guestbookId);
  },
  zod$({
    name: z.string(),
    message: z.string(),
    email: z.string(),
    guestbookId: z.string(),
    photo: z.any(),
  })
);

export default component$(() => {
  const guestbookId = useGetGuestbookId();
  const createUserAction = useCreateUser();

  return (
    <section>
      <h1>Create Guestbook entry:</h1>
      <Form action={createUserAction} encType="multipart/form-data">
        <input type="hidden" name="guestbookId" value={guestbookId.value} />
        <Input name="name">Name</Input>
        <Input name="email" type="email">
          Email
        </Input>
        <PhotoUpload />
        <Input name="message">Message</Input>
        <Button type="submit">Create</Button>
      </Form>
    </section>
  );
});
