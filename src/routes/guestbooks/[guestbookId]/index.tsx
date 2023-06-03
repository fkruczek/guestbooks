import { component$, useSignal } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { Button } from "~/components/button";
import { Link } from "~/components/link";
import { createDbClient } from "~/database";
import { generateQRCode } from "~/domain/guestbook";

export const useGetGuestbook = routeLoader$(async (requestEvent) => {
  const guestbookId = parseInt(requestEvent.params["guestbookId"], 10);

  const db = createDbClient(requestEvent);

  const { data: guestbook } = await db
    .from("guestbooks")
    .select("id,name,email,entries(*,guestbookId)")
    .eq("id", guestbookId)
    .limit(1)
    .single();

  if (!guestbook) {
    requestEvent.status(404);
  }

  return guestbook;
});

export default component$(() => {
  const guestbook = useGetGuestbook();
  const isGenerated = useSignal(false);

  if (!guestbook.value) {
    return <div>Guestbook not found</div>;
  }

  return (
    <section class="grid">
      <div class="md:flex grid gap-2">
        <div class=" bg-purple-100 p-2 flex-1">
          <h1 class="text-xl">Guestbook: {guestbook.value.name} </h1>
          <p>Created by: {guestbook.value.email}</p>
        </div>
        {isGenerated.value ? null : (
          <Button
            onClick$={() => {
              generateQRCode(guestbook.value.id);
              isGenerated.value = true;
            }}
          >
            Generate QR code
          </Button>
        )}
        <div id="qr-code-container" />
      </div>
      <ul>
        {guestbook.value.entries.map((entry, index) => (
          <li key={entry.id} class="my-2 bg-green-100 p-2">
            <p>Entry {index + 1}:</p>
            <div class="ml-2 grid gap-2">
              <p>Email: {entry.email}</p>
              <p>Message: {entry.message}</p>
              {entry.photoPath && (
                <img
                  alt={`${entry.email} photo`}
                  src={entry.photoPath}
                  height={300}
                  width={300}
                />
              )}
            </div>
          </li>
        ))}
      </ul>
      <Link
        href={"/create-entry/" + guestbook.value.id}
        class="mt-2 bg-sky-200 grid justify-center p-4"
      >
        Add new entry
      </Link>
    </section>
  );
});
