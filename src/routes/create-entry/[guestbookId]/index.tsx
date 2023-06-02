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
import { createDbClient } from "~/database";

export const useGetGuestbookId = routeLoader$(async (requestEvent) => {
  const guestbookId = parseInt(requestEvent.params["guestbookId"], 10);
  const db = createDbClient(requestEvent);

  const { data: guestbook } = await db
    .from("guestbooks")
    .select("id")
    .eq("id", guestbookId)
    .limit(1)
    .single();

  if (!guestbook) {
    requestEvent.status(404);
  }
  return guestbookId;
});

export const useCreateEntry = routeAction$(
  async (data, requestEvent) => {
    const db = createDbClient(requestEvent);
    const { data: guestbookInDb } = await db
      .from("guestbooks")
      .select("id")
      .eq("id", data.guestbookId);

    if (!guestbookInDb?.length) {
      return requestEvent.fail(400, { message: "Guestbook not found" });
    }

    const { error } = await db.from("entries").insert([
      {
        name: data.name,
        email: data.email,
        message: data.message,
        guestbookId: data.guestbookId,
      },
    ]);

    if (error) {
      return requestEvent.fail(500, { message: error.message });
    }

    requestEvent.redirect(302, "/guestbooks/" + data.guestbookId);
  },
  zod$({
    name: z.string(),
    message: z.string(),
    email: z.string(),
    guestbookId: z.string().regex(/^\d+$/).transform(Number),
    photo: z.any(),
  })
);

export default component$(() => {
  const guestbookId = useGetGuestbookId();
  const createEntryAction = useCreateEntry();

  return (
    <section>
      <h1>Create Guestbook entry:</h1>
      <Form
        action={createEntryAction}
        onSubmitCompleted$={(res: CustomEvent) => {
          res.detail.value?.failed && alert(res.detail.value.message);
        }}
        encType="multipart/form-data"
      >
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
